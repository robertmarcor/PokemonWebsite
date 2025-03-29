import { cn } from "@/lib/utils";
import { Item, VersionGroupFlavorText } from "@/models";
import { getText } from "@/utils/utils";

const ItemDescription = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
  return (
    <div className={cn("text-left text-lg *:py-1", isLoading && "animate-pulse")}>
      <p>
        <strong>Cost:</strong> {isLoading ? "..." : item.cost}
      </p>
      <p className="capitalize">
        <strong>Category:</strong>{" "}
        {isLoading ? "..." : item.category?.name?.replace("-", " ") || "Unknown"}
      </p>
      <strong>Info:</strong>
      <p>
        {isLoading
          ? "Loading description..."
          : getText<VersionGroupFlavorText>(item.flavor_text_entries)?.text ||
            "No description available."}
      </p>
      <p>{isLoading ? "" : item.effect_entries?.[0]?.short_effect || ""}</p>
    </div>
  );
};

export default ItemDescription;
