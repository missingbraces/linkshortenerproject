import { db } from '@/db';
import { links, type NewLink } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Fetches all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links belonging to the user
 */
export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

/**
 * Inserts a new link into the database
 * @param data - The link data to insert
 * @returns The created link
 */
export async function insertLink(data: NewLink) {
  const [link] = await db
    .insert(links)
    .values(data)
    .returning();
  
  return link;
}

/**
 * Checks if a short code is already in use
 * @param shortCode - The short code to check
 * @returns True if the short code exists, false otherwise
 */
export async function shortCodeExists(shortCode: string) {
  const [existingLink] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return !!existingLink;
}

/**
 * Updates an existing link
 * @param id - The ID of the link to update
 * @param data - The updated link data
 * @returns The updated link
 */
export async function updateLink(
  id: number,
  data: { originalUrl?: string; shortCode?: string }
) {
  const [updatedLink] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(links.id, id))
    .returning();
  
  return updatedLink;
}

/**
 * Deletes a link by ID
 * @param id - The ID of the link to delete
 * @returns The deleted link
 */
export async function deleteLink(id: number) {
  const [deletedLink] = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning();
  
  return deletedLink;
}

/**
 * Gets a single link by ID
 * @param id - The ID of the link
 * @returns The link if found, undefined otherwise
 */
export async function getLinkById(id: number) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1);
  
  return link;
}

/**
 * Gets a single link by short code
 * @param shortCode - The short code of the link
 * @returns The link if found, undefined otherwise
 */
export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return link;
}
