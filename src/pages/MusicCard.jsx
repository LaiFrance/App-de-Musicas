import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track, url } = this.props;
    return (
      <div>
        <h2>{ track }</h2>
        <audio data-testid="audio-component" src={ url } controls>
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
  url: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default MusicCard;
