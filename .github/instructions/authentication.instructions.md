---
description: This file outlines the authentication guidelines for the project using Clerk.
---

# Authentication

## Overview

All authentication in this application is handled exclusively by **Clerk**. No other authentication methods should be implemented or used.

## Core Principles

1. **Clerk Only** - Never implement custom auth logic or use alternative auth providers
2. **Modal-First** - Sign in and sign up flows must always launch as modals
3. **Protected Routes** - Enforce authentication where required
4. **Smart Redirects** - Guide users to the appropriate page based on auth state

## Protected Routes

### Dashboard (`/dashboard`)

The dashboard is a **protected route** that requires authentication.

**Implementation:**
```typescript
// app/dashboard/layout.tsx or page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Dashboard content
}
```

## Authentication Flows

### Sign In / Sign Up Modals

Always use Clerk's modal mode for authentication flows:

```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Sign In
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Sign Up
<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

**Never use:**
- Redirect mode (`mode="redirect"`)
- Custom auth forms
- Dedicated sign-in/sign-up pages (unless specifically overriding default behavior)

### Homepage Redirect Logic

If a user is already authenticated and visits the homepage, redirect them to the dashboard.

**Implementation:**
```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Homepage content for unauthenticated users
}
```

## Common Patterns

### Server Components (Recommended)

```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

// Get user ID only
const { userId } = await auth();

// Get full user object
const user = await currentUser();
```

### Client Components

```typescript
'use client';

import { useUser, useAuth } from '@clerk/nextjs';

function MyComponent() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { userId } = useAuth();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  // Component logic
}
```

### User Button (Avatar/Menu)

```typescript
import { UserButton } from '@clerk/nextjs';

<UserButton afterSignOutUrl="/" />
```

## Middleware (Optional)

For route protection at the middleware level:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

## Environment Variables

Ensure these are set in `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Anti-Patterns

❌ **Never do this:**
- Implement custom JWT handling
- Use NextAuth, Auth0, or other auth providers
- Create custom login forms
- Store passwords or auth tokens
- Use redirect mode for sign-in/sign-up

✅ **Always do this:**
- Use Clerk hooks and components
- Use modal mode for auth flows
- Protect routes with `auth()` checks
- Redirect authenticated users from homepage to dashboard

---

**Related Documentation:**
- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Server Components](https://clerk.com/docs/references/nextjs/overview#server-components)
