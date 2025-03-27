import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

interface MoveNavigationProps {
  moveId: number;
}

export default function MoveNavigation({ moveId }: MoveNavigationProps) {
  return (
    <nav className="flex justify-between mt-6 w-full">
      <Button onClick={() => window.history.back()}>Back</Button>

      <div className="flex gap-2">
        {moveId > 1 && (
          <Link to={`/move/${moveId - 1}`}>
            <Button>Previous Move</Button>
          </Link>
        )}
        <Link to={`/move/${moveId + 1}`}>
          <Button>Next Move</Button>
        </Link>
      </div>
    </nav>
  );
}
