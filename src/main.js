import { createApp } from 'vue'
import './style.scss'
import '@todovue/tv-demo/style.css'
import TvProgressBar from './demo/Demo.vue'

const app = createApp(TvProgressBar)
app.mount('#tv-progress-bar')
