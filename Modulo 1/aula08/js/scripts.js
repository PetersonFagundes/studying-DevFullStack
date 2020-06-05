console.log('aula8');

//Garantir que o code JS só vai usar depois de carregado
window.addEventListener('load', start);
//start sem o parenteses para nao executar instananeo

function start() {
  console.log('Carregado');
  var inputName = document.querySelector('#nameInput');
  inputName.addEventListener('keyup', countName);

  var form = document.querySelector('form');

  //Prevenindo para não enviar ao servidor
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var count = event.target.value;

  console.log(event);

  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
}
