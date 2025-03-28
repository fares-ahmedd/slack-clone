import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import useConfirm from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditWorkspaceDialog from "./edit-workspace-dialog";
import { useOpenPreferences } from "@/features/workspaces/store/use-open-preferences";

type Props = {
  initialValue: string;
};

function PreferencesModal({ initialValue }: Props) {
  const [preferencesOpen, setPreferencesOpen] = useOpenPreferences();

  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [openEdit, setOpenEdit] = useState(false);
  const [ConfirmDeleteWorkspaceDialog, confirm] = useConfirm(
    "Are you sure you want to delete this workspace?",
    "This action cannot be undone."
  );

  const { mutate: removeWorkspace } = useRemoveWorkspace();

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      removeWorkspace(
        { id: workspaceId },

        {
          onSuccess: () => {
            toast.success("Workspace removed successfully");
            router.replace("/");
          },
          onError: () => {
            toast.error("Failed to delete workspace");
          },
        }
      );
    }
  };

  return (
    <>
      <EditWorkspaceDialog
        initialValue={initialValue}
        workspaceId={workspaceId}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <ConfirmDeleteWorkspaceDialog />
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenEdit(true)}
              className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 "
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Workspace name</p>
                <p className="text-sm text-[#1264a3] font-semibold">Edit</p>
              </div>
              <p className="text-sm">{initialValue}</p>
            </div>

            <button
              disabled={false}
              onClick={handleDelete}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-500"
            >
              <TrashIcon /> <p>Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreferencesModal;
