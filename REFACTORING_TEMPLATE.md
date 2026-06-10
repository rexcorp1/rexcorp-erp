# Refactoring Views to Use shadcn/ui Components

## Step-by-Step Template

Here's how to refactor any View component to use official shadcn/ui.

### Step 1: Add Imports
```jsx
// At the top of your component file
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
```

### Step 2: Replace Buttons

**Old:**
```jsx
<button 
  onClick={handleSave}
  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
>
  <Plus className="h-4 w-4" /> Save
</button>
```

**New:**
```jsx
<Button onClick={handleSave}>
  <Plus className="h-4 w-4" />
  Save
</Button>
```

Variants:
```jsx
<Button>Primary</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Delete</Button>
<Button variant="destructive">Remove</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Step 3: Replace Card Containers

**Old:**
```jsx
<div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
  <div className="text-base font-bold text-gray-900">Company Name</div>
  <div className="text-sm text-gray-600">Contact info</div>
  <div className="mt-4 pt-4 border-t border-gray-100">
    <button onClick={() => editItem()}>Edit</button>
  </div>
</div>
```

**New:**
```jsx
<Card>
  <CardHeader>
    <CardTitle>Company Name</CardTitle>
    <CardDescription>Contact info</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Your content */}
    <div className="flex gap-2 justify-end">
      <Button variant="outline" onClick={() => cancelEdit()}>Cancel</Button>
      <Button onClick={() => editItem()}>Edit</Button>
    </div>
  </CardContent>
</Card>
```

### Step 4: Replace Forms

**Old:**
```jsx
<div>
  <label className="block text-xs font-semibold text-gray-700">Name</label>
  <input 
    type="text"
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-0"
    value={formData.name}
    onChange={e => setFormData({...formData, name: e.target.value})}
    placeholder="Enter name"
  />
</div>
```

**New:**
```jsx
<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input 
    id="name"
    placeholder="Enter name"
    value={formData.name}
    onChange={e => setFormData({...formData, name: e.target.value})}
  />
</div>
```

### Step 5: Replace Selects

**Old:**
```jsx
<select 
  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
  value={formData.type}
  onChange={e => setFormData({...formData, type: e.target.value})}
>
  <option value="">Select type</option>
  <option value="Trucking">Trucking</option>
  <option value="Shipping">Shipping</option>
</select>
```

**New:**
```jsx
<Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
  <SelectTrigger>
    <SelectValue placeholder="Select type" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Trucking">Trucking</SelectItem>
    <SelectItem value="Shipping">Shipping</SelectItem>
  </SelectContent>
</Select>
```

### Step 6: Replace Tables

**Old:**
```jsx
<table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-100 border-b">
      <th className="px-4 py-2 text-left font-semibold">ID</th>
      <th className="px-4 py-2 text-left font-semibold">Name</th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => (
      <tr key={item.id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">{item.id}</td>
        <td className="px-4 py-2">{item.name}</td>
      </tr>
    ))}
  </tbody>
</table>
```

**New:**
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Step 7: Replace Status Badges

**Old:**
```jsx
<span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
  status === 'Active' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-gray-100 text-gray-700'
}`}>
  {status}
</span>
```

**New:**
```jsx
<Badge variant={status === 'Active' ? 'default' : 'secondary'}>
  {status}
</Badge>
```

Badge variants:
```jsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

### Step 8: Replace Dialogs/Modals

**Old:**
```jsx
{showForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-lg font-bold mb-4">Edit Item</h2>
      {/* form content */}
      <div className="flex gap-2 justify-end mt-6">
        <button onClick={() => setShowForm(false)}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  </div>
)}
```

**New:**
```jsx
<Dialog open={showForm} onOpenChange={setShowForm}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Item</DialogTitle>
    </DialogHeader>
    {/* form content */}
    <div className="flex gap-2 justify-end mt-6">
      <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  </DialogContent>
</Dialog>
```

## Quick Checklist for Each Component

- [ ] Add all necessary imports from `@/components/ui/*`
- [ ] Replace all `<button>` with `<Button>`
- [ ] Replace all card divs with `<Card>` component
- [ ] Replace all `<input>` with `<Input>`
- [ ] Replace all `<label>` with `<Label>`
- [ ] Replace all `<select>` with `<Select>`
- [ ] Replace all `<table>` with `<Table>`
- [ ] Replace all status badges with `<Badge>`
- [ ] Replace all modals with `<Dialog>`
- [ ] Test dark mode (toggle browser dev tools)
- [ ] Test on mobile (responsive)
- [ ] Git commit with message: `refactor: Replace hardcoded styles with shadcn components in [ComponentName]`

## Example: Complete Refactored Button Section

```jsx
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button onClick={handleCreate}>
        <Plus className="h-4 w-4" />
        Create
      </Button>
      <Button 
        variant="outline"
        onClick={handleEdit}
      >
        <Edit2 className="h-4 w-4" />
        Edit
      </Button>
      <Button 
        variant="destructive"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  )
}
```

## Common Patterns

### Form Group
```jsx
<div className="space-y-2">
  <Label>Email</Label>
  <Input type="email" placeholder="email@example.com" />
</div>
```

### Card with Actions
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <div className="px-6 py-3 bg-muted flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </div>
</Card>
```

### Status Badge List
```jsx
<div className="space-y-2">
  {items.map(item => (
    <div key={item.id} className="flex justify-between items-center">
      <span>{item.name}</span>
      <Badge>{item.status}</Badge>
    </div>
  ))}
</div>
```

---

Start with ProcurementView and use this template as reference for all other components!
