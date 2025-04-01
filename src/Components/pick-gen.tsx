import { useEffect, useRef, useState } from "react";
import { generations } from "../data/generation";
import { cn } from "../lib/utils";

type PickGenProps = {
  toggleModal: () => void;
};
export const GEN_KEY = "SelectedGens";

export default function PickGen({ toggleModal: onClose }: PickGenProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeGenerations, setActiveGenerations] = useState<number[]>([]);

  const toggleGenerationSelection = (generationId: number) => {
    setActiveGenerations((prevSelected) =>
      prevSelected.includes(generationId)
        ? prevSelected.filter((id) => id !== generationId)
        : [...prevSelected, generationId]
    );
  };

  useEffect(() => {
    const data = localStorage.getItem(GEN_KEY);
    if (data) {
      setActiveGenerations(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (activeGenerations.length > 0) {
      localStorage.setItem(GEN_KEY, JSON.stringify(activeGenerations));
    }
  }, [activeGenerations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  type GenCardProps = {
    GenName?: string;
    GenId: number;
    GenIcon: string;
    isActive: boolean;
  };

  const GenCard = ({ GenId, GenIcon, isActive }: GenCardProps) => {
    return (
      <button
        className={cn(
          "w-40 h-16 p-2 px-4 relative cursor-pointer",
          "flex items-center text-nowrap group",
          isActive ? "text-background hover:text-black" : "",
          "max-sm:w-20 max-sm:text-sm"
        )}
        onClick={() => toggleGenerationSelection(GenId)}>
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center max-sm:mx-8">
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className="text-center border-2 w-[36rem] h-fit p-4 pb-8 rounded-3xl z-50 bg-background">
        <h2 className="my-2 font-bold">Select a gen</h2>
        <ul className="grid grid-cols-3 my-8 gap-y-6 place-items-center">
          {generations.map((genItem) => (
            <li key={genItem.id}>
              <GenCard
                GenId={genItem.id}
                GenIcon={genItem.icon}
                isActive={activeGenerations.includes(genItem.id)}
              />
            </li>
          ))}
        </ul>
        <button
          className="w-full p-2 shadow-[0px_3px_1px_5px] shadow-foreground hover:shadow-primary hover:text-primary hover:scale-[1.02] rounded-lg"
          onClick={() => {
            if (activeGenerations.length === 0) {
              setActiveGenerations([1]);
              localStorage.setItem(GEN_KEY, JSON.stringify([1]));
            }
            onClose();
          }}>
          Confirm
        </button>
      </div>
    </div>
  );
}
