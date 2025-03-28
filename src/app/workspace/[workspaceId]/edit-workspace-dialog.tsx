import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useState } from "react";
import toast from "react-hot-toast";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

type Props = {
  workspaceId: Id<"workspaces">;
  initialValue: string;
  setOpenEdit: (open: boolean) => void;
  openEdit: boolean;
};

function EditWorkspaceDialog({
  workspaceId,
  initialValue,
  openEdit,
  setOpenEdit,
}: Props) {
  const [value, setValue] = useState(initialValue);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim() || value.length < 3 || value.length > 80) {
      toast.error("Please enter a valid workspace name");
      return;
    }

    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          toast.success("Workspace name updated successfully");
        },
        onError: () => {
          console.error("Error updating workspace name");
        },
        onSettled: () => {
          setOpenEdit(false);
        },
      }
    );
  };
  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename this workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleEdit}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isUpdatingWorkspace}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="workspace name e.g. 'work', 'personal', 'projects', etc"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} disabled={isUpdatingWorkspace}>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isUpdatingWorkspace}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkspaceDialog;
