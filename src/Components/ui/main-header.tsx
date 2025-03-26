type Props = { text: string };

export default function H1({ text }: Props) {
  return <h1 className="max-lg:text-2xl whitespace-nowrap">{text}</h1>;
}
