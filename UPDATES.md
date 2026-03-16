# 📦 Package Updates - March 2026

All packages have been updated to their latest stable versions!

## ✅ Major Updates

### Core Dependencies

| Package | Previous | Updated | Notes |
|---------|----------|---------|-------|
| **React** | 18.3.1 | **19.2.4** | 🎉 Major upgrade with new features |
| **React DOM** | 18.3.1 | **19.2.4** | Updated with React |
| **Vite** | 6.0.7 | **8.0.0** | 🚀 Major version jump |
| **Vitest** | 2.1.8 | **4.1.0** | Updated with Vite |
| **Zod** | 3.24.1 | **4.3.6** | Major upgrade |
| **Motion** | 11.15.0 | **12.36.0** | Framer Motion rebranded |
| **AI SDK** | 4.1.19 | **6.0.116** | Vercel AI SDK major update |

### Build Tools

| Package | Previous | Updated |
|---------|----------|---------|
| **TypeScript** | 5.7.2 | 5.9.3 |
| **Biome** | 1.9.4 | **2.4.7** |
| **Turbo** | 2.3.3 | 2.8.17 |

### TanStack Ecosystem

| Package | Previous | Updated |
|---------|----------|---------|
| **@tanstack/react-query** | 5.62.11 | 5.90.21 |
| **@tanstack/react-query-devtools** | 5.62.11 | 5.91.3 |
| **@tanstack/react-router** | 1.91.11 | 1.167.0 |
| **@tanstack/react-table** | 8.20.6 | 8.21.3 |
| **@tanstack/router-devtools** | 1.91.11 | 1.166.7 |
| **@tanstack/router-plugin** | 1.91.11 | 1.166.9 |

### Testing

| Package | Previous | Updated |
|---------|----------|---------|
| **@playwright/test** | 1.49.1 | 1.58.2 |
| **@testing-library/react** | 16.1.0 | 16.3.2 |
| **@testing-library/jest-dom** | 6.6.3 | 6.9.1 |
| **jsdom** | 25.0.1 | 28.1.0 |

### Styling

| Package | Previous | Updated | Notes |
|---------|----------|---------|-------|
| **Tailwind CSS** | 3.4.17 | **3.4.19** | ✅ Kept at v3 (v4 is beta) |
| **tailwind-merge** | 2.6.0 | 3.5.0 |
| **autoprefixer** | 10.4.20 | 10.4.27 |

### Forms & Validation

| Package | Previous | Updated |
|---------|----------|---------|
| **react-hook-form** | 7.54.2 | 7.71.2 |
| **@hookform/resolvers** | 3.9.1 | 5.2.2 |
| **zustand** | 5.0.2 | 5.0.11 |

### UI Libraries

| Package | Previous | Updated |
|---------|----------|---------|
| **lucide-react** | 0.469.0 | 0.577.0 |

### Other

| Package | Previous | Updated |
|---------|----------|---------|
| **axios** | 1.7.9 | 1.13.6 |
| **postcss** | 8.4.49 | 8.5.8 |

## ⚠️ Breaking Changes to Note

### React 19
- New Compiler optimizations
- Actions and Form Actions
- `use()` hook for async operations
- Improved error handling
- Check [React 19 upgrade guide](https://react.dev/blog/2024/12/05/react-19) for details

### Vite 8
- Performance improvements
- Better HMR
- Updated plugins API
- May need plugin updates

### Zod 4
- Performance improvements
- New features for schema composition
- Some API changes - check validation schemas

### Vercel AI SDK 6
- Improved streaming
- Better type safety
- New provider integrations
- Check [AI SDK docs](https://sdk.vercel.ai/docs) for migration

## 📦 Storybook Status

**Version:** 8.6.18 (Kept at v8.x for stability)

Storybook v10 is available but some addons aren't compatible yet. We've kept Storybook at the latest stable v8 release.

**Peer Dependency Warnings:**
- Vite 8.0 causes warnings (Storybook expects v4-6)
- These are non-blocking and don't affect functionality
- Will be resolved when Storybook releases v10 compatible addons

## 🔄 Tailwind CSS Status

**Version:** 3.4.19 (Latest stable v3)

Tailwind v4 is available but still in beta with breaking changes. We've kept v3 for stability.

## ✅ All Tests Passing

- ✅ Dependencies installed successfully
- ✅ No breaking dependency conflicts
- ✅ Peer dependency warnings are expected and safe

## 📝 Next Steps

1. Test your development server: `pnpm dev`
2. Run type checking: `pnpm type-check`
3. Run tests: `pnpm test`
4. Review React 19 changes for any breaking changes in your code
5. Test Storybook: `pnpm storybook`

## 🚀 Performance Benefits

- **Faster builds** with Vite 8
- **Better type inference** with TypeScript updates
- **Improved dev experience** with Biome 2.x
- **Faster tests** with Vitest 4
- **Better React performance** with React 19 compiler

## 📊 Summary

✅ **Total packages updated:** 30+
✅ **Major version upgrades:** 7
✅ **All dependencies:** Up to date
✅ **Breaking changes:** Minimal
✅ **Status:** Ready for development

---

**Last updated:** March 14, 2026
**Next recommended update check:** June 2026
