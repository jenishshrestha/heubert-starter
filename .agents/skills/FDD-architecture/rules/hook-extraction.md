---
title: Hook Extraction Pattern
impact: MEDIUM
impactDescription: Separates business logic from UI, improving testability and reusability.
tags: architecture, hooks, fdd, separation-of-concerns
---

## Hook Extraction Pattern

If a component contains more than trivial business logic (state management, data fetching, form handling, side effects), extract that logic into a custom hook within the feature's `hooks/` directory.

### When to Extract

- Component has **5+ lines** of non-rendering logic (state, effects, callbacks).
- Logic could be **reused** by another component within the same feature.
- You need to **test** the logic independently of the UI.

**Incorrect (Logic mixed with UI):**

```tsx
// src/features/auth/components/login-form.tsx
'use client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.email({ email, password });
      router.push('/dashboard');
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return <form>...</form>;
}
```

**Correct (Logic in hook, UI in component):**

```tsx
// src/features/auth/hooks/use-login.ts
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authClient.signIn.email({ email, password });
      router.push('/dashboard');
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, error };
}

// src/features/auth/components/login-form.tsx
('use client');
import { useLogin } from '../hooks/use-login';

export function LoginForm() {
  const { onSubmit, isLoading, error } = useLogin();
  return <form>...</form>;
}
```

### Benefits

- **Testability**: Test `useLogin` independently without rendering JSX.
- **Reusability**: Another component in the same feature can reuse the hook.
- **Readability**: Components stay focused on rendering, hooks on behavior.

See also: `locality-co-location`, `server-client-boundary`.
