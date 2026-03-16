---
title: Promoting to Shared
impact: MEDIUM
impactDescription: Prevents premature abstraction and keeps feature code focused.
tags: abstraction, shared, infrastructure
---

## Promoting to Shared

Do not move feature code to `src/shared` prematurely. Only promote a component or utility to the shared layer if it is used by at least **three** different features. This prevents "Shared Bloat" and keeps domain logic encapsulated.

**The "Rule of Three":**

1. **1 Feature**: Keep it inside `src/features/[feature-name]/components`.
2. **2 Features**: Keep it in the feature where it was first created, and export it. Or duplicate it if the logic is simple enough but likely to diverge.
3. **3+ Features**: Move it to `src/shared/components`.

**Incorrect (Moving too early):**

```typescript
// Component only used in 'auth' and 'profile', but placed in shared
src / shared / components / custom - avatar.tsx;
```

**Correct (Keeping it local/domain-specific):**

```typescript
// Keeping it local to its primary domain
src / features / auth / components / custom - avatar.tsx;
```

See also: `locality-co-location`, `api-boundary`.
