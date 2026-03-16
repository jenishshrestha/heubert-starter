---
title: Intra-Feature Relative Imports
impact: CRITICAL
impactDescription: Ensures strict feature locality and relocatability.
tags: architecture, organization, fdd, imports
---

## Intra-Feature Relative Imports

When importing files that belong to the _same_ feature (i.e., inside `src/features/my-feature`), you MUST use explicit **relative paths** (e.g., `import { Button } from './components/button'`).

You MUST NEVER use absolute aliases (e.g., `@/features/my-feature/...`) to reference files internal to the feature.

**Incorrect (Tightly coupled to filesystem location):**

```typescript
// Inside src/features/auth/hooks/use-auth.ts
import { Button } from '@/features/auth/components/button';
import { AUTH_URL } from '@/features/auth/types';
```

**Correct (Decoupled and relocatable):**

```typescript
// Inside src/features/auth/hooks/use-auth.ts
import { Button } from '../components/button';
import { AUTH_URL } from '../types';
```

### Why This Matters

- **Relocatability**: A feature folder should be entirely self-contained. If you rename or move the `auth` feature directory, its internal relative imports will not break.
- **Locality First**: Relative imports mentally signify "this lives next to me," whereas absolute imports signify "this is a remote dependency."

See also: `locality-co-location`, `api-boundary`.
