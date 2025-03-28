import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquare,
  SendHorizonal,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import WorkspaceHeader from "./workspace-header";
import WorkspaceSection from "./workspace-section";

function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: isLoadingMember } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: isLoadingWorkspace } = useGetWorkspace({
    id: workspaceId,
  });

  const { data: channels, isLoading: isLoadingChannels } = useGetChannels({
    workspaceId,
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

      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquare} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="sent" />
      </div>
      <WorkspaceSection label="Channels" hint="New Channel" onNew={() => {}}>
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
}

export default WorkspaceSidebar;
