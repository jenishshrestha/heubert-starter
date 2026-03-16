---
title: Kebab-Case Naming
impact: MEDIUM
impactDescription: Ensures consistency across different OS and git environments.
tags: naming, consistency, kebab-case
---

## Kebab-Case Naming

Use **kebab-case** for all file and directory names. PascalCase is strictly reserved for the React component definition name inside the file.

**Incorrect (PascalCase or camelCase files):**

```
src/features/AuthBoard/UserCard.tsx
src/hooks/useData.ts
```

**Correct (kebab-case):**

```
src/features/auth-board/user-card.tsx
src/hooks/use-data.ts
```
