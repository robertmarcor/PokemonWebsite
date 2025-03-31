import { Pokemon } from "@/models";
import React, { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";

type Props = { pokemon: Pokemon };

function PokemonSprites({ pokemon }: Props) {
  const [activeGen, setActiveGen] = useState<string>("all");

  // Define generation data with their respective games
  const generations = [
    {
      id: "all",
      label: "All Generations",
      games: [],
    },
    {
      id: "i",
      label: "Generation I",
      games: [
        { id: "red-blue", name: "Red/Blue" },
        { id: "yellow", name: "Yellow" },
      ],
    },
    {
      id: "ii",
      label: "Generation II",
      games: [
        { id: "gold", name: "Gold" },
        { id: "silver", name: "Silver" },
        { id: "crystal", name: "Crystal" },
      ],
    },
    {
      id: "iii",
      label: "Generation III",
      games: [
        { id: "ruby-sapphire", name: "Ruby/Sapphire" },
        { id: "emerald", name: "Emerald" },
        { id: "firered-leafgreen", name: "FireRed/LeafGreen" },
      ],
    },
    {
      id: "iv",
      label: "Generation IV",
      games: [
        { id: "diamond-pearl", name: "Diamond/Pearl" },
        { id: "platinum", name: "Platinum" },
        { id: "heartgold-soulsilver", name: "HeartGold/SoulSilver" },
      ],
    },
    {
      id: "v",
      label: "Generation V",
      games: [{ id: "black-white", name: "Black/White" }],
    },
  ];

  // Helper function to check if a sprite URL exists
  const spriteExists = (url: string | null): boolean => {
    return url !== null && url !== "";
  };

  // Helper function to render a sprite image
  const renderSprite = (url: string | null, label: string) => {
    if (!spriteExists(url)) {
      return (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No sprite</span>
          </div>
          <span className="mt-1 text-sm">{label}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <img src={url || ""} alt={label} className="w-24 h-24 object-contain" />
        <span className="mt-1 text-sm">{label}</span>
      </div>
    );
  };

  // Render sprites for a specific game in Generation I
  const renderGenIGame = (gameId: string, gameName: string) => {
    const sprites =
      pokemon.sprites.versions["generation-i"][
        gameId as keyof (typeof pokemon.sprites.versions)["generation-i"]
      ];

    if (!sprites) return null;

    return (
      <Card className="mb-6">
        <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center">{renderSprite(sprites.front_default, "Front")}</div>
          <div className="flex justify-center">{renderSprite(sprites.back_default, "Back")}</div>
        </CardContent>
      </Card>
    );
  };

  // Render sprites for a specific game in Generation II
  const renderGenIIGame = (gameId: string, gameName: string) => {
    const sprites =
      pokemon.sprites.versions["generation-ii"][
        gameId as keyof (typeof pokemon.sprites.versions)["generation-ii"]
      ];

    if (!sprites) return null;

    const hasShiny = spriteExists(sprites.front_shiny) || spriteExists(sprites.back_shiny);

    return (
      <Card className="mb-6">
        <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center">{renderSprite(sprites.front_default, "Front")}</div>
          <div className="flex justify-center">{renderSprite(sprites.back_default, "Back")}</div>
        </CardContent>

        {hasShiny && (
          <>
            <div className="bg-yellow-500 text-black p-2 font-bold">Shiny</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_shiny, "Front")}
              </div>
              <div className="flex justify-center">{renderSprite(sprites.back_shiny, "Back")}</div>
            </CardContent>
          </>
        )}
      </Card>
    );
  };

  // Render sprites for a specific game in Generation III
  const renderGenIIIGame = (gameId: string, gameName: string) => {
    const sprites =
      pokemon.sprites.versions["generation-iii"][
        gameId as keyof (typeof pokemon.sprites.versions)["generation-iii"]
      ];

    if (!sprites) return null;

    // Special case for Emerald which only has front sprites
    if (gameId === "emerald") {
      const emeraldSprites = sprites as {
        front_default: string | null;
        front_shiny: string | null;
      };
      const hasShiny = spriteExists(emeraldSprites.front_shiny);

      return (
        <Card className="mb-6">
          <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
          <CardContent className="flex justify-center p-4">
            {renderSprite(emeraldSprites.front_default, "Front")}
          </CardContent>

          {hasShiny && (
            <>
              <div className="bg-yellow-500 text-black p-2 font-bold">Shiny</div>
              <CardContent className="flex justify-center p-4">
                {renderSprite(emeraldSprites.front_shiny, "Front")}
              </CardContent>
            </>
          )}
        </Card>
      );
    }

    // For Ruby-Sapphire and FireRed-LeafGreen which have both front and back sprites
    const fullSprites = sprites as {
      front_default: string | null;
      front_shiny: string | null;
      back_default: string | null;
      back_shiny: string | null;
    };

    const hasShiny = spriteExists(fullSprites.front_shiny) || spriteExists(fullSprites.back_shiny);

    return (
      <Card className="mb-6">
        <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center">
            {renderSprite(fullSprites.front_default, "Front")}
          </div>
          <div className="flex justify-center">
            {renderSprite(fullSprites.back_default, "Back")}
          </div>
        </CardContent>

        {hasShiny && (
          <>
            <div className="bg-yellow-500 text-black p-2 font-bold">Shiny</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(fullSprites.front_shiny, "Front")}
              </div>
              <div className="flex justify-center">
                {renderSprite(fullSprites.back_shiny, "Back")}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    );
  };

  // Render sprites for a specific game in Generation IV
  const renderGenIVGame = (gameId: string, gameName: string) => {
    const sprites =
      pokemon.sprites.versions["generation-iv"][
        gameId as keyof (typeof pokemon.sprites.versions)["generation-iv"]
      ];

    if (!sprites) return null;

    const hasShiny = spriteExists(sprites.front_shiny) || spriteExists(sprites.back_shiny);
    const hasFemale = spriteExists(sprites.front_female) || spriteExists(sprites.back_female);
    const hasShinyFemale =
      spriteExists(sprites.front_shiny_female) || spriteExists(sprites.back_shiny_female);

    return (
      <Card className="mb-6">
        <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center">{renderSprite(sprites.front_default, "Front")}</div>
          <div className="flex justify-center">{renderSprite(sprites.back_default, "Back")}</div>
        </CardContent>

        {hasShiny && (
          <>
            <div className="bg-yellow-500 text-black p-2 font-bold">Shiny</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_shiny, "Front")}
              </div>
              <div className="flex justify-center">{renderSprite(sprites.back_shiny, "Back")}</div>
            </CardContent>
          </>
        )}

        {hasFemale && (
          <>
            <div className="bg-pink-500 text-white p-2 font-bold">Female</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_female, "Front")}
              </div>
              <div className="flex justify-center">{renderSprite(sprites.back_female, "Back")}</div>
            </CardContent>
          </>
        )}

        {hasShinyFemale && (
          <>
            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-2 font-bold">
              Shiny Female
            </div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_shiny_female, "Front")}
              </div>
              <div className="flex justify-center">
                {renderSprite(sprites.back_shiny_female, "Back")}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    );
  };

  // Render sprites for a specific game in Generation V
  const renderGenVGame = (gameId: string, gameName: string) => {
    const sprites =
      pokemon.sprites.versions["generation-v"][
        gameId as keyof (typeof pokemon.sprites.versions)["generation-v"]
      ];

    if (!sprites) return null;

    const hasShiny = spriteExists(sprites.front_shiny) || spriteExists(sprites.back_shiny);
    const hasFemale = spriteExists(sprites.front_female) || spriteExists(sprites.back_female);
    const hasShinyFemale =
      spriteExists(sprites.front_shiny_female) || spriteExists(sprites.back_shiny_female);
    const hasAnimated =
      sprites.animated &&
      (spriteExists(sprites.animated.front_default) ||
        spriteExists(sprites.animated.back_default) ||
        spriteExists(sprites.animated.front_shiny) ||
        spriteExists(sprites.animated.back_shiny));

    return (
      <Card className="mb-6">
        <div className="bg-primary text-primary-foreground p-2 font-bold">{gameName}</div>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center">{renderSprite(sprites.front_default, "Front")}</div>
          <div className="flex justify-center">{renderSprite(sprites.back_default, "Back")}</div>
        </CardContent>

        {hasShiny && (
          <>
            <div className="bg-yellow-500 text-black p-2 font-bold">Shiny</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_shiny, "Front")}
              </div>
              <div className="flex justify-center">{renderSprite(sprites.back_shiny, "Back")}</div>
            </CardContent>
          </>
        )}

        {hasFemale && (
          <>
            <div className="bg-pink-500 text-white p-2 font-bold">Female</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_female, "Front")}
              </div>
              <div className="flex justify-center">{renderSprite(sprites.back_female, "Back")}</div>
            </CardContent>
          </>
        )}

        {hasShinyFemale && (
          <>
            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-2 font-bold">
              Shiny Female
            </div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.front_shiny_female, "Front")}
              </div>
              <div className="flex justify-center">
                {renderSprite(sprites.back_shiny_female, "Back")}
              </div>
            </CardContent>
          </>
        )}

        {hasAnimated && sprites.animated && (
          <>
            <div className="bg-blue-500 text-white p-2 font-bold">Animated</div>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                {renderSprite(sprites.animated.front_default, "Front")}
              </div>
              <div className="flex justify-center">
                {renderSprite(sprites.animated.back_default, "Back")}
              </div>
            </CardContent>

            {spriteExists(sprites.animated.front_shiny) && (
              <>
                <div className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white p-2 font-bold">
                  Animated Shiny
                </div>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                  <div className="flex justify-center">
                    {renderSprite(sprites.animated.front_shiny, "Front")}
                  </div>
                  <div className="flex justify-center">
                    {renderSprite(sprites.animated.back_shiny, "Back")}
                  </div>
                </CardContent>
              </>
            )}
          </>
        )}
      </Card>
    );
  };

  // Render all generations
  const renderAllGenerations = () => {
    return (
      <div>
        {generations.slice(1).map((gen) => (
          <div key={gen.id} className="mb-8">
            <h2 className="text-xl font-bold mb-4">Generation {gen.id.toUpperCase()}</h2>
            {gen.games.map((game) => {
              switch (gen.id) {
                case "i":
                  return (
                    <React.Fragment key={`${gen.id}-${game.id}`}>
                      {renderGenIGame(game.id, game.name)}
                    </React.Fragment>
                  );
                case "ii":
                  return (
                    <React.Fragment key={`${gen.id}-${game.id}`}>
                      {renderGenIIGame(game.id, game.name)}
                    </React.Fragment>
                  );
                case "iii":
                  return (
                    <React.Fragment key={`${gen.id}-${game.id}`}>
                      {renderGenIIIGame(game.id, game.name)}
                    </React.Fragment>
                  );
                case "iv":
                  return (
                    <React.Fragment key={`${gen.id}-${game.id}`}>
                      {renderGenIVGame(game.id, game.name)}
                    </React.Fragment>
                  );
                case "v":
                  return (
                    <React.Fragment key={`${gen.id}-${game.id}`}>
                      {renderGenVGame(game.id, game.name)}
                    </React.Fragment>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>
    );
  };

  // Render a specific generation
  const renderGeneration = (genId: string) => {
    const gen = generations.find((g) => g.id === genId);
    if (!gen) return null;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Generation {gen.id.toUpperCase()}</h2>
        {gen.games.map((game) => {
          switch (gen.id) {
            case "i":
              return (
                <React.Fragment key={`${gen.id}-${game.id}`}>
                  {renderGenIGame(game.id, game.name)}
                </React.Fragment>
              );
            case "ii":
              return (
                <React.Fragment key={`${gen.id}-${game.id}`}>
                  {renderGenIIGame(game.id, game.name)}
                </React.Fragment>
              );
            case "iii":
              return (
                <React.Fragment key={`${gen.id}-${game.id}`}>
                  {renderGenIIIGame(game.id, game.name)}
                </React.Fragment>
              );
            case "iv":
              return (
                <React.Fragment key={`${gen.id}-${game.id}`}>
                  {renderGenIVGame(game.id, game.name)}
                </React.Fragment>
              );
            case "v":
              return (
                <React.Fragment key={`${gen.id}-${game.id}`}>
                  {renderGenVGame(game.id, game.name)}
                </React.Fragment>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div>
      {/* Generation tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {generations.map((gen) => (
          <button
            key={gen.id}
            className={`px-4 py-2 rounded-md ${
              activeGen === gen.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            onClick={() => setActiveGen(gen.id)}>
            {gen.label}
          </button>
        ))}
      </div>

      {/* Render sprites based on active generation */}
      {activeGen === "all" ? renderAllGenerations() : renderGeneration(activeGen)}
    </div>
  );
}

export default PokemonSprites;
