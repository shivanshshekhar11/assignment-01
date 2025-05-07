import React from "react";

type PokemonRowProps = {
  id: number;
  name: string;
  pokemonType: string[];
  sprite: string;
};

const PokemonRow: React.FC<PokemonRowProps> = ({
  id,
  name,
  pokemonType,
  sprite,
}) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border border-blue-400 bg-blue-100 rounded-2xl shadow-md hover:bg-blue-200 transition duration-300 w-full">
    <img
      src={sprite}
      alt={name}
      className="w-20 h-20 object-contain drop-shadow-md"
    />
    <div className="text-center sm:text-left space-y-1">
      <p className="text-xl font-semibold text-blue-800">{name}</p>
      <p className="text-sm text-blue-700">ID: {id}</p>
      <p className="text-sm text-blue-700">
        Types: <span className="font-medium">{pokemonType.join(", ")}</span>
      </p>
    </div>
  </div>
);

export default PokemonRow;
