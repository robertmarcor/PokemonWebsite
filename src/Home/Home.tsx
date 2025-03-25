import { Link } from "react-router";
import { cn } from "../lib/utils";
import PageWrapper from "../Components/page-wrapper";
import { ChevronDown } from "lucide-react";
import ParticlesBackdrop from "../Components/particles-backdrop";
import MyButton from "../Components/ui/myButton";

export default function Home() {
  return (
    <>
      <ParticlesBackdrop />
      <PageWrapper className="xl:mt-12">
        <header>
          <h1 className="mb-2 text-4xl font-bold tracking-wider text-yellow-400">
            Welcome to Pokèmenn
          </h1>
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
        <section className="pb-18">
          <h2 id="cta" className="mb-6 text-2xl font-semibold text-white">
            Choose Your Adventure
          </h2>
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
      <MyButton className="bg-gradient-to-tl from-amber-500 to-yellow-400 hover:from-black/20 hover:to-secondary ring-white">
        <Link to={linkTo} className="flex items-center justify-center">
          {linkText}
        </Link>
      </MyButton>
    </div>
  );
}
