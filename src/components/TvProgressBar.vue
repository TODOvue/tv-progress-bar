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
  width: {
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
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (val) => ['horizontal', 'vertical'].includes(val)
  },
  position: {
    type: String,
    default: (props) => props.orientation === 'vertical' ? 'left' : 'top',
    validator: (val) => ['top', 'bottom', 'left', 'right', 'sticky'].includes(val)
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String,
    default: 'inside',
    validator: (val) => ['inside', 'floating'].includes(val)
  },
  checkpoints: {
    type: Array,
    default: () => []
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

const isVertical = computed(() => props.orientation === 'vertical')

const containerStyle = computed(() => {
  const styles = {
    zIndex: String(props.zIndex),
    position: props.position === 'sticky' ? 'sticky' : 'fixed'
  }

  if (isVertical.value) {
    styles.width = props.width
    styles.top = '0'
    styles.bottom = '0'
    styles.height = '100vh'
    if (props.position === 'right') {
      styles.right = '0'
      styles.left = 'auto'
    } else {
      styles.left = '0'
      styles.right = 'auto'
    }
  } else {
    styles.height = props.height
    styles.left = '0'
    styles.right = '0'
    styles.width = '100%'
    if (props.position === 'bottom') {
      styles.bottom = '0'
      styles.top = 'auto'
    } else {
      styles.top = '0'
      styles.bottom = 'auto'
    }
  }

  if (props.position === 'sticky') {
    styles.top = `${props.offsetTop}px`
    styles.height = isVertical.value ? '100%' : props.height
  }

  return styles
})

const barStyle = computed(() => {
  const styles = {
    transition: `${isVertical.value ? 'height' : 'width'} ${props.duration} ${props.easing}`
  }

  if (isVertical.value) {
    styles.height = `${progress.value * 100}%`
    styles.width = '100%'
  } else {
    styles.width = `${progress.value * 100}%`
    styles.height = '100%'
  }

  if (props.gradient && props.gradient.length > 0) {
    const direction = isVertical.value ? 'to bottom' : 'to right'
    styles.background = `linear-gradient(${direction}, ${props.gradient.join(', ')})`
  } else if (props.color) {
    styles.backgroundColor = props.color
  }

  if (props.glow) {
    const shadowColor = props.glowColor || (props.gradient && props.gradient.length > 0 ? props.gradient[props.gradient.length - 1] : props.color || '#ef233c')
    styles.boxShadow = `0 0 10px ${shadowColor}, 0 0 5px ${shadowColor}`
  }

  return styles
})

const getCheckpointStyle = (checkpoint) => {
  const pos = `${checkpoint}%`
  return isVertical.value ? { top: pos } : { left: pos }
}

const floatingLabelStyle = computed(() => {
  if (!isVertical.value) {
    return {
      left: `${progress.value * 100}%`,
      transform: 'translateX(-50%)'
    }
  } else {
    return {
      top: `${progress.value * 100}%`,
      transform: 'translateY(-50%)'
    }
  }
})
</script>

<template>
  <div
    v-if="!disabled"
    class="reading-progress"
    :class="[
      `reading-progress--${orientation}`,
      `reading-progress--${position}`
    ]"
    :style="containerStyle"
  >
    <div v-if="checkpoints.length" class="reading-progress__checkpoints">
      <div
        v-for="cp in checkpoints"
        :key="cp"
        class="reading-progress__checkpoint"
        :class="{ 'reading-progress__checkpoint--reached': progressPercent >= cp }"
        :style="getCheckpointStyle(cp)"
      />
    </div>
    <div
      class="reading-progress__bar"
      :style="barStyle"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="progressPercent"
    >
      <span
        v-if="showLabel && labelPosition === 'inside'"
        class="reading-progress__label reading-progress__label--inside"
      >
        {{ progressPercent }}%
      </span>
    </div>
    <div
      v-if="showLabel && labelPosition === 'floating'"
      class="reading-progress__label reading-progress__label--floating"
      :style="floatingLabelStyle"
    >
      {{ progressPercent }}%
    </div>
  </div>
</template>

<style scoped>
</style>

