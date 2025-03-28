import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
type Props = {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: VoidFunction;
};

function WorkspaceSection({ children, hint, label, onNew }: Props) {
  const [] = useToggle(false);
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant={"transparent"}
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
        >
          <FaCaretDown className="size-4" />
        </Button>
        <Button
          variant={"transparent"}
          size={"sm"}
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>

        {onNew && (
          <Hint asChild message={hint}>
            <Button
              onClick={onNew}
              variant={"transparent"}
              size={"iconSm"}
              className=" transition-opacity  duration-300 opacity-0 group-hover:opacity-100 ml-auto p-0.5 text-sm size-6 shrink-0"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>

      {children}
    </div>
  );
}

export default WorkspaceSection;
