# 🏗️ Architecture Documentation

## Overview

Heubert Starter is built as a **pnpm monorepo** using **Turborepo** for efficient build orchestration. The architecture follows **Feature-Driven Design (FDD)** principles for maximum scalability and maintainability.

## Monorepo Structure

```
heubert-starter/
├── apps/                   # Applications
│   └── crm/               # React Vite CRM app
├── packages/              # Shared packages
│   ├── ui/               # UI component library
│   ├── types/            # Shared TypeScript types
│   ├── config/           # Application configuration
│   └── utils/            # Utility functions
└── tooling/              # Development tooling
    ├── typescript/       # TS configurations
    ├── tailwind/        # Tailwind presets
    └── biome/           # Linting config
```

## Design Principles

### 1. Feature-Driven Design (FDD)

Code is organized by **features** rather than technical layers:

```typescript
// ✅ Good - Feature-driven
features/
├── contacts/
│   ├── ContactsPage.tsx       # Main page
│   ├── components/            # Feature components
│   ├── hooks/                 # Feature hooks
│   ├── api/                   # Feature API calls
│   └── types.ts              # Feature types

// ❌ Avoid - Technical layer approach
components/
pages/
hooks/
api/
```

**Benefits**:
- Easy to locate all code related to a feature
- Simple to add/remove features
- Better code organization for large teams
- Reduced coupling between features

### 2. Colocation

Keep related code close together:
- Components near their features
- Tests near the code they test
- Types near where they're used
- API calls within features

### 3. Type Safety

End-to-end type safety using:
- TypeScript strict mode
- Zod for runtime validation
- Shared types package
- TanStack Router for type-safe routing

### 4. Separation of Concerns

- **UI Package**: Reusable, stateless components
- **Features**: Business logic and feature-specific code
- **Lib**: Infrastructure and utilities
- **Stores**: Global state management

## Tech Stack Deep Dive

### Frontend Core

#### React 18
- **Why**: Industry standard, excellent ecosystem
- **Usage**: UI rendering with concurrent features
- **Location**: All components in `src/`

#### TypeScript
- **Why**: Type safety, better DX, refactoring confidence
- **Usage**: Strict mode enabled across the board
- **Config**: Shared via `@heubert/tsconfig`

#### Vite
- **Why**: Lightning-fast HMR, optimized builds
- **Usage**: Development server and production builds
- **Config**: `apps/crm/vite.config.ts`

### Styling

#### Tailwind CSS
- **Why**: Utility-first, fast development, small bundles
- **Usage**: All styling via utility classes
- **Config**: Shared theme in `tooling/tailwind`
- **Theme**: CSS variables for easy theming

#### shadcn/ui
- **Why**: Accessible, customizable, owns the code
- **Usage**: Base UI components in `packages/ui`
- **Pattern**: Copy components, modify as needed

### State Management

#### TanStack Query (React Query)
- **When**: Server state, API data
- **Why**: Caching, background updates, optimistic UI
- **Setup**: `src/lib/query/client.ts`
- **Pattern**:
```typescript
const { data } = useQuery({
  queryKey: queryKeys.users.all,
  queryFn: fetchUsers,
});
```

#### Zustand
- **When**: Global UI state, user preferences
- **Why**: Simple API, small bundle, devtools
- **Setup**: `src/stores/`
- **Pattern**:
```typescript
const useStore = create((set) => ({
  value: 0,
  increment: () => set((s) => ({ value: s.value + 1 })),
}));
```

#### React Hook Form
- **When**: Form state
- **Why**: Performance, validation, UX
- **Integration**: Zod schemas for validation

### Routing

#### TanStack Router
- **Why**: Type-safe, file-based, modern
- **Setup**: File-based routes in `src/routes/`
- **Pattern**:
```typescript
// src/routes/users/$id.tsx
export const Route = createFileRoute("/users/$id")({
  component: UserDetail,
});
```

### Data Fetching

#### Axios
- **Why**: Interceptors, better API than fetch
- **Setup**: `src/lib/api/client.ts`
- **Pattern**:
```typescript
// Interceptors for auth, error handling
apiClient.interceptors.request.use(addAuthToken);
apiClient.interceptors.response.use(handleError);
```

### Animation

#### Motion (Framer Motion)
- **Why**: Powerful, declarative animations
- **Usage**: Page transitions, micro-interactions
- **Pattern**:
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

### Tables

#### TanStack Table
- **Why**: Headless, powerful, flexible
- **Usage**: Data tables with sorting/filtering
- **Pattern**: Headless UI pattern

### AI Integration

#### Vercel AI SDK
- **Why**: Stream responses, multiple providers
- **Usage**: Chat interfaces, AI features
- **Setup**: Configure API keys in `.env`

