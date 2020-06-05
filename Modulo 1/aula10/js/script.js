'use strict'; //O JavaScript acusa mais erros

//var x let

//var - escopo abrangente
//let - escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) console.log('var' + i);

  //Com var eu tenho acesso à variável i for do escopo do for
  //i = 20;
  console.log(i);
}
function withLet() {
  for (let i = 0; i < 10; i++) console.log('let' + i);

  //Com let eu não tenho acesso à variável fora do escopo do for
  // i = 20;
  //console.log(i);
}

withVar();

withLet();

//const - não podemos reatribuir valores
//const gaarnte imutabilidade parcial
const c = 10;
//Gera erro
//c = 20;

//É possível modificar vetores e objetos
const d = [];
d.push(1);

//Function x Arrow Function

function sum(a, b) {
  return a + b;
}

const sum2 = function sum(a, b) {
  //função anonima
  return a + b;
};

//Arrow Function
const sum3 = (a, b) => {
  return a + b;
};

//Arrow Function reduzida - quando existe apenas um comando
const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

//template literals
const name = 'Péterson';
const surName = 'Fagundes';

const text1 = 'Meu nome é ' + name + ' ' + surName;
console.log(text1);

//Aplicando template literals
const text2 = `Meu nome é ${name} ${surName}`;
console.log(text2);

//Default Parameters
const sum5 = (a, b = 10) => a + b;
console.log(sum5(2));
console.log(sum5(2, 3));
