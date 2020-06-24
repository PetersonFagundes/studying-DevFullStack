import React from 'react';
import css from './installments.module.css';

export default function Installment({ curr }) {
  //console.log({ curr });
  const stylesDiff = curr.difference > 0 ? styles.goodGrade : styles.badGrade;
  return (
    <div className={`${css.border}`}>
      <span style={styles.colorPer}>{curr.index}</span>
      <p style={stylesDiff}>R$ {curr.installment}</p>
      <p style={stylesDiff}>R$ {curr.difference.toFixed(2)}</p>
      <p tyle={styles.colorPer}>{parseFloat(curr.percentage).toFixed(2)}%</p>
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },

  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },

  colorPer: {
    fontWeight: 'bold',
  },

  table: {
    margin: '20px',
    padding: '10px',
  },
};
