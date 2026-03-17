# Advanced Techniques for Tailwind CSS v4

Advanced patterns, optimizations, and techniques for expert-level Tailwind CSS v4 usage.

## Table of Contents
1. [Performance Optimization](#performance-optimization)
2. [Dynamic Theming](#dynamic-theming)
3. [Custom Utilities](#custom-utilities)
4. [Plugin Development](#plugin-development)
5. [Animation Patterns](#animation-patterns)
6. [Advanced Layout Techniques](#advanced-layout-techniques)

## Performance Optimization

### 1. Vite Plugin Setup (Fastest)

The Vite plugin provides the best performance with 100x+ faster incremental builds.

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    // Optimize CSS output
    cssMinify: 'lightningcss',
  },
})
```

### 2. Content Detection Optimization

While v4 auto-detects content, you can optimize scanning in large monorepos:

```css
/* Only scan specific directories */
@import "tailwindcss" layer(base, components, utilities)
  source("./src/**/*.{js,jsx,ts,tsx}");
```

### 3. Critical CSS Extraction

Extract above-the-fold CSS for faster initial page loads:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    cssCodeSplit: true, // Split CSS by chunk
  },
})
```

### 4. CSS Layers for Better Performance

Organize CSS using cascade layers for optimal performance:

```css
@import "tailwindcss";

/* Base layer - loads first */
@layer base {
  html {
    font-family: theme(fontFamily.body);
  }
}

/* Component layer - loads second */
@layer components {
  .card {
    background-color: theme(colors.card);
    border: 1px solid theme(colors.border);
  }
}

/* Utilities layer - loads last, highest specificity */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Dynamic Theming

### Runtime Theme Switching with CSS Variables

Create a fully dynamic theme system that updates without page reload:

```css
/* theme.css */
@import "tailwindcss";

@theme {
  /* Define tokens as CSS custom properties */
  --color-primary: var(--runtime-primary, oklch(0.55 0.25 270));
  --color-secondary: var(--runtime-secondary, oklch(0.65 0.20 340));
  --color-background: var(--runtime-background, oklch(1.0 0 0));
  --color-foreground: var(--runtime-foreground, oklch(0.20 0.01 250));
}
```

```typescript
// theme-manager.ts
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
}

class ThemeManager {
  private root = document.documentElement;

  setTheme(colors: Partial<ThemeColors>) {
    if (colors.primary) {
      this.root.style.setProperty('--runtime-primary', colors.primary);
    }
    if (colors.secondary) {
      this.root.style.setProperty('--runtime-secondary', colors.secondary);
    }
    if (colors.background) {
      this.root.style.setProperty('--runtime-background', colors.background);
    }
    if (colors.foreground) {
      this.root.style.setProperty('--runtime-foreground', colors.foreground);
    }
  }

  resetTheme() {
    this.root.style.removeProperty('--runtime-primary');
    this.root.style.removeProperty('--runtime-secondary');
    this.root.style.removeProperty('--runtime-background');
    this.root.style.removeProperty('--runtime-foreground');
  }

  // Generate theme from brand color
  generateThemeFromColor(baseColor: string) {
    // Parse OKLCH and generate complementary colors
    const [l, c, h] = this.parseOKLCH(baseColor);

    this.setTheme({
      primary: baseColor,
      secondary: `oklch(${l + 0.1} ${c - 0.05} ${(h + 30) % 360})`,
      background: `oklch(0.98 0.01 ${h})`,
      foreground: `oklch(0.20 0.01 ${h})`,
    });
  }

  private parseOKLCH(color: string): [number, number, number] {
    // Simple parser for oklch(l c h) format
    const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) throw new Error('Invalid OKLCH color');
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])];
  }
}

export const themeManager = new ThemeManager();
```

**Usage:**
```typescript
// Change theme at runtime
themeManager.setTheme({
  primary: 'oklch(0.60 0.25 145)', // Green theme
  secondary: 'oklch(0.70 0.20 85)',
});

// Generate full theme from single color
themeManager.generateThemeFromColor('oklch(0.55 0.25 270)');

// Reset to default
themeManager.resetTheme();
```

### User Preference Detection

```typescript
// theme-preferences.ts
interface ThemePreferences {
  colorScheme: 'light' | 'dark' | 'auto';
  accentColor: string;
  reducedMotion: boolean;
  highContrast: boolean;
}

