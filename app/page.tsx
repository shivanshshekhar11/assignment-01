"use client";

import FilterablePokedexTable from "@/components/FilterablePokedexTable";
import PokemonArrayForm from "@/components/PokemonArrayForm";
import PokemonForm from "@/components/PokemonForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-yellow-700 dark:text-green-400">
          Pokedex (Version 1.0.0)
        </h1>

        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <PokemonForm />
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <PokemonArrayForm />
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md overflow-x-auto">
            <FilterablePokedexTable />
          </section>
        </div>
      </div>
    </main>
  );
}
