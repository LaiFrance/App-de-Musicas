import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track, previewUrl } = this.props;
    return (
      <div>
        <h2>{ track }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default MusicCard;
