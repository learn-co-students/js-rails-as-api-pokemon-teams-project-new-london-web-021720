const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainHTML = document.querySelector("main")

const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => renderTrainers(trainers))
}

const renderTrainers = (arrayOfTrainers) => {
    arrayOfTrainers.forEach(trainer => {
        // Create document elements
        
        // div stuff
        const trainerDiv = document.createElement("div")
        trainerDiv.className = "card"

        // trainer name
        const trainerP = document.createElement("p")
        trainerP.innerText = trainer.name 

        // Button stuff
        const addPokemonBtn = document.createElement("button")
        addPokemonBtn.innerText = "Add Pokemon"

        // ul for pokemon stuff
        const pokemonList = document.createElement("ul")

        renderPokemon(trainer.pokemons, pokemonList)

        trainerDiv.append(trainerP, addPokemonBtn, pokemonList)


        mainHTML.append(trainerDiv)
    });
}

const renderPokemon = (pokemons, ul) => {
    pokemons.forEach(pokemon => {
        const listItem = document.createElement("li")
        listItem.innerText = `${pokemon.nickname} (${pokemon.species})`

        // button for each pokemon
        const pokemonBtn = document.createElement("button")
        pokemonBtn.className = "release"
        pokemonBtn.innerText = "Release"
        pokemonBtn.addEventListener("click", () => {
            pokemonBtnRelease(pokemon)

        });


        listItem.append(pokemonBtn)

        ul.append(listItem)
    });
}

const pokemonBtnRelease = (pokemon) => {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
}

// const addPokemonBtnEvent = (button) => {
//     button.addEventListener("click", () => {

//     })
// }


// Functions

getTrainers()
