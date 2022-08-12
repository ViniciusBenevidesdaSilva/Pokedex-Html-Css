const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = Math.round(Math.random() * 600);

const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    console.log(APIResponse.status);

    if(APIResponse.status !== 200)
        return;
    
    const data = await APIResponse.json();

    return data;
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon.toString());

    if(!data){
        pokemonImage.src = 'https://pa1.narvii.com/6165/10638250b5b02d48a2ee50e9ee7345cb4ce80977_128.gif';
        
        if(Math.round(Math.random() * 10) === 1)
            pokemonName.innerHTML = 'Missingno found you';
        else
            pokemonName.innerHTML = 'Not Found';

        pokemonNumber.innerHTML = '';
        return;
    }

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    searchPokemon = data.id;

    const isShiny = Math.round(Math.random() * 10) === 1
    const version = isShiny ? 'front_shiny' : 'front_default';

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][version];
    
    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value);
})

renderPokemon(searchPokemon);

btnPrev.addEventListener('click', () => {
    if(searchPokemon === 1)
        return;
    searchPokemon--;
    renderPokemon(searchPokemon);
})

btnNext.addEventListener('click', () => {
    if(searchPokemon === 649)
        return;

    searchPokemon++;
    renderPokemon(searchPokemon);
})
