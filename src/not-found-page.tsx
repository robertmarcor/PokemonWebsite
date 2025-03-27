import { Home } from "lucide-react";
import { Button } from "./Components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="mt-8 gap-2 flex h-full items-center">
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}
