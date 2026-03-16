#!/bin/bash
# Cross-platform skill symlink setup script
# Works on Linux, macOS, and Windows (Git Bash/WSL)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_SOURCE="$PROJECT_ROOT/.agents/skills"
SKILLS_TARGET="$PROJECT_ROOT/.claude"

echo "🔗 Setting up cross-platform skill symlinks..."
echo "Source: $SKILLS_SOURCE"
echo "Target: $SKILLS_TARGET"

# Ensure target directory exists
mkdir -p "$SKILLS_TARGET"

# Check if source directory exists
if [ ! -d "$SKILLS_SOURCE" ]; then
  echo "❌ Error: Skills source directory not found at $SKILLS_SOURCE"
  exit 1
fi

# Create symlinks for each skill
for skill in "$SKILLS_SOURCE"/*; do
  if [ -d "$skill" ]; then
    skill_name=$(basename "$skill")
    target_link="$SKILLS_TARGET/$skill_name"

    # Remove existing symlink or directory
    if [ -L "$target_link" ]; then
      echo "🔄 Updating symlink: $skill_name"
      rm "$target_link"
    elif [ -e "$target_link" ]; then
      echo "⚠️  Warning: $skill_name exists but is not a symlink. Skipping."
      continue
    fi

    # Create relative symlink (works better across platforms)
    ln -sf "../.agents/skills/$skill_name" "$target_link"
    echo "✅ Created symlink: $skill_name"
  fi
done

echo ""
echo "✨ Skill symlinks setup complete!"
echo ""
echo "Installed skills:"
ls -lh "$SKILLS_TARGET" | grep ^l | awk '{print "  - " $9 " -> " $11}'
