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
│   ├── crm/                    # Main CRM web application (React + Vite)
│   │   ├── src/
│   │   │   ├── features/       # Feature modules (Feature-Driven Design)
│   │   │   │   ├── home/
│   │   │   │   └── auth/
│   │   │   ├── components/     # Shared components
│   │   │   ├── lib/           # Utilities and configurations
│   │   │   │   ├── api/       # API client setup
│   │   │   │   └── query/     # React Query setup
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── stores/        # Zustand stores
│   │   │   └── routes/        # TanStack Router routes
│   │   └── e2e/               # Playwright E2E tests
│   ├── crm-mobile/            # Mobile application (planned)
│   ├── crm-website/           # Marketing website (planned)
│   └── storybook/             # Storybook workspace
│       └── stories/           # Component stories (46+ components)
├── packages/
│   ├── design-system/         # Shared UI components (shadcn/ui based)
│   ├── types/                 # Shared TypeScript types
│   ├── config/                # Shared configuration
│   ├── utils/                 # Shared utilities
│   └── typescript-config/     # Shared TypeScript configurations
└── tooling/
    ├── biome/                 # Biome linting configuration
    └── tailwind/              # Tailwind CSS configuration
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
- `pnpm lint` - Lint all packages with Biome
- `pnpm format` - Format all code with Biome
- `pnpm test` - Run all tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm storybook` - Start Storybook (port 6006)
- `pnpm clean` - Clean all build artifacts

### CRM App (apps/crm)
- `pnpm dev` - Start development server (port 5173)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:e2e` - Run E2E tests with Playwright
- `pnpm test:e2e:ui` - Run E2E tests with Playwright UI

### Storybook App (apps/storybook)
- `pnpm storybook` - Start Storybook development server
- `pnpm build` - Build Storybook for production

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

This project uses shadcn/ui components from the `@repo/design-system` package:

```tsx
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardHeader, CardContent } from "@repo/design-system/components/ui/card";
import { Input } from "@repo/design-system/components/ui/input";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>My Form</h2>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
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

This project includes **46+ pre-built component stories** from the design system, including:

- **Layout**: Accordion, Breadcrumb, Card, Carousel, Collapsible, Resizable, Separator, Sidebar, Tabs
- **Forms**: Button, Checkbox, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group
- **Data Display**: Avatar, Badge, Calendar, Chart, Progress, Skeleton, Table
- **Overlays**: Alert Dialog, Context Menu, Dialog, Drawer, Dropdown Menu, Hover Card, Menubar, Navigation Menu, Popover, Sheet, Tooltip
- **Feedback**: Alert, Sonner (Toast)
- **Utilities**: Aspect Ratio, Command, Form, Pagination, Scroll Area

### Creating New Stories

Create stories in `*.stories.tsx` files:
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Features/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // props
  },
};
```

All component stories are located in [apps/storybook/stories/](apps/storybook/stories/).

## 🔧 Configuration

### TypeScript
TypeScript configurations are shared via `@repo/typescript-config`:
- `base.json` - Base configuration
- `react-library.json` - React libraries
- `nextjs.json` - Next.js apps

### Tailwind CSS
Tailwind configuration is centralized in the `tooling/tailwind` package and extended by individual apps.

### Biome
Linting and formatting rules are configured in `tooling/biome/biome.json` and applied across all packages.

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

## 🎯 What Makes This Different?

### Feature-Driven Architecture
Unlike traditional layer-based architectures, this starter follows a **feature-driven approach** where all related code lives together. This makes it easier to:
- Find and modify features without jumping between folders
- Delete features by removing a single directory
- Scale your application without folder chaos
- Onboard new developers faster

### Pre-configured Storybook
Get started immediately with **46+ production-ready component stories** covering the entire shadcn/ui component library. No need to write basic stories yourself.

### Type-Safe Everything
From routing (TanStack Router) to forms (React Hook Form + Zod) to API calls, everything is fully typed with TypeScript.

### Monorepo Ready
Built with Turborepo and pnpm workspaces, making it easy to:
- Share code between multiple apps
- Add new apps (mobile, marketing site, etc.)
- Maintain consistent tooling across projects

---

**Happy coding! 🚀**
