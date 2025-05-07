import PokemonRow from "./PokemonRow";

type PokedexTableProps = {
  pokemons: {
    id: number;
    name: string;
    pokemonType: { name: string }[];
    sprite: string;
  }[];
};

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemons }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-blue-100 dark:bg-blue-200 rounded-2xl shadow-md">
    {pokemons.map((pokemon) => (
      <PokemonRow
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        pokemonType={pokemon.pokemonType.map((type) => type.name)}
        sprite={pokemon.sprite}
      />
    ))}
  </div>
);

export default PokedexTable;
