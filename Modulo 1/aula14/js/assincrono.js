/**JS ASSINCRONO
 * Requisição API são demoradas
 * comunicação BD são demoradas (Node.js)
 * Comunicação de dados (loop (for))
 * Importante que JS não espere o término das instruções
 * usando a técnica event loop
 *
 * A ideia é que o JS não espere o término de instruções lentas
 * Geralmente usa-se o temporizador (timeout)
 * Função que vc passa por parâmetro outra função chama-se
 * CALLBACK
 * CALLBACK -> Funções que irão utilizar de alguma forma
 *              a WebAPI(Enventos DOM, REST, timeout e etc....)
 */

console.log('Hi');

setTimeout(function cb1() {
  console.log('cb1');
}, 5000);

console.log('Bye');