class ThemePreferences {
  getPreferences(): ThemePreferences {
    return {
      colorScheme: this.getColorScheme(),
      accentColor: this.getAccentColor(),
      reducedMotion: this.prefersReducedMotion(),
      highContrast: this.prefersHighContrast(),
    };
  }

  private getColorScheme(): 'light' | 'dark' | 'auto' {
    const saved = localStorage.getItem('color-scheme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'auto';
  }

  private getAccentColor(): string {
    return (
      localStorage.getItem('accent-color') || 'oklch(0.55 0.25 270)'
    );
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  apply(prefs: ThemePreferences) {
    const root = document.documentElement;

    // Apply color scheme
    if (prefs.colorScheme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', prefs.colorScheme);
    }

    // Apply accent color
    root.style.setProperty('--runtime-primary', prefs.accentColor);

    // Apply motion preference
    if (prefs.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply contrast preference
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }
}

export const themePreferences = new ThemePreferences();
```

## Custom Utilities

### Creating Custom Utilities with @utility

```css
@import "tailwindcss";

/* Custom utility for text balance */
@utility text-balance {
  text-wrap: balance;
}

/* Custom utility for container queries */
@utility container-normal {
  container-type: normal;
}

/* Custom utility for scroll-driven animations */
@utility scroll-snap-x {
  scroll-snap-type: x mandatory;
}

@utility scroll-snap-child {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

**Usage:**
```html
<h1 class="text-balance">
  Balanced text for better typography
</h1>

<div class="container-normal">
  Container for container queries
</div>

<div class="scroll-snap-x overflow-x-auto flex">
  <div class="scroll-snap-child">Item 1</div>
  <div class="scroll-snap-child">Item 2</div>
</div>
```

### Variant-Based Custom Utilities

```css
/* Custom utility with variants */
@utility backdrop-blur {
  backdrop-filter: blur(8px);

  &-sm {
    backdrop-filter: blur(4px);
  }

  &-lg {
    backdrop-filter: blur(16px);
  }

  &-xl {
    backdrop-filter: blur(24px);
  }
}
```

**Usage:**
```html
<div class="backdrop-blur">Default blur</div>
<div class="backdrop-blur-sm">Small blur</div>
<div class="backdrop-blur-xl">Extra large blur</div>
```

## Plugin Development

### Creating a Tailwind v4 Plugin

```javascript
// plugins/custom-utilities.js
export default function customUtilities({ addUtilities, theme }) {
  addUtilities({
    '.text-shadow': {
      'text-shadow': '0 2px 4px rgba(0,0,0,0.1)',
    },
    '.text-shadow-lg': {
      'text-shadow': '0 4px 8px rgba(0,0,0,0.15)',
    },
    '.glass': {
      'background': 'rgba(255, 255, 255, 0.1)',
      'backdrop-filter': 'blur(10px)',
      'border': '1px solid rgba(255, 255, 255, 0.2)',
    },
  });
}
```

**Using in your config:**
```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'
import customUtilities from './plugins/custom-utilities'

export default {
  plugins: [
    tailwindcss({
      plugins: [customUtilities],
    }),
  ],
}
```

## Animation Patterns

### Keyframe Animations with @theme

```css
@theme {
  /* Define custom animations */
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-bounce-in: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

**Usage:**
```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-up">Slides up</div>
<div class="animate-bounce-in">Bounces in</div>
```

### Scroll-Driven Animations

```css
@layer utilities {
  .animate-on-scroll {
    animation: fade-in linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }

  .parallax {
    transform: translateY(calc(var(--scroll-progress) * -50px));
  }
}
```

**Usage with JavaScript:**
```typescript
// scroll-animations.ts
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.parallax');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const progress = (windowHeight - elementTop) / windowHeight;
      el.style.setProperty('--scroll-progress', progress.toString());
    });
  });
}
```

### Reduced Motion Respecting Animations

```css
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .transition-all {
    transition: all 0.3s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
  }

  .transition-all {
    transition: none;
  }
}
```

## Advanced Layout Techniques

### CSS Grid with Named Areas

```css
@layer components {
  .dashboard-layout {
    display: grid;
    grid-template-areas:
      'header header header'
      'sidebar main aside'
      'footer footer footer';
    grid-template-columns: 250px 1fr 300px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: theme(spacing.4);
  }

  .dashboard-header {
    grid-area: header;
  }

  .dashboard-sidebar {
    grid-area: sidebar;
  }

  .dashboard-main {
    grid-area: main;
  }

  .dashboard-aside {
    grid-area: aside;
  }

  .dashboard-footer {
    grid-area: footer;
  }

  /* Responsive layout */
  @media (max-width: theme(breakpoint.lg)) {
    .dashboard-layout {
      grid-template-areas:
        'header'
        'main'
        'aside'
        'footer';
      grid-template-columns: 1fr;
    }

    .dashboard-sidebar {
      display: none;
    }
  }
}
```

### Container Queries for Component-Based Responsive Design

```css
@layer components {
  .product-card {
    container-type: inline-size;
    container-name: product-card;
  }

  /* Default: vertical layout */
  .product-card__content {
    display: flex;
    flex-direction: column;
    gap: theme(spacing.4);
  }

  /* When container is wide: horizontal layout */
  @container product-card (min-width: 400px) {
    .product-card__content {
      flex-direction: row;
      align-items: center;
    }

    .product-card__image {
      width: 40%;
    }

    .product-card__details {
      width: 60%;
    }
  }

  /* When container is very wide: grid layout */
  @container product-card (min-width: 600px) {
    .product-card__content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: theme(spacing.6);
    }
  }
}
```

**Usage:**
```html
<div class="product-card">
  <div class="product-card__content">
    <div class="product-card__image">Image</div>
    <div class="product-card__details">Details</div>
    <div class="product-card__actions">Actions</div>
  </div>
