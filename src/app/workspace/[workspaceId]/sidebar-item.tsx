import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sidebarItemVariant = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
type Props = {
  icon: LucideIcon | IconType;
  label: string;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariant>["variant"];
};
function SidebarItem({ icon: Icon, id, label, variant }: Props) {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      asChild
      variant={"transparent"}
      size={"sm"}
      className={cn(sidebarItemVariant({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />{" "}
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
}

export default SidebarItem;
