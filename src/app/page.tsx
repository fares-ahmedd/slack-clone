"use client";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import Logo from "@/components/logo";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = data?.[0]?._id;

  useEffect(() => {
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [workspaceId, open, setOpen, router]);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3 bg-[#5f2659]">
      {isLoading ? (
        <Loader className="size-6 animate-spin text-white" />
      ) : (
        <>
          <Logo size={100} />
          <Button
            onClick={() => setOpen(true)}
            size={"lg"}
            variant={"secondary"}
          >
            <Plus className="size-4" /> Create Workspace
          </Button>
        </>
      )}
    </div>
  );
}
