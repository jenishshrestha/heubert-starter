---
title: Shared Component Organization
impact: MEDIUM
impactDescription: Ensures predictable navigation and clear separation of concerns within the shared layer.
tags: shared, components, organization, structure
---

## Shared Component Organization

The `src/shared/components/` directory should be organized into clear sub-categories. Avoid dumping all shared components as flat files in the root of the directory.

### Directory Structure

```
src/shared/components/
├── ui/           # Primitive UI components (Button, Input, Avatar, etc.)
├── layouts/      # Layout wrappers (Header, Footer, Sidebar, AppLayout)
├── providers/    # Global context providers (SessionProvider, ThemeProvider)
├── form/         # Reusable form components (Form, Field, FieldGroup)
├── data-table/   # Reusable data table components
├── logo.tsx      # Truly shared atoms (used across 3+ features)
└── theme-toggle.tsx
```

### Rules

1. **`ui/`**: Only primitive, unstyled or design-system components (e.g., Shadcn/Radix primitives). These have **zero business logic**.

2. **`layouts/`**: Components that define the structural shell of a page or route group. Examples: `header.tsx`, `footer.tsx`, `app-sidebar.tsx`, `app-layout.tsx`.

3. **`providers/`**: React Context providers that wrap the app or a subtree. Examples: `session-provider.tsx`, `theme-provider.tsx`. These are infrastructure, not UI.

4. **Feature-specific composed components**: Components that combine primitives with business logic (e.g., `user-account-nav.tsx`) should live in their **owning feature** (`src/features/auth/components/`), not in `shared/`. They can be exported via the feature's `index.ts`.

5. **Shared composed components**: Components like `user-info.tsx` or `logout-menu-item.tsx` that are used across **2+ unrelated features** may live as flat files in `shared/components/`. If they grow into a group, create a sub-directory.

### Decision Tree

```
Is it a primitive UI element (no business logic)?
  → ui/

Is it a layout shell (header, sidebar, footer)?
  → layouts/

Is it a React Context provider?
  → providers/

Is it used by only 1-2 features?
  → Keep in the owning feature (src/features/<name>/components/)

Is it used by 3+ features?
  → shared/components/ (flat file or sub-directory)
```

**Incorrect (Flat dumping):**

```
src/shared/components/
├── header.tsx
├── footer.tsx
├── session-provider.tsx
├── theme-provider.tsx
├── user-account-nav.tsx    ← auth-specific, shouldn't be here
├── user-info.tsx
└── logout-menu-item.tsx
```

**Correct (Organized):**

```
src/shared/components/
├── ui/
├── layouts/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── app-sidebar.tsx
│   └── app-layout.tsx
├── providers/
│   ├── session-provider.tsx
│   └── theme-provider.tsx
├── user-info.tsx           ← shared atom (used in header + sidebar)
└── logout-menu-item.tsx    ← shared atom (used in header + sidebar)
```
