---
title: Nesting Depth
impact: MEDIUM
impactDescription: Prevents complex directory traversal and mental fatigue.
tags: organization, consistency, fdd
---

## Nesting Depth

Limit feature nesting to a maximum of 3 levels. If a feature becomes too complex, break it into smaller sub-features or promote shared logic.

**Incorrect (Deeply nested):**

```
src/features/dashboard/user/profile/settings/security/hooks/use-mfa.ts
```

**Correct (Flattened structure):**

```
src/features/dashboard/hooks/use-dashboard.ts
src/features/user-settings/hooks/use-mfa.ts
```
