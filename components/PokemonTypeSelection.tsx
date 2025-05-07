import { trpc } from "@/server/client";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
}) => {
  const { data: types } = trpc.pokemons.getPokemonTypes.useQuery();

  const options = ["All"];
  if (types) {
    options.push(...types);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectType(e.target.value || undefined);
  };

  return (
    <div className="w-full sm:w-auto">
      <select
        value={selectedType}
        onChange={handleChange}
        className="w-full sm:w-64 p-2 border border-blue-300 rounded-xl bg-blue-100 text-blue-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {options.map((type) => (
          <option key={type} value={type === "All" ? "" : type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonTypeSelection;
