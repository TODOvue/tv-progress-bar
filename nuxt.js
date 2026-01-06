
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@todovue/tv-progress-bar',
    configKey: 'tvProgressBar'
  },
  setup(_options, nuxt) {
    const cssPath = '@todovue/tv-progress-bar/style.css';
    if (!nuxt.options.css.includes(cssPath)) {
      nuxt.options.css.push(cssPath);
    }
  }
})
