"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { removeLink } from "./actions";
import type { Link } from "@/db/schema";

interface DeleteLinkDialogProps {
  link: Link;
  children?: React.ReactNode;
}

export function DeleteLinkDialog({ link, children }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await removeLink({ id: link.id });

      if (result.error) {
        setError(result.error);
      } else {
        // Success - close dialog
        setOpen(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // Reset error when dialog is closed
    if (!newOpen) {
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <DialogTitle>Delete Link</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this link?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-md">
          <div className="space-y-2">
            <div>
              <span className="text-sm text-zinc-400">Short Code:</span>
              <p className="font-mono text-white">/{link.shortCode}</p>
            </div>
            <div>
              <span className="text-sm text-zinc-400">URL:</span>
              <p className="text-white break-all text-sm">{link.originalUrl}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
          <p className="text-sm text-yellow-500">
            This action cannot be undone. The short link will be permanently deleted.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Link
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