### Testing

#### Vitest
- **Why**: Vite-native, fast, Jest-compatible
- **Usage**: Unit and integration tests
- **Run**: `pnpm test`

#### React Testing Library
- **Why**: User-centric testing
- **Usage**: Component testing
- **Pattern**: Test behavior, not implementation

#### Playwright
- **Why**: Cross-browser E2E testing
- **Usage**: End-to-end tests
- **Location**: `e2e/`

### Developer Experience

#### Biome
- **Why**: Fast linter + formatter (replaces ESLint + Prettier)
- **Usage**: Automatic formatting, linting
- **Config**: `biome.json`

#### Storybook
- **Why**: Component development in isolation
- **Usage**: Develop and document components
- **Run**: `pnpm storybook`

#### Turborepo
- **Why**: Fast, incremental builds
- **Usage**: Orchestrate monorepo builds
- **Config**: `turbo.json`

#### Husky
- **Why**: Git hooks for quality control
- **Usage**: Pre-commit linting, testing
- **Setup**: `.husky/`

## Data Flow

### API Request Flow

```
User Action
    ↓
Component
    ↓
TanStack Query (useQuery/useMutation)
    ↓
API Client (Axios)
    ↓
Request Interceptor (add auth token)
    ↓
NestJS Backend
    ↓
Response Interceptor (handle errors)
    ↓
TanStack Query (cache update)
    ↓
Component Re-render
```

### State Management Flow

```
Local UI State → useState
    ↓
Form State → React Hook Form
    ↓
Global UI State → Zustand
    ↓
Server State → TanStack Query
```

## Build Process

### Development
```bash
pnpm dev
    ↓
Turborepo orchestrates
    ↓
Vite dev server starts
    ↓
HMR enabled
    ↓
DevTools available
```

### Production
```bash
pnpm build
    ↓
Turborepo builds packages in order
    ↓
TypeScript type checking
    ↓
Vite production build
    ↓
Output in dist/
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useUser.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Stores**: camelCase with "Store" suffix (e.g., `userStore.ts`)
- **API**: camelCase with ".api" (e.g., `users.api.ts`)

## Import Aliases

```typescript
"@/*"          → "./src/*"
"@features/*"  → "./src/features/*"
"@components/*" → "./src/components/*"
"@lib/*"       → "./src/lib/*"
"@hooks/*"     → "./src/hooks/*"
"@stores/*"    → "./src/stores/*"
```

## Environment Variables

```bash
VITE_API_URL              # Backend API URL
VITE_OPENAI_API_KEY       # OpenAI API key
VITE_ENABLE_AI            # Feature flag for AI
VITE_ENABLE_ANALYTICS     # Feature flag for analytics
```

## Future Roadmap

### Phase 2 (Next.js Website)
- Marketing website
- Blog
- Documentation site
- SEO optimization

### Phase 3 (React Native Mobile)
- Mobile CRM app
- Expo integration
- Shared UI components
- Offline support

## Best Practices

### Component Structure
```typescript
// 1. Imports (external first, then internal)
import { useState } from "react";
import { Button } from "@heubert/ui";

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState(0);

  // 5. Event handlers
  const handleClick = () => {};

  // 6. JSX
  return <div>{title}</div>;
}
```

### Feature Structure
```
feature-name/
├── FeaturePage.tsx           # Main page
├── components/
│   ├── FeatureList.tsx
│   ├── FeatureCard.tsx
│   └── FeatureForm.tsx
├── hooks/
│   ├── useFeature.ts
│   └── useFeatureMutations.ts
├── api/
│   └── feature.api.ts
├── types.ts
└── README.md                 # Feature documentation
```

### Testing Strategy
- **Unit Tests**: Pure functions, utilities
- **Component Tests**: User interactions
- **Integration Tests**: Feature workflows
- **E2E Tests**: Critical user journeys

## Performance Considerations

- **Code Splitting**: Route-based chunking
- **Lazy Loading**: Dynamic imports for routes
- **Caching**: TanStack Query cache management
- **Memoization**: React.memo, useMemo, useCallback
- **Bundle Size**: Tree shaking with Vite
- **Images**: Lazy loading, responsive images

## Security

- **Environment Variables**: Never commit secrets
- **API Security**: Token-based auth
- **XSS Prevention**: React's built-in escaping
- **CSRF**: Tokens in API calls
- **Dependencies**: Regular security audits

## Monitoring & Debugging

- **React DevTools**: Component inspection
- **TanStack Query DevTools**: Query debugging
- **TanStack Router DevTools**: Route debugging
- **Zustand DevTools**: State inspection
- **Network Tab**: API debugging

---

This architecture is designed to scale from a small team to enterprise-level applications while maintaining developer productivity and code quality.
