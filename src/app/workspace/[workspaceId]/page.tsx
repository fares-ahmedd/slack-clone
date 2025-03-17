"use client";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  params: Promise<{ workspaceId: Id<"workspaces"> }>;
};

function WorkspacePage({ params }: Props) {
  const { workspaceId } = params;
  const { data, isLoading } = useGetWorkspace({ id: workspaceId });

  if (isLoading) return null;
  return <div>ID: {JSON.stringify(data)}</div>;
}

export default WorkspacePage;
