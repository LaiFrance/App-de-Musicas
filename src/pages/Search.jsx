import React, { Component } from 'react';
import Header from './components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputbar: '',
      isButtonDisabled: true,
    };
  }

  seachInputChanged= ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value }, () => this.validarButton());
  }

    validarButton=() => {
      const { inputbar } = this.state;
      const numMin = inputbar.length >= 2;
      this.setState({
        isButtonDisabled: !numMin,
      });
    }

    search = async (event) => {
      event.preventDefault();
    }

    render() {
      const { isButtonDisabled, inputbar } = this.state;

      return (
        <div data-testid="page-search">
          <Header />
          <p>Search</p>
          <form>
            Nome:
            <input
              type="text"
              name="inputbar"
              data-testid="search-artist-input"
              value={ inputbar }
              onChange={ this.seachInputChanged }
            />
            <button
              disabled={ isButtonDisabled }
              type="submit"
              value="Pesquisar"
              data-testid="search-artist-button"
              onClick={ this.search }
            >
              Pesquisar
            </button>
          </form>
        </div>
      );
    }
}
