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

        //hp
        const hp = data['stats']['0']['base_stat']
        const hpstat = document.querySelector('#hp')
            hpstat.setAttribute("style", "width: " + hp + "%")
            hpstat.textContent = hp

        //attack
        const attack = data['stats']['1']['base_stat']
        const attackstats = document.querySelector('#attack')
            attackstats.setAttribute("style", "width: " + attack + "%")
            attackstats.textContent = attack

        //defense
        const defense = data['stats']['2']['base_stat']
        const deffensestats = document.querySelector('#defense')
            deffensestats.setAttribute("style", "width: " + defense + "%")
            deffensestats.textContent = defense

        //special-attack
        const specialAttack = data['stats']['3']['base_stat']
        const specialAttackStats = document.querySelector('#special_attack')
            specialAttackStats.setAttribute("style", "width: " + specialAttack + "%")
            specialAttackStats.textContent = specialAttack

        //special-deffense
        const specialdefense = data['stats']['4']['base_stat']
        const specialdefenseStats = document.querySelector('#special_defense')
            specialdefenseStats.setAttribute("style", "width: " + specialdefense + "%")
            specialdefenseStats.textContent = specialdefense

        //speed
        const speed = data['stats']['5']['base_stat']
        const speedStats = document.querySelector('#speed')
            speedStats.setAttribute("style", "width: " + speed + "%")
            speedStats.textContent = speed

        //tipos
        const typeSecond = document.querySelector('.secundario')
        const type1 = data['types']['0']['type']['name']
        const type1Output = document.querySelector('#type1')

        if(data.types.length == 1) {
            type1Output.textContent = type1
            typeSecond.style.display = 'none'
        }
        
        if (data.types.length == 2) {
            const type2 = data['types']['1']['type']['name']
            const type2Output = document.querySelector('#type2')
            typeSecond.style.display = 'block'
            type1Output.textContent = type1
            type2Output.textContent = type2
        }

        imgPokemon.style.display = 'block'
        namePokemon.textContent = data.name; 
        numberPokemon.textContent = data.id

        if(search < '650') {
            imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        } else {
            imgPokemon.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']
        }

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

