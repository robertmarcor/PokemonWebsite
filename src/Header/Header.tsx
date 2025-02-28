export default function Header({ className }: { className?: string }) {
  const iconUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png";
  return (
    <div className={`${className} flex text-nowrap`}>
      <div className="w-12">
        <img className="w-full" src={iconUrl || "fallback"} alt="" />
      </div>
      <p className="text-2xl sm:text-5xl font-bold tracking-wide heading ">PokèMenn Quizter</p>
    </div>
  );
}
