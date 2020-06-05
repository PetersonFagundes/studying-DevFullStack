/**   Requisições HTTP
 * -> Comando fetch
 *    Comando utilizado para requisições HTTP
 *    Trabalha internamente com promises
 *    O retorno do fetch são dados binários retornando uma promise
 *    e internamente é convertido em JSON retornando outra promise
 *
 * -> Promises
 *  É um comando como se fosse uma promessa que irá executar(retornar)
 *  algo no futuro podendo ser resolvida(retorno OK) ou rejeitada (error)
 *  Quando retorna OK -> a promise é interceptada pelo 'then'
 *  Quando retorna error -> a promise é interceptada pelo 'catch'
 *
 * -> Async/await
 *  Para evitar o CALLBACK HELL utiliza-se o Async/await que é uma maneira
 *  elegante e legivel de fazer chamadas dentro de outras chamadas de funções
 *  declara a função como antes do function 'async function sendAsync(){ }'
 *  depois para cada promise declara await na sua chamada
 *  'let user = await GetUser(1)' 'let profile = await GetProfile(user);'
 * Ou seja, funciona de forma assincrona porém, respeitando a sequencia
 */

/** ACESSANDO API DO GITHUB COM FETCH */
window.addEventListener('load', function () {
  //o retorno da fetch recebe um resource chamado res no parametro
  // fetch('https://api.github.com/users/petersonfagundes')
  //   .then((res) => {
  //     //Transforma o retorno res em json que recebe outra promise
  //     res.json().then((data) => {
  //       //Aqui é que existem os dados disponíveis em json
  //       //console.log(data);
  //       showData(data);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('Erro na requisição');
  //   });

  doFetch();

  doFetchAsync();

  //Promise
  // console.log(divisionPromise(12, 6));
  // console.log(divisionPromise(5, 0));
  divisionPromise(12, 6).then((result) => {
    console.log(result);
  });

  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function showData(data) {
  let divUsuario = document.querySelector('#divUser');

  //Pegando o conteudo e filtrando em login e email
  divUsuario.textContent = data.login + ' ' + data.name;
}

/** Exemplo de PROMISE para divisao de dois numeros */
function divisionPromise(a, b) {
  //Temos uma estrutura que recebe dois parametros
  //resolve (ok) e o reject (error)
  return new Promise((resolve, reject) => {
    if (b === 0) reject('Não é possível dividir por zero');

    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((erroMsg) => {
      console.log(erroMsg);
    });
}

/** EXEMPLO DE ASYNC/AWAIT usando a divisão do promise acima*/
async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

function doFetch() {
  fetch('https://api.github.com/users/petersonfagundes')
    .then((res) => {
      //Transforma o retorno res em json que recebe outra promise
      res.json().then((data) => {
        //Aqui é que existem os dados disponíveis em json
        //console.log(data);
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
}

/** EXEMPLO DE ASYNC/AWAIT usando a divisão do promise acima*/
async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/petersonfagundes');
  const jsonData = await res.json();
  console.log(jsonData);
}
