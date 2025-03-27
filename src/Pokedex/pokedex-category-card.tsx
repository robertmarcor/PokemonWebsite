import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PokedexCategoryCardProps {
  title: string;
  description: string;
  to: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export default function PokedexCategoryCard({
  title,
  description,
  to,
  icon,
  iconBgColor,
  iconColor,
}: PokedexCategoryCardProps) {
  return (
    <Link to={to} className="group">
      <div className="bg-background border border-input rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-primary h-full">
        <div
          className={`${iconBgColor} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
          <div className={`h-8 w-8 ${iconColor}`}>{icon}</div>
        </div>
        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
