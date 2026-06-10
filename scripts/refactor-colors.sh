#!/bin/bash

# Color Refactoring Script
# This script applies consistent semantic color refactoring to View components
# Usage: chmod +x scripts/refactor-colors.sh && ./scripts/refactor-colors.sh

COMPONENTS_DIR="components"

echo "🎨 Starting UI Design Consistency Refactoring..."
echo "Target: Replacing hardcoded colors with semantic design tokens"
echo ""

# Safety check
read -p "This will modify multiple files. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

# Function to refactor a single file
refactor_file() {
  local file=$1
  echo "Processing: $file"
  
  # Create backup
  cp "$file" "$file.bak"
  
  # Replace hardcoded button colors with semantic tokens
  sed -i.tmp \
    -e 's/bg-blue-600 hover:bg-blue-700/bg-primary hover:opacity-90/g' \
    -e 's/text-blue-600 dark:text-blue-400/text-primary/g' \
    -e 's/text-blue-500/text-primary/g' \
    -e 's/border-blue-500/border-primary/g' \
    -e 's/bg-blue-50 dark:bg-blue-950\/40 dark:text-blue-400/bg-secondary text-secondary-foreground/g' \
    -e 's/text-red-500/text-destructive/g' \
    -e 's/bg-red-50/bg-destructive\/10/g' \
    -e 's/border-gray-200 bg-white p-[0-9]*/border-border bg-card p-4/g' \
    -e 's/dark:border-gray-700 dark:bg-gray-800/dark:(handled by tokens)/g' \
    -e 's/text-gray-900 dark:text-gray-50/text-foreground/g' \
    -e 's/text-gray-600 dark:text-gray-400/text-muted-foreground/g' \
    -e 's/text-gray-500/text-muted-foreground/g' \
    -e 's/text-gray-700 dark:text-gray-300/text-foreground/g' \
    -e 's/placeholder-gray-400/placeholder-muted-foreground/g' \
    -e 's/border-gray-300/border-input/g' \
    -e 's/hover:bg-gray-50/hover:bg-accent/g' \
    -e 's/font-serif/font-sans/g' \
    -e 's/font-mono font-mono/font-sans/g' \
    "$file"
  
  rm -f "$file.tmp"
}

# Process all View components
for file in $COMPONENTS_DIR/*View.tsx; do
  if [ -f "$file" ]; then
    refactor_file "$file"
  fi
done

echo ""
echo "✅ Refactoring complete!"
echo "📝 Backups created with .bak extension"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff components/"
echo "2. Test the application thoroughly"
echo "3. If satisfied, delete backups: rm components/*.bak"
echo "4. If issues found, restore: mv components/*.bak components/*.tsx"
