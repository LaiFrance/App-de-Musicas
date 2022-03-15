import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  verificamusicas(id) {
    const { musicasFavoritas } = this.props;
    const res = musicasFavoritas.some((song) => Number(song) === Number(id));
    return res;
  }

  render() {
    const { trackId, previewUrl, index, nomemusic, myfavorita } = this.props;
    return (
      <div>
        <h2>{ nomemusic }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ index }
            id={ trackId }
            onChange={ myfavorita }
            checked={ this.verificamusicas(trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  nomemusic: PropTypes.string,
  trackId: PropTypes.number,
  previewUrl: PropTypes.string,
  index: PropTypes.number,
  myfavorita: PropTypes.func,
  musicasFavoritas: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MusicCard;
