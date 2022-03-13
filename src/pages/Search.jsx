import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputbar: '',
      nameArtist: '',
      isButtonDisabled: true,
      carrega: false,
      arrey: [],
    };
    this.seachInputChanged = this.seachInputChanged.bind(this);
    this.validarButton = this.validarButton.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  async onClickButton() {
    const { inputbar } = this.state;
    this.setState({ carrega: true });
    const response = await searchAlbumsAPI(inputbar);
    this.setState({ arrey: [...response], carrega: false, nameArtist: inputbar });
    this.setState({ inputbar: '' });
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

    /*   search = async (event) => {
      event.preventDefault();
    } */

    render() {
      const { isButtonDisabled, inputbar, carrega, arrey, nameArtist } = this.state;

      return (
        <div data-testid="page-search">
          <Header />
          {carrega
            ? <Carregando />
            : (
              <>
                <input
                  type="text"
                  placeholder="Digite aqui o Nome do Artista"
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
                  onClick={ this.onClickButton }
                >
                  Pesquisar
                </button>
              </>
            )}
          {arrey.length === 0 && (
            <p>
              Nenhum álbum foi encontrado
            </p>
          )}
          {arrey.length > 0
           && (
             <p>
               { `Resultado de álbuns de: ${nameArtist}`}
             </p>
           )}
          { arrey.map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
            <div key={ collectionId }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <div className="artista-album">
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <h3>{artistName}</h3>
                  <h3>{collectionName}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
}
export default Search;
