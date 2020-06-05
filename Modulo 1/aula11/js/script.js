//Chama o people
console.log(people);

//ARROW FUNCTION usado quando vc não usar mais de uma vez
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});
/**
 * O map e o filter são imutáveis, ou seja,
 * ele gera um novo array e não muda o array original
 */
//USAR MAP e transformar o vetor apenas com nome e email
function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });

  console.log(nameEmailArray);
  return nameEmailArray;
}

//USAR FILTER -> Filtras as pessoas maiores que 50 anos
function doFilter() {
  //percore e checa o critério
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

//USAR FOREACH -> Incluir nova propriedade no aray
function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(mappedPeople);
}

//USAR REDUCE (retorna apenas um valor)-> Soma todas as idades
function doReduce() {
  //Soma cada um iniciando em 0
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(totalAges);

  //Reduce substitui o for abaixo
  /*
  let sumAges = 0;
  for (let i = 0; i < people.results.length; i++) {
    var current = people.results[i];
    sumAges += current.dob.age;
  }

  console.log(sumAges);
  */
}

//FIND -> Pegar o PRIMEIRO usuário de Minas Gerais
//ATENÇÃO O FIND RETORNA SOMENTE A PRIMEIRA OCORRÊNCIA
function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });

  console.log(found);
}

//SOME -> Retorna verdadeiro ou falso retorna se existe ou nao dentro do array
//Existe algum usuário do amazonas?
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });

  console.log(found);
}

//EVERY -> Se TODOS do array atendem a essa regra retorna true
function doEvery() {
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });

  console.log(every);
}

//SORT -> Ordena
function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      //Comparando pelo tamanho do nome
      return a.name.length - b.name.length;
      //Ordem alfabética
      //return a.name.localeCompare(b.name);
    });

  console.log(mappedNames);
}
