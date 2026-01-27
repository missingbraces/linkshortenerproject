# Agent Instructions - Link Shortener Project

This document serves as the main entry point for AI coding assistants working on this project. These instructions ensure consistent, high-quality code that adheres to the project's standards and conventions.

## ⚠️ CRITICAL: Read Documentation FIRST

**BEFORE generating ANY code, you MUST read the relevant instruction files from the `/docs` directory.**

This is non-negotiable. The documentation files contain essential patterns, conventions, and implementation details that are required for proper code generation. Failing to read these files will result in code that doesn't follow project standards.

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

## Documentation Structure

Agent instructions are organized into separate files for better maintainability in the `/docs` directory.

**⚠️ ALWAYS read the relevant .md file(s) BEFORE generating any code:**

### `/docs/auth.md` - Authentication
All authentication logic using Clerk. Covers protected routes, modal-based sign-in/sign-up, and redirect patterns.

### `/docs/ui-components.md` - UI Components
All UI components use shadcn/ui exclusively. Never create custom UI components from scratch.


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

## Getting Started

**MANDATORY STEPS before making ANY changes:**

1. **READ THE DOCS FIRST** - Always read the relevant documentation file(s) from the `/docs` directory
   - For authentication code → Read `/docs/auth.md`
   - For UI components → Read `/docs/ui-components.md`
   - Never skip this step, even if the task seems simple
2. Understand the existing code patterns in the project
3. Follow the established conventions for file naming, structure, and code style
4. Ensure all new code is type-safe and passes linting

**Failure to read the documentation files will result in code that violates project standards.**

## When to Update These Docs

Update agent instructions when:
- New patterns or conventions are established
- Technology stack changes (new libraries, major version updates)
- Architectural decisions are made
- Common mistakes or anti-patterns are identified

---

**Last Updated:** January 26, 2026
