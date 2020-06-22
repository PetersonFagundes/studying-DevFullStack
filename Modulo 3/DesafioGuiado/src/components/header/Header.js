import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers';

import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    //console.log(event.target.value);
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div className="{css.flexRow}">
        <input
          placeholder="Filtro"
          style={{ width: '200px' }}
          type="text"
          value={filter}
          onChange={this.handleInputChange}
        />{' '}
        |
        <span className={css.info}>
          Países: <strong>{countryCount}</strong>{' '}
        </span>{' '}
        |
        <span className={css.info}>
          População: <strong>{formatNumber(totalPopulation)}</strong>
        </span>
      </div>
    );
  }
}
