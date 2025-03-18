import { createContext, useEffect, useRef, useState } from "react";
import { useGetPokemonCount } from "./client/pokemon.client";

type ContextProps = {
  count?: number;
  allNames?: string[];
};

const PokemonContext = createContext<ContextProps>({ count: 0, allNames: [] });

export const PokemonServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, refetch } = useGetPokemonCount();
  const [count, setCount] = useState<number | null>(null);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    const key = "PokemonCount";
    const storedData = localStorage.getItem(key);

    if (storedData) {
      countRef.current = JSON.parse(storedData);
      setCount(countRef.current);
    } else {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data && data !== countRef.current) {
      localStorage.setItem("PokemonCount", JSON.stringify(data));
      setCount(data);
      countRef.current = data;
    }
  }, [data]);

  return (
    <PokemonContext.Provider value={{ count: count ?? 0, allNames: [] }}>
      {children}
    </PokemonContext.Provider>
  );
};
