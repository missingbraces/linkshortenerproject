---
description: This file outlines the guidelines for using shadcn/ui components in the project.
---

# UI Components

## Overview

All UI elements in this application use **shadcn/ui** components exclusively. The project is configured with the **New York** style variant.

## Core Principles

1. **shadcn/ui Only** - Never create custom UI components from scratch
2. **Composition** - Build complex UIs by composing existing shadcn/ui components
3. **Extend, Don't Replace** - If customization is needed, extend shadcn/ui components
4. **Consistency** - Use the same components across the entire application

## Component Usage

### Adding New Components

When a new UI element is needed:

```bash
npx shadcn@latest add [component-name]
```

This installs the component into the `@/components/ui` directory.

**Examples:**
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
```

### Using Components

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Available Components

Refer to the [shadcn/ui documentation](https://ui.shadcn.com/docs/components) for the full list of available components and their props.

### Commonly Used Components

- **Button** - All button interactions
- **Card** - Container elements
- **Dialog** - Modals and dialogs
- **Input** - Text inputs
- **Form** - Form elements (with React Hook Form integration)
- **Table** - Data tables
- **Sheet** - Slide-over panels
- **Dropdown Menu** - Contextual menus
- **Toast** - Notifications

## Customization

### Styling Components

Use Tailwind CSS classes to customize shadcn/ui components:

```typescript
<Button className="w-full bg-blue-600 hover:bg-blue-700">
  Custom Styled Button
</Button>
```

### Variants

shadcn/ui components come with built-in variants:

```typescript
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Extending Components

If you need to create a specialized version of a component, wrap it:

```typescript
// components/submit-button.tsx
import { Button } from '@/components/ui/button';

export function SubmitButton({ children, ...props }: ButtonProps) {
  return (
    <Button type="submit" className="w-full" {...props}>
      {children}
    </Button>
  );
}
```

## Icons

Use **Lucide React** for all icons (bundled with shadcn/ui):

```typescript
import { Plus, Trash, Edit, Copy } from 'lucide-react';

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

## Anti-Patterns

### ❌ DON'T: Create custom components from scratch

```typescript
// WRONG
export function CustomButton({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 rounded">
      {children}
    </button>
  );
}
```

### ✅ DO: Use shadcn/ui components

```typescript
// CORRECT
import { Button } from '@/components/ui/button';

export function MyFeature() {
  return <Button>Click me</Button>;
}
```

## Configuration

The shadcn/ui configuration is defined in `components.json`:

```json
{
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Do not modify this configuration** unless there is a specific architectural need.

---

**Last Updated:** January 26, 2026
