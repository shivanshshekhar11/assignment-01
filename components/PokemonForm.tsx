import React, { useState } from "react";
import { trpc } from "@/server/client";
import PokemonRow from "./PokemonRow";

const PokemonForm: React.FC = () => {
  const [name, setName] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const { data: pokemon, refetch } = trpc.pokemons.getPokemonByName.useQuery(
    name,
    { enabled: false }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInitialLoad(false);
    refetch();
  };

  return (
    <div className="w-full bg-red-100 rounded-2xl shadow-md p-6 flex flex-col items-center space-y-6">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          placeholder="Enter a name"
          className="text-black flex-1 px-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300 shadow-md"
        >
          Get Pokemon
        </button>
      </form>
      {pokemon ? (
        <PokemonRow
          {...pokemon}
          pokemonType={pokemon.pokemonType.map((type) => type.name)}
        />
      ) : !initialLoad ? (
        <div className="m-4 text-red-700">No Pokemon found with that name.</div>
      ) : null}
    </div>
  );
};

export default PokemonForm;
