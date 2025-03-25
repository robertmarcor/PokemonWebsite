import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

const ThemeToggleButton = ({ className, size = 20 }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(className, "p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      {theme === "dark" ? (
        <Moon size={size} className="text-blue-300" />
      ) : (
        <Sun size={size} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
