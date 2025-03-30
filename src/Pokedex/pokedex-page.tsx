import H1 from "@/Components/layouts/h1-header";
import { Zap, Database, Egg, Dna, Award, Heart } from "lucide-react";
import { Link } from "react-router";
import PokedexCategoryCard from "./pokedex-category-card";

function Pokedex() {
  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <div className="mb-12 text-center">
        <H1 text={"Pokedex"} />
        <p className="max-w-2xl mx-auto mt-4 text-xl text-muted-foreground">
          Explore our knowledge-rich database of everything Pokémon
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
        <PokedexCategoryCard
          title="Pokémon"
          description="Comprehensive data on all Pokémon species including stats, evolutions, abilities, and more."
          to="/pokemon"
          icon={<Heart />}
          iconBgColor="bg-red-100 dark:bg-red-950/30"
          iconColor="text-red-500"
        />

        <PokedexCategoryCard
          title="Moves"
          description="Detailed information about all Pokémon moves, including power, accuracy, effects, and which Pokémon can learn them."
          to="/move"
          icon={<Zap />}
          iconBgColor="bg-blue-100 dark:bg-blue-950/30"
          iconColor="text-blue-500"
        />

        <PokedexCategoryCard
          title="Egg Groups"
          description="Information about Pokémon breeding compatibility and egg group classifications."
          to="/egg-groups"
          icon={<Egg />}
          iconBgColor="bg-yellow-100 dark:bg-yellow-950/30"
          iconColor="text-yellow-500"
        />

        <PokedexCategoryCard
          title="Types"
          description="Explore Pokémon types, type effectiveness, and type matchups for strategic battle planning."
          to="/types"
          icon={<Dna />}
          iconBgColor="bg-purple-100 dark:bg-purple-950/30"
          iconColor="text-purple-500"
        />

        <PokedexCategoryCard
          title="Abilities"
          description="Learn about the special abilities that affect Pokémon in battle and in the overworld."
          to="/abilities"
          icon={<Award />}
          iconBgColor="bg-green-100 dark:bg-green-950/30"
          iconColor="text-green-500"
        />

        <PokedexCategoryCard
          title="Items"
          description="Browse through all the items available in the Pokémon games, from Poké Balls to evolution stones."
          to="/items"
          icon={<Database />}
          iconBgColor="bg-orange-100 dark:bg-orange-950/30"
          iconColor="text-orange-500"
        />
      </div>

      <div className="p-6 mt-16 text-center bg-white rounded-md">
        <h2 className="mb-4 text-2xl font-bold">Ready to become a Pokémon Master?</h2>
        <p className="max-w-2xl mx-auto mb-6 text-muted">
          Our comprehensive database is updated regularly with the latest information from all
          Pokémon games.
        </p>
        <Link
          to="/random"
          className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Discover a Random Pokémon
        </Link>
      </div>
    </div>
  );
}

export default Pokedex;
