---
description: This file outlines the guidelines for data mutation operations in the project.
---

# Data Mutation Guidelines

This document defines the standards and patterns for all data mutation operations in the Link Shortener application.

## Core Principles

### 1. Server Actions Only

ALL data mutations must be performed via Next.js Server Actions. Never mutate data directly from client components or API routes.

### 2. Server Action File Structure

- Server action files **MUST** be named `actions.ts`
- Server actions **MUST** be colocated in the same directory as the component that calls them
- Each feature directory should have its own `actions.ts` file

**Example Structure:**
```
app/
  dashboard/
    actions.ts          # Server actions for dashboard
    page.tsx            # Dashboard page component
  links/
    create/
      actions.ts        # Server actions for link creation
      page.tsx          # Link creation page
```

### 3. Client Component Requirement

Server actions must be called from **client components** only. Mark components with `"use client"` directive when they need to invoke server actions.

### 4. Type Safety

- ALL data passed to server actions must have explicit TypeScript types
- **DO NOT** use the `FormData` TypeScript type
- Define proper interfaces or types for all action parameters

**Example:**
```typescript
// ❌ WRONG
export async function createLink(formData: FormData) { ... }

// ✅ CORRECT
interface CreateLinkInput {
  url: string;
  slug?: string;
  userId: string;
}

export async function createLink(data: CreateLinkInput) { ... }
```

### 5. Input Validation with Zod

ALL input data must be validated using Zod schemas before processing.

**Example:**
```typescript
import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(3).optional(),
  userId: z.string(),
});

export async function createLink(data: CreateLinkInput) {
  const validated = createLinkSchema.parse(data);
  // Continue with validated data
}
```

### 6. Authentication Check

ALL server actions must verify user authentication before performing any database operations.

**Example:**
```typescript
import { auth } from "@clerk/nextjs/server";

export async function createLink(data: CreateLinkInput) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "Unauthorized" };
  }
  
  // Continue with database operations
}
```

### 7. Error Handling

Server actions should **NEVER** throw errors. Instead, return an object with either an `error` or `success` property.

**Example:**
```typescript
// ❌ WRONG - Throwing errors
export async function createLink(data: CreateLinkInput) {
  if (!userId) throw new Error("Unauthorized");
  if (!data.url) throw new Error("URL is required");
}

// ✅ CORRECT - Returning error objects
export async function createLink(data: CreateLinkInput) {
  if (!userId) return { error: "Unauthorized" };
  if (!data.url) return { error: "URL is required" };
  
  return { success: true, data: link };
}
```

### 8. Database Abstraction Layer

- Database operations must be performed through **helper functions** that wrap Drizzle queries
- Helper functions are located in the `/data` directory
- Server actions should **NEVER** contain direct Drizzle queries

**Example:**
```typescript
// ❌ WRONG - Direct Drizzle query in server action
export async function createLink(data: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  
  await db.insert(links).values({ ...data, userId });
  return { success: true };
}

// ✅ CORRECT - Using helper function
export async function createLink(data: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  
  const validated = createLinkSchema.parse(data);
  const link = await insertLink({ ...validated, userId });
  return { success: true, data: link };
}
```

## Complete Example

**File: `app/links/create/actions.ts`**
```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { insertLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url("Invalid URL format"),
  slug: z.string().min(3, "Slug must be at least 3 characters").optional(),
});

interface CreateLinkInput {
  url: string;
  slug?: string;
}

export async function createLink(data: CreateLinkInput) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }
  
  // 2. Validate input
  const validationResult = createLinkSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid input data" };
  }
  
  // 3. Use helper function for database operation
  const link = await insertLink({
    ...validationResult.data,
    userId,
  });
  
  return { success: true, data: link };
}
```

**File: `app/links/create/form.tsx`**
```typescript
"use client";

import { useState } from "react";
import { createLink } from "./actions";

export function CreateLinkForm() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const result = await createLink({ url, slug });
    
    if ("error" in result) {
      // Handle error
      console.error(result.error);
    } else {
      // Handle success
      console.log(result.data);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## Summary Checklist

When creating a server action, ensure:

- [ ] File is named `actions.ts` and colocated with calling component
- [ ] Action is marked with `"use server"` directive
- [ ] Called from a client component
- [ ] Input has explicit TypeScript types (not FormData)
- [ ] Input is validated with Zod schema (use `safeParse`)
- [ ] Authentication is checked first
- [ ] Returns error/success object (never throws errors)
- [ ] Database operations use helper functions from `/data`
- [ ] No direct Drizzle queries in the action

