import { Link } from "react-router";
import { DESKTOP_ROUTES } from "../data/routes";

export default function NavLinks() {
  return (
    <nav className="flex items-center gap-8 mx-auto font-sans">
      {DESKTOP_ROUTES.map((route) => (
        <li key={route.label}>
          <Link to={route.href}>{route.label}</Link>
        </li>
      ))}
    </nav>
  );
}
