import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Pokemon Types
  const [grass, fire, water, electric, flying, poison, normal, psychic, bug] =
    await Promise.all([
      prisma.pokemonType.create({ data: { name: "Grass" } }),
      prisma.pokemonType.create({ data: { name: "Fire" } }),
      prisma.pokemonType.create({ data: { name: "Water" } }),
      prisma.pokemonType.create({ data: { name: "Electric" } }),
      prisma.pokemonType.create({ data: { name: "Flying" } }),
      prisma.pokemonType.create({ data: { name: "Poison" } }),
      prisma.pokemonType.create({ data: { name: "Normal" } }),
      prisma.pokemonType.create({ data: { name: "Psychic" } }),
      prisma.pokemonType.create({ data: { name: "Bug" } }),
    ]);

  // Create Pokemons
  await prisma.pokemon.createMany({
    data: [
      {
        name: "Bulbasaur",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
      },
      {
        name: "Charmander",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
      },
      {
        name: "Squirtle",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
      },
      {
        name: "Pikachu",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      },
      {
        name: "Pidgey",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png",
      },
      {
        name: "Jigglypuff",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png",
      },
      {
        name: "Psyduck",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png",
      },
      {
        name: "Butterfree",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
      },
      {
        name: "Abra",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png",
      },
      {
        name: "Oddish",
        sprite:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png",
      },
    ],
  });

  // Connect Pokémon to types
  const all = await prisma.pokemon.findMany();

  const typeMap = {
    Bulbasaur: [grass.id, poison.id],
    Charmander: [fire.id],
    Squirtle: [water.id],
    Pikachu: [electric.id],
    Pidgey: [normal.id, flying.id],
    Jigglypuff: [normal.id],
    Psyduck: [water.id],
    Butterfree: [bug.id, flying.id],
    Abra: [psychic.id],
    Oddish: [grass.id, poison.id],
  };

  for (const p of all) {
    const types = typeMap[p.name] || [];
    await prisma.pokemon.update({
      where: { id: p.id },
      data: {
        pokemonType: {
          connect: types.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
