import { Link } from "react-router";
import { cn } from "../lib/utils";
import PageWrapper from "../Components/page-wrapper";
import { ChevronDown, Command } from "lucide-react";
import ParticlesBackdrop from "../Components/particles-backdrop";
import MyButton from "../Components/ui/myButton";
import { KeyboardShortcut } from "@/assets/icons";
import { usePokemonContext } from "@/PokemonServiceContext";

export default function Home() {
  const { isMobile } = usePokemonContext();
  return (
    <>
      <ParticlesBackdrop />
      <div className="fixed bg-black -z-40 w-full h-screen" />
      <PageWrapper className="mt-8">
        <header>
          <h1 className="mb-2 font-bold tracking-wider text-yellow-400 hero">Pokèmenn</h1>
          <p className="mb-8 font-sans mx-20 text-white">
            Fan made website about Pokémon, built with React and PokéAPI for learning about API
            calls, fetching, and state management hooks.
          </p>
        </header>
        <section className="relative mb-12">
          <img className="w-auto xl:w-64" src="/big-pika.svg" alt="pikachu" />
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 blur-[100px] -z-20" />
          {window.innerWidth <= 500 && (
            <a href="#cta" className="flex flex-col items-center justify-center animate-pulse mt-8">
              <p>Scroll</p>
              <ChevronDown />
            </a>
          )}
        </section>

        {!isMobile && (
          <section className="text-center bg-primary/40 rounded-lg p-6 text-white">
            <h2 className="font-bold text-yellow-400 mb-6">Power users</h2>
            <div className="flex flex-col justify-center items-center font-sans text-xl gap-2">
              <p className="flex center items-center gap-2">
                Press{" "}
                <span className="p-1 bg-black/40 rounded border border-border">
                  <Command size={20} />
                </span>
                +<KeyboardShortcut>K</KeyboardShortcut>
                on Mac
              </p>
              <span className="flex items-center gap-1">
                <KeyboardShortcut>Ctrl</KeyboardShortcut>+<KeyboardShortcut>K</KeyboardShortcut> on
                Windows
              </span>
              <p className="">Access the command menu to quickly navigate and perform actions.</p>
            </div>
          </section>
        )}

        <section className="pb-18 mt-8">
          <h3 id="cta" className="mb-6 text-2xl font-semibold text-yellow-400">
            Choose Your Adventure
          </h3>
          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2">
            <Card
              title="Pokémon Games"
              description="Test your knowledge with fun Pokémon mini-games. Challenge yourself with quizzes, memory games, and more!"
              linkText="Play Games"
              linkTo="/games"
              icon="🎮"
            />
            <Card
              title="Pokédex"
              description="Explore the complete Pokédex with detailed information about every Pokémon, their types, abilities, and evolutions."
              linkText="Open Pokédex"
              linkTo="/pokedex"
              icon="📱"
            />
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

type CardProps = {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  icon: string;
};
function Card({ title, description, linkText, linkTo, icon }: CardProps) {
  return (
    <div
      className={cn(
        "bg-black ring-4 ring-primary rounded-xl p-6 shadow-lg hover:shadow-xl",
        "transition-all duration-300 hover:ring-secondary",
        "flex flex-col text-left group"
      )}>
      <div className="flex items-center mb-4">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-2xl group-hover:text-secondary">{title}</h2>
      </div>
      <p className="text-white/80 mb-6 min-h-[80px] font-sans">{description}</p>
      <MyButton className="bg-gradient-to-tl from-amber-500 to-yellow-400 hover:bg-white hover:to-yellow-400/50 ring-white mt-auto">
        <Link to={linkTo} className="flex items-center justify-center">
          {linkText}
        </Link>
      </MyButton>
    </div>
  );
}
