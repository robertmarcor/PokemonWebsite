import { useEffect, useState } from "react";
import { useGetGenerationById, useGetMultipleGenerationById } from "../client/generation.client";
import PickGen from "../Components/pick-gen";

export default function PokedexGame() {
  const { data: genData, isLoading: genLoading } = useGetGenerationById(1);

  return (
    <div className="grid w-full gap-4">
      <h1 className="text-5xl font-headings font-extrabold my-8">Fill the Dex</h1>
      <PickGen />
    </div>
  );
}
