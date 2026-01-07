<template>
  <tv-progress-bar
    :target="articleContainer"
    height="8px"
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
