import { Item } from "@/models";

const ItemSprite = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
  return isLoading ? (
    <div className="w-20 h-20 absolute -top-24 border-2 border-primary bg-gray-200 animate-pulse"></div>
  ) : (
    <img
      src={item.sprites?.default || "/pika.png"}
      alt={item.name}
      className="w-20 absolute -top-24 border-2 border-primary"
    />
  );
};

export default ItemSprite;
