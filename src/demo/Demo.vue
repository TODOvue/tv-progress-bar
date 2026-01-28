<script setup>
import { defineAsyncComponent } from 'vue'
import { demos } from "./utils/mocks.js";
import { TvDemo } from '@todovue/tv-demo';

const TvProgressBarDemo = defineAsyncComponent(/* webpackChunkName: "tvProgressBarDemo" */() => import('../components/TvProgressBarDemo.vue'))
</script>

<template>
  <TvDemo
    :component="TvProgressBarDemo"
    :variants="demos"
    component-name="TvProgressBar"
    npm-install="@todovue/tv-progress-bar"
    source-link="https://github.com/TODOvue/tv-progress-bar"
    url-clone="https://github.com/TODOvue/tv-progress-bar.git"
    version="1.1.1"
  />
</template>
