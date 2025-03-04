import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { cn } from "../lib/utils";
import PageWrapper from "../Components/page-wrapper";
import Portal from "../Portal";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Portal>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
      </Portal>
      <PageWrapper className="mb-8">
        <header>
          <h1 className="mb-2 text-4xl font-bold tracking-wider text-yellow-400">
            Welcome to Pokèmenn
          </h1>
          <p className="mb-8 text-pretty text-slate-400">
            Fan made website about Pokémon, built with React and PokéAPI for learning about API
            calls, fetching, and state management hooks.
          </p>
        </header>
        <section className="relative mb-12">
          <img
            className="size-64 md:size-80 lg:size-96"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
            alt="pikachu"
          />
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-10 blur-3xl -z-50"></div>
          {window.innerWidth <= 450 && (
            <a href="#cta" className="flex flex-col items-center justify-center animate-pulse">
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
        "bg-black/50 bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl",
        "transition-colors duration-300 hover:bg-black/90",
        "flex flex-col text-left"
      )}>
      <div className="flex items-center mb-4">
        <span className="">{icon}</span>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <p className="text-white/80 mb-6 min-h-[80px]">{description}</p>
      <button
        className={cn(
          "w-full px-4 py-2 mt-auto font-medium",
          "transition-colors duration-200 rounded-lg",
          "bg-gradient-to-tl from-amber-500 to-yellow-400 hover:ring-4 ring-pink-400"
        )}>
        <Link to={linkTo} className="flex items-center justify-center">
          {linkText}
        </Link>
      </button>
    </div>
  );
}
