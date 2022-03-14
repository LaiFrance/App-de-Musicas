import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musicas: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

fetchMusics= async () => {
  const { match: { params: { id } } } = this.props;
  const music = await getMusics(id);
  this.setState({ musicas: music });
}

render() {
  const { musicas } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <p className="album-artist">░A░l░b░u░m░ ░d░o░ ░A░r░t░i░s░t░a░</p>
      <main>
        {musicas.length > 0
          ? (
            <>
              <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
              <h2 data-testid="album-name">{musicas[0].collectionName}</h2>
            </>
          )
          : <Carregando />}
        {musicas.length > 0
          ? musicas
            .filter((_musics, index) => index > 0)
            .map(({ trackName, previewUrl, trackId }) => (
              <MusicCard key={ trackId } track={ trackName } url={ previewUrl } />))
          : <Carregando /> }
      </main>
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
export default Album;
