import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

// olhar o carregamento;
// fazer o perfil
/* {
  name: '',
  email: '',
  image: '',
  description: '',
} */
// mudar os chekeds

// requisito 8
class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorites: false,
      isLoading: false,
    };
  }

   removeFavoritAlbumsSons = async () => {
     this.setState({ isLoading: true });
     const { trackName, previewUrl, trackId, removeFavorite } = this.props;
     const song = { trackName, previewUrl, trackId };
     await removeSong(song);
     removeFavorite(song);
     this.setState({ isLoading: false, isFavorites: false });
   }

  saveFavSongs = async () => {
    this.setState({ isLoading: true,
    });
    const { trackName, previewUrl, trackId, addFavorite } = this.props;
    const song = { trackName, previewUrl, trackId };
    await addSong(song);
    addFavorite(song);

    this.setState({
      isLoading: false,
      isFavorites: true,
    });
  }

  verificaCheckBox= ({ target }) => {
    const { checked } = target;
    if (checked) { this.saveFavSongs(); } else { this.removeFavoritAlbumsSons(); }
  }

  render() {
    const { trackName, previewUrl, trackId, favorites } = this.props;
    // musiccard
    const { state: { isLoading, isFavorites }, verificaCheckBox } = this;
    const favorited = favorites.some((mu) => mu.trackId === trackId);

    return (
      <div className="card-lista">
        <h3>{ trackName }</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track
            kind="captions"
          />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
          .
        </audio>
        <div>
          <label htmlFor={ trackId }>
            Favorita
            <input
              className="check"
              id={ trackId }
              type="checkbox"
              checked={ favorited || isFavorites }
              onChange={ verificaCheckBox }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
        <div>
          {isLoading && <Carregando loading={ isLoading } />}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
