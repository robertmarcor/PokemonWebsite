import React from "react";
import { cn } from "../lib/utils";

function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={cn(className, "max-w-4xl flex flex-col text-center gap-2 items-center mx-auto")}>
      {children}
    </article>
  );
}

export default React.memo(PageWrapper);
