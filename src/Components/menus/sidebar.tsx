import { X, ChevronRight } from "lucide-react";
import { Route } from "../../data/routes";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  routes: Route[];
  setIsOpen: () => void;
};

function SidebarComp({ setIsOpen, routes }: Props) {
  return (
    <>
      {/* Background Overlay with Smooth Fade */}
      <div
        className={cn(
          "fixed inset-0 z-40",
          "bg-black/50 backdrop-blur-[2px]",
          "transition-opacity duration-300"
        )}
        onClick={setIsOpen}
      />

      {/* Sidebar with Slide Animation */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen",
          "w-[280px] md:w-[320px] overflow-y-auto",
          "bg-background",
          "border-r-4 border-primary",
          "shadow-2xl transition-all duration-300"
        )}>
        {/* Header with Close Button */}
        <div className={cn("flex items-center justify-between p-5", "border-b-4 border-primary")}>
          <h2 className={cn("text-xl font-bold text-primary")}>Menu</h2>
          <button
            className={cn("p-2 rounded-full text-foreground", "transition-all hover:bg-primary")}
            onClick={setIsOpen}
            aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={cn("p-3")}>
          <ul className={cn("space-y-1")}>
            {routes.map((route) => (
              <li key={route.href} className={cn("rounded-lg")}>
                <NavLink
                  to={route.href}
                  onClick={setIsOpen}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-lg",
                      "transition-all duration-200",
                      isActive
                        ? "bg-primary/15 text-primary font-medium"
                        : "text-foreground hover:bg-primary hover:text-background"
                    )
                  }>
                  <div className={cn("flex items-center justify-between w-full")}>
                    <span>{route.label}</span>
                    {route.subroutes?.length !== 0 && (
                      <ChevronRight
                        className={cn(
                          "w-4 h-4",
                          "transition-transform duration-200 group-hover:rotate-90"
                        )}
                      />
                    )}
                  </div>
                </NavLink>
                {route.subroutes?.length !== 0 && (
                  <ul
                    className={cn(
                      "flex flex-col gap-4 ml-4 p-2",
                      "border-l-4 border-primary pl-2"
                    )}>
                    {route.subroutes?.map((subroute) => (
                      <li key={subroute.href}>
                        <NavLink
                          to={subroute.href}
                          onClick={setIsOpen}
                          className={({ isActive }) =>
                            cn(
                              "p-2 text-sm rounded-md",
                              "transition-all duration-200 ring-2 ring-primary-accent",
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-foreground hover:bg-primary"
                            )
                          }>
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
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-5",
            "border-t-4 border-primary",
            "bg-background/80 backdrop-blur-sm"
          )}>
          <button
            className={cn(
              "flex items-center justify-center w-full gap-2 p-3",
              "bg-primary text-white font-medium",
              "rounded-lg shadow-md",
              "transition-all duration-200",
              "hover:bg-primary hover:shadow-lg"
            )}>
            <span>(●'◡'●)</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SidebarComp;
