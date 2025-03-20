import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  params: Promise<{ workspaceId: Id<"workspaces"> }>;
};

async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;
  // const { data, isLoading } = useGetWorkspace({ id: workspaceId });

  // if (isLoading) return null;
  // if (!data) {
  //   redirect("/");
  // }
  return <div>Workspace id Page {workspaceId}</div>;
}

export default WorkspacePage;
