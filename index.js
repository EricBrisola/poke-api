async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const pokemons = await response.json()
  const pokemonsSortedByName = pokemons.results.sort((a,b) => a.id - b.id)
  //console.log(pokemonsSortedByName)
  pokemonsSortedByName.forEach(pokemon => renderPokemons(pokemon))
}


async function renderPokemons(pokemon) {
  const response = await fetch(pokemon.url)
  const p = await response.json()
  //console.log(p)

  const pokeCard = document.createElement('div')
  pokeCard.classList.add('pokemon')

  const pokemonName = p.name
  const name = document.createElement('h2')
  name.setAttribute('class', 'pokemon-names')
  name.textContent = pokemonName

  const pokemonId = document.createElement('h4')
  pokemonId.textContent = '#' + (p.id + '').padStart(3, 0)
  pokemonId.setAttribute('class', 'pokemon-id')

  const pokemonImg  = document.createElement('img')
  pokemonImg.setAttribute('class', 'pokemon-images')

  pokemonImg.src = p.sprites.front_default
  //pokemonImg.src = p.sprites.versions['generation-v']['black-white']['animated']['front_default']
  pokemonImg.alt = pokemonName

  
  const pokemonAttributeCard = document.createElement('div')
  pokemonAttributeCard.setAttribute('class', 'pokemon-attr-card')
  const pokemonAttributeData = p.stats

  pokemonAttributeData.forEach((stat) => 
  {
    console.log(stat.stat.name, stat.base_stat)
    const eachAttribute = document.createElement('p')
    eachAttribute.setAttribute('class', 'pokemon-attr')

    switch(stat.stat.name) {
      case 'hp':
        eachAttribute.textContent = 'HP: ' + stat.base_stat
        break
      case 'attack':
        eachAttribute.textContent = 'ATK: ' + stat.base_stat
        break
      case 'defense':
        eachAttribute.textContent = 'DEF: ' + stat.base_stat
        break
        case 'special-attack':
        eachAttribute.textContent = 'SP-ATK: ' + stat.base_stat
        break
        case 'special-defense':
        eachAttribute.textContent = 'SP-DEF: ' + stat.base_stat
        break
        case 'speed':
        eachAttribute.textContent = 'SPD: ' + stat.base_stat
        break
        default:
          console.log('err')
    }
    



    pokemonAttributeCard.append(eachAttribute)
  })

// hp: 45

// attack: 49

// defense: 49

// special-attack: 65

// special-defense: 65

// speed: 45
  

  pokeCard.append(pokemonId, name, pokemonImg, pokemonAttributeCard)
  document.querySelector('#container').appendChild(pokeCard)
}

getPokemons()