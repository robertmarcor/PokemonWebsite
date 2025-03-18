import React from "react";
import { cn } from "../lib/utils";

function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        className,
        "max-w-5xl max-sm:max-w-md max-lg:max-w-4xl flex flex-col text-center gap-2 items-center mx-auto my-4"
      )}>
      {children}
    </article>
  );
}

export default React.memo(PageWrapper);
