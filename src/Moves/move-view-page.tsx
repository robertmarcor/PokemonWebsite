import { apiClient } from "@/client/base";
import PageWrapper from "@/Components/page-wrapper";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import TypeBadge from "@/Components/ui/type-badge";
import { allMoves } from "@/data/movesList";
import { Move, MoveFlavorText, VerboseEffect } from "@/models";
import { getText } from "@/utils/utils";
import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router";

function MovePage() {
  const pageLimit = 20;

  const movesToFetch = allMoves.slice(0, pageLimit);

  const moveQueries = useQueries({
    queries: movesToFetch.map((move) => ({
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
      <div className="container py-8">
        <h1 className="mb-6 text-3xl font-bold">Pokémon Moves</h1>

        <div className="grid gap-4 mx-4 md:grid-cols-2">
          {moves.map((move) => (
            <Card key={move.id}>
              <Link to={`/move/${move.name}`}>
                <CardHeader className="flex items-center gap-3">
                  <TypeBadge type={move.type.name} className="py-1.5 text-xs" />
                  <h3 className="text-xl font-bold capitalize">{move.name}</h3>
                </CardHeader>
              </Link>
              <CardContent className="">
                <section className="font-sans text-left">
                  <p className="mt-2">
                    Effect: {getText<MoveFlavorText>(move.flavor_text_entries)?.flavor_text}
                  </p>
                  <p className="mt-2">
                    Description: {getText<VerboseEffect>(move.effect_entries)?.effect}
                  </p>
                </section>

                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                  <div>
                    <span className="font-semibold">Power:</span> {move.power || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Accuracy:</span>{" "}
                    {move.accuracy ? `${move.accuracy}%` : "—"}
                  </div>
                  <div>
                    <span className="font-semibold">PP:</span> {move.pp}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default MovePage;
