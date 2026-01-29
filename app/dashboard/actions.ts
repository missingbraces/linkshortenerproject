"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { insertLink, shortCodeExists, updateLink, deleteLink, getLinkById } from "@/data/links";
import { revalidatePath } from "next/cache";

// Validation schema for link creation
const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
  shortCode: z
    .string()
    .min(3, { message: "Short code must be at least 3 characters" })
    .max(20, { message: "Short code must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Short code can only contain letters, numbers, hyphens, and underscores",
    }),
});

// Validation schema for link update
const updateLinkSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
  shortCode: z
    .string()
    .min(3, { message: "Short code must be at least 3 characters" })
    .max(20, { message: "Short code must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Short code can only contain letters, numbers, hyphens, and underscores",
    }),
});

interface CreateLinkInput {
  originalUrl: string;
  shortCode: string;
}

export async function createLink(data: CreateLinkInput) {
  // Check authentication
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Validate input
  const validationResult = createLinkSchema.safeParse(data);

  if (!validationResult.success) {
    const errors = validationResult.error.issues.map((err) => err.message);
    return { error: errors.join(", ") };
  }

  const validated = validationResult.data;

  // Check if short code already exists
  const exists = await shortCodeExists(validated.shortCode);

  if (exists) {
    return { error: "This short code is already in use. Please choose a different one." };
  }

  // Insert the link
  try {
    const link = await insertLink({
      userId,
      originalUrl: validated.originalUrl,
      shortCode: validated.shortCode,
    });

    // Revalidate the dashboard page to show the new link
    revalidatePath("/dashboard");

    return { success: true, data: link };
  } catch (error) {
    console.error("Error creating link:", error);
    return { error: "Failed to create link. Please try again." };
  }
}

interface UpdateLinkInput {
  id: number;
  originalUrl: string;
  shortCode: string;
}

export async function editLink(data: UpdateLinkInput) {
  // Check authentication
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Validate input
  const validationResult = updateLinkSchema.safeParse({
    originalUrl: data.originalUrl,
    shortCode: data.shortCode,
  });

  if (!validationResult.success) {
    const errors = validationResult.error.issues.map((err) => err.message);
    return { error: errors.join(", ") };
  }

  const validated = validationResult.data;

  // Verify that the link exists and belongs to the user
  const existingLink = await getLinkById(data.id);

  if (!existingLink) {
    return { error: "Link not found" };
  }

  if (existingLink.userId !== userId) {
    return { error: "Unauthorized" };
  }

  // Check if short code is being changed and if the new one already exists
  if (existingLink.shortCode !== validated.shortCode) {
    const exists = await shortCodeExists(validated.shortCode);
    if (exists) {
      return { error: "This short code is already in use. Please choose a different one." };
    }
  }

  // Update the link
  try {
    const link = await updateLink(data.id, {
      originalUrl: validated.originalUrl,
      shortCode: validated.shortCode,
    });

    // Revalidate the dashboard page to show the updated link
    revalidatePath("/dashboard");

    return { success: true, data: link };
  } catch (error) {
    console.error("Error updating link:", error);
    return { error: "Failed to update link. Please try again." };
  }
}

interface DeleteLinkInput {
  id: number;
}

export async function removeLink(data: DeleteLinkInput) {
  // Check authentication
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Verify that the link exists and belongs to the user
  const existingLink = await getLinkById(data.id);

  if (!existingLink) {
    return { error: "Link not found" };
  }

  if (existingLink.userId !== userId) {
    return { error: "Unauthorized" };
  }

  // Delete the link
  try {
    await deleteLink(data.id);

    // Revalidate the dashboard page to remove the deleted link
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { error: "Failed to delete link. Please try again." };
  }
}

