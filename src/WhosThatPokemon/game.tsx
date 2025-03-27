import React, { useEffect, useRef, useState } from "react";
import WhosThatPokemonInput from "./input";
import WhosThatPokemonImage from "./image";
import WhosThatPokemonTimer, { TimerFunctions } from "./timer";
import WhosTHatPokemonHud from "./hud";
import WhosTHatPokemonEasyMode from "./easy-mode";
import PageWrapper from "../Components/page-wrapper";
import H1 from "@/Components/ui/main-header";
import { cn } from "@/lib/utils";
import { usePokemonContext } from "@/PokemonServiceContext";
import ToggleSwitch from "@/Components/menus/toggle-switch";
import WhosThatTooltips from "@/WhosThatGame/whos-that-tooltips";
import PickGen from "@/Components/pick-gen";
import { Button } from "@/Components/ui/button";
import Portal from "@/Portal";

function WhosThatPokemon() {
  const { isMobile } = usePokemonContext();
  const elapsedTimeRef = useRef<number>(0); //in MS eg.5sec = 5000
  const inputRef = useRef<HTMLInputElement>(null);
  const [reveal, setReveal] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const generatePokemon = () => {
    const randomId = Math.floor(Math.random());
  };

  const handleTimeUpdate = (time: number) => {
    elapsedTimeRef.current = time;
    console.log("Time taken:", time);
  };

  const gameTimerRef = useRef<TimerFunctions>(null);

  const TimerDisplay = () => {
    return <WhosThatPokemonTimer ref={gameTimerRef} setTime={handleTimeUpdate} />;
  };

  const ImageDisplay = () => {
    return (
      <section className="max-md:w-64">
        <WhosThatPokemonImage pokemonId={1} reveal={reveal} />
      </section>
    );
  };

  const UserInput = () => {
    return (
      <section className="w-full">
        <WhosThatPokemonInput inputRef={inputRef} word={"bulbasaur".toLowerCase()} />
      </section>
    );
  };

  const GenerationPicker = () => {
    return (
      <section className="absolute top-0">
        <Button variant={"outline"} onClick={() => setIsModalOpen(!isModalOpen)}>
          Select Generation
        </Button>

        {isModalOpen && (
          <Portal>
            <PickGen toggleModal={() => setIsModalOpen(!isModalOpen)} />
          </Portal>
        )}
      </section>
    );
  };

  const HUD = () => {
    return (
      <section
        className={`text-right p-4 bg-primary/20 ring-2 ring-primary rounded-xl font-mono ${
          isMobile ? "" : "absolute right-0 top-0"
        }`}>
        <div className="flex justify-end">
          <p>EZ</p>
          <ToggleSwitch isChecked={isEasyMode} setIsChecked={setIsEasyMode} />
        </div>
        <TimerDisplay />
        <WhosTHatPokemonHud score={0} hp={5} streak={0} />
      </section>
    );
  };

  const EasyMode = () => {
    return <WhosTHatPokemonEasyMode name="" />;
  };

  return (
    <PageWrapper className="2xl:h-screen">
      <div className="absolute top-0 h-full w-full bg-black/10 -z-50 bgMask1 " />
      <div className="absolute top-0 h-full w-full bg-black/10 -z-50 bgMask2 " />
      <H1 text="Whos That Pokèmon!?" />
      <article
        className={cn(
          "relative w-full flex flex-col justify-start items-center",
          "2xl:h-3/4 2xl:justify-center"
        )}>
        <button onClick={() => gameTimerRef.current?.startTimer()}>START ME</button>
        <button onClick={() => gameTimerRef.current?.stopTimer()}>STOP</button>
        <HUD />
        <GenerationPicker />
        <ImageDisplay />
        {isEasyMode || isMobile ? (
          <EasyMode />
        ) : (
          <>
            <UserInput />
            <WhosThatTooltips />
          </>
        )}
      </article>
    </PageWrapper>
  );
}

export default WhosThatPokemon;
