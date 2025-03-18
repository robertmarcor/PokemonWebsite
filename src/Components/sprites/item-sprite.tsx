import { UseGetItemBy } from "../../client/item.client";

type Props = {
  identifier: string | number;
};

export default function ItemSprite({ identifier }: Props) {
  const { data } = UseGetItemBy(identifier);
  return <img src={data?.sprites.default} alt={`${data?.name}-sprite`} />;
}
