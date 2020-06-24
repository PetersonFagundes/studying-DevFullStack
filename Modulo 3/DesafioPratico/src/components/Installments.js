import React from 'react';
import Installment from './Installment';
import css from './installments.module.css';

export default function Installments({ arrayInstallments }) {
  //arrayInstallments = Array.from(arrayInstallments);
  // arrayInstallments.forEach((element) => {
  //   console.log(element);
  // });

  return (
    <div className={`${css.flexRow}`}>
      {arrayInstallments.map((element) => {
        //console.log(element);
        return <Installment key={element.index} curr={element} />;
      })}
    </div>
  );
}
