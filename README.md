# 🚀 Heubert Starter

**The React + AI Stack for 2026** - A feature-driven monorepo starter for building modern web applications.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-orange.svg)

## 📋 Overview

Heubert Starter is a production-ready monorepo template that combines the best modern tools and practices for building scalable React applications. Built with TypeScript, TanStack, and AI capabilities, it follows a feature-driven architecture for maximum maintainability and scalability.

## ✨ Features

### Core Stack
- ⚡ **Vite** - Lightning-fast development and optimized builds
- ⚛️ **React 18** - Latest React with concurrent features
- 📘 **TypeScript** - Full type safety across the stack
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎭 **shadcn/ui** - Beautiful, accessible components

### State & Data Management
- 🔄 **TanStack Query** - Powerful data synchronization
- 🗂️ **Zustand** - Simple, fast state management
- 📝 **React Hook Form** - Performant, flexible forms
- ✅ **Zod** - TypeScript-first schema validation

### Routing & Navigation
- 🛣️ **TanStack Router** - Type-safe routing with file-based conventions
- 🔍 **TanStack Router DevTools** - Debug your routes

### UI & Animation
- 🎬 **Motion (Framer Motion)** - Powerful animations
- 📊 **TanStack Table** - Headless UI for data tables
- 🎨 **Radix UI** - Unstyled, accessible components

### AI Integration
- 🤖 **Vercel AI SDK** - Build AI-powered features

### Testing
- 🧪 **Vitest** - Fast unit testing
- 🎭 **React Testing Library** - User-centric testing
- 🎪 **Playwright** - End-to-end testing

### Developer Experience
- 📦 **Turborepo** - High-performance build system
- 🏗️ **pnpm Workspaces** - Efficient monorepo management
- 🎨 **Biome** - Fast linting and formatting
- 📚 **Storybook** - Component development
- 🐶 **Husky** - Git hooks for quality control

## 📁 Project Structure

```
heubert-starter/
├── apps/
│   └── crm/                    # React Vite CRM application
│       ├── src/
│       │   ├── features/       # Feature modules (Feature-Driven Design)
│       │   │   ├── home/
│       │   │   └── auth/
│       │   ├── components/     # Shared components
│       │   ├── lib/           # Utilities and configurations
│       │   │   ├── api/       # API client setup
│       │   │   └── query/     # React Query setup
│       │   ├── hooks/         # Custom hooks
│       │   ├── stores/        # Zustand stores
│       │   └── routes/        # TanStack Router routes
│       ├── e2e/               # Playwright tests
│       └── .storybook/        # Storybook configuration
├── packages/
│   ├── ui/                    # Shared UI components (shadcn/ui)
│   ├── types/                 # Shared TypeScript types
│   ├── config/                # Shared configuration
│   └── utils/                 # Shared utilities
└── tooling/
    ├── typescript/            # TypeScript configurations
    ├── tailwind/              # Tailwind configuration
    └── biome/                 # Biome configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/heubert-starter.git
cd heubert-starter
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

### Root Level
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm type-check` - Type check all packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all code
- `pnpm test` - Run all tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm storybook` - Start Storybook
- `pnpm clean` - Clean all build artifacts

### CRM App (apps/crm)
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run unit tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:e2e` - Run E2E tests
- `pnpm test:e2e:ui` - Run E2E tests with UI
- `pnpm storybook` - Start Storybook

## 🏗️ Feature-Driven Architecture

This project follows a **Feature-Driven Design** pattern where code is organized by features rather than technical layers:

```typescript
// ✅ Good - Feature-driven
features/
├── home/
│   ├── HomePage.tsx
│   ├── components/
│   ├── hooks/
│   └── api/
└── auth/
    ├── LoginPage.tsx
    ├── components/
    ├── hooks/
    └── api/

// ❌ Avoid - Technical layer approach
components/
hooks/
pages/
api/
```

### Creating a New Feature

1. Create a new directory in `src/features/`
2. Add your feature components, hooks, and API calls
3. Export the main component from the feature
4. Create a route in `src/routes/`

Example:
```bash
src/features/
└── contacts/
    ├── ContactsPage.tsx          # Main page component
    ├── components/
    │   ├── ContactsList.tsx
    │   ├── ContactForm.tsx
    │   └── ContactCard.tsx
    ├── hooks/
    │   ├── useContacts.ts
    │   └── useContactMutations.ts
    ├── api/
    │   └── contacts.api.ts
    └── types.ts
```

## 🎨 Working with UI Components

This project uses shadcn/ui components from the `@heubert/ui` package:

```tsx
import { Button, Card, Input } from "@heubert/ui";

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## 🔄 Data Fetching with TanStack Query

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@lib/api/client";
import { queryKeys } from "@lib/query/client";

function MyFeature() {
  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => apiRequest("get", "/users"),
  });

  // Mutate data
  const mutation = useMutation({
    mutationFn: (newUser) => apiRequest("post", "/users", newUser),
  });

  return <div>{/* Your UI */}</div>;
}
```

## 🗂️ State Management with Zustand

```tsx
import { create } from "zustand";

interface MyStore {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 🛣️ Routing with TanStack Router

Routes are file-based in `src/routes/`:

```
routes/
├── __root.tsx              # Root layout
├── index.tsx               # / route
├── about.tsx               # /about route
└── contacts/
    ├── index.tsx           # /contacts route
    └── $id.tsx             # /contacts/:id route
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
pnpm test
pnpm test:ui  # With UI
```

### E2E Tests (Playwright)
```bash
pnpm test:e2e
pnpm test:e2e:ui  # With UI
```

## 📚 Storybook

Start Storybook for component development:
```bash
pnpm storybook
```

Create stories in `*.stories.tsx` files:
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "Features/MyComponent",
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props
  },
};
```

## 🔧 Configuration

### TypeScript
TypeScript configurations are shared via `@heubert/tsconfig`:
- `base.json` - Base configuration
- `react.json` - React-specific
- `vite.json` - Vite apps

### Tailwind CSS
Tailwind configuration is shared via `@heubert/tailwind-config`

### Biome
Linting and formatting rules are in `biome.json`

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Run tests: `pnpm test`
4. Commit with descriptive messages
5. Push and create a pull request

## 📝 License

MIT

## 🙏 Acknowledgments

Built with amazing open-source tools:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack](https://tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

---

**Happy coding! 🚀**
# heubert-starter
