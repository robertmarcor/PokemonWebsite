import { Link } from "react-router-dom";
import { DESKTOP_ROUTES } from "../data/routes";

export default function NavLinks() {
  return (
    <nav className="flex font-sans gap-8 mx-auto items-center">
      {DESKTOP_ROUTES.map((route) => (
        <li key={route.label}>
          <Link to={route.href}>{route.label}</Link>
        </li>
      ))}
    </nav>
  );
}
