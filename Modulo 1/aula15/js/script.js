/** SetTimeout e setInterval
 *  setTimeout - Usado para postegar a execução de uma função
 *  setInterval - semelhante ao setTimeout, mas repete a execução
 *  a cada X milisegundos
 *  setInterval pode ser cancelada usando clearInterval
 */
window.addEventListener('load', function () {
  const timer = document.querySelector('#timer');

  let count = 0;

  /** setInterval - Exemplo  contador por segundo*/
  const interval = setInterval(() => {
    timer.textContent = ++count;

    /** clearInterval - Exemplo parando após 20 segundos */
    if (count === 20) {
      this.clearInterval(interval);
      return;
    }
    /** setTimeout - Exemplo coloca 0,5 quando multiplo de 5*/
    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ', 5';
      }, 500);
    }
  }, 1000);
});
