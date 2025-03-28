import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
  message: string | null | undefined;
  asChild?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
};

function Hint({
  children,
  message,
  align = "center",
  side = "top",
  asChild = false,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-xs"> {message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Hint;
