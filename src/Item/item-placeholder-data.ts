import { Item } from "@/models";

const placeholderItem: Partial<Item> = {
  id: 0,
  name: "Loading...",
  sprites: { default: "" },
  cost: 0,
  category: { name: "loading", url: "" },
  effect_entries: [
    { effect: "Loading...", short_effect: "Loading...", language: { name: "en", url: "" } },
  ],
  flavor_text_entries: [],
  attributes: [],
  game_indices: [],
};

export default placeholderItem;
