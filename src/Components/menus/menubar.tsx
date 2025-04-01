import { ReactNode } from "react";
import ThemeToggleButton from "./theme-toggler";
import NavLinks from "../../Header/Header";
import Logo from "../logo";
import { usePokemonContext } from "@/PokemonServiceContext";
import HamburgerMenu from "./hamburger-menu";
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";

function MenuBar() {
  const { isMobile, isLaptop } = usePokemonContext();

  const UI = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex bg-menu h-6 z-50">
        <div
          className={cn(
            `${isLaptop ? "mx-0 h-[4.4rem]" : "mx-20 mr-[19rem]"}`,
            "relative bg-menu border-primary border-b-4 w-full"
          )}
        />
        <div className="absolute bg-menu w-64 h-12 right-0 top-[18px] shadow-[4px_4px_0px_2px] shadow-primary">
          {!isLaptop && (
            <div className="absolute bg-menu h-12 w-12 skew-x-[45deg] -left-6 shadow-[-6px_4px_0px_2px] shadow-primary" />
          )}
        </div>

        <div className="absolute bg-menu w-64 h-12 left-0 top-[18px] shadow-[-4px_4px_0px_2px] shadow-primary">
          {!isLaptop && (
            <div className="absolute bg-menu h-12 w-12 skew-x-[-45deg] -right-6 shadow-[6px_4px_0px_2px] shadow-primary" />
          )}
        </div>
        {children}
      </div>
    );
  };

  return (
    <>
      <UI>
        <div className="absolute left-2 top-3 flex">
          <HamburgerMenu className="top-12 left-50 text-white" />

          <Logo />
        </div>
        <div className="flex absolute right-2 top-6 items-center gap-2 z-50">
          {!isMobile && <SearchBar />}
          <ThemeToggleButton className="-translate-y-[2px]" size={16} />
        </div>
      </UI>
      <div className="bg-primary opacity-80 w-full  h-12 flex justify-center items-center text-white font-semibold shadow-[0px_0px_10px_3px] shadow-primary">
        {!isLaptop && (
          <div className="flex gap-8">
            <NavLinks />
          </div>
        )}
      </div>
    </>
  );
}

export default MenuBar;
