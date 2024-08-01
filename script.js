const SUPERHERO_TOKEN =  'Your-Token'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`
const getNewHeroDiv = document.getElementById('getNewHero')
const heroImageDiv = document.getElementById('heroImage')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

//Emoji objects for hero info
const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️',
  power: '🛡️',
  combat: '🔫'
}

//displays hero info on the screen
const heroInfo = (hero) => {
  const name = `<h2>${hero.name}</h2>`
  const img = `<img src="${hero.image.url}" height=200 width=200/>`
  const stats = Object.keys(hero.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${hero.powerstats[stat]}</p>`
  }).join('')

  heroImageDiv.innerHTML = `${name}${img}${stats}`
}

//fetches hero info based on id
const getSuperHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
  .then (response => response.json())
  .then (json => {
    heroInfo(json)
  })
}

//fetches hero info from the api
const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
  .then (response => response.json())
  .then (json => {
    heroInfo(json.results[0])
  })
}
 
//gives you a random number
const randomHero = () => {
  const numOfHeroes = 731
  return Math.floor(Math.random() * numOfHeroes) + 1
}

getNewHeroDiv.onclick = () => getSuperHero(randomHero())
searchButton.onclick = () => getSearchSuperHero(searchInput.value)