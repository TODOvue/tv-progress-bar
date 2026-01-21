<template>
  <tv-progress-bar
    :target="articleContainer"
    color="#00f2fe"
    glow
    height="4px"
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
