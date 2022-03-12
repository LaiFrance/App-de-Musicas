import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Carregando from '../Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameUsuario: '',
      // carregando: false,
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ nameUsuario: name /* carregando: false  */ });
  }

  render() {
    const { state } = this;
    return (
      <header data-testid="header-component">
        {state.nameUsuario
          ? <h1 className="user" data-testid="header-user-name">{ state.nameUsuario }</h1>
          : <Carregando />}
        <nav className="links">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
