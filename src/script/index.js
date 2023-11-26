const searchPokemonIcon = document.querySelector('#search-icon')
searchPokemonIcon.addEventListener('click', verifyInputs)

const searchPokemonInput = document.querySelector('#pokemon-search-input')
searchPokemonInput.addEventListener('keydown', useEnterToSearch)

const homeButton = document.querySelector('#home-icon')
homeButton.addEventListener('click', getPokemons)

function useEnterToSearch(btn) {
  if(btn.key === 'Enter') {
    verifyInputs()
  }
}

function verifyInputs() {
  const pokemonInfo = document.querySelector('#pokemon-search-input').value.replace(/ /g,'-')
  const regextoIDs = /[0-9]/g
  const regextoNames = /[a-zA-Z]/g

  if(pokemonInfo === '') {
    alert('You need a name or id to find a pokemon')
  }
  else {
    if(regextoIDs.test(pokemonInfo)) {
      clearAllPokemonsDiv()
      findPokemonsbyId(pokemonInfo)
    }
    else if(regextoNames.test(pokemonInfo)) {
      clearAllPokemonsDiv()
      findPokemonsbyName(pokemonInfo)
    }
    else {
      alert('Please search by names or ids only')
    }
  }
  document.querySelector('#pokemon-search-input').value = ''
}

async function findPokemonsbyId(id) {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    await renderPokemons(pokemon)
  } catch (error) {
    alert(`Couldnt find pokemon with id: ${id}`)
  }
}

async function findPokemonsbyName(name) {
  const regexToGetIds = /(?<=\/)[0-9]{1,}/

  try {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon?offset0&limit=1292')
    const allPokemons = await resp.json()
    const pokemonsFound = allPokemons.results.filter((a) => a.name.includes(name.toLowerCase()))
    
    if (pokemonsFound.length >= 1) {
      for (const pokemon of pokemonsFound){
        const pokemonFoundId = pokemon.url.match(regexToGetIds)[0]
        await findPokemonsbyId(pokemonFoundId)
      }
    }
    else {
      alert(`Could not find pokemon with name: ${name}`)
      getPokemons()
    }
  } catch (error) {
    alert(`Could not find pokemon with name: ${name}`)
  }
}

async function getPokemons() {
  clearAllPokemonsDiv()
  const regexToGetIds = /(?<=\/)[0-9]{1,}/
  
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset0&limit=25')
    const pokemons = await response.json()
    //console.log(pokemons)

    const pokemonsSortedById = pokemons.results.sort((a,b) => {
      return parseInt(a.url.match(regexToGetIds)[0]) - parseInt(b.url.match(regexToGetIds)[0])
    })
    
    for (const pokemon of pokemonsSortedById) {
       await renderPokemons(pokemon);
    }

  } catch (err) {
    console.log(`Unable to find pokemon: ${err}`)
  }
}

async function renderPokemons(pokemon) {
  const response = await fetch(pokemon.url)
  const p = await response.json()

  const pokeCardFlip = document.createElement('div')
  pokeCardFlip.setAttribute('class', 'pokemon-card-flip')

  const pokeCardFlipInner = document.createElement('div')
  pokeCardFlipInner.setAttribute('class', 'pokemon-card-flip-inner')

  const pokeCardFront = document.createElement('div')
  pokeCardFront.classList.add('pokemon-frontside')

  const pokecardBack = document.createElement('div')
  pokecardBack.classList.add('pokemon-backside')

  const pokemonName = getPokemonName(p)
  const pokemonNameBack = getPokemonName(p)

  const pokemonId = getPokemonId(p)

  const pokemonTypes = getPokemonTypes(p)

  const pokemonImgDiv = getPokemonImage(p)

  const pokemonAttributeCard = getPokemonStats(p)

  const pokemonAbilities = getPokemonAbilities(p)

  const pokemonHeight = getPokemonHeight(p)
  
  const pokemonWeight = getPokemonWeight(p)

  const pokemonBaseExp = getPokemonBaseExp(p)

  const PokemonBackImg = getPokemonBackImg(p)
  
  const pokemonHeightWeightDiv = document.createElement("div")
  pokemonHeightWeightDiv.setAttribute('class', 'height-weight-div')
  pokemonHeightWeightDiv.append(pokemonHeight, pokemonWeight)

  pokeCardFront.append(pokemonId, pokemonName, pokemonImgDiv,  pokemonTypes, pokemonAttributeCard)
  pokecardBack.append(pokemonBaseExp, pokemonNameBack, PokemonBackImg, pokemonHeightWeightDiv, pokemonAbilities)

  pokeCardFlipInner.append(pokecardBack, pokeCardFront)
  pokeCardFlip.append(pokeCardFlipInner)

  document.querySelector('#content').append(pokeCardFlip)
}

