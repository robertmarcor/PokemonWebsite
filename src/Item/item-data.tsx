import { cn } from "@/lib/utils";
import { Item } from "@/models";
import React from "react";

const ItemData = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
  return (
    <article
      className={cn(
        "w-full flex flex-col items-center justify-center mt-6",
        "ring-2 ring-primary rounded-lg p-4 bg-white dark:bg-background/80",
        isLoading && "animate-pulse"
      )}>
      <section className="w-full">
        <h2 className="font-bold">Detailed Effect</h2>
        <p className="text-base">
          {isLoading
            ? "Loading detailed effect information..."
            : item.effect_entries?.[0]?.effect || "No detailed effect information available."}
        </p>
      </section>
      {!isLoading && item.attributes && item.attributes.length > 0 && (
        <section className="w-full">
          <h2 className="font-bold">Attributes</h2>
          <ul className="w-full flex gap-2 justify-evenly">
            {item.attributes.map((attr, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-medium">{attr.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!isLoading && item.game_indices && item.game_indices.length > 0 && (
        <section className="w-full mt-4">
          <h2 className="font-bold mb-2">Game Appearances</h2>
          <ul className="flex gap-2 justify-evenly">
            {item.game_indices.map((game, index) => (
              <li key={index} className="flex justify-between">
                <span>{game.generation.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default ItemData;
