# Claude Code Skills

This directory contains symlinks to skills installed in the `.agents/skills` directory.

## Why Symlinks?

Skills are stored in `.agents/skills/` but symlinked here in `.claude/` to ensure:
- ✅ Cross-platform compatibility (Linux, macOS, Windows)
- ✅ Consistent paths across all operating systems
- ✅ Easy access for Claude Code
- ✅ Automatic setup via postinstall script

## Setup

Symlinks are automatically created when you run:

```bash
pnpm install
```

Or manually with:

```bash
pnpm setup-skills
```

## Installed Skills

- **FDD-architecture**: Feature-Driven Design architecture patterns for React applications (local, ready for refinement with skill-creator)
- **skill-creator**: Create and manage MCP skills for Claude Code
- **vercel-react-best-practices**: React best practices from Vercel

## Adding New Skills

When you install a new skill, the symlink will be automatically created on the next `pnpm install`, or you can run:

```bash
pnpm setup-skills
```

## How It Works

The `scripts/setup-skills.sh` script:
1. Scans `.agents/skills/` for installed skills
2. Creates relative symlinks in `.claude/`
3. Works across all platforms (Linux, macOS, Windows with Git Bash/WSL)

This ensures that no matter which OS you or your team members use, the skills will always be accessible in the same location.
