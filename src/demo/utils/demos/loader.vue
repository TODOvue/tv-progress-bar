<template>
  <TvProgressBar
    :model-value="progress"
    :color="color"
    height="6px"
    :show-label="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const progress = ref(0)
const isLoading = ref(false)
const color = ref('#3b82f6')
let interval = null
</script>
