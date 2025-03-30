import { apiClient } from "@/client/base";
import H1 from "@/Components/layouts/h1-header";
import PageWrapper from "@/Components/page-wrapper";
import { allMoves } from "@/data/movesList";
import { Move, MoveFlavorText, VerboseEffect } from "@/models";
import { getText } from "@/utils/utils";
import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Bag } from "@/assets/bag";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import TypeBadge from "@/Components/ui/type-badge";
import { useState } from "react";
function MovePage() {
  const pageLimit = 50;

  const movesToFetch = () => {
    if (search) {
      const searchTerm = search.replace(" ", "-");
      return allMoves.results.filter((move) => move.name.includes(searchTerm)).slice(0, pageLimit);
    }
    return allMoves.results.slice(0, pageLimit);
  };

  const [search, setSearch] = useState("");
  const moveQueries = useQueries({
    queries: movesToFetch().map((move: { name: string; url: string }) => ({
      queryKey: ["moves", move.name],
      queryFn: () => {
        return apiClient.fetchByUrl<Move>(move.url);
      },
    })),
  });

  const moves = moveQueries
    .map((query) => query.data)
    .filter((data): data is Move => Boolean(data));

  return (
    <PageWrapper>
      <article className="">
        <H1 text="Moves" />
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md my-4 ring focus:ring-primary focus:outline-none focus:ring-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <p>{search}</p>
        <section className="w-full bg-gradient-to-t from-primary/20 to-primary/50">
          <Table>
            <TableCaption>Moves</TableCaption>
            <TableHeader>
              <TableRow className="*:border-r-2 *:border-foreground/30 border-b-2 border-b-primary bg-black/40">
                <TableHead className="">Type</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Power</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>PP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moves.map((move) => (
                <TableRow
                  key={move.name}
                  className="*:border-r-2 *:border-foreground/30 *:border-b-2">
                  <TableCell>
                    <TypeBadge type={move.type.name} />
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    <Link to={`/move/${move.name}`} className="hover:underline">
                      {move.name}
                    </Link>
                  </TableCell>
                  <TableCell>{move.power}</TableCell>
                  <TableCell>{move.accuracy}</TableCell>
                  <TableCell>{move.pp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </article>
    </PageWrapper>
  );
}
export default MovePage;
