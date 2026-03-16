---
title: Public API Boundary
impact: HIGH
impactDescription: Prevents circular dependencies, tight coupling, and modular decay.
tags: architecture, encapsulation, fdd
---

## Public API Boundary

Every feature MUST have an `index.ts` file that acts as its sole public entry point. All inter-feature communication must pass through this file. Never import directly from a feature's internal directories.

**Incorrect (Leaking internals):**

```typescript
// Importing from deep inside another feature
import { InternalHelper } from '@/features/auth/lib/internal-helper';
import { formatAuthDate } from '@/features/auth/lib/format-date';
```

**Correct (Public API):**

```typescript
// src/features/auth/index.ts — the single entry point
export { useAuth } from './hooks/use-auth';
export { formatAuthDate } from './lib/format-date';

// src/features/profile/page.tsx — consuming feature
import { useAuth, formatAuthDate } from '@/features/auth';
```

### Why This Matters

- **Encapsulation**: Internal refactors don't break consumers.
- **Discoverability**: `index.ts` documents what a feature offers.
- **Circular deps**: Forces features to think about their public surface area.

See also: `locality-co-location`, `shared-global-move`.
