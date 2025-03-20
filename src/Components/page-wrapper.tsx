import React from "react";
import { cn } from "../lib/utils";

function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        className,
        "max-w-6xl max-lg:max-w-3xl max-md:max-w-xl",
        "flex flex-col text-center gap-2 items-center mx-auto my-4",
        "max-sm:mx-2"
      )}>
      {children}
    </div>
  );
}

export default React.memo(PageWrapper);
