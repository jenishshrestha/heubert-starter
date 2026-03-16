# 🚀 Quick Start Guide

Get up and running with Heubert Starter in minutes!

## Prerequisites

- Node.js >= 20
- pnpm >= 9 (install with `npm install -g pnpm`)

## Installation

```bash
# 1. Clone or download the project
cd heubert-starter

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the development server
pnpm dev
```

The CRM app will be available at `http://localhost:5173` 🎉

## What's Running?

- **React Vite App** on http://localhost:5173
- **TanStack Router DevTools** (bottom-right corner)
- **React Query DevTools** (bottom-left corner)

## First Steps

### 1. Explore the Homepage
The homepage demonstrates all the key features of the stack:
- TanStack Query (data fetching)
- Zustand (state management)
- TanStack Table (data tables)
- Vercel AI SDK (AI integration)
- Motion animations
- shadcn/ui components

### 2. Run Storybook
```bash
pnpm storybook
```
View and develop components in isolation at http://localhost:6006

### 3. Run Tests
```bash
# Unit tests
pnpm test

# E2E tests (make sure dev server is running)
pnpm test:e2e
```

### 4. Create Your First Feature

```bash
# Create a new feature directory
mkdir -p apps/crm/src/features/my-feature/components

# Create your feature component
cat > apps/crm/src/features/my-feature/MyFeature.tsx << 'EOF'
import { Button, Card } from "@heubert/ui";

export function MyFeature() {
  return (
    <Card>
      <h2>My Feature</h2>
      <Button>Click Me</Button>
    </Card>
  );
}
EOF

# Create a route
cat > apps/crm/src/routes/my-feature.tsx << 'EOF'
import { createFileRoute } from "@tanstack/react-router";
import { MyFeature } from "@features/my-feature/MyFeature";

export const Route = createFileRoute("/my-feature")({
  component: MyFeature,
});
EOF
```

Visit http://localhost:5173/my-feature to see your new feature!

## Common Tasks

### Add a New shadcn/ui Component
```bash
# The components are in packages/ui
# You can add more from https://ui.shadcn.com/
```

### Connect to Your NestJS Backend
1. Update `VITE_API_URL` in `.env`:
```env
VITE_API_URL=http://localhost:4000
```

2. Use the API client:
```typescript
import { apiRequest } from "@lib/api/client";

const data = await apiRequest("get", "/your-endpoint");
```

### Add a Zustand Store
```typescript
// apps/crm/src/stores/my-store.ts
import { create } from "zustand";

interface MyStore {
  value: string;
  setValue: (value: string) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));
```

### Use TanStack Query
```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-data"],
    queryFn: () => fetch("/api/data").then(r => r.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

## Project Structure Quick Reference

```
heubert-starter/
├── apps/crm/              # Your main app
│   ├── src/
│   │   ├── features/      # Add your features here
│   │   ├── routes/        # Add your routes here
│   │   ├── stores/        # Add your stores here
│   │   └── lib/           # Utilities and config
│   └── e2e/              # E2E tests
├── packages/
│   ├── ui/               # Shared UI components
│   ├── types/            # Shared types
│   ├── config/           # App configuration
│   └── utils/            # Shared utilities
└── tooling/              # Build configuration
```

## Troubleshooting

### Port 5173 is already in use
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or change the port in vite.config.ts
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Type errors with imports
```bash
# Regenerate route types
pnpm --filter @heubert/crm dev

# Check TypeScript
pnpm type-check
```

## Next Steps

1. ✅ Read the main README.md
2. ✅ Explore the codebase
3. ✅ Build your first feature
4. ✅ Set up your backend connection
5. ✅ Deploy to production

## Need Help?

- Check the main [README.md](./README.md)
- Review the [app-specific README](./apps/crm/README.md)
- Look at example code in `src/features/home`

Happy coding! 🎉
