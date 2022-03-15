import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      checked: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const salvaSongs = await getFavoriteSongs();
    const checkVerificar = salvaSongs
      .some((song) => song.trackId === trackId);
    this.setState(
      { checked: checkVerificar },
    );
  }

  async handleFavorite({ target }) {
    const { requestMusicas } = this.props;
    const { checked } = this.state;
    this.setState(
      { load: true },
    );

    const encontraMusica = requestMusicas
      .find((music) => Number(music.trackId) === Number(target.name));
    await addSong(encontraMusica);
    await getFavoriteSongs();
    this.setState(
      { load: false },
    );
    if (checked === false) {
      this.setState(
        { checked: true },
      );
    } else {
      removeSong(encontraMusica);
      this.setState(
        { checked: false },
      );
    }
  }

  // olhar o checkbox , alterar tamanho
  render() {
    const { trackId, previewUrl, trackName } = this.props;
    const { load, checked } = this.state;
    return (
      <div>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <div>
          {!load ? (
            <label htmlFor="checkbox-music">
              <input
                type="checkbox"
                name={ trackId }
                id="checkbox-music"
                onChange={ this.handleFavorite }
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>)
            : (
              <Carregando />
            )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  requestMusicas: PropTypes.arrayOf(PropTypes.object).isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
