# shadcn/ui Component Usage Guide

Now that we have official shadcn/ui components, replace all the hardcoded divs and custom styles with these pre-built components.

## Quick Start Examples

### Buttons

**Old way (BAD):**
```jsx
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Save
</button>
```

**New way (GOOD):**
```jsx
import { Button } from "@/components/ui/button"

<Button>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Delete</Button>
<Button variant="destructive">Remove</Button>
<Button size="sm">Small Button</Button>
```

**Button Variants:**
- `default` - Primary button (Slate Gray)
- `outline` - Bordered button
- `secondary` - Secondary action
- `ghost` - Minimal style
- `destructive` - Red for destructive actions
- `link` - Link style

### Cards

**Old way (BAD):**
```jsx
<div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
  <div className="text-base font-bold">Title</div>
  <div className="text-sm text-gray-600">Description</div>
</div>
```

**New way (GOOD):**
```jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Forms & Inputs

**Old way (BAD):**
```jsx
<input 
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500"
/>
```

**New way (GOOD):**
```jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="John Doe" />
</div>
```

### Selects/Dropdowns

**Old way (BAD):**
```jsx
<select className="w-full px-3 py-2 border border-gray-300 rounded">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

**New way (GOOD):**
```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
    <SelectItem value="opt2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Tables

**Old way (BAD):**
```jsx
<table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-2 text-left">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b">
      <td className="px-4 py-2">John</td>
    </tr>
  </tbody>
</table>
```

**New way (GOOD):**
```jsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badges

**Old way (BAD):**
```jsx
<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
```

**New way (GOOD):**
```jsx
import { Badge } from "@/components/ui/badge"

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="destructive">Error</Badge>
```

### Tabs

**Old way (BAD):**
```jsx
<div className="border-b">
  <button className="px-4 py-2 border-b-2 border-blue-600">Tab 1</button>
  <button className="px-4 py-2">Tab 2</button>
</div>
```

**New way (GOOD):**
```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Refactoring Your Views

Priority order:
1. **ProcurementView** - Replace all manual button/card styling
2. **LogisticsView** - Use Table component for shipments
3. **ComplianceView** - Use Badge for status indicators
4. **FinanceView** - Use Card and Table for data display
5. **All other Views** - Convert systematically

## Color Tokens (Automatic)

All components automatically use the neutral Slate Gray theme:

- **Light Mode:**
  - Primary: oklch(0.205 0 0) - Dark Slate
  - Background: oklch(1 0 0) - White
  - Foreground: oklch(0.145 0 0) - Near Black

- **Dark Mode:**
  - Primary: oklch(0.922 0 0) - Light Slate
  - Background: oklch(0.145 0 0) - Dark
  - Foreground: oklch(0.985 0 0) - White

No more hardcoding blue, red, or custom colors!

## Size Variants

Most components have size options:
```jsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## Accessibility

All components have built-in ARIA attributes and keyboard navigation. Use semantic HTML automatically.

## Next Steps

1. Start refactoring views one by one
2. Replace all custom card divs with `<Card>` component
3. Replace all buttons with `<Button>` component
4. Use `<Badge>` for all status indicators
5. Use `<Table>` for all data tables
6. Test dark mode as you go

The components will handle all the styling consistency for you!
