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

const widthStyle = computed(() => `${progress.value * 100}%`)
</script>

<template>
  <div
    v-if="!disabled"
    class="reading-progress"
    :style="{ height, zIndex: String(zIndex) }"
  >
    <div
      class="reading-progress__bar"
      :style="{ width: widthStyle, backgroundColor: color || '' }"
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
