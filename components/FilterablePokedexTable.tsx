"use client";

import { useState } from "react";
import { trpc } from "@/server/client";
import PokemonTypeSelection from "./PokemonTypeSelection";
import PokedexTable from "./PokedexTable";

const FilterablePokedexTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const { data: pokemons, refetch } = trpc.pokemons.getPokemonByType.useQuery(
    selectedType,
    {
      enabled: false,
    }
  );

  const handleTypeChange = (type: string | undefined) => {
    setSelectedType(type);
    refetch();
  };

  return (
    <section className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
          Get by Type
        </h2>
      </div>
      <div className="flex justify-center items-center mb-4">
        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={handleTypeChange}
        />
      </div>
      {pokemons && (
        <div className="overflow-x-auto">
          <PokedexTable pokemons={pokemons} />
        </div>
      )}
    </section>
  );
};

export default FilterablePokedexTable;
