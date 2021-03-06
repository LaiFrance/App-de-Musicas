import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUsuario: null,
      isLoading: false,
    };
  }

   componentDidMount= async () => {
     this.setState({
       isLoading: true,
     });
     const { name } = await getUser();

     this.setState((stateanterior) => ({
       ...stateanterior,
       nameUsuario: name,
       isLoading: false,
     }));
   }

   render() {
     const { state } = this;
     return (
       <div className="input-pesquisa">
         <header data-testid="header-component">
           {state.nameUsuario
             ? <h1 data-testid="header-user-name">{ state.nameUsuario }</h1>
             : <Carregando />}
           <nav className="links">
             <ul className="nav-ul">
               <Link
                 to="/search"
                 data-testid="link-to-search"
               >
                 Pesquisar
               </Link>
               <Link
                 to="/favorites"
                 data-testid="link-to-favorites"
               >
                 Favorites
               </Link>
               <Link
                 to="/profile"
                 data-testid="link-to-profile"
               >
                 Profile
               </Link>
             </ul>
           </nav>
         </header>
       </div>
     );
   }
}
export default Header;
