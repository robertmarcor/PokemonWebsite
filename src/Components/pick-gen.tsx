import { useState } from "react";
import { generations } from "../data/consts";
import { cn } from "../lib/utils";

type PickGenProps = {
  setGeneration: (gen: number) => void;
  onClose: () => void;
};

function PickGen({ setGeneration, onClose }: PickGenProps) {
  const [selectedGen, setSelectedGen] = useState<number>(0);
  return (
    <div className="fixed inset-0 flex items-center justify-center max-sm:mx-8">
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="text-center border-2 w-[36rem] h-fit p-4 pb-8 rounded-3xl z-50 bg-background">
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
          className="w-full p-2 shadow-[0px_3px_1px_5px] shadow-foreground hover:shadow-primary hover:text-primary hover:scale-[1.02] rounded-lg"
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
      className={cn(
        "w-40 h-16 p-2 px-4 relative cursor-pointer",
        "flex items-center text-nowrap group",
        isActive ? "text-background hover:text-black" : "",
        "max-sm:w-20 max-sm:text-sm"
      )}
      onClick={() => setGen(GenId)}>
      <div
        className={cn(
          "absolute -z-50 inset-0 border-2 border-foreground rounded-lg transform -skew-x-12 pointer-events-none",
          "shadow-[5px_5px] shadow-foreground",
          `${
            isActive
              ? "border-primary shadow-primary"
              : "group-hover:border-primary group-hover:shadow-primary"
          }`
        )}
      />
      <p
        className={`${
          isActive
            ? "text-primary"
            : "group-hover:text-primary group-hover:underline group-hover:font-bold"
        }`}>
        Gen {GenId}
      </p>
      <img
        className={cn(
          "absolute pointer-events-none size-24 -right-4 -top-5",
          "max-sm:size-12 max-sm:left-4 max-[450px]:top-5",
          "transition-transform group-hover:scale-110"
        )}
        src={GenIcon}
        alt="Pokemon Icon"
      />
    </button>
  );
}
