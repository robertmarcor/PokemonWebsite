import { Link } from "react-router";
import { ROUTES } from "./data/routes";
type Props = { className?: string };
export default function Nav({ className }: Props) {
  const _routes = Object.entries(ROUTES).map(([key, route]) => ({
    key,
    ...route,
  }));

  console.log(_routes);
  return (
    <>
      <nav className={`${className} flex`}>
        <ul className="flex items-center gap-4 h-full ml-3 text-nowrap">
          {_routes.map((route) => (
            <li key={route.key} className="flex items-center font-headings font-bold">
              {route.icon && (
                <img className="h-8 pb-1 pr-1" src={route.icon} alt={`${route.key}-link-icon`} />
              )}
              <Link
                className="hover:text-emerald-400 hover:underline underline-offset-6"
                to={route.href}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );
}
