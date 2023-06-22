const namePokemon = document.querySelector('.poke_name')
const numberPokemon = document.querySelector('.poke_number')
const imgPokemon = document.querySelector('.poke_img')

const form = document.querySelector('.form')
const input = document.querySelector('.search')
const btnPrev = document.querySelector('.btn_prev')
const btnNext = document.querySelector('.btn_next')

let search = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

 const renderPokemon = async (pokemon) => {

    namePokemon.textContent = 'Loading...'
    numberPokemon.innerHTML = ''
    input.value = ''
    imgPokemon.src = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        imgPokemon.style.display = 'block'
        namePokemon.textContent = data.name; //tutorial esta innerHTML
        numberPokemon.textContent = data.id
        imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        search = data.id
    } else {
        imgPokemon.style.display = 'none'
        namePokemon.innerHTML = 'Not Found'
        numberPokemon.innerHTML = ''
    }
 }

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
    if (search > 1) {
        search -=1
        renderPokemon(search)
    }  
})

btnNext.addEventListener('click', () => {
    search +=1
    renderPokemon(search)
})

renderPokemon(search)