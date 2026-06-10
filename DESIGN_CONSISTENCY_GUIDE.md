# Design Consistency Refactoring Guide

## Overview
This document outlines the UI design consistency refactoring from hardcoded colors to semantic design tokens using the Slate Gray color system.

## Status
- ✅ **ProcurementView**: Fully refactored with semantic tokens
- ✅ **globals.css**: Component utility classes added (btn-*, card-*, badge-*, input-field)
- ⚠️ **Remaining Views**: 40+ components still need refactoring

## Design Token System

All colors are defined in `globals.css` and use CSS custom properties:

### Primary Colors (Slate Gray)
- **--primary**: `215 28% 17%` (Dark Slate) - For main buttons, active states
- **--primary-foreground**: `0 0% 100%` (White) - Text on primary
- **--secondary**: `215 13% 34%` (Medium Slate) - For secondary buttons, badges
- **--secondary-foreground**: `0 0% 100%` (White) - Text on secondary

### Utility Colors
- **--muted**: `215 16% 47%` - Disabled states, subtle elements
- **--muted-foreground**: `215 8% 91%` - Text on muted backgrounds
- **--accent**: `220 13% 91%` (Light Gray) - Hover states, highlights
- **--destructive**: `0 84% 60%` (Red) - Delete, error actions
- **--border**: `215 15% 90%` - All borders
- **--input**: `215 15% 90%` - Form input borders

### Card & Container
- **--card**: `0 0% 100%` (White) - Card backgrounds
- **--background**: `0 0% 100%` - Page background
- **--foreground**: `215 28% 17%` - Primary text

## Component Classes (in globals.css)

### Buttons
```css
.btn-primary     /* Primary action buttons */
.btn-secondary   /* Secondary actions */
.btn-ghost       /* Outline/text buttons */
.btn-small       /* Small buttons for tables/cards */
```

### Cards
```css
.card            /* Card wrapper (border + bg) */
.card-content    /* Card padding (p-5) */
```

### Forms
```css
.input-field     /* Consistent input styling with focus states */
```

### Badges
```css
.badge           /* Base badge styling */
.badge-default   /* Secondary background */
.badge-success   /* Green badge */
.badge-warning   /* Amber badge */
.badge-error     /* Red badge */
.badge-info      /* Blue badge */
```

## Refactoring Checklist

### Critical Components (Visible in UI)
- [x] ProcurementView.tsx (956 lines)
- [ ] ComplianceView.tsx (912 lines)
- [ ] FinanceView.tsx (780 lines)
- [ ] LogisticsView.tsx (753 lines)
- [ ] ClientInvoiceDetailView.tsx (708 lines)

### Common Replacements

Replace hardcoded colors with semantic tokens:

| Old | New | Usage |
|-----|-----|-------|
| `bg-blue-600 hover:bg-blue-700` | `bg-primary hover:opacity-90` | Primary buttons |
| `text-blue-600 dark:text-blue-400` | `text-primary` | Links, primary text |
| `text-red-500` | `text-destructive` | Delete/error actions |
| `bg-gray-200 bg-white` | `bg-card` | Card backgrounds |
| `border-gray-200` | `border-border` | All borders |
| `text-gray-600 dark:text-gray-400` | `text-muted-foreground` | Secondary text |
| `placeholder-gray-400` | `placeholder-muted-foreground` | Input placeholders |
| `hover:bg-gray-50` | `hover:bg-accent` | Hover states |
| `font-serif` | `font-sans` | All text (remove serif) |

### Font Fixes
- Remove all instances of `font-serif` - use `font-sans` consistently
- Remove `font-mono font-mono` duplicates - use just `font-sans`
- Keep font weights (font-semibold, font-bold) but change font family

### Import Addition
Add to each component:
```typescript
import { cn } from '../lib/utils';
```

### Form Input Refactoring
Old:
```jsx
className="border border-gray-300 bg-white text-gray-900 focus:border-blue-500"
```

New:
```jsx
className={cn(
  'input-field',
  'focus:border-primary focus:ring-primary'
)}
```

### Button Refactoring
Old:
```jsx
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
```

New:
```jsx
className={cn(
  'btn-primary',
  'transition-smooth'
)}
```

### Status Badge Refactoring
Old:
```jsx
className="bg-blue-50 text-blue-700 border border-blue-200"
```

New:
```jsx
className="badge-info"  // or badge-success, badge-warning, badge-error
```

## Automated Refactoring

A script is available at `scripts/refactor-colors.sh` that can apply basic replacements:

```bash
chmod +x scripts/refactor-colors.sh
./scripts/refactor-colors.sh
```

**Note**: The script uses sed and may need manual review. Always create backups.

## Dark Mode Considerations

All semantic tokens have dark mode variants defined in `globals.css`. When using token classes, dark mode is automatically applied via the `.dark` class on the html element.

Avoid:
```jsx
className="text-gray-900 dark:text-gray-50"  // ❌ Hardcoded
```

Use:
```jsx
className="text-foreground"  // ✅ Automatic dark mode
```

## Testing Checklist

After refactoring:
1. [ ] All buttons render correctly (primary, secondary, small)
2. [ ] Form inputs have proper focus rings
3. [ ] Cards have correct borders and backgrounds
4. [ ] Status badges display with correct colors
5. [ ] Dark mode toggle works correctly
6. [ ] Hover states are visible and smooth
7. [ ] No hardcoded color classes remain (except in design token definitions)

## Files to Update Next

Priority order (by line count and visibility):
1. ComplianceView.tsx - 17 color references
2. FinanceView.tsx - 12 color references
3. LogisticsView.tsx - 13 color references
4. AIAssistantView.tsx - 4+ references
5. All list/detail views in each module

## Questions?

If unsure about color token placement:
- Check `globals.css` for the HSL color definition
- Use `text-foreground`, `text-muted-foreground` for text
- Use `bg-card`, `bg-background` for backgrounds
- Use `border-border`, `border-input` for borders
- Use utility buttons: `btn-primary`, `btn-secondary`, `btn-ghost`
