import { X, ChevronRight } from "lucide-react";
import { Route } from "../data/routes";
import { NavLink } from "react-router-dom"; // ✅ Fixed Import

type Props = {
  routes: Route[];
  setIsOpen: () => void;
};

function SidebarComp({ setIsOpen, routes }: Props) {
  return (
    <>
      {/* Background Overlay with Smooth Fade */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={setIsOpen} />

      {/* Sidebar with Slide Animation */}
      <aside className="fixed top-0 left-0 z-50 min-h-screen overflow-y-auto transition-transform shadow-xl sm:w-80 md:w-96 bg-slate-900">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="font-bold">Menu</h2>
          <button
            className="p-2 transition-colors rounded-full hover:bg-slate-800"
            onClick={setIsOpen}
            aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.href}>
                <NavLink
                  to={route.href}
                  onClick={setIsOpen}
                  className="flex items-center p-3 transition-colors rounded-lg hover:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <span>{route.label}</span>
                    {route.subroutes?.length !== 0 && <ChevronRight className="w-4 h-4" />}
                  </div>
                </NavLink>
                {route.subroutes?.length !== 0 && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {route.subroutes?.map((subroute) => (
                      <li key={subroute.href}>
                        <NavLink
                          to={subroute.href}
                          onClick={setIsOpen}
                          className="block p-2 text-sm text-gray-400 rounded-lg hover:bg-slate-700 hover:text-white">
                          {subroute.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button className="flex items-center justify-center w-full gap-2 p-3 text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700">
            <span>(●'◡'●)</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SidebarComp;
