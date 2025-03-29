import { UseGetItem } from "../../client/item.client";

type Props = {
  identifier: string | number;
  className: string;
};

export default function ItemSprite({ identifier, className }: Props) {
  const { data } = UseGetItem(identifier);
  return <img className={className} src={data?.sprites.default} alt={`${data?.name}-sprite`} />;
}
