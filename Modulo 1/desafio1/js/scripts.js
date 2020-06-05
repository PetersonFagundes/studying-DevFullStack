/*
  Para usar
*/
//Boa prática
window.addEventListener('load', start);

//Red
var sliderRed = document.getElementById('sliderRed');
var textR = document.getElementById('textR');

//Green
var sliderGreen = document.getElementById('sliderGreen');
var textG = document.getElementById('textG');

//Blue
var sliderBlue = document.getElementById('sliderBlue');
var textB = document.getElementById('textB');

//Cor da div
var textAreaCor = document.getElementById('areaColor');

function start() {
  //Add ´preventDefault
  preventFormSubmit();

  sliderRed.addEventListener('input', handlerEventChangeRed);
  sliderGreen.addEventListener('input', handlerEventChangeGreen);
  sliderBlue.addEventListener('input', handlerEventChangeBlue);
}

function handlerEventChangeRed(event) {
  console.log(event.target.value);

  //Atualiza caixa de texto
  textR.value = event.target.value;

  render();
}

function handlerEventChangeGreen(eventG) {
  console.log(eventG.target.value);

  //Atualiza caixa de texto
  textG.value = eventG.target.value;

  render();
}

function handlerEventChangeBlue(eventB) {
  console.log(eventB.target.value);

  //Atualiza caixa de texto
  textB.value = eventB.target.value;

  render();
}

function render() {
  textAreaCor.style.background =
    'rgb(' + textR.value + ',' + textG.value + ', ' + textB.value + ')';
}

//Add preventDefault
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
}

//Renderizar o background da tela sempre que movimentar pegando o value

//Capturar o RGB

// textR.value = sliderRed.value;

// sliderRed.oninput = function () {
//   textR.value = this.value;
//   const newLocal = 'rgb(' + textR.value + ',0,0)';
//   textAreaCor.style.background = newLocal;
// };

//Green

// textG.value = sliderGreen.value;

// var textAreaCor = document.getElementById('areaColor');

// sliderGreen.oninput = function () {
//   textG.value = this.value;
//   const newLocal =
//     'rgb(' + textR.value + ',' + textG.value + ',' + textB.value + ')';
//   textAreaCor.style.background = newLocal;
// };

// textB.value = sliderBlue.value;

// var textAreaCor = document.getElementById('areaColor');

// sliderBlue.oninput = function () {
//   textB.value = this.value;
//   const newLocal =
//     'rgb(' + textR.value + ',' + textG.value + ',' + textB.value + ')';
//   textAreaCor.style.background = newLocal;
// };
