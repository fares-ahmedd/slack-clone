import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};

function PreferencesModal({ initialValue, open, setOpen }: Props) {
  const [value, setValue] = useState(initialValue);

  const { muate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { muate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace name</p>
              <p className="text-sm text-[#1264a3] font-semibold">Edit</p>
            </div>
            <p className="text-sm"> {value}</p>
          </div>

          <button
            disabled={false}
            onClick={() => {}}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-500"
          >
            <TrashIcon /> <p>Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreferencesModal;
