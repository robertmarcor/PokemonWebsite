import { Link } from "react-router";
import { DESKTOP_ROUTES } from "../data/routes";
import { useEffect, useState } from "react";

export default function Header({ className }: { className?: string }) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 630);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Link to={"/"}>
        <div className={`${className} flex items-center w-full`}>
          <div className="w-12">
            <img className="w-full" src={"/shit-pokeball.png"} />
          </div>
          <p className="text-2xl font-bold tracking-wide heading ">PokèMenn</p>
        </div>
      </Link>
      {isDesktop && (
        <nav className="mx-auto flex font-sans gap-8">
          {DESKTOP_ROUTES.map((route) => (
            <li key={route.label}>
              <Link to={route.href}>{route.label}</Link>
            </li>
          ))}
        </nav>
      )}
    </>
  );
}
