import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Hint from "@/components/hint";
import PreferencesModal from "./preferences-modal";
import { useState } from "react";

type Props = {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
};

function WorkspaceHeader({ workspace, isAdmin }: Props) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  return (
    <>
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5 mt-1 outline-0 ">
        <DropdownMenu>
          <Button
            variant={"transparent"}
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            asChild
          >
            <DropdownMenuTrigger className="outline-none">
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-5 mt-1" />
            </DropdownMenuTrigger>
          </Button>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name.charAt(0).toLocaleUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>

            {isAdmin && (
              <>
                <Separator className="my-1.5" />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => {}}
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>{" "}
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>

          <div className="flex items-center gap-0.5">
            <Hint asChild message="Filter conversations" side="bottom">
              <Button variant={"transparent"} size={"iconSm"}>
                <ListFilter className="size-4" />
              </Button>
            </Hint>
            <Hint asChild message="New Message" side="bottom">
              <Button variant={"transparent"} size={"iconSm"}>
                <SquarePen className="size-4" />
              </Button>
            </Hint>
          </div>
        </DropdownMenu>
      </div>
    </>
  );
}

export default WorkspaceHeader;
