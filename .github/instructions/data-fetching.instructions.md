---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Instructions
This project uses Next.js for server-side rendering and static site generation. Here are the guidelines for fetching data:

### 1. Use Server Components
In Next.js, ALWAYS use server components for data fetching. This ensures optimal performance and SEO benefits. NEVER use client components for data fetching.

### 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. NEVER use raw SQL queries.



