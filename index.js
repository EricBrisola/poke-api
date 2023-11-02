async function getPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset0&limit=100')
    const pokemons = await response.json()

    const regexToGetIds = /(?<=\/)[0-9]{1,}/

    const pokemonsSortedById = pokemons.results.sort((a,b) => {
      return parseInt(a.url.match(regexToGetIds)[0]) - parseInt(b.url.match(regexToGetIds)[0])
    })
    
    //console.log(pokemonsSortedById)
    for (const pokemon of pokemonsSortedById) {
      await renderPokemons(pokemon);
    }
    //pokemonsSortedById.forEach(async (pokemon) =>  await renderPokemons(pokemon))
  } catch (err) {
    console.log(`Unable to find pokemon: ${err}`)
  }
}


async function renderPokemons(pokemon) {
  const response = await fetch(pokemon.url)
  const p = await response.json()
  //console.log(p)

  const pokeCard = document.createElement('div')
  pokeCard.classList.add('pokemon')

  const pokemonName = p.name[0].toUpperCase() + p.name.slice(1)
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
    //eachType.setAttribute('class', 'pokemon-type')
    //eachType.textContent = type.type.name[0].toUpperCase() + type.type.name.slice(1)
    pokemonTypes.append(eachType)

    switch(type.type.name) {
      case 'normal':
        eachType.textContent = 'Normal'
        eachType.setAttribute('class','pokemon-type-normal')
        break
      case 'fire':
        eachType.textContent = 'Fire'
        eachType.setAttribute('class','pokemon-type-fire')
        break
      case 'water':
        eachType.textContent = 'Water'
        eachType.setAttribute('class','pokemon-type-water')
        break
        case 'grass':
        eachType.textContent = 'Grass'
        eachType.setAttribute('class','pokemon-type-grass')
        break
        case 'electric':
        eachType.textContent = 'Eletric'
        eachType.setAttribute('class','pokemon-type-eletric')
        break
        case 'ice':
        eachType.textContent = 'Ice'
        eachType.setAttribute('class','pokemon-type-ice')
        break
        case 'fighting':
        eachType.textContent = 'Fighting'
        eachType.setAttribute('class','pokemon-type-fighting')
        break
      case 'poison':
        eachType.textContent = 'Poison'
        eachType.setAttribute('class','pokemon-type-poison')
        break
      case 'ground':
        eachType.textContent = 'Ground'
        eachType.setAttribute('class','pokemon-type-ground')
        break
        case 'flying':
        eachType.textContent = 'Flying'
        eachType.setAttribute('class','pokemon-type-flying')
        break
        case 'psychic':
        eachType.textContent = 'Psychic'
        eachType.setAttribute('class','pokemon-type-psychic')
        break
        case 'bug':
        eachType.textContent = 'Bug'
        eachType.setAttribute('class','pokemon-type-bug')
        break
        case 'rock':
        eachType.textContent = 'Rock'
        eachType.setAttribute('class','pokemon-type-rock')
        break
      case 'ghost':
        eachType.textContent = 'Ghost'
        eachType.setAttribute('class','pokemon-type-ghost')
        break
      case 'dragon':
        eachType.textContent = 'Dragon'
        eachType.setAttribute('class','pokemon-type-dragon')
        break
        case 'dark':
        eachType.textContent = 'Dark'
        eachType.setAttribute('class','pokemon-type-dark')
        break
        case 'steel':
        eachType.textContent = 'Steel'
        eachType.setAttribute('class','pokemon-type-steel')
        break
        case 'fairy':
        eachType.textContent = 'Fairy'
        eachType.setAttribute('class','pokemon-type-fairy')
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

  pokeCard.append(pokemonId, name, pokemonImg,  pokemonTypes, pokemonAttributeCard)
  document.querySelector('#content').appendChild(pokeCard)
}

getPokemons()