import Default from './demos/default.vue?raw';
import Height from './demos/height.vue?raw';
import Color from './demos/color.vue?raw';
import Disabled from './demos/disabled.vue?raw';
import Gradient from './demos/gradient.vue?raw';
import Glow from './demos/glow.vue?raw';
import Transition from './demos/transition.vue?raw';

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
    title: "TvProgressBar with Gradient property",
    description: "Progress bar with custom gradient.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      gradient: ['#f093fb', '#f5576c'],
      height: '6px'
    },
    html: Gradient,
  },
  {
    id: 5,
    title: "TvProgressBar with Glow effect",
    description: "Progress bar with a neon glow effect.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      color: '#00f2fe',
      glow: true,
      height: '4px'
    },
    html: Glow,
  },
  {
    id: 6,
    title: "TvProgressBar with Custom Transition",
    description: "Progress bar with custom duration and easing.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      color: '#3f51b5',
      duration: '800ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    html: Transition,
  },
  {
    id: 7,
    title: "TvProgressBar Disabled",
    description: "Progress bar in disabled state.",
    propsData: {
      offsetTop: 0,
      offsetBottom: 0,
      disabled: true,
    },
    html: Disabled,
  },
];