</div>
```

### Subgrid for Alignment

```css
@layer components {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: theme(spacing.6);
  }

  .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
  }

  .card__header {
    grid-row: 1;
  }

  .card__body {
    grid-row: 2;
  }

  .card__footer {
    grid-row: 3;
  }
}
```

## Advanced Color Manipulation

### Color-Mix for Dynamic Color Variations

```css
@theme {
  --color-primary: oklch(0.55 0.25 270);

  /* Generate variations using color-mix */
  --color-primary-light: color-mix(
    in oklch,
    var(--color-primary),
    white 20%
  );

  --color-primary-dark: color-mix(
    in oklch,
    var(--color-primary),
    black 20%
  );

  --color-primary-muted: color-mix(
    in oklch,
    var(--color-primary),
    var(--color-background) 70%
  );
}
```

### Gradient Utilities

```css
@theme {
  /* Define gradient tokens */
  --gradient-primary: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );

  --gradient-surface: linear-gradient(
    180deg,
    var(--color-background) 0%,
    var(--color-surface) 100%
  );
}
```

**Usage:**
```html
<div class="bg-[var(--gradient-primary)] text-white p-8">
  Gradient background
</div>
```

## Performance Monitoring

### Bundle Size Analysis

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
```

### CSS Metrics

```typescript
// css-metrics.ts
function analyzeCSSPerformance() {
  const styleSheets = Array.from(document.styleSheets);

  let totalRules = 0;
  let totalSelectors = 0;

  styleSheets.forEach((sheet) => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      totalRules += rules.length;

      rules.forEach((rule) => {
        if (rule instanceof CSSStyleRule) {
          totalSelectors += rule.selectorText.split(',').length;
        }
      });
    } catch (e) {
      // Cross-origin stylesheets
    }
  });

  console.log(`Total CSS Rules: ${totalRules}`);
  console.log(`Total Selectors: ${totalSelectors}`);

  return { totalRules, totalSelectors };
}
```

## Key Takeaways

1. **Use Vite plugin** for maximum performance (100x+ faster builds)
2. **Dynamic theming** via CSS variables enables runtime customization
3. **Custom utilities** extend Tailwind for project-specific needs
4. **Container queries** enable truly component-based responsive design
5. **OKLCH + color-mix** provide powerful color manipulation
6. **Respect user preferences** (reduced motion, high contrast)
7. **Monitor performance** with bundle analysis and CSS metrics

These advanced techniques unlock the full power of Tailwind CSS v4 for complex, production-grade applications.
