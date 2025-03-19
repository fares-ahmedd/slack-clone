import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "../../../../public/logo-text.webp";
function UserButton() {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-white" />;
  }

  if (!data) {
    return null;
  }
  const { image, name, email } = data;

  const fallback = name![0].toLocaleUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative cursor-pointer ">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="capitalize bg-pink-500 text-white">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="right"
        className="w-60 p-2 space-y-2 mx-4 mb-1"
      >
        <Image src={logo} alt={"logo"} className=" size-auto" />
        <address>{email}</address>
        <Separator />
        <DropdownMenuItem onClick={signOut} className="h-10 cursor-pointer">
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
