<template>
  <TvProgressBar
    :checkpoints="[25, 50, 75]"
    color="#f59e0b"
    height="6px"
  />
</template>

<script setup>
import { TvProgressBar } from "@todovue/tv-progress-bar";
import "@todovue/tv-progress-bar/style.css";
</script>
