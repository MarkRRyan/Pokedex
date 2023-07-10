const buttons = document.querySelectorAll('[data-carousel-btn]')
const slides = document.querySelector('[data-slides]')

console.log(buttons);

const fetchPokemon = () => {
  const promises = [];
  for(let i = 1; i <= 251; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) =>res.json()))
    }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      type: data.types.map((type) => type.type.name).join('/'),
      ability: data.abilities.map((ability) => ability.ability.name).join(' or '),
      shinyImage: data.sprites.front_shiny,
      femaleImage: data.sprites.front_female,
    }));
    displayPokemon(pokemon)

    buttons.forEach((button) => {
      button.addEventListener('click', function(){
        const offset = button.dataset.carouselBtn === 'next' ? 1 : -1;
        const activeSlide = slides.querySelector(`[data-active]`)
        let newIndex = Array.from(slides.children).indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length -1
        if (newIndex >= slides.children.length) newIndex = 0
        
        setActiveSlide(newIndex)
      })
    })
  })
}

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
  .map(
    (poke) => `
    <li class="slide">
    <img class="carousel-img" src="${poke.image}" />
    <h2 class="carousel-title">${poke.id}. ${poke.name}</h2>
    <p class="carousel-subtitle">Type: ${poke.type}</p>
    <p>Abilities: ${poke.ability}</p>
    <h3>Alternate Form(s):</h3>
    <img class="carousel-img" src="${poke.shinyImage}" />
    <img class="carousel-img" alt='No Gender Differences' src="${poke.femaleImage}" />
    </li>
    `
  )
  .join('')

  slides.innerHTML = pokemonHTMLString
  setActiveSlide(0)
}

const setActiveSlide = (index) => {
  const slidesList = slides.querySelectorAll('.slide');
  slidesList.forEach((slide, i) => {
    slide.removeAttribute('data-active');
    if (i === index) {
      slide.setAttribute('data-active', '');
    }
  });
};

fetchPokemon();
