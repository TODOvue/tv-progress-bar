import { createApp } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import './style.scss'
import '@todovue/tv-demo/style.css'
import TvProgressBar from './demo/Demo.vue'

const app = createApp(TvProgressBar)
app.component('TvDemo', TvDemo)
app.mount('#tv-progress-bar')
