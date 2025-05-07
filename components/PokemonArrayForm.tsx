"use client";

import { useState } from "react";
import { trpc } from "@/server/client";
import PokedexTable from "./PokedexTable";

const PokemonArrayForm: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const { data: pokemons, refetch } = trpc.pokemons.getPokemonByNames.useQuery(
    names,
    { enabled: false }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInitialLoad(false);
    refetch();
  };

  return (
    <div className="w-full max-w-4xl bg-red-100 rounded-2xl shadow-md p-6 flex flex-col space-y-6 items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="text"
          value={names.join(", ")}
          onChange={(e) =>
            setNames(e.target.value.split(",").map((n) => n.trim()))
          }
          placeholder="Enter names (seperated by commas)"
          className="text-black flex-1 px-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300 shadow-md"
        >
          Get All
        </button>
      </form>

      {pokemons && pokemons?.length > 0 ? (
        <PokedexTable pokemons={pokemons} />
      ) : !initialLoad ? (
        <div className="m-4 text-red-700">
          No Pokemon found with those names.
        </div>
      ) : null}
    </div>
  );
};

export default PokemonArrayForm;
