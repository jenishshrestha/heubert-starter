---
name: FDD-architecture
description: Feature-Driven Development architecture standards for React + Vite applications. Use this skill when organizing features, structuring components, setting up imports, or designing the folder architecture for React apps. Ensures code locality, encapsulation, and modular scalability. Apply these patterns when the user asks about project structure, feature organization, component placement, or when they're building new features.
---

# Feature-Driven Architecture (FDD) for React + Vite

Comprehensive architectural standards for organizing modern React applications with Vite. These patterns ensure modularity, scalability, and predictable navigation through feature-driven design.

## Core Principles

Feature-Driven Development (FDD) organizes code by **business capability** rather than technical type. Each feature is a self-contained module with its own components, hooks, types, and tests.

### Why FDD?

- ✅ **Locality**: Everything related to a feature lives together
- ✅ **Separation of Concerns**: Business logic, UI, data fetching, and state management are cleanly separated
- ✅ **Scalability**: Add features without reorganizing the entire codebase
- ✅ **Encapsulation**: Features expose public APIs, hide internals
- ✅ **Predictability**: Consistent structure across all features
- ✅ **Team Autonomy**: Teams can own entire features independently

## Project Structure

```
src/
├── features/           # Feature modules (business capabilities)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types/
│   │   ├── index.ts   # Public API
│   │   └── auth.test.tsx
│   └── dashboard/
│       └── ...
├── shared/            # Shared infrastructure (3+ feature rule)
│   ├── components/
│   │   ├── ui/        # Primitive components
│   │   ├── layouts/   # Layout wrappers
│   │   └── providers/ # Global providers
│   ├── hooks/
│   ├── lib/
│   └── types/
└── app/               # App entry and routing
    ├── routes/
    └── main.tsx
```

## Rule Categories by Priority

| Priority | Category | Impact | Files |
|----------|----------|--------|-------|
| 1 | Feature Locality | CRITICAL | `locality-*.md` |
| 2 | Public API | HIGH | `api-boundary.md` |
| 3 | Import Conventions | HIGH | `intra-feature-imports.md` |
| 4 | Naming & Consistency | MEDIUM | `naming-*.md` |
| 5 | Shared Infrastructure | MEDIUM | `shared-*.md` |

## Quick Reference

### 1. Feature Locality (CRITICAL)

**Keep all feature code together**

```typescript
// ✅ CORRECT - Everything in the feature folder
src/features/user-profile/
├── components/
│   ├── profile-card.tsx
│   └── avatar-upload.tsx
├── hooks/
│   └── use-profile.ts
├── lib/
│   └── format-name.ts
├── types/
│   └── profile.ts
├── index.ts           # Public API exports
└── user-profile.test.tsx
```

**Rules:**
- All feature code (components, hooks, types, tests) lives inside `src/features/[feature-name]/`
- Limit nesting to **3 levels maximum**
- Use relative imports within the same feature

### 2. Public API Boundary (HIGH)

**Every feature MUST export through `index.ts`**

```typescript
// src/features/auth/index.ts
export { LoginForm } from './components/login-form';
export { useAuth } from './hooks/use-auth';
export type { AuthUser, AuthState } from './types';

// ❌ WRONG - Importing from internals
import { LoginButton } from '@/features/auth/components/login-button';

// ✅ CORRECT - Importing from public API
import { LoginButton } from '@/features/auth';
```

### 3. Import Conventions (HIGH)

**Within a feature: Use relative paths**

```typescript
// Inside src/features/auth/components/login-form.tsx

// ❌ WRONG - Using alias for same feature
import { useAuth } from '@/features/auth/hooks/use-auth';

// ✅ CORRECT - Relative path
import { useAuth } from '../hooks/use-auth';
```

**Between features: Use aliases through public API**

```typescript
// Inside src/features/dashboard/components/header.tsx

// ✅ CORRECT - Importing from another feature's public API
import { useAuth } from '@/features/auth';
```

### 4. Naming Conventions (MEDIUM)

**Use kebab-case for files and folders**

```
// ❌ WRONG
src/features/UserProfile/ProfileCard.tsx
src/hooks/useData.ts

// ✅ CORRECT
src/features/user-profile/profile-card.tsx
src/hooks/use-data.ts
```

**Use named imports, never namespace imports**

```typescript
// ❌ WRONG
import * as React from 'react';
const [state, setState] = React.useState(0);

// ✅ CORRECT
import { useState } from 'react';
const [state, setState] = useState(0);
```

**Use `import type` for types**

```typescript
// ✅ CORRECT - Explicit type imports
import type { User } from './types';
import { fetchUser } from './api';
```

### 5. Shared Infrastructure (MEDIUM)

**Rule of Three: Only promote after 3+ features use it**

```typescript
// 1 feature → Keep in feature folder
// 2 features → Keep in original, or duplicate if logic might diverge
// 3+ features → Move to src/shared/

// Organize shared by purpose:
src/shared/
├── components/
│   ├── ui/              # Button, Input, Card
│   ├── layouts/         # Header, Footer, Sidebar
│   └── providers/       # ThemeProvider, AuthProvider
├── hooks/               # useLocalStorage, useDebounce
└── lib/                 # formatDate, api client
```

