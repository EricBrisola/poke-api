async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const pokemons = await response.json()
  const pokemonsSortedById = pokemons.results.sort((a,b) => a.name - b.name)
  console.log(pokemonsSortedById)
  pokemonsSortedById.forEach(pokemon => renderPokemons(pokemon))
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

  const pokemonTypes = document.createElement('div')
  pokemonTypes.setAttribute('class', 'pokemon-type-card')
  const pokemonTypesData = p.types
  //console.log(pokemonTypesData)

  pokemonTypesData.forEach((type) => {
    const eachType = document.createElement('p')
    //console.log(type.type.name)
    eachType.setAttribute('class', 'pokemon-type')
    //eachType.textContent = type.type.name[0].toUpperCase() + type.type.name.slice(1)
    pokemonTypes.append(eachType)

    switch(type.type.name) {
      case 'normal':
        eachType.textContent = 'Normal'
        break
      case 'fire':
        eachType.textContent = 'Fire'
        break
      case 'water':
        eachType.textContent = 'Water'
        break
        case 'grass':
        eachType.textContent = 'Grass'
        break
        case 'electric':
        eachType.textContent = 'Eletric'
        break
        case 'ice':
        eachType.textContent = 'Ice'
        break
        case 'fighting':
        eachType.textContent = 'Fighting'
        break
      case 'poison':
        eachType.textContent = 'Poison'
        break
      case 'ground':
        eachType.textContent = 'Ground'
        break
        case 'flying':
        eachType.textContent = 'Flying'
        break
        case 'psychic':
        eachType.textContent = 'Psychic'
        break
        case 'bug':
        eachType.textContent = 'Bug'
        break
        case 'rock':
        eachType.textContent = 'Rock'
        break
      case 'ghost':
        eachType.textContent = 'Ghost'
        break
      case 'dragon':
        eachType.textContent = 'Dragon'
        break
        case 'dark':
        eachType.textContent = 'Dark'
        break
        case 'steel':
        eachType.textContent = 'Steel'
        break
        case 'fairy':
        eachType.textContent = 'Fairy'
        break
        default:
          console.log('err')
    }
  })

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
    //console.log(stat.stat.name, stat.base_stat)
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
  

  pokeCard.append(pokemonId, name, pokemonImg,  pokemonTypes, pokemonAttributeCard)
  document.querySelector('#container').appendChild(pokeCard)
}

getPokemons()