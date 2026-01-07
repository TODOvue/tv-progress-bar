import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'

export function useProgressBar(targetEl, options = {}) {
  const offsetTop = computed(() => {
    const val = options.offsetTop
    return (val && typeof val === 'object' && 'value' in val) ? val.value : (val ?? 0)
  })
  const offsetBottom = computed(() => {
    const val = options.offsetBottom
    return (val && typeof val === 'object' && 'value' in val) ? val.value : (val ?? 0)
  })

  const progress = ref(0)

  let rafId = null
  let resizeObserver = null

  const clamp01 = (n) => Math.min(1, Math.max(0, n))

  const measure = () => {
    if (typeof window === 'undefined') return

    const el = targetEl.value
    if (!el) {
      progress.value = 0
      return
    }

    const rect = el.getBoundingClientRect()
    const startY = rect.top + window.scrollY
    const endY = startY + el.offsetHeight

    const currentY = window.scrollY + offsetTop.value

    const effectiveViewportHeight = Math.max(
      1,
      window.innerHeight - offsetTop.value - offsetBottom.value
    )

    const endScrollY = endY - effectiveViewportHeight
    const totalScrollable = endScrollY - startY

    if (totalScrollable <= 1) {
      progress.value = currentY >= startY ? 1 : 0
      return
    }

    progress.value = clamp01((currentY - startY) / totalScrollable)
  }

  const scheduleMeasure = () => {
    if (typeof window === 'undefined') return
    
    if (rafId != null) return

    rafId = window.requestAnimationFrame(() => {
      rafId = null
      measure()
    })
  }

  const recalculate = async () => {
    if (typeof window === 'undefined') return
    await nextTick()
    scheduleMeasure()
  }

  const observeResize = () => {
    if (typeof window === 'undefined') return

    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }

    if (typeof ResizeObserver === 'undefined') return

    resizeObserver = new ResizeObserver(() => scheduleMeasure())
    if (targetEl.value) resizeObserver.observe(targetEl.value)
  }

  watch(
    () => targetEl.value,
    async (newEl, oldEl) => {
      if (typeof window === 'undefined') return
      if (newEl === oldEl) return
      observeResize()
      await recalculate()
    }
  )

  onMounted(async () => {
    if (typeof window === 'undefined') return

    await recalculate()

    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    window.addEventListener('load', scheduleMeasure)

    observeResize()
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return

    window.removeEventListener('scroll', scheduleMeasure)
    window.removeEventListener('resize', scheduleMeasure)
    window.removeEventListener('load', scheduleMeasure)

    if (rafId != null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }

    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  return {
    progress,
    progressPercent: computed(() => Math.round(progress.value * 100)),
    recalculate
  }
}

export default useProgressBar
