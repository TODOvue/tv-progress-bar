<template>
  <tv-progress-bar
    :target="articleContainer"
    color="#3f51b5"
    duration="800ms"
    easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  />

  <div ref="articleContainer">
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TvProgressBar } from "@todovue/tv-progress-bar";
import "@todovue/tv-progress-bar/style.css";

const articleContainer = ref(null);
</script>
