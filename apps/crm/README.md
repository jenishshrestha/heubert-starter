# Heubert CRM

Feature-driven CRM application built with The React + AI Stack for 2026.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Motion (Framer Motion)
- **Tables**: TanStack Table
- **AI**: Vercel AI SDK
- **Testing**: Vitest + Playwright
- **Component Dev**: Storybook

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
pnpm test:ui

# Run E2E tests
pnpm test:e2e
pnpm test:e2e:ui

# Start Storybook
pnpm storybook
```

## Project Structure

```
src/
├── features/          # Feature modules
│   ├── home/
│   └── auth/
├── components/        # Shared components
├── lib/              # Utilities
│   ├── api/          # API client
│   └── query/        # React Query setup
├── hooks/            # Custom hooks
├── stores/           # Zustand stores
├── routes/           # TanStack Router routes
└── assets/           # Static assets
```

## Environment Variables

See `.env.example` for required environment variables.

## Adding Features

1. Create a feature directory in `src/features/`
2. Add components, hooks, and API calls within the feature
3. Create a route in `src/routes/`
4. Export from the feature's index file

## API Integration

The app is configured to work with a NestJS backend. Update `VITE_API_URL` in your `.env` file to point to your backend.

Example API call:
```typescript
import { apiRequest } from "@lib/api/client";

const users = await apiRequest("get", "/users");
```

## License

MIT
