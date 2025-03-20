import { cn } from "../../lib/utils";

type Props = {
  title: string;
  className?: string;
};

function DetailedViewInfoHeader({ title, className }: Props) {
  return <h2 className={cn(className, "text-foreground text-xl font-bold")}>{title}</h2>;
}

export default DetailedViewInfoHeader;
