/**
 * TODO
 * [x] Carregar json cidade
 * [x] Carregar json estado
 * [x] Unir Cidade e Estado
 * [x] Criar um JSON para cada estad com suas cidades
 *    correspondentes Ex. MG.json
 * [] Método que recebe um parametro de UF e ler o arquivo
 *    que acabou de criar
 * [] Método que imprime um array com UF dos 5 estados que mais
 *    tem cidade Ex. [MG-32, UF-20, ...]
 * [] Método que imprime o UF dos 5 estados com menos cidades
 * [] Método que imprime um array com a cidade de maior nome de
 *    cada estado seguida de UF.
 *     Exemplo: [NomeCidade-UF, Nome-UF, ...]
 * [] Método que imprime um array com a cidade de menor nome de
 *    cada estado seguida de UF.
 *     Exemplo: [NomeCidade-UF, Nome-UF, ...]
 * [] Método para imprimir o maior nome entre todos os estados
 *    Exemplo: CidadeNome-UF (UNICO)
 * [] Método para imprimir o menor nome entre todos os estados
 *    Exemplo: CidadeNome-UF (UNICO)
 */
import { promises } from 'fs';
import file from 'fs';

const { readFileSync, writeFile } = promises;

//variáveis de uso global
let citiesJson = [];
let statesJson = [];
let stateCity = [];

async function readFileCitiesJson() {
  try {
    const resp = await file.readFileSync('./json/Cidades.json');
    citiesJson = JSON.parse(resp);
    // console.log(citiesJson);
  } catch (err) {
    console.log(err);
  }
}

async function readFileStatesJson() {
  try {
    const resp = file.readFileSync('./json/Estados.json');
    statesJson = JSON.parse(resp);
    //console.log(statesJson);
  } catch (err) {
    console.log(err);
  }
}

async function createObjectCityState() {
  stateCity = statesJson.map((state) => {
    const { ID, Sigla } = state;
    return {
      UF: Sigla,
      cities: JSON.stringify(
        citiesJson
          .filter((city) => {
            return city.Estado === state.ID;
          })
          .map((cit) => {
            const { ID, Nome } = cit;
            return {
              id: ID,
              nome: Nome,
            };
          })
      ),
    };
  });

  //console.log(stateCity);
}

function createFileForState() {
  stateCity.forEach((state) => {
    const { UF, cities } = state;

    writeFile(`./estados/${UF}.json`, cities, (err) => {
      if (err) throw err;
      console.log('Saved');
    });
  });
}

async function init() {
  await readFileCitiesJson();
  await readFileStatesJson();

  await createObjectCityState();
  createFileForState();
}

init();
