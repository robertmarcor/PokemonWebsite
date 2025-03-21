import { cn } from "../../lib/utils";
import { forwardRef } from "react";

interface DetailedViewSectionProps {
  id?: string;
  heading: string;
  img?: string;
  className?: string;
  children: React.ReactNode;
}

const DetailedViewSection = forwardRef<HTMLDivElement, DetailedViewSectionProps>((props, ref) => {
  const { id, heading, img, className, children } = props;

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        className,
        "scroll-m-12",
        " shadow-lg mb-8 p-6 border  rounded-lg w-full",
        "dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border-blue-500/20"
      )}>
      <div className="flex items-center justify-center">
        {img && <img src={img} alt={img} />}
        <h2 className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 font-bold text-transparent text-2xl uppercase">
          {heading}
        </h2>
        {img && <img src={img} alt={img} />}
      </div>
      {children}
    </div>
  );
});

export default DetailedViewSection;
