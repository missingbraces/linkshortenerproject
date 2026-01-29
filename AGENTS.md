# Agent Instructions - Link Shortener Project

This document serves as the main entry point for AI coding assistants working on this project. These instructions ensure consistent, high-quality code that adheres to the project's standards and conventions.

## Project Overview

This is a **Link Shortener** application built with:
- **Next.js 16** (App Router) - React framework
- **TypeScript** - Type-safe development
- **Clerk** - Authentication and user management
- **Drizzle ORM** - Database toolkit
- **Neon Database** - Serverless Postgres
- **Tailwind CSS 4** - Styling with utility classes
- **shadcn/ui** - Component library (New York style)
- **Lucide React** - Icon library

## Quick Reference

### Core Principles

1. **Type Safety First** - Always use TypeScript with strict mode enabled
2. **Server Components by Default** - Use React Server Components unless interactivity is needed
3. **Database-First Approach** - Define schemas in Drizzle, generate types from database
4. **Composition Over Duplication** - Create reusable components and utilities
5. **Accessibility** - Follow WCAG 2.1 AA standards for all UI components

### Path Aliases

```typescript
@/*       // Root directory
@/components  // UI components
@/lib     // Utility functions
@/db      // Database configuration and schemas
@/hooks   // Custom React hooks
@/app     // Next.js app directory
```

### Command Reference

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npx drizzle-kit generate  # Generate database migrations
npx drizzle-kit migrate   # Run database migrations
```

---

**Last Updated:** January 26, 2026
