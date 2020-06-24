import React, { useState, useEffect } from 'react';
import Installments from './components/Installments';

export default function App() {
  const [initialValue, setInitialValue] = useState(0);
  const [interestRate, setInteresRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    setInitialValue(1000);
    setInteresRate(0.5);
    setMonths(12);
  }, []);

  useEffect(() => {
    let arrayInstallments = [];
    for (let index = 1; index <= months; index++) {
      //Calculo
      const val = Math.pow(1.0 + interestRate / 100.0, index);
      let valueCurrent = parseFloat(initialValue * val).toFixed(2);
      const diff = valueCurrent - initialValue;
      const percentage = (diff * 100) / initialValue;
      //Guardar no vetor
      arrayInstallments.push({
        index,
        initialValue,
        installment: valueCurrent,
        difference: diff,
        percentage,
      });
    }

    //console.log(arrayInstallments);
    setInstallments(arrayInstallments);
  }, [initialValue, interestRate, months]);

  const handleChangeValue = (event) => {
    setInitialValue(event.target.value);
  };

  const handleChangeInterestRate = (event) => {
    setInteresRate(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonths(event.target.value);
  };

  return (
    <div>
      <h1>Desafio - Juros Compostos</h1>

      <div className="row">
        {/* Aqui entra 3 inputs - {initialValue} - {interestRate} - {months} */}
        <div className="input-field col s6">
          <input
            min="100"
            max="100000"
            id="montante-inicial"
            type="number"
            value={initialValue}
            onChange={handleChangeValue}
            step="100"
          />
          <label className="active" htmlFor="montante-inicial">
            Montante Inicial
          </label>
        </div>
        <div className="input-field col s6">
          <input
            id="taxa"
            type="number"
            value={interestRate}
            onChange={handleChangeInterestRate}
          />
          <label className="active" htmlFor="taxa">
            Taxa de Juro (mensal)
          </label>
        </div>
        <div className="input-field col s6">
          <input
            id="meses"
            type="number"
            value={months}
            onChange={handleChangeMonth}
          />
          <label className="active" htmlFor="meses">
            Meses
          </label>
        </div>
      </div>
      <Installments arrayInstallments={installments} />
    </div>
  );
}
