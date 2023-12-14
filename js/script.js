// const buttons = document.querySelectorAll('[data-carousel-btn]')
// const slides = document.querySelector('[data-slides]')

// console.log(buttons);

// const fetchPokemon = () => {
//   const promises = [];
//   for(let i = 1; i <= 251; i++){
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     promises.push(fetch(url).then((res) =>res.json()))
//     }
//   Promise.all(promises).then((results) => {
//     const pokemon = results.map((data) => ({
//       name: data.name,
//       id: data.id,
//       image: data.sprites.front_default,
//       type: data.types.map((type) => type.type.name).join('/'),
//       ability: data.abilities.map((ability) => ability.ability.name).join(' or '),
//       shinyImage: data.sprites.front_shiny,
//       femaleImage: data.sprites.front_female,
//     }));
//     displayPokemon(pokemon)

//     buttons.forEach((button) => {
//       button.addEventListener('click', function(){
//         const offset = button.dataset.carouselBtn === 'next' ? 1 : -1;
//         const activeSlide = slides.querySelector(`[data-active]`)
//         let newIndex = Array.from(slides.children).indexOf(activeSlide) + offset;
//         if (newIndex < 0) newIndex = slides.children.length -1
//         if (newIndex >= slides.children.length) newIndex = 0
        
//         setActiveSlide(newIndex)
//       })
//     })
//   })
// }

// const displayPokemon = (pokemon) => {
//   const pokemonHTMLString = pokemon
//   .map(
//     (poke) => `
//     <li class="slide">
//     <img class="carousel-img" src="${poke.image}" />
//     <h2 class="carousel-title">${poke.id}. ${poke.name}</h2>
//     <p class="carousel-subtitle">Type: ${poke.type}</p>
//     <p>Abilities: ${poke.ability}</p>
//     <h3>Alternate Form(s):</h3>
//     <img class="carousel-img" src="${poke.shinyImage}" />
//     <img class="carousel-img" alt='No Gender Differences' src="${poke.femaleImage}" />
//     </li>
//     `
//   )
//   .join('')

//   slides.innerHTML = pokemonHTMLString
//   setActiveSlide(0)
// }

// const setActiveSlide = (index) => {
//   const slidesList = slides.querySelectorAll('.slide');
//   slidesList.forEach((slide, i) => {
//     slide.removeAttribute('data-active');
//     if (i === index) {
//       slide.setAttribute('data-active', '');
//     }
//   });
// };

// fetchPokemon();

// // Sidebar Javascript
// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const sideMenu = document.querySelector('.side-menu');
// const burger = document.querySelectorAll('.hamburger')
// console.log(burger)

// hamburgerMenu.addEventListener('click', function() {
//   hamburgerMenu.classList.toggle('active');
//   sideMenu.classList.toggle('active');
//   // hamburgerMenu.style.display = 'none'
// });

// document.addEventListener('click', function(event) {
//   const target = event.target;
//   if (!target.closest('.side-menu-container')) {
//     hamburgerMenu.classList.remove('active');
//     sideMenu.classList.remove('active');
//     // hamburgerMenu.style.display = 'block'
//   }
// });

// const drinkList = ["Hot Toddy", "My Thai"];
//   let weather =  $feels.text(Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32))
//   if (weather < $temp.val(60)){
//     console.log("Enjoy Your Hot Toddy!")
//   } else if(weather > $temp.val(59)){
//     console.log("Enjoy Your My Thai!")
//   }

let weatherData, userInput;
const API_KEY = '2a980988519a4da888a366750892e07b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const $city = $('#city');
const $temp = $('#temp');
const $feels = $('#feels');
const $report = $('#report');
const $input = $('#cityInput')
const $drink = $('#drink');
$('form').on('submit', handleGetData);
function handleGetData(event) {
  event.preventDefault();
  userInput = $input.val();
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY}`
  })
    .then(function(data) {
      weatherData = data
      render();
    }, function(error) {
      console.log('error: ', error);
    })
}
// function render() {
//   $city.text(weatherData.name)
//   $temp.text(Math.round(((weatherData.main.temp - 273.15) * (9 / 5)) + 32))
//   $feels.text(Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32))
//   $report.text(weatherData.weather[0].description)
// const drinkList = ["Hot Toddy", "My Thai"];
// // let weather =  $feels.text(Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32))
// let weather = Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32);
// if (weather < 60) {
//   console.log("Enjoy your Hot Toddy!");
// } else if (weather >= 60) {
//   console.log("Enjoy your My Thai!");
// }
// }

function render() {
  $city.text(weatherData.name);
  $temp.text(Math.round(((weatherData.main.temp - 273.15) * (9 / 5)) + 32));
  $feels.text(Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32));
  $report.text(weatherData.weather[0].description);

  let weather = Math.round(((weatherData.main.feels_like - 273.15) * (9 / 5)) + 32);
  let drink = weather < 60 ? "Hot Toddy" : "My Thai";
  $drink.text(drink); // Update the text content of the drink span
}