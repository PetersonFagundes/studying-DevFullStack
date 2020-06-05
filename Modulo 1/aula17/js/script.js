/** Buscar os dados com fecth na URL
 * Transformar os dados na forma Nome/Bandeira/
 * População/Id(numericCode)
 *
 * Mostrar qtde de paises e total de população
 * na lista da esquerda e da direita
 *
 * Add pais ao favorito movendo de esq para dir
 * Ao remover do favoritos volta para esq
 * Listas de paises devem ser exibidos em ordem alfabetica
 */

//-----------variáveis dos eventos-----------//
//Aplication state
let tabCountries = null;
let tabFavorites = null;
//list
let allCountries = [];
let favoriteCountries = [];

//Counters
let countCountries = 0;
let countFavorites = 0;

//Population Total
let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

//------------------------------------------------//

//Iniciando a pagina
window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorite');

  totalPopulationList = document.querySelector('#totalPopulationList');
  //prettier-ignore
  totalPopulationFavorites = 
    document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  //Carrega lista de paises
  fetchCountries();
});

async function fetchCountries() {
  let response = await fetch('https://restcountries.eu/rest/v2/all');
  let resJson = await response.json();
  //retorna o objeto do contexto do desafio
  allCountries = resJson.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population: population,
      formatPopulation: formatNumber(population),
      flag: flag,
    };
  });

  //Teste
  //favoriteCountries = allCountries;

  render();
  console.log(allCountries);
}

//Montar os dados na tela
function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

//Carrega os dados das cidades na tela
function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { id, name, flag, formatPopulation } = country;

    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-ligth btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}"/>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formatPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}

//Carrega os dados dos favoritos na tela
function renderFavorites() {
  let favoritesHTML = '<div>';

  favoriteCountries.forEach((country) => {
    const { name, id, flag, formatPopulation } = country;

    const favoriteHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-ligth btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}"/>
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formatPopulation}</li>
        </ul>
      </div>
    </div>`;

    favoritesHTML += favoriteHTML;
  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}

//Carrega os dados de informações na tela
function renderSummary() {
  //Usando reduce para quantidade de paises e população total
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);

  const totalFavorite = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(totalFavorite);
}

//Carrega os botões
function handleCountryButtons() {
  //Pegar todos os botões
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  //Para cada botão implementa uma função de evento
  countryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      addToFavorites(button.id);
    });
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      removeFromFavorites(button.id);
    });
  });
}

function addToFavorites(id) {
  let findCountry = allCountries.find((country) => {
    return country.id === id;
  });

  // console.log(
  //   allCountries.find((country) => {
  //     return country.id === id;
  //   })
  // );

  //Adicionando no vetor
  favoriteCountries = [...favoriteCountries, findCountry];

  //Ordenar
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  //Filtra retirando o id que foi add no favorites
  allCountries = allCountries.filter((country) => {
    return country.id !== id;
  });

  render();
}

function removeFromFavorites(id) {
  let findCountry = favoriteCountries.find((country) => {
    return country.id === id;
  });

  allCountries = [...allCountries, findCountry];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCountries = favoriteCountries.filter((country) => {
    return country.id !== id;
  });

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
