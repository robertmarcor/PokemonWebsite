import { Link } from "react-router";
import { routes } from "./data/routes";

type Props = { className?: string };
export default function Nav({ className }: Props) {
  return (
    <>
      <nav className={`${className} flex`}>
        <ul className="flex items-center gap-4 h-full ml-3">
          {routes.map((route) => (
            <li key={route.name} className="flex items-center font-headings font-bold">
              {route.icon && <img className="h-8 pb-1" src={route.icon} alt={`${route.name}-nav`} />}
              <Link to={route.href}>{route.name.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );
}
