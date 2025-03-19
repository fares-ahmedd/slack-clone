import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Loader, Search } from "lucide-react";

function Toolbar() {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useGetWorkspace({ id: workspaceId });
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  return (
    <nav className="bg-[#5f2659] flex items-center justify-between gap-1.5 h-10 py-1.5 px-4 border-b text-white">
      {isLoadingUser ? (
        <Loader className="size-6 animate-spin text-white" />
      ) : (
        <h1 className="text-base md:text-xl">{user?.name}</h1>
      )}

      <div className="w-full max-w-[642px] grow-[2] shrink">
        <Button
          size={"sm"}
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs flex items-center gap-2 capitalize">
            Search{" "}
            {isLoading ? (
              <Loader className="size-4 animate-spin text-white" />
            ) : (
              data?.name
            )}
          </span>
        </Button>
      </div>

      <div>
        <Button variant={"transparent"} size={"iconSm"}>
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
}

export default Toolbar;
