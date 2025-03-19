"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import React, { useState } from "react";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateWorkSpaceModal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate, isPending } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);

    // TODO: clear form
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Workspace name must be at least 3 characters long.");
    }

    await mutate(
      {
        name,
      },
      {
        onSuccess: (workspaceId) => {
          setOpen(false);
          setName("");
          router.replace(`/workspace/${workspaceId}`);
          toast.success("Workspace created successfully");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Something went wrong !");
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-[clamp(1.5rem,2.5vw,2rem)] ">
            Add a workspace
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            className="max-sm:placeholder:text-xs "
            placeholder="workspace name e.g. 'work', 'personal', 'projects', etc"
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkSpaceModal;
