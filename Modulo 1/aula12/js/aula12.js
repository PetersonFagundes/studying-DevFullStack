/**
 * Operador de reticencias (...) chamado também de
 * rest(agrupa) ou spread (espalhar)
 * Spread
 * "Pega o vetor joga no chão e de depois de alguma forma
 * junta os elementos em outro vetor"
 * Como se fosse concatenar vetor
 * Rest
 *Agrupa parâmetros de um array
 * Principal aplicação é permitir funções
 *  com número infinito de paramteros
 */
//EXEMPLO - AGRUPAR TODAS AS PESSOAS CASADAS
window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );

  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  console.log(marriedMen);
  console.log(marriedWomen);

  //Agrupando
  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Fim' }];

  console.log(marriedPeople);
}

//EXEMPLO REST FAZENDO SOMA INFINITA
function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 1000));
  console.log(infiniteSum(1, 2, 10000, 2000, 43));
}

function infiniteSum(...numbers) {
  //Transforma em vetor
  console.log(numbers);

  return numbers.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Destructuring
 * Facilita a chamada dos objeto
 * Ao invés de object.nome/.idade por exemplo
 * desestrutura o objeto em duas variáveis
 *{nome, idade} = objeto
 */
function doDestructuring() {
  const first = people.results[0];

  //Repetitivo
  // const username = first.login.username;
  // const password = first.login.password;

  //Usando destructuring
  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
