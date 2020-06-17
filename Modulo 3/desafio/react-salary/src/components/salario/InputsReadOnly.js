import React, { Component } from 'react';

export default class InputsReadOnly extends Component {
  render() {
    const { value, totalSalary, descricao } = this.props;
    return (
      <div>
        <span>{descricao}</span>
        <input
          type="text"
          value={
            String(value) + ' (' + String((value / totalSalary) * 100) + '%)'
          }
          readOnly
        />
      </div>
    );
  }
}
