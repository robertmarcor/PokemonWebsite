import { Pokemon, PokemonSpecies } from "@/models/Pokemon";
import React from "react";

type Props = {
  species: PokemonSpecies;
  pokemon: Pokemon;
  handleFormChange: (formName: string) => void;
};

function PokemonFormSwitcher({ species, pokemon, handleFormChange }: Props) {
  return (
    <section className="grid w-full border-b-2 overflow-hidden mb-4">
      <nav className="flex justify-evenly mx-4 gap-0.5">
        {species.varieties.map((form) => {
          const isSelected = pokemon.name === form.pokemon.name;
          return (
            <button
              key={form.pokemon.name}
              className={`border-2 border-b-0 rounded-t-lg p-1 w-full capitalize transition-all duration-200 ${
                isSelected
                  ? "font-bold bg-gradient-to-b from-transparent to-primary/20 border-primary/50 border-b-2"
                  : "hover:bg-black/5"
              }`}
              onClick={() => handleFormChange(form.pokemon.name)}>
              <p className="flex items-center justify-center gap-1">
                {isSelected && <span className="text-primary">•</span>}
                <span>{form.pokemon.name.replace(/-/g, " ")}</span>
              </p>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
export default PokemonFormSwitcher;
