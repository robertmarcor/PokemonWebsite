import { NamedAPIResource } from "../resources";

/** Version Sprites */
export interface VersionSprites {
  /** Generation-I Sprites of this Pokémon */
  "generation-i": GenerationISprites;
  /** Generation-II Sprites of this Pokémon */
  "generation-ii": GenerationIISprites;
  /** Generation-III Sprites of this Pokémon */
  "generation-iii": GenerationIIISprites;
  /** Generation-IV Sprites of this Pokémon */
  "generation-iv": GenerationIVSprites;
  /** Generation-V Sprites of this Pokémon */
  "generation-v": GenerationVSprites;
  /** Generation-VI Sprites of this Pokémon */
  "generation-vi": GenerationVISprites;
  /** Generation-VII Sprites of this Pokémon */
  "generation-vii": GenerationVIISprites;
  /** Generation-VIII Sprites of this Pokémon */
  "generation-viii": GenerationVIIISprites;
}

/**
 * A set of sprites used to depict this Pokémon in the game.
 * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
 */
export interface PokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** Dream World, Official Artwork and Home sprites */
  other?: OtherPokemonSprites;
  /** Version Sprites of this Pokémon */
  versions: VersionSprites;
}

/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */
export interface OtherPokemonSprites {
  /** Dream World Sprites of this Pokémon */
  dream_world: DreamWorld;
  /** Official Artwork Sprites of this Pokémon */
  "official-artwork": OfficialArtwork;
  /** Home Artwork Sprites of this Pokémon */
  home: Home;
  /** Pokemon Showdown animated sprites of this Pokémon */
  showdown: Showdown;
}

/** Dream World sprites */
export interface DreamWorld {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Official Artwork sprites */
export interface OfficialArtwork {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
}

/** Home sprites */
export interface Home {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
}

/** Showdown Sprites */
export interface Showdown {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
}

/** Generation-I Srites */
export interface GenerationISprites {
  /** Red-blue sprites of this Pokémon */
  "red-blue": RedBlue;
  /** Yellow sprites of this Pokémon  */
  yellow: Yellow;
}

/** Red/Blue Sprites */
export interface RedBlue {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Yellow sprites */
export interface Yellow {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-II Sprites */
export interface GenerationIISprites {
  /** Crystal sprites of this Pokémon */
  crystal: Crystal;
  /** Gold sprites of this Pokémon */
  gold: Gold;
  /** Silver sprites of this Pokémon */
  silver: Silver;
}

/** Crystal sprites */
export interface Crystal {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The back shiny transparent depiction of this Pokémon from the back in battle */
  back_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The front shiny transparent depiction of this Pokémon from the front in battle */
  front_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

export interface Gold {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Silver sprites */
export interface Silver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-III Sprites */
export interface GenerationIIISprites {
  /** Emerald sprites of this Pokémon */
  emerald: Emerald;
  /** Firered-Leafgreen sprites of this Pokémon */
  "firered-leafgreen": FireredLeafgreen;
  /** Ruby-Sapphire sprites of this Pokémon */
  "ruby-sapphire": RubySapphire;
}

/** Emerald sprites */
export interface Emerald {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** FireRead LeafGreen sprites  */
export interface FireredLeafgreen {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Ruby/Sapphire sprites */
export interface RubySapphire {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Generation-IV Sprites */
export interface GenerationIVSprites {
  /** Diamond-pearl Generation sprites of this Pokémon */
  "diamond-pearl": DiamondPearl;
  /** Heartgold-Soulsilver sprites of this Pokémon */
  "heartgold-soulsilver": HeartgoldSoulsilver;
  /** Platinum sprites of this Pokémon */
  platinum: Platinum;
}

export interface DiamondPearl {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

export interface HeartgoldSoulsilver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

export interface Platinum {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-V Sprites */
export interface GenerationVSprites {
  /** Black-white sprites of this Pokémon */
  "black-white": BlackWhite;
}

/** Black/White sprites */
export interface BlackWhite {
  /** The animated sprite of this pokémon */
  animated: Animated;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}
export interface Animated {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VI Sprites */
export interface GenerationVISprites {
  /** Omegaruby-Alphasapphire sprites of this Pokémon */
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  /** X-Y sprites of this Pokémon */
  "x-y": XY;
}

/** Omega/Ruby Alpha/Sapphire sprites */
export interface OmegarubyAlphasapphire {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** XY sprites */
export interface XY {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VII Sprites */
export interface GenerationVIISprites {
  /** Icon sprites of this Pokémon */
  icons: GenerationViiIcons;
  /** Ultra-sun-ultra-moon sprites of this Pokémon */
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

/** Generation VII icons */
export interface GenerationViiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Ultra Sun Ultra Moon sprites */
export interface UltraSunUltraMoon {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VIII Sprites */
export interface GenerationVIIISprites {
  /** Icon sprites of this Pokémon */
  icons: GenerationViiiIcons;
}

/** Generation VIII icons */
export interface GenerationViiiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/**
 * ## Location Area Encounter
 * Pokémon location areas where Pokémon can be found
 */
export interface LocationAreaEncounter {
  /** The location area the referenced Pokémon can be encountered in */
  location_area: NamedAPIResource;
}
