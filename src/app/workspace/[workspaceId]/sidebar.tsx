import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./workspace-switcher";
import SidebarButton from "./sidebar-button";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-[70px] h-full bg-[#5f2659] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px] border-r border-white">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive />
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
}

export default Sidebar;
