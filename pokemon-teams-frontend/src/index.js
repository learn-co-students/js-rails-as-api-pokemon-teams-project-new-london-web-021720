const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL).then(res => res.json()).then(trainers => renderTrainers(trainers))

    const renderTrainers = trainers => {
        trainers.forEach(trainer => {renderTrainer(trainer)});
    }

    const renderTrainer = trainer => {
        const newDiv = document.createElement("div")
        newDiv.classList.add("card")
        newDiv.setAttribute("data-id", `${trainer.id}`)

        const trainerName = document.createElement("p")
        trainerName.innerText = trainer.name

        const addPokemonButton = document.createElement("button")
        addPokemonButton.innerText = "Add Pokemon"

        addPokemonButton.addEventListener("click", () => {
                const orders = {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({trainer_id: trainer.id})
                }

                fetch(POKEMONS_URL, orders)
                .then(res => res.json())
                .then(trainer => reRenderTrainer(trainer))
                .catch(error => console.log("Too many pokemon"))
        })
        
        const pokemonList = createPokemonList(trainer.pokemon)

        newDiv.append(trainerName, addPokemonButton, pokemonList)

        main.append(newDiv)

        
    }

    const createPokemonList = pokemons => {
        const list = document.createElement("ul")
        const pokemonLis = pokemons.map(pokemon => makePokemonLis(pokemon))

        list.append(...pokemonLis)
        return list
    }

    const makePokemonLis = pokemon => {
        const li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("release")
        deleteButton.innerText = "Release"
        deleteButton.setAttribute("data-pokemon-id", `${pokemon.id}`)

        li.append(deleteButton)

        deleteButton.addEventListener("click", () => {
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {method: "DELETE"})
            .then(res => res.json()).then(trainer => reRenderTrainer(trainer))
        })
        return li
    }

    const reRenderTrainer = trainer => {
        const card = document.querySelector(`[data-id="${trainer.id}"]`);
        const list = card.querySelector("ul")

        list.innerText = ""
        
        const elements = trainer.pokemon.map(pokemon => makePokemonLis(pokemon))
        list.append(...elements)
    }
})