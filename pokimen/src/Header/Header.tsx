type Props = {
  className?: string;
};
export default function Header({ className }: Props) {
  return <div className={`${className} text-2xl font-bold tracking-wide`}>POKEMENN MESTER QUIZT</div>;
}
