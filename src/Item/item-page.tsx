import PageWrapper from "@/Components/page-wrapper";
import H1 from "@/Components/layouts/page-header";
import { useEffect, useState } from "react";
import { allItems } from "@/data/itemsList";
import { Item, NamedAPIResource, VersionGroupFlavorText } from "@/models";
import { extractIdFromUrl, getText } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { useParams, useNavigate } from "react-router";
import { UseGetItem } from "@/client/item.client";
import ItemData from "./item-data";
import ItemDescription from "./item-description";
import ItemSprite from "./item-sprite";
import placeholderItem from "./item-placeholder-data";

function ItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedItemName, setSelectedItemName] = useState<string>(
    slug || allItems.results[0]?.name || ""
  );
  const [items, setItems] = useState<NamedAPIResource[]>([]);

  const pageLimit = 31;

  const { data: selectedItem, isLoading, isError, error } = UseGetItem(selectedItemName);

  useEffect(() => {
    if (!slug && allItems.results.length > 0) {
      const defaultItemName = allItems.results[0].name;
      setSelectedItemName(defaultItemName);
      navigate(`/item/${defaultItemName}`, { replace: true });
    } else if (slug) {
      setSelectedItemName(slug);
    }

    // Find the index of the selected item
    const selectedItemIndex = allItems.results.findIndex((item) => item.name === selectedItemName);

    if (selectedItemIndex !== -1) {
      // Calculate half of the page limit (how many items on each side)
      const halfPageLimit = Math.floor(pageLimit / 2);

      // Calculate start and end indices with boundary checks
      let startIndex = selectedItemIndex - halfPageLimit;
      let endIndex = selectedItemIndex + halfPageLimit + 1; // +1 because slice end is exclusive

      // Adjust if startIndex is negative
      if (startIndex < 0) {
        startIndex = 0;
        endIndex = Math.min(pageLimit, allItems.results.length);
      }

      // Adjust if endIndex exceeds array length
      if (endIndex > allItems.results.length) {
        endIndex = allItems.results.length;
        startIndex = Math.max(0, endIndex - pageLimit);
      }

      // Set the items to display
      setItems(allItems.results.slice(startIndex, endIndex));
    } else {
      // Fallback if item not found
      setItems(allItems.results.slice(0, pageLimit));
    }
  }, [slug, navigate, selectedItemName]); // Added selectedItemName to dependencies

  const handleSelectItem = (itemName: string) => {
    setSelectedItemName(itemName);
    navigate(`/item/${itemName}`);
  };

  if (isError) {
    return (
      <PageWrapper>
        <div className="flex flex-col justify-center items-center h-screen">
          <H1 text="Error" />
          <p className="text-xl text-red-500">{error?.message || "Failed to load item"}</p>
          <p className="mt-4">
            <span className="text-xl">" {selectedItemName} "</span> is not a valid item
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <article className="container py-8 flex flex-col items-center">
        <H1 text="Items" />
        <BagView
          item={isLoading ? (placeholderItem as Item) : selectedItem || (placeholderItem as Item)}
          items={items}
          selectedItem={
            isLoading ? (placeholderItem as Item) : selectedItem || (placeholderItem as Item)
          }
          setSelectedItem={handleSelectItem}
          isLoading={isLoading}
          currentItemName={selectedItemName}
        />
      </article>
    </PageWrapper>
  );
}

interface BagViewProps {
  item: Item;
  items: NamedAPIResource[];
  selectedItem: Item;
  setSelectedItem: (itemName: string) => void;
  isLoading: boolean;
  currentItemName: string;
}

const BagView = ({
  items,
  selectedItem,
  setSelectedItem,
  isLoading,
  currentItemName,
}: BagViewProps) => {
  return (
    <>
      <section className="grid grid-cols-[1fr_3rem_1fr] grid-rows-[0.2fr_1fr_0.6fr] h-[38rem] w-full">
        {/* Left Side */}
        <div className="border-primary border-2 flex flex-col items-center justify-center relative">
          <div className="flex items-center justify-center h-14 w-full p-4">
            <p
              className={cn(
                "text-2xl tracking-widest bg-primary/20",
                "w-full flex justify-center items-center gap-2 p-1.5",
                isLoading && "animate-pulse"
              )}>
              <ChevronLeft size={32} />
              <span className="bg-black/20 px-2 rounded-full">
                #{isLoading ? "..." : selectedItem.id}
              </span>
              <span className="capitalize flex-1">
                {isLoading ? currentItemName : selectedItem.name}
              </span>
              <ChevronRight size={32} />
            </p>
            {/* Bag */}
            <div className="absolute top-20">
              <Badge className="text-xl">*{allItems.results.length}* Items</Badge>
              <img src="/bag.png" alt="bag" className="w-52" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className={cn(
            "mt-auto w-full h-full p-4 flex items-center rounded-s-lg relative",
            "border-2 border-r-0 border-primary",
            "col-span-2 row-start-3",
            "bg-gradient-to-t from-primary/20 to-primary/50",
            isLoading && "animate-pulse"
          )}>
          <ItemSprite item={selectedItem} isLoading={isLoading} />
          <ItemDescription item={selectedItem} isLoading={isLoading} />
        </div>
        {/* ConnectorBar */}
        <div className="w-12 h-2 mt-8 bg-primary col-start-2 row-start-1" />
        {/* Right Side */}
        <div className="min-h-full border-2 border-primary p-5 col-start-3 row-start-1 row-span-3">
          <ul className="h-full bg-gradient-to-t from-primary/30 to-primary/50 rounded-lg p-4 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.name}
                className={cn(
                  "capitalize text-2xl tracking-widest font-semibold flex justify-between px-2 cursor-pointer hover:bg-accent/50 transition-colors",
                  selectedItem.name === item.name && "bg-accent/90",
                  isLoading && "opacity-70"
                )}
                onClick={() => setSelectedItem(item.name)}>
                <span>1x</span>
                <span>{item.name.replace(/-/g, " ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ItemData item={selectedItem} isLoading={isLoading} />
    </>
  );
};

export default ItemPage;
