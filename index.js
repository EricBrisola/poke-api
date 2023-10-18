async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset0&limit=30')
  const pokemons = await response.json()
  const pokemonsSortedByName = pokemons.results.sort((a,b) => a.name.localeCompare(b.name))
  console.log(pokemonsSortedByName)
  pokemonsSortedByName.forEach(pokemon => renderPokemons(pokemon))
}

getPokemons()


async function renderPokemons(pokemon) {
  const pokeCard = document.createElement('div')

  pokeCard.classList.add('pokemon')

  const pokemonName = pokemon.name
  const name = document.createElement('h2')
  name.textContent = pokemonName

  const pokemonImg  = document.createElement('img')
  const response = await fetch(pokemon.url)
  const p = await response.json()
  console.log(p)
  pokemonImg.src = p.sprites.front_default
  pokemonImg.alt = pokemonName

  pokeCard.append(name, pokemonImg)
  document.querySelector('#container').appendChild(pokeCard)
}