import { cn } from "@/lib/utils";

type Props = { text: string; className?: string };

export default function H1({ text, className }: Props) {
  return (
    <h1
      className={cn(
        "text-4xl text-center text-transparent bg-clip-text bg-linear-to-r/longer from-primary to-secondary capitalize my-8",
        className
      )}>
      {text}
    </h1>
  );
}
