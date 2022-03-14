import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav className="links">
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
