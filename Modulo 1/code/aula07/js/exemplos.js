// console.log('Olá, Mundo!');

// //Pegando o titulo no h1 do html e trocando o título
// var title = document.querySelector('h1');
// title.textContent = 'Modificado por Péterson Fagundes';

/* 
8 tipos de dados do javascript
Number  - pode ser inteiro ou float
String
Boolean
Null - Javascript não vem nulo a nao ser que o developer defina isso
Undefined - Ausencia de valor
Object - pode ser um grupo de vários atributos (Array, lista é considerado objeto)
Objeto real é  criado por chave e definido chave/valor estilo JSON
 Igualdade é 3 = ou seja, === Compara o valor e tipo
Simbolo de diferença !== usado com duas igualdades
Console usado para debuggar o code 
*/

var a = 5;
var b = 5;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) console.log(a + ' é menor que ' + b);
  else console.log(`${a} igual a ${b}`);
}

//Switch
var dia = 8;
var r = '';
//Para ignorar o prettier
//prettier-ignore
switch (dia) {
  case 1:    r = 'Domingo';    break;
  case 2:    r = 'Segunda';    break;
  case 3:    r = 'Terça';    break;
  case 4:    r = 'Quarta';    break;
  case 5:    r = 'Quinta';    break;
  case 6:    r = 'Sexta';    break;
  case 7:    r = 'Sábado';    break;
  default:    r = 'Inválido';
}

console.log('O dia é ' + r);

//Operador ternário
a = 6;
b = 7;
var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(resposta);

//Somatório com while
var numeroAtual = 1;
var somatorio = 0;
while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}

console.log('A soma é ' + somatorio);

//Somatorio com do..while
var numeroAtual = 1;
var somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);

console.log('A soma é ' + somatorio);

//Somatório com for
var numeroAtual = 1;
var somatorio = 0;
for (numeroAtual = 1; numeroAtual <= 10; numeroAtual++)
  somatorio += numeroAtual;

console.log(`A soma é ${somatorio}`);
