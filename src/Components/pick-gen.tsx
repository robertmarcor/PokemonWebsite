import { useState } from "react";
import { generations } from "../data/consts";

type PickGenProps = {
  setGeneration: (gen: number) => void;
  onClose: () => void;
};

function PickGen({ setGeneration, onClose }: PickGenProps) {
  const [selectedGen, setSelectedGen] = useState<number>(0);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="text-center border-2 w-[36rem] h-fit p-4 pb-8 rounded-3xl hard-shadow-fg z-50 bg-neutral-950">
        <h2 className="my-2 font-bold">Select a gen</h2>
        <ul className="grid grid-cols-3 my-8 gap-y-6 place-items-center">
          {generations.map((genItem) => (
            <li key={genItem.id}>
              <GenCard
                GenId={genItem.id}
                GenIcon={genItem.icon}
                setGen={setSelectedGen}
                isActive={selectedGen === genItem.id}
              />
            </li>
          ))}
        </ul>
        <button
          className="w-full button-cool"
          onClick={() => {
            setGeneration(selectedGen);
            onClose();
          }}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default PickGen;

type GenCardProps = {
  GenName?: string;
  GenId: number;
  GenIcon: string;
  setGen: (gen: number) => void;
  isActive: boolean;
};

function GenCard({ GenId, GenIcon, setGen, isActive }: GenCardProps) {
  return (
    <button
      className={`w-40 h-16 p-2 px-4 relative cursor-pointer hover:text-lime-500 hover:underline flex items-center text-nowrap group ${
        isActive ? "text-black hover:text-black" : ""
      }`}
      onClick={() => setGen(GenId)}>
      <div
        className={`absolute -z-50 inset-0 border-2 rounded-lg transform -skew-x-12 pointer-events-none 
      ${
        isActive
          ? "bg-lime-400 border-background hard-shadow-bg"
          : "bg-zinc-500/10 shadow-[5px_5px] shadow-[var(--foreground)] group-hover:border-lime-500 group-hover:shadow-lime-500"
      }`}
      />
      <p>Gen {GenId}</p>
      <img
        className="absolute pointer-events-none size-24 -right-4"
        src={GenIcon}
        alt="Pokemon Icon"
      />
    </button>
  );
}