### 6. Hook Extraction Pattern

**Extract business logic from components**

```typescript
// ❌ WRONG - Logic mixed with UI
function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return <div>{user?.name}</div>;
}

// ✅ CORRECT - Logic extracted to hook
function ProfileCard() {
  const { user, loading } = useUserProfile();
  return <div>{user?.name}</div>;
}

// src/features/profile/hooks/use-user-profile.ts
export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
```

**When to extract:**
- Component has 5+ lines of non-rendering logic
- Logic could be reused by another component
- You need to test logic independently

## React + Vite Specific Patterns

### Vite Path Aliases

Configure in `vite.config.ts`:

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
```

### Feature-Based Code Splitting

Use dynamic imports for route-level features:

```typescript
// app/routes.tsx
import { createRoute } from '@tanstack/react-router';

const dashboardRoute = createRoute({
  path: '/dashboard',
  component: () => import('@/features/dashboard').then(m => m.DashboardPage),
});
```

### Feature Testing

Keep tests co-located with features:

```typescript
// src/features/auth/auth.test.tsx
import { describe, it, expect } from 'vitest';
import { LoginForm } from './components/login-form';
import { useAuth } from './hooks/use-auth';

describe('Auth Feature', () => {
  it('should handle login', () => {
    // Test logic here
  });
});
```

## Detailed Rules

For in-depth explanations and examples, see the `rules/` directory:

- `locality-co-location.md` - Feature co-location principles
- `locality-depth.md` - Nesting depth limits
- `intra-feature-imports.md` - Relative vs absolute imports
- `api-boundary.md` - Public API through index.ts
- `naming-consistency.md` - Kebab-case conventions
- `named-imports.md` - Named vs namespace imports
- `shared-global-move.md` - When to promote to shared
- `shared-component-organization.md` - Organizing shared layer
- `hook-extraction.md` - Extracting business logic

## Common Patterns

### Creating a New Feature

1. Create feature directory: `src/features/my-feature/`
2. Add subdirectories: `components/`, `hooks/`, `lib/`, `types/`
3. Create `index.ts` for public exports
4. Use relative imports within the feature
5. Export only what other features need

### Moving to Shared

1. Confirm 3+ features use it
2. Move to appropriate `src/shared/` subdirectory
3. Update imports across all features
4. Remove from feature folders

### Refactoring Deep Nesting

```
// ❌ Too deep (4+ levels)
features/dashboard/analytics/reports/charts/bar-chart.tsx

// ✅ Flatten or split
features/dashboard/components/analytics-chart.tsx
// OR create new feature
features/analytics-reports/components/bar-chart.tsx
```

## Anti-Patterns to Avoid

❌ **Importing from feature internals**
```typescript
import { helper } from '@/features/auth/lib/helper';
```

❌ **Circular dependencies between features**
```typescript
// features/auth uses features/user
// features/user uses features/auth
// → Extract shared logic to src/shared/
```

❌ **Premature abstraction**
```typescript
// Moving to shared after only 1 feature uses it
```

❌ **Deep nesting**
```typescript
features/a/b/c/d/e/component.tsx  // Too deep!
```

❌ **Mixed concerns in one feature**
```typescript
features/user-auth-profile-settings/  // Split into separate features
```

## Migration Guide

### From flat structure to FDD:

1. **Identify business capabilities** (features)
2. **Group related files** into feature folders
3. **Create index.ts** for each feature
4. **Update imports** to use public APIs
5. **Move truly shared code** to `src/shared/`
6. **Update aliases** in vite.config.ts

### From Next.js to Vite:

1. **Remove Server Component markers** (`'use client'`, `'use server'`)
2. **Update imports** (no more `next/*` imports)
3. **Replace Next.js routing** with TanStack Router
4. **Move data fetching** to React Query/TanStack Query
5. **Keep FDD structure** (it's framework-agnostic!)

## Tool Configuration

### TypeScript paths (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### ESLint rules

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["@/features/*/components/*", "@/features/*/hooks/*"],
            "message": "Import from feature's public API (index.ts) only"
          }
        ]
      }
    ]
  }
}
```

## Summary

Feature-Driven Development keeps your React + Vite app organized, scalable, and maintainable. Follow these principles:

1. ✅ **Co-locate** everything related to a feature
2. ✅ **Expose public APIs** through index.ts
3. ✅ **Use relative imports** within features
4. ✅ **Limit nesting** to 3 levels max
5. ✅ **Promote to shared** only after 3+ features use it
6. ✅ **Extract hooks** for business logic
7. ✅ **Use kebab-case** for all files
8. ✅ **Use named imports** always

These patterns work with any React setup - Vite, CRA, or custom builds. The principles are framework-agnostic and scale from small apps to large enterprise codebases.
