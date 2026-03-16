---
title: Named Imports Only
impact: MEDIUM
impactDescription: Reduces bundle size, improves tree-shaking, and makes dependencies explicit.
tags: imports, consistency, performance
---

## Named Imports Only

Always use **named imports** instead of namespace imports (`import * as`). This makes dependencies explicit, improves tree-shaking, and keeps code scannable.

**Incorrect (namespace import):**

```typescript
import * as React from 'react';

const context = React.createContext<Value>(defaultValue);
const [state, setState] = React.useState(false);
```

**Correct (named imports):**

```typescript
import { createContext, useState } from 'react';

const context = createContext<Value>(defaultValue);
const [state, setState] = useState(false);
```

### For types, use `import type`:

```typescript
import { useState, type ReactNode } from 'react';
```

### Exception

The only acceptable use of `import *` is for re-exporting an entire module in an `index.ts` barrel file:

```typescript
// src/features/auth/index.ts — acceptable
export * from './hooks/use-auth';
```
