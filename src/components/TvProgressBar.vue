<script setup>
import { computed, ref, unref, watch, watchEffect } from 'vue'
import { useProgressBar } from '../composables/useProgressBar.js'

const props = defineProps({
  target: {
    type: [String, Object],
    default: '.container-blog'
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  offsetBottom: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: '4px'
  },
  zIndex: {
    type: Number,
    default: 1200
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  },
  gradient: {
    type: Array,
    default: () => []
  },
  glow: {
    type: Boolean,
    default: false
  },
  glowColor: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: '120ms'
  },
  easing: {
    type: String,
    default: 'linear'
  }
})

const el = ref(null)

const resolveTarget = () => {
  if (typeof window === 'undefined') return null
  if (props.disabled) return null

  if (props.target && typeof props.target !== 'string') {
    const maybeEl = unref(props.target)
    if (maybeEl instanceof HTMLElement) return maybeEl
    return null
  }

  const selector = typeof props.target === 'string' ? props.target : null
  if (!selector) return null

  return document.querySelector(selector)
}

watchEffect(() => {
  el.value = resolveTarget()
}, { flush: 'post' })

const { progress, progressPercent, recalculate } = useProgressBar(el, {
  offsetTop: computed(() => props.offsetTop),
  offsetBottom: computed(() => props.offsetBottom)
})

watch(
  () => [el.value, props.disabled],
  () => {
    if (typeof window === 'undefined') return
    recalculate()
  }
)

defineExpose({ recalculate })

const barStyle = computed(() => {
  const styles = {
    width: `${progress.value * 100}%`,
    transition: `width ${props.duration} ${props.easing}`
  }

  if (props.gradient && props.gradient.length > 0) {
    styles.background = `linear-gradient(to right, ${props.gradient.join(', ')})`
  } else if (props.color) {
    styles.backgroundColor = props.color
  }

  if (props.glow) {
    const shadowColor = props.glowColor || (props.gradient && props.gradient.length > 0 ? props.gradient[props.gradient.length - 1] : props.color || '#ef233c')
    styles.boxShadow = `0 0 10px ${shadowColor}, 0 0 5px ${shadowColor}`
  }

  return styles
})
</script>

<template>
  <div
    v-if="!disabled"
    class="reading-progress"
    :style="{ height, zIndex: String(zIndex) }"
  >
    <div
      class="reading-progress__bar"
      :style="barStyle"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="progressPercent"
    />
  </div>
</template>

<style scoped>

</style>
