# Design System Patterns for Tailwind CSS v4

Advanced patterns for building scalable, maintainable design systems with Tailwind v4.

## Table of Contents
1. [Multi-Layer Token Architecture](#multi-layer-token-architecture)
2. [Component Token Patterns](#component-token-patterns)
3. [Theme Switching](#theme-switching)
4. [Responsive Design Patterns](#responsive-design-patterns)
5. [Accessibility Patterns](#accessibility-patterns)

## Multi-Layer Token Architecture

### Three-Layer System

A robust design system uses three layers of tokens:

#### Layer 1: Primitive Tokens (Base Palette)
```css
@theme {
  /* Raw color values - never use directly in components */
  --primitive-purple-400: oklch(0.60 0.25 270);
  --primitive-purple-500: oklch(0.55 0.25 270);
  --primitive-purple-600: oklch(0.50 0.25 270);

  --primitive-blue-400: oklch(0.65 0.20 250);
  --primitive-blue-500: oklch(0.60 0.20 250);
  --primitive-blue-600: oklch(0.55 0.20 250);

  --primitive-green-400: oklch(0.70 0.18 145);
  --primitive-green-500: oklch(0.65 0.18 145);
  --primitive-green-600: oklch(0.60 0.18 145);

  --primitive-red-400: oklch(0.65 0.22 25);
  --primitive-red-500: oklch(0.60 0.22 25);
  --primitive-red-600: oklch(0.55 0.22 25);

  /* Neutral scale */
  --primitive-gray-50: oklch(0.98 0.01 250);
  --primitive-gray-100: oklch(0.96 0.01 250);
  --primitive-gray-200: oklch(0.92 0.01 250);
  --primitive-gray-300: oklch(0.85 0.01 250);
  --primitive-gray-400: oklch(0.70 0.01 250);
  --primitive-gray-500: oklch(0.50 0.01 250);
  --primitive-gray-600: oklch(0.40 0.01 250);
  --primitive-gray-700: oklch(0.30 0.01 250);
  --primitive-gray-800: oklch(0.20 0.01 250);
  --primitive-gray-900: oklch(0.15 0.01 250);
}
```

#### Layer 2: Semantic Tokens
```css
@theme {
  /* Brand colors */
  --color-brand-primary: var(--primitive-purple-500);
  --color-brand-secondary: var(--primitive-blue-500);

  /* Semantic colors mapped to primitives */
  --color-success: var(--primitive-green-500);
  --color-error: var(--primitive-red-500);
  --color-warning: oklch(0.75 0.18 85);
  --color-info: var(--primitive-blue-500);

  /* UI semantic tokens */
  --color-background: var(--primitive-gray-50);
  --color-foreground: var(--primitive-gray-900);
  --color-surface: oklch(1.0 0 0);
  --color-border: var(--primitive-gray-300);
}
```

#### Layer 3: Component Tokens
```css
@theme {
  /* Button component tokens */
  --color-button-primary-bg: var(--color-brand-primary);
  --color-button-primary-hover: var(--primitive-purple-600);
  --color-button-primary-active: oklch(0.45 0.25 270);
  --color-button-primary-text: oklch(1.0 0 0);

  --color-button-secondary-bg: var(--color-brand-secondary);
  --color-button-secondary-hover: var(--primitive-blue-600);
  --color-button-secondary-text: oklch(1.0 0 0);

  --color-button-ghost-bg: transparent;
  --color-button-ghost-hover: var(--primitive-gray-100);
  --color-button-ghost-text: var(--color-foreground);

  /* Input component tokens */
  --color-input-bg: var(--color-surface);
  --color-input-border: var(--color-border);
  --color-input-border-focus: var(--color-brand-primary);
  --color-input-border-error: var(--color-error);
  --color-input-text: var(--color-foreground);
  --color-input-placeholder: var(--primitive-gray-500);

  /* Card component tokens */
  --color-card-bg: var(--color-surface);
  --color-card-border: var(--color-border);
  --color-card-hover-border: var(--primitive-gray-400);
  --color-card-shadow: oklch(0.0 0 0 / 0.1);

  /* Badge component tokens */
  --color-badge-default-bg: var(--primitive-gray-100);
  --color-badge-default-text: var(--primitive-gray-800);
  --color-badge-success-bg: oklch(0.90 0.05 145);
  --color-badge-success-text: var(--primitive-green-600);
  --color-badge-error-bg: oklch(0.90 0.05 25);
  --color-badge-error-text: var(--primitive-red-600);
}
```

### Benefits of Multi-Layer Architecture

1. **Single Source of Truth**: Update primitives once, changes cascade everywhere
2. **Semantic Clarity**: Components use meaningful names like `button-primary-bg`
3. **Easy Theming**: Change semantic mappings without touching components
4. **Maintainability**: Clear hierarchy makes refactoring straightforward

## Component Token Patterns

### Pattern: Button Variants

```css
@theme {
  /* Define all button states for each variant */

  /* Primary button */
  --button-primary-bg: var(--color-brand-primary);
  --button-primary-bg-hover: var(--primitive-purple-600);
  --button-primary-bg-active: oklch(0.45 0.25 270);
  --button-primary-bg-disabled: var(--primitive-gray-300);
  --button-primary-text: oklch(1.0 0 0);
  --button-primary-text-disabled: var(--primitive-gray-500);

  /* Destructive button */
  --button-destructive-bg: var(--color-error);
  --button-destructive-bg-hover: var(--primitive-red-600);
  --button-destructive-text: oklch(1.0 0 0);

  /* Outline button */
  --button-outline-bg: transparent;
  --button-outline-bg-hover: var(--primitive-gray-100);
  --button-outline-border: var(--color-border);
  --button-outline-border-hover: var(--primitive-gray-400);
  --button-outline-text: var(--color-foreground);
}
```

**Usage in components:**
```html
<!-- Primary button -->
<button class="
  bg-button-primary-bg text-button-primary-text
  hover:bg-button-primary-bg-hover
  active:bg-button-primary-bg-active
  disabled:bg-button-primary-bg-disabled disabled:text-button-primary-text-disabled
">
  Primary
</button>

<!-- Destructive button -->
<button class="
  bg-button-destructive-bg text-button-destructive-text
  hover:bg-button-destructive-bg-hover
">
  Delete
</button>

<!-- Outline button -->
<button class="
  bg-button-outline-bg text-button-outline-text
  border border-button-outline-border
  hover:bg-button-outline-bg-hover hover:border-button-outline-border-hover
">
  Cancel
</button>
```

### Pattern: Status Colors

```css
@theme {
  /* Status backgrounds (light tints) */
  --status-success-bg: oklch(0.95 0.03 145);
  --status-success-border: oklch(0.80 0.10 145);
  --status-success-text: var(--primitive-green-600);

  --status-warning-bg: oklch(0.95 0.03 85);
  --status-warning-border: oklch(0.85 0.10 85);
  --status-warning-text: oklch(0.45 0.18 85);

  --status-error-bg: oklch(0.95 0.03 25);
  --status-error-border: oklch(0.80 0.10 25);
  --status-error-text: var(--primitive-red-600);

  --status-info-bg: oklch(0.95 0.03 250);
  --status-info-border: oklch(0.80 0.10 250);
  --status-info-text: var(--primitive-blue-600);
}
```

**Usage:**
```html
<div class="bg-status-success-bg border border-status-success-border text-status-success-text">
  Success message
</div>

<div class="bg-status-error-bg border border-status-error-border text-status-error-text">
  Error message
</div>
```

## Theme Switching

### Multi-Theme Support

```css
/* Base theme (light) */
@theme {
  --color-background: oklch(1.0 0 0);
  --color-foreground: oklch(0.20 0.01 250);
  --color-primary: oklch(0.55 0.25 270);
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.15 0.01 250);
    --color-foreground: oklch(0.95 0.01 250);
    --color-primary: oklch(0.65 0.25 270); /* Lighter in dark mode */
  }
}

/* Manual theme override with data attribute */
[data-theme="light"] {
  @theme {
    --color-background: oklch(1.0 0 0);
    --color-foreground: oklch(0.20 0.01 250);
  }
}

[data-theme="dark"] {
  @theme {
    --color-background: oklch(0.15 0.01 250);
    --color-foreground: oklch(0.95 0.01 250);
  }
}

/* Brand theme variants */
[data-theme="brand-purple"] {
  @theme {
    --color-primary: oklch(0.55 0.25 270);
    --color-secondary: oklch(0.60 0.20 250);
  }
}

[data-theme="brand-green"] {
  @theme {
    --color-primary: oklch(0.65 0.18 145);
    --color-secondary: oklch(0.70 0.20 85);
  }
}
```

### Theme Switching JavaScript

```typescript
// theme-switcher.ts
type Theme = 'light' | 'dark' | 'system';

function setTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }

  localStorage.setItem('theme', theme);
}

function getTheme(): Theme {
  return (localStorage.getItem('theme') as Theme) ?? 'system';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setTheme(getTheme());
});
```

## Responsive Design Patterns

### Mobile-First Responsive Tokens

```css
@theme {
  /* Base (mobile) spacing */
  --spacing-section: theme(spacing.8);
  --spacing-card: theme(spacing.4);

  /* Tablet breakpoint */
  @media (min-width: theme(breakpoint.md)) {
    --spacing-section: theme(spacing.12);
    --spacing-card: theme(spacing.6);
  }

  /* Desktop breakpoint */
  @media (min-width: theme(breakpoint.lg)) {
    --spacing-section: theme(spacing.16);
    --spacing-card: theme(spacing.8);
  }
}
```

### Container Query Patterns

```html
<!-- Container-based responsive card -->
<div class="@container">
  <div class="
    bg-card p-4
    @sm:p-6
    @md:flex @md:gap-6
    @lg:grid @lg:grid-cols-2
  ">
    <div class="@md:flex-1">Content</div>
    <div class="@md:flex-1">Sidebar</div>
  </div>
</div>
```

## Accessibility Patterns

### Focus Ring Tokens

```css
@theme {
  /* Consistent focus styling */
  --ring-color: var(--color-primary);
  --ring-offset-color: var(--color-background);
  --ring-offset-width: 2px;
  --ring-width: 2px;
}
```

**Usage:**
```html
<button class="
  focus:outline-none
  focus:ring-2
  focus:ring-ring
  focus:ring-offset-2
  focus:ring-offset-background
">
  Accessible button
</button>
```

### Color Contrast Tokens

Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text):

```css
@theme {
  /* Text on light backgrounds */
  --text-on-light: oklch(0.20 0.01 250); /* High contrast */
  --text-secondary-on-light: oklch(0.45 0.01 250); /* Medium contrast */

  /* Text on dark backgrounds */
  --text-on-dark: oklch(0.95 0.01 250); /* High contrast */
  --text-secondary-on-dark: oklch(0.70 0.01 250); /* Medium contrast */

  /* Text on colored backgrounds */
  --text-on-primary: oklch(1.0 0 0); /* White text on primary color */
}
```

## Real-World Example: Complete Component System

```css
@theme {
  /* === PRIMITIVES === */
  --primitive-purple-500: oklch(0.55 0.25 270);
  --primitive-purple-600: oklch(0.50 0.25 270);
  --primitive-gray-100: oklch(0.96 0.01 250);
  --primitive-gray-300: oklch(0.85 0.01 250);
  --primitive-gray-900: oklch(0.15 0.01 250);

  /* === SEMANTIC === */
  --color-primary: var(--primitive-purple-500);
  --color-background: oklch(1.0 0 0);
  --color-foreground: var(--primitive-gray-900);
  --color-border: var(--primitive-gray-300);

  /* === COMPONENTS === */
  /* Buttons */
  --button-primary-bg: var(--color-primary);
  --button-primary-hover: var(--primitive-purple-600);
  --button-primary-text: oklch(1.0 0 0);

  /* Inputs */
  --input-bg: var(--color-background);
  --input-border: var(--color-border);
  --input-border-focus: var(--color-primary);

  /* Cards */
  --card-bg: var(--color-background);
  --card-border: var(--color-border);
}
```

**Usage in real components:**
```html
<!-- Button using component tokens -->
<button class="
  px-4 py-2 rounded-md
  bg-button-primary-bg text-button-primary-text
  hover:bg-button-primary-hover
">
  Submit
</button>

<!-- Input using component tokens -->
<input class="
  px-3 py-2 rounded-md
  bg-input-bg
  border border-input-border
  focus:border-input-border-focus focus:ring-2 focus:ring-primary
" />

<!-- Card using component tokens -->
<div class="
  bg-card-bg border border-card-border
  rounded-lg p-6
">
  Card content
</div>
```

## Key Takeaways

1. **Use three-layer token architecture**: Primitives → Semantic → Component
2. **Component tokens enable variant patterns**: All states defined upfront
3. **Theme switching is just token remapping**: No component changes needed
4. **Mobile-first responsive tokens**: Define base, override at breakpoints
5. **Accessibility is built into tokens**: Focus rings, color contrast baked in

This architecture scales from small projects to enterprise design systems while maintaining consistency and flexibility.
