"use client";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Id } from "../../../../convex/_generated/dataModel";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ workspaceId: Id<"workspaces"> }>;
};

function WorkspacePage({ params }: Props) {
  const { workspaceId } = params;
  const { data, isLoading } = useGetWorkspace({ id: workspaceId });

  if (isLoading) return null;
  if (!data) {
    redirect("/");
  }
  return <div>Workspace id Page</div>;
}

export default WorkspacePage;
