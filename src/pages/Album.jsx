import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      requestMusicas: [],
      isLoading: true,
    };
    this.handleMusic = this.handleMusic.bind(this);
  }

  async componentDidMount() {
    this.handleMusic();
    await getFavoriteSongs();
    this.setState(
    );
  }

  async handleMusic() {
    const { match } = this.props;
    const { id } = match.params;
    const request = await getMusics(id);
    this.setState(
      {
        requestMusicas: request,
        isLoading: false,
      },
    );
  }

  render() {
    const { requestMusicas, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Carregando />)
          : (
            <div>
              <h1 data-testid="artist-name">
                {requestMusicas[0].artistName}
              </h1>
              <h2 data-testid="album-name">{requestMusicas[0].collectionName}</h2>
            </div>
          )}
        {
          // falta adicionar imagem para visiualizar
          requestMusicas.map((music, index) => (
            index > 0 && (
              <MusicCard
                key={ index }
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                requestMusicas={ requestMusicas }
              />)
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};
export default Album;
