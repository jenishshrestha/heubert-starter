# Feature-Driven Architecture (AGENTS)

**Version 2.0.0**
**February 2026**

> **Note:** This document is optimized for AI agents to follow when maintaining or generating code in the projects codebase.

---

## Abstract

This architecture implements a hybrid approach between DDD (Domain-Driven) and FDD (Feature-Driven). It prioritizes **Co-location** and **Encapsulation** to prevent "spaghetti code" as the project grows.

---

## 1. Directory Structure

### 1.1 `src/features/` (The Core)

The primary unit of organization. Each subdirectory represents a business domain or unique user outcome.

**Internal Structure:**

- `api/`: Server-side interaction (Fetchers, Actions, Services).
- `components/`: UI components used _only_ within this feature.
- `hooks/`: Business logic hooks for this specific domain.
- `types/`: Domain-specific TypeScript interfaces.
- `index.ts`: The **Public API**.

**Rules:**

- **Encapsulation**: Files inside a feature should not be aware of internals of other features.
- **Index Exports**: Only export what is necessary for external use in `index.ts`.
- **Tests**: Co-locate test files (`.test.ts`) next to the code they verify.

### 1.2 `src/shared/`

Code used by multiple features, organized into sub-directories:

- `components/ui/`: Primitive UI components (Button, Input, Avatar — no business logic).
- `components/layouts/`: Layout wrappers (Header, Footer, AppSidebar, AppLayout).
- `components/providers/`: Global context providers (SessionProvider, ThemeProvider).
- `components/`: Shared composed atoms used by 3+ features (UserInfo, LogoutMenuItem).
- `hooks/`: Utility hooks (`useMediaQuery`, `useDebounce`).
- `lib/`: Third-party SDK initializations.
- `types/`: Global/Common types.

---

## 2. Import & Dependency Rules

### 2.1 The Public API Boundary

Agents **MUST NOT** import from the internals of a feature. All inter-feature communication passes through the target feature's `index.ts`.

**Incorrect:**

```typescript
import { useLogin } from '@/features/auth/hooks/useLogin';
import { formatAuthDate } from '@/features/auth/lib/format-date';
```

**Correct:**

```typescript
import { useLogin, formatAuthDate } from '@/features/auth';
```

### 2.2 Intra-Feature Relative Imports

When importing files that belong to the _same_ feature, you MUST use explicit **relative paths**. NEVER use absolute aliases (e.g., `@/features/auth/...`) for internal feature imports, as this breaks relocatability.

**Incorrect:**

```typescript
import { Button } from '@/features/auth/components/button';
```

**Correct:**

```typescript
import { Button } from '../components/button';
```

### 2.3 Shared Promotion

If a component in `@/features/chat` is suddenly needed in `@/features/support`, move that component to `@/shared/components` instead of allowing a cross-feature import. Only promote after usage in **3+ features**.

### 2.3 Server vs Client Boundary

Default to **Server Components**. Only add `'use client'` to the smallest leaf component that actually needs interactivity. Feature `page.tsx` files should remain Server Components.

---

## 3. Implementation Checklist for Agents

1.  **Identity**: Determine if the new code belongs to a specific feature or is shared.
2.  **Scaffold**: If a new feature, create the 5-folder structure + `index.ts`.
3.  **Boundary**: Default to Server Component. Only add `'use client'` if hooks/interactivity required.
4.  **Export**: Ensure all public-facing components/hooks/services are in `index.ts`.
5.  **Validate**: Check `tsconfig.json` path aliases for correct mapping.
6.  **Test**: Co-locate test files next to their source files.
