import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const {} = useCurrentMember({ workspaceId });
  const {} = useGetWorkspace({ id: workspaceId });

  return <div>WorkspaceSidebar</div>;
}

export default WorkspaceSidebar;
