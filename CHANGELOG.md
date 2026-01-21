# Changelog

All notable changes to `@todovue/tv-progress-bar` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-21

### Added
- **Gradient Support**: New `gradient` prop (Array) to create modern, multicolor progress bars.
- **Glow Effect**: New `glow` prop (Boolean) and `glowColor` (String) to add a neon-like depth effect.
- **Customizable Transitions**: New `duration` and `easing` props to control the progress bar animation smoothness and feel.
- New demo variants in the documentation showcasing gradients, glow effects, and custom easing functions.

### Updated
- `TvProgressBar` internal styles now use dynamic transitions and backgrounds via `:style` for better flexibility.
- Documentation updated with detailed prop descriptions and usage examples for new aesthetic features.

### Dependencies
- Updated `@todovue/tv-demo` to `^1.4.4`.
- Updated `sass` to `^1.97.2`.
- Updated `vite` to `^7.3.1`.

## [1.0.0] - 2026-01-06

### Added
- Initial release of TvProgressBar component
- Real-time reading progress tracking based on scroll position
- Flexible target selection (CSS selector, element reference, or DOM element)
- Configurable `height` prop for progress bar thickness (default: '4px')
- Configurable `color` prop for custom progress bar colors
- `offsetTop` prop to account for fixed headers (default: 0)
- `offsetBottom` prop to account for fixed footers (default: 0)
- `zIndex` prop for controlling stacking order (default: 1200)
- `disabled` prop to conditionally show/hide the progress bar (default: false)
- Smooth linear transitions with 120ms duration
- Reduced motion support via `prefers-reduced-motion` media query
- SSR-safe implementation with proper window/document guards
- `useProgressBar` composable for custom progress implementations
- ResizeObserver support for responsive content tracking
- RequestAnimationFrame optimization for smooth performance
- Automatic recalculation on window scroll, resize, and load events
- Template ref support for target element selection
- `recalculate()` exposed method for manual progress updates
- Proper cleanup of event listeners and observers on unmount
- ARIA accessibility attributes (role, aria-label, aria-valuemin, aria-valuemax, aria-valuenow)
- Pointer-events: none to avoid interference with page interactions
- TypeScript support with type definitions
- Nuxt 3/4 module support
- Comprehensive documentation and usage examples
- Demo playground with multiple configuration examples

[1.1.0]: https://github.com/TODOvue/tv-progress-bar/pull/2/files
[1.0.0]: https://github.com/TODOvue/tv-progress-bar/pull/1/files
