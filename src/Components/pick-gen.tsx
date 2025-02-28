import React, { useState } from "react";
import { generations } from "../data/consts";

type Props = { generation: string };

function PickGen({ generation }: Props) {
  const [gen, setGen] = useState<number>(0);

  return (
    <div className="w-full">
      <h2>Select a gen</h2>
      <ul className="flex">
        {generations.map((gen) => (
          <li key={gen.id}>
            <GenCard GenName={gen.label} GenId={gen.id} GenIcon={gen.icon} setGen={setGen} />
          </li>
        ))}
      </ul>

      <h3>Selected Gen {gen} </h3>
    </div>
  );
}

export default PickGen;

function GenCard({
  GenName,
  GenId,
  GenIcon,
  setGen,
}: {
  GenName: string;
  GenId: number;
  GenIcon: string;
  setGen: (gen: number) => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div
      className={`flex items-center justify-between gap-2 border rounded-md p-2 px-12 ${
        isActive ? "bg-sky-400" : ""
      }`}
      onClick={() => {
        setGen(GenId);
        setIsActive(!isActive);
      }}>
      <p>Gen {GenId}</p>
      <img className="size-12 scale-150 pointer-events-none" src={GenIcon} alt="Pokemon Icon" />
    </div>
  );
}
