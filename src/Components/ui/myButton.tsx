import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

function MyButton({ children, className }: Props) {
  return (
    <button
      className={cn(
        className,
        "p-4 text-foreground",
        "transition-colors duration-200 rounded-lg",
        "hover:ring-4"
      )}>
      {children}
    </button>
  );
}

export default MyButton;
