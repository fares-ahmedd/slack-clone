import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function WorkspaceSwitcher() {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces } = useGetWorkspaces();

  const filterWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Hint asChild message={workspace?.name}>
          <Button
            className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl"
            asChild
          >
            <div>
              {workspaceLoading ? (
                <Loader className="size-5 animate-spin shrink-0" />
              ) : (
                workspace?.name.charAt(0).toLocaleUpperCase()
              )}
            </div>
          </Button>
        </Hint>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64 space-y-1"
      >
        <DropdownMenuItem
          className="cursor-pointer flex-col justify-start items-start capitalize gap-0.5"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          <span className="line-clamp-1" title={workspace?.name}>
            {workspace?.name}
          </span>
          <span className="text-xs text-muted-foreground">
            active workspace
          </span>
        </DropdownMenuItem>

        <hr />

        {filterWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize "
            onClick={() => router.push(`/workspace/${workspace._id}`)}
          >
            <span className="size-10 relative overflow-hidden bg-[#ABABAD] flex items-center justify-center rounded-lg text-slate-800 font-semibold text-xl">
              {workspace.name.charAt(0).toUpperCase()}
            </span>
            <span
              className="line-clamp-1 max-w-[150px]"
              title={workspace?.name}
            >
              {" "}
              {workspace.name}
            </span>
          </DropdownMenuItem>
        ))}

        {filterWorkspaces && filterWorkspaces?.length > 0 && <hr />}

        <DropdownMenuItem
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <Plus />
          Create A New Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceSwitcher;
