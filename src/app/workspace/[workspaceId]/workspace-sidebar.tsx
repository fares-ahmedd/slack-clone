import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspace-header";

function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: isLoadingMember } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: isLoadingWorkspace } = useGetWorkspace({
    id: workspaceId,
  });

  if (isLoadingMember || isLoadingWorkspace) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <Loader className="size-6 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2  text-white h-full justify-center items-center">
        <AlertTriangle className="size-6 text-yellow-300" />

        <p className="text-sm text-yellow-300">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
}

export default WorkspaceSidebar;
