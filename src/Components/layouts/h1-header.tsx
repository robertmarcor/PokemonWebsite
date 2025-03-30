type Props = { text: string };

export default function H1({ text }: Props) {
  return (
    <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r/longer from-primary to-secondary capitalize">
      {text}
    </h1>
  );
}
