import { NavLink } from "react-router-dom";
import { ROUTES } from "./data/routes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
type Props = { className?: string };

export default function Nav({ className }: Props) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth > 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth > 768);
  }, []);

  const _routes = Object.entries(ROUTES).map(([key, route]) => ({
    key,
    ...route,
  }));

  return (
    <nav className={`${className}`}>
      {!isMobile && (
        <button
          className="fixed top-4 right-4 z-40 p-2 rounded-md border-2 text-black bg-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      )}

      {isMobile ? (
        <ul className="flex items-center gap-4 h-full ml-3 text-nowrap">
          {_routes.map((route) => (
            <li
              key={route.key}
              className="flex items-center font-pixel tracking-[.2rem] font-medium">
              {route.icon && (
                <img className="h-8 pb-1 pr-1" src={route.icon} alt={`${route.key}-link-icon`} />
              )}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "underline text-orange-500"
                    : "hover:text-orange-400 hover:underline underline-offset-6"
                }
                to={route.href}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}>
          <ul
            className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-gray-900 text-white transform transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu">
              <X size={28} />
            </button>
            {_routes.map((route) => (
              <li key={route.key} className="p-4 border-b border-gray-700">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline text-orange-500"
                      : "hover:text-sky-400 hover:underline underline-offset-6"
                  }
                  to={route.href}
                  onClick={() => setIsOpen(false)}>
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
