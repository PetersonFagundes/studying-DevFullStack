/** To-Do
 * [x] Carregar a página
 * [x] Carregar a lista de pessoas e guardar no vetor
 *      contendo Nome Surname e idade e genero
 * [ ] Listar todas as pessoas
 * [ ] Capturar o input de pesquisa
 * [ ] Capturar o enter
 * [ ] Filtrar
 * [ ] Carregar informações
 * [ ] Contar Sexo
 * [ ] Contar idade
 * [ ] Contar média de idade
 */

let tabPeople = null;
let tabInformation = null;

let countPeople = 0;

let peopleList = [];
let peopleFind = [];

let btnSearch = null;
let textSearch = null;

let numberFormat = null;

window.addEventListener('load', () => {
  //Carregando as variáveis
  tabPeople = document.querySelector('#tabPeople');
  tabInformation = document.querySelector('#tabInformation');

  countPeople = document.querySelector('#countPeople');
  btnSearch = document.querySelector('#searchButton');
  textSearch = document.querySelector('#searchText');

  numberFormat = Intl.NumberFormat('pt-BR');

  btnSearch.addEventListener('click', () => {
    filterPeople();
  });

  textSearch.addEventListener('change', () => {
    filterPeople();
  });

  //Carrega lista de pessoas
  fetchPeople();
});

async function fetchPeople() {
  let response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  let responseJson = await response.json();

  //Obter nome, imagem, genero e idade
  peopleList = responseJson.results.map((person) => {
    const { gender, name, dob, picture } = person;
    return {
      gender: gender,
      name: name.first + ' ' + name.last,
      age: dob.age,
      photo: picture.large,
    };
  });

  console.log(peopleList);
  render();
}

function filterPeople() {
  let searchLetter = textSearch.value;
  let auxiliar = searchLetter.trim();

  if (auxiliar === '') {
    return;
  }

  peopleFind = peopleList.filter((person) => {
    return person.name.toLowerCase().includes(searchLetter);
  });

  peopleFind.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  console.log(peopleFind);

  render();
}

//Montar os dados na tela
function render() {
  renderPeopleList();
  renderSummary();
  renderEstatistics();
}

function renderPeopleList() {
  let peopleHTML = '<div>';

  peopleFind.forEach((person) => {
    const { name, age, photo } = person;

    const personHTML = `
      <div class='people'>
        <div>
          <img src="${photo}" alt="${name}"/>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${age} anos</li>
          </ul>
        </div>
      </div>
    `;

    peopleHTML += personHTML;
  });

  peopleHTML += '</div>';

  tabPeople.innerHTML = peopleHTML;
}

function renderSummary() {
  countPeople.textContent = peopleFind.length;
}

function renderEstatistics() {
  if (peopleFind.length === 0) return;

  listMen = peopleFind.filter((person) => {
    return person.gender === 'male';
  });
  console.log(listMen);

  //Lista de Mulheres
  listWomen = peopleFind.filter((person) => {
    return person.gender === 'female';
  });
  console.log(listWomen);

  //Total das idades
  let totalAgePeople = peopleFind.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  console.log(totalAgePeople);

  //Media das idades
  let meanAge = totalAgePeople / peopleFind.length;
  console.log(meanAge);

  //Formatando numeros
  meanAge = numFormat(meanAge.toFixed(2));
  totalAgePeople = numFormat(totalAgePeople);

  let peopleHTML = '<div>';

  const personHTML = `
    <div class='people'>
      <div>
        <ul>
          <li>Sexo masculino: ${listMen.length}</li>
          <li>Sexo feminino:  ${listWomen.length}</li>
          <li>Soma das idades: ${totalAgePeople}</li>
          <li>Média das idades: ${meanAge}</li>
        </ul>
      </div>
    </div>
  `;

  peopleHTML += personHTML + '</div>';
  tabInformation.innerHTML = peopleHTML;
}

function numFormat(number) {
  return numberFormat.format(number);
}
