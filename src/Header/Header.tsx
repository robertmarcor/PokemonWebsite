import { Link } from "react-router";

export default function Header({ className }: { className?: string }) {
  return (
    <Link to={"/"}>
      <div className={`${className} flex items-center`}>
        <div className="w-12">
          <img className="w-full" src={"/shit-pokeball.png"} />
        </div>
        <p className="text-2xl font-bold tracking-wide heading ">PokèMenn</p>
      </div>
    </Link>
  );
}
