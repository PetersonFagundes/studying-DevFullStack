//Boa prática
window.addEventListener('load', () => {
  //Set focus do mouse no inputtext
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
});

//Criando var global - Boa prática é usar objeto isolado
let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
//Navega no DOM é caro
let inputName = null;
//Bool para edição
let isEditing = false;
//Indice do elemento editado
let currentIndex;

//Add preventDefault
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

//Set focus do mouse no inputtext
function activateInput() {
  function insertName(newName) {
    if (newName.trim() === '') {
      clearInput();
      return;
    }

    if (newName !== '') {
      //add event.target.value na lista
      //globalNames.push(newName);
      globalNames = [...globalNames, newName];
    }
    console.log(globalNames);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }
  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        //Inserir na lista e apagar o value
        insertName(event.target.value);
      }

      //Atualiza lista no index
      render();
      isEditing = false;
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

//Pegar elemento da div e inserir o globalnames dinamicamente
function render() {
  //Função para cria o botão de delete
  function createDeleteButton(index) {
    function deleteName() {
      //globalNames.splice(index, 1);
      //Gera o vetor e reatribui a ele
      // globalNames = globalNames.filter((name, indice) => {
      //   // if (indice === index) return false;
      //   // return true;
      //   return indice !== index;
      // });

      globalNames = globalNames.filter((name, indice) => indice !== index);
      render();
    }

    var button = document.createElement('button');
    //Atrelando o css ao button usando classList
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpanName(name, index) {
    function editName() {
      console.log(name);
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var spanName = document.createElement('span');
    //transformar span para clicavel
    spanName.classList.add('clickable');
    spanName.textContent = name;

    spanName.addEventListener('click', editName);

    return spanName;
  }

  var divNames = document.querySelector('#names');
  //Limpar a div names
  divNames.innerHTML = '';

  //divNames.innerHTML = '<ul><li>Nome 1</li></ul>';
  //Criar ul
  var len = globalNames.length;
  var ul = document.createElement('ul');

  for (var i = 0; i < len; i++) {
    var li = document.createElement('li');

    var currentName = globalNames[i];
    //Criar um botão e um texto atrelado ao li
    var button = createDeleteButton(i);
    var spanName = createSpanName(currentName, i);

    //Fazer n li's, dependendo do len do globalNames
    //Add Button e Text a li
    li.appendChild(button);
    li.appendChild(spanName);

    //li.textContent = globalNames[i];
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