function clearAllPokemonsDiv() {
  const allPokemonsDiv = document.querySelector('#content')

  while (allPokemonsDiv.firstChild) {
    allPokemonsDiv.removeChild(allPokemonsDiv.firstChild);
  }
}

function getPokemonId(p) {
  const pokemonId = document.createElement('h4')
  pokemonId.textContent = '#' + (p.id + '').padStart(3, 0)
  pokemonId.setAttribute('class', 'pokemon-id')

  return pokemonId
}

function getPokemonName(p) {
  let pokemonName = p.name[0].toUpperCase() + p.name.slice(1).replace(/-/g,' ')
  const name = document.createElement('h2')

  name.textContent = pokemonName

  pokemonName.length > 13 ? name.setAttribute('class', 'big-pokemon-names') : name.setAttribute('class', 'pokemon-names')

  return name
}

function getPokemonTypes(p) {
  const pokemonTypes = document.createElement('div')
  pokemonTypes.setAttribute('class', 'pokemon-type-card')
  const pokemonTypesData = p.types

  pokemonTypesData.forEach((type) => {
    const eachType = document.createElement('p')
    
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
          eachType.textContent = 'Empty'
          eachType.setAttribute('class','pokemon-type-empty')
    }

    pokemonTypes.appendChild(eachType)
  })

  return pokemonTypes
}

function getPokemonImage(p) {
  const pokemonImgDiv = document.createElement('div')
  pokemonImgDiv.setAttribute('class', 'pokemon-images-div')

  const pokeballImage = '../assets/pokeball-image.png'

  const pokemonImg  = document.createElement('img')
  pokemonImg.src = p.sprites.versions['generation-v']['black-white']['animated']['front_default'] || p.sprites.front_default || pokeballImage
  pokemonImg.alt = p.name

  if(pokemonImg.src.includes('gif')){
    pokemonImg.setAttribute('class', 'pokemon-image')
  }
  else{
    pokemonImg.setAttribute('class', 'pokemon-image-no-gif')
  }
  
  pokemonImgDiv.appendChild(pokemonImg)

  return pokemonImgDiv
}

function getPokemonStats(p) {
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

    pokemonAttributeCard.appendChild(eachAttribute)
  })

  return pokemonAttributeCard
}

function getPokemonBaseExp(p) {
  const pokemonExp = document.createElement('h4')
  pokemonExp.setAttribute('class','pokemon-exp')
  pokemonExp.textContent = p.base_experience + ' XP'

  if(typeof (p.base_experience) != 'number') {
    pokemonExp.textContent = '0 XP'
  }

  return pokemonExp
}

function getPokemonBackImg(p) {
  const pokemonBackImgDiv = document.createElement('div')
  pokemonBackImgDiv.setAttribute('class', 'pokemon-images-div')
  
  const pokeballImage = '../assets/pokeball-image.png'
  
  const pokemonBackImg  = document.createElement('img')
  pokemonBackImg.src = p.sprites.versions['generation-v']['black-white']['animated']['back_default'] || p.sprites.back_default || pokeballImage
  pokemonBackImg.alt = p.name
  
  if(pokemonBackImg.src.includes('gif')){
    pokemonBackImg.setAttribute('class', 'pokemon-image')
  }
  else{
    pokemonBackImg.setAttribute('class', 'pokemon-image-no-gif')
  }
  
  pokemonBackImgDiv.appendChild(pokemonBackImg)
  
  return pokemonBackImgDiv
}

function getPokemonHeight(p) {
  const pokemonHeight = document.createElement('h4')
  pokemonHeight.setAttribute('class','pokemon-height')
  pokemonHeight.textContent = p.height/10 + ' M'
  
  return pokemonHeight
}

function getPokemonWeight(p) {
  const pokemonWeight = document.createElement('h4')
  pokemonWeight.setAttribute('class','pokemon-weight')
  pokemonWeight.textContent = p.weight + ' KG'

  return pokemonWeight
}

function getPokemonAbilities(p) {
  const abilitiesDiv = document.createElement('div')
  abilitiesDiv.setAttribute('class', 'pokemon-abilities')

  const abilitesTitle = document.createElement('p')
  abilitesTitle.textContent = 'Abilities:'
  abilitiesDiv.appendChild(abilitesTitle)

  const allAbilities = p.abilities

  allAbilities.forEach((e) => {
    const eachAbility = document.createElement('p')
    eachAbility.textContent = e.ability.name[0].toUpperCase() + e.ability.name.slice(1).replace(/-/g, ' ')
    
    abilitiesDiv.appendChild(eachAbility)
  })

  return abilitiesDiv
}

getPokemons()