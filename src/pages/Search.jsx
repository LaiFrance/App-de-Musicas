import React, { Component } from 'react';
import Header from './components/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisa</h1>
      </div>
    );
  }
}
