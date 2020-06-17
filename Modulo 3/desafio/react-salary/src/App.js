import React, { Component } from 'react';
import { calculateSalaryFrom } from './components/calculo/salary';
import InputsReadOnly from './components/salario/InputsReadOnly';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salary: [],
    };
  }

  componentDidMount() {
    const result = calculateSalaryFrom(parseFloat(1000));
    this.setState({
      salary: result,
    });
  }

  handleChange = (event) => {
    let value = event.target.value;

    if (value === '') value = '0';

    const result = calculateSalaryFrom(parseFloat(value));

    this.setState({
      salary: result,
    });
  };

  render() {
    const { salary } = this.state;
    const total = parseFloat(
      salary.discountINSS + salary.discountIRPF + salary.netSalary
    );

    return (
      <div>
        <h1>React Salário</h1>
        <span>Salário</span>
        <input
          type="number"
          value={String(total)}
          onChange={this.handleChange}
        />
        <hr />
        <InputsReadOnly
          value={salary.baseINSS}
          totalSalary={total}
          descricao={'Base INSS'}
        />
        <InputsReadOnly
          value={salary.discountINSS}
          totalSalary={total}
          descricao={'Desconto INSS'}
        />
        <InputsReadOnly
          value={salary.baseIRPF}
          totalSalary={total}
          descricao={'BaseIRPF'}
        />
        <InputsReadOnly
          value={salary.discountIRPF}
          totalSalary={total}
          descricao={'Desconto IRPF'}
        />
        <InputsReadOnly
          value={salary.netSalary}
          totalSalary={total}
          descricao={'Salario Líquido'}
        />
      </div>
    );
  }
}
