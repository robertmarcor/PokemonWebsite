type Props = { text: string };

export default function H1({ text }: Props) {
  return (
    <h1 className="max-lg:text-2xl mb-6 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
      {text}
    </h1>
  );
}
