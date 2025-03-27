/* eslint-disable @typescript-eslint/no-explicit-any */
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";

interface PalettePageProps {
  id: string;
  items: any[];
  search: string;
  maxItems?: number;
}

const PalettePage: React.FC<PalettePageProps> = ({ id, items, search, maxItems }) => {
  const filteredItems = filterItems(items, search);

  return (
    <CommandPalette.Page id={id}>
      {filteredItems.length ? (
        filteredItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {(maxItems ? list.items.slice(0, maxItems) : list.items).map(({ id, ...rest }: any) => (
              <CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))
      ) : (
        <CommandPalette.FreeSearchAction />
      )}
    </CommandPalette.Page>
  );
};

export default PalettePage;
