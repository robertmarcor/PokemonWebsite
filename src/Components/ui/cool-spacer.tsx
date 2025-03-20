import { cn } from "../../lib/utils";

function CoolSpacer({ className }: { className?: string }) {
  return (
    <div className={cn("relative col-span-2 my-4", className)}>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-80" />
    </div>
  );
}

export default CoolSpacer;
