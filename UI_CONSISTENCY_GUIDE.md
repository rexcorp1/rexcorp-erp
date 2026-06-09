# UI Consistency Guide - REXCorp ERP

## Overview

This document outlines the comprehensive UI consistency refactor that has been applied to the REXCorp ERP application. All components now follow a unified design system based on shadcn/ui patterns with professional Slate Gray theming.

## Design System

### Color Palette (Slate Gray Theme)

The application uses a professional Slate Gray color scheme with semantic tokens:

**Light Mode:**
- **Background**: `#ffffff` (Pure white)
- **Foreground**: `#1f2937` (Slate gray)
- **Primary**: `#1f2937` (Slate gray) - For primary actions and emphasis
- **Secondary**: `#4b5563` (Medium slate)
- **Muted**: `#767f8b` (Muted text)
- **Accent**: `#e5e7eb` (Light gray) - For highlights and secondary elements
- **Border**: `#e5e9f2` (Very light blue-gray)
- **Input**: `#e5e9f2` (For input field backgrounds)
- **Destructive**: `#ef5350` (Red - for warnings/errors)

**Dark Mode:**
- **Background**: `#111827` (Near black)
- **Foreground**: `#e5e7eb` (Light gray)
- **Primary**: `#e5e7eb` (Light gray)
- **Card**: `#1f2937` (Dark gray)
- All tokens invert for accessibility in dark mode

### CSS Variables

All colors are defined as CSS custom properties in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 215 28% 17%;
  --primary: 215 28% 17%;
  --border: 215 15% 90%;
  /* ... and more */
}
```

Use these in Tailwind classes:
- `bg-background`, `text-foreground`, `border-border`, etc.

## Component Patterns

### 1. Layout Components

#### Header
- Uses `bg-card` with `border-border` for professional separation
- Action buttons: `text-muted-foreground hover:bg-accent hover:text-foreground`
- Search input: `border-input` with `focus:ring-primary`
- Avatar badge: `bg-secondary text-secondary-foreground`

#### Sidebar
- Navigation items use `text-muted-foreground` by default
- Active items: `bg-accent text-accent-foreground`
- Hover state: `hover:bg-accent/50 hover:text-foreground`
- Icons automatically inherit text color

#### StatusBar
- Subtle footer with minimal styling
- Status indicators use semantic colors
- Text: `text-muted-foreground` with green accents for "online" states

### 2. Data Display Components

#### Cards/Panels
```tsx
<div className="rounded-lg border border-border bg-card p-5 shadow-sm">
  {/* Card content */}
</div>
```

#### Tables
- Header: `bg-accent text-accent-foreground`
- Rows: `border-b border-border`
- Hover: `hover:bg-accent/30 transition-smooth`

### 3. Form Components

#### Input Fields
```tsx
<input
  className={cn(
    'rounded-md border border-input bg-background px-3 py-2 text-sm',
    'text-foreground placeholder-muted-foreground',
    'transition-smooth',
    'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
  )}
/>
```

#### Buttons
- **Primary**: `bg-primary text-primary-foreground hover:opacity-90`
- **Secondary**: `bg-background text-foreground border border-input hover:bg-accent`
- **Destructive**: `bg-destructive text-destructive-foreground hover:opacity-90`

#### Selects
Use same styling as inputs for consistency

#### Labels
- Use `text-sm font-medium text-foreground` for consistency
- Mark required fields with `<span className="text-destructive">*</span>`

### 4. Modal/Dialog

#### Structure
```tsx
<div className="fixed inset-0 z-50 flex items-center bg-black/50">
  <div className="bg-card rounded-lg shadow-lg">
    {/* Modal content */}
  </div>
</div>
```

#### Styling
- Header: `border-b border-border`
- Body: `space-y-6 p-6`
- Footer: `border-t border-border bg-accent p-4`

## Utility Functions

### `cn()` - Class Name Utility

Always use the `cn()` utility for conditional classes:

```tsx
import { cn } from '../lib/utils';

<button
  className={cn(
    'rounded-md px-4 py-2 text-sm font-medium',
    'text-foreground border border-input',
    'transition-smooth hover:bg-accent'
  )}
/>
```

Benefits:
- Merges conflicting Tailwind classes
- Cleaner, more readable code
- Prevents style conflicts

## Transition & Animation

All interactive elements use:
```tsx
className="transition-smooth"
```

Which is defined in `globals.css`:
```css
@layer components {
  .transition-smooth {
    @apply transition-all duration-200 ease-in-out;
  }
}
```

## Typography

- **Font**: Inter (from Google Fonts)
- **Body text**: Regular (400)
- **Labels/buttons**: Medium (500)
- **Headings**: Semibold (600) or Bold (700)

## Spacing

Follow Tailwind's spacing scale:
- Use `gap-4`, `gap-2`, etc. for spacing between elements
- Use `p-4`, `px-3`, `py-2` for padding
- Avoid arbitrary values like `p-[16px]` - use standard scale

## Component Examples

### Summary Card
```tsx
<div className="rounded-lg border border-border bg-card p-5 shadow-sm">
  <div className="flex items-center gap-4">
    <card.icon className="h-6 w-6 text-muted-foreground" />
    <div className="flex-1 min-w-0">
      <dt className="truncate text-sm font-medium text-muted-foreground">{card.title}</dt>
      <dd className="text-lg font-bold text-foreground">{card.value}</dd>
    </div>
  </div>
</div>
```

### Action Button
```tsx
<button className={cn(
  'flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium',
  'text-foreground transition-smooth',
  'hover:bg-accent'
)}>
  {/* Button content */}
</button>
```

### Table Row
```tsx
<tr className="border-b border-border hover:bg-accent/30 transition-smooth">
  <td className="px-6 py-4 font-semibold text-foreground">{data}</td>
</tr>
```

## Dark Mode Support

The theme automatically respects the system preference via:

```tsx
document.documentElement.classList.toggle('dark', isDark);
```

All Tailwind classes automatically work in both modes through CSS variables.

## Best Practices

1. **Always use semantic color tokens** instead of hardcoded colors
2. **Use `cn()` for conditional styling** to avoid class conflicts
3. **Apply `transition-smooth`** to all interactive elements
4. **Use `gap` over `space-*`** for consistent spacing
5. **Follow the component patterns** outlined in this guide
6. **Test in both light and dark modes** before committing

## Migration Notes

Components have been refactored to use:
- `border-border` instead of `border-gray-200` and `border-gray-700`
- `bg-card` instead of `bg-white` and `bg-gray-800`
- `text-foreground` instead of `text-gray-900` and `text-gray-100`
- All muted/secondary text uses `text-muted-foreground`
- All hover states use `hover:bg-accent hover:text-foreground`

## Files Modified

- `globals.css` - Design tokens and component utilities
- `tailwind.config.ts` - Tailwind configuration with semantic colors
- `lib/utils.ts` - Utility functions (cn)
- `components/Header.tsx` - Layout refactoring
- `components/Sidebar.tsx` - Navigation refactoring
- `components/StatusBar.tsx` - Footer refactoring
- `components/HomeDashboard.tsx` - Dashboard refactoring
- `components/CustomerManagementView.tsx` - Table and form refactoring
- `components/NewCustomerModal.tsx` - Modal refactoring

## Future Enhancements

- Consider implementing shadcn/ui Button, Input, Select components
- Add Toast notifications with consistent styling
- Create reusable Badge component for status indicators
- Implement Popover for complex menus
- Add Tooltip components for helpful hints
