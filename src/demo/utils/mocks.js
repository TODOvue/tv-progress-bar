import Default from './demos/default.vue?raw';
import Height from './demos/height.vue?raw';
import Color from './demos/color.vue?raw';
import Disabled from './demos/disabled.vue?raw';

export const demos = [
  {
    id: 1,
    title: "TvProgressBar Default",
    description: "Progress bar with default settings.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
    },
    html: Default,
  },
  {
    id: 2,
    title: "TvProgressBar with Height property",
    description: "Progress bar with custom height.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      height: '8px',
    },
    html: Height,
  },
  {
    id: 3,
    title: "TvProgressBar with Color property",
    description: "Progress bar with custom color.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      color: '#42b983',
    },
    html: Color,
  },
  {
    id: 4,
    title: "TvProgressBar Disabled",
    description: "Progress bar in disabled state.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      enabled: false,
    },
    html: Disabled,
  },
];
