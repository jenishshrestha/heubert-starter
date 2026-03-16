---
title: Feature Co-location
impact: CRITICAL
impactDescription: Eliminates directory searching and reduces mental overhead.
tags: architecture, organization, fdd
---

## Feature Co-location

Keep all feature-specific code (components, hooks, styles, **tests**) inside the feature's directory. Treat every feature as a self-contained "mini-app."

**Incorrect (Scattered files):**

```
src/
  components/
    FeedbackList.tsx
  hooks/
    useFeedback.ts
  tests/
    feedback-actions.test.ts   ← don't use a global tests/ folder
  features/
    feedback/
      page.tsx
```

**Correct (Co-located, including tests):**

```
src/
  features/
    feedback/
      components/
        feedback-list.tsx
      hooks/
        use-feedback.ts
      actions.ts
      actions.test.ts          ← test lives next to the code it verifies
      page.tsx
```

See also: `server-client-boundary`, `api-boundary`.
