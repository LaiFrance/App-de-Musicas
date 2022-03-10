import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Carregando from '../Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameUsuario: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ nameUsuario: name });
  }

  render() {
    const { state } = this;
    return (
      <header data-testid="header-component">
        {state.nameUsuario
          ? <h1 className="user" data-testid="header-user-name">{ state.nameUsuario }</h1>
          : <Carregando />}
      </header>
    );
  }
}
export default Header;
