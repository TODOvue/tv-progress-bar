import type { App, Plugin } from 'vue'
import _TvProgressBar from './components/TvProgressBar.vue'
import './style.scss'

const TvProgressBar = _TvProgressBar as typeof _TvProgressBar & Plugin;
TvProgressBar.install = (app: App) => {
  app.component('TvProgressBar', TvProgressBar)
};

export { TvProgressBar }

export const TvProgressBarPlugin: Plugin = {
  install: TvProgressBar.install
};
export default TvProgressBar;

declare module 'vue' {
  export interface GlobalComponents {
    TvProgressBar: typeof TvProgressBar;
  }
}
