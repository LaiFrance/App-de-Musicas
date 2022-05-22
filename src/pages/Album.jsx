import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

/* [
  {
    artistId: 12,
    artistName: "Artist Name",
    collectionId: 123,
    collectionName: "Collection Name",
    collectionPrice: 12.25,
    artworkUrl100: "https://url-to-image",
    releaseDate: "2012-03-02T08:00:00Z",
    trackCount: 8,
  }
]
 */

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      requestMusicas: [],
      favorites: [],
      isLoading: true,
    };
  }

  // req API
  componentDidMount =async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const requestMusic = await getMusics(id);

    this.setState({
      requestMusicas: requestMusic,
    });
    this.isFavoriteSong();
  }

  isFavoriteSong = async () => {
    this.setState({
      isLoading: true,
    });

    const mysongsfavorites = await getFavoriteSongs();
    this.setState({
      favorites: mysongsfavorites,
      isLoading: false,
    });
  }

  addFavorite = (favorite) => {
    const { favorites } = this.state;
    this.setState({
      favorites: [...favorites, favorite],
    });
  }

removeFavorite = (favorite) => {
  const { favorites } = this.state;
  this.setState({
    favorites: favorites.filter((mu) => mu.trackId !== favorite.trackId),
  });
}

render() {
  const { state: { requestMusicas, isLoading, favorites },
    addFavorite,
    removeFavorite } = this;

  return (
    <div data-testid="page-album">
      <Header />
      {
        requestMusicas.length
      && (
        <div className="album-artist">
          <h2 data-testid="artist-name">{requestMusicas[0].artistName}</h2>
          <h2 data-testid="album-name">{requestMusicas[0].collectionName}</h2>

        </div>

      )
      }
      <div className="card-music">
        <ul className="card-music-list">
          {requestMusicas.filter(({ trackName, previewUrl, trackId }) => (
            trackName && previewUrl && trackId
          )).map((el) => (
            <MusicCard
              className="card-musica"
              key={ el.trackName }
              trackId={ el.trackId }
              trackName={ el.trackName }
              previewUrl={ el.previewUrl }
              favorites={ favorites }
              addFavorite={ addFavorite }
              removeFavorite={ removeFavorite }
            />
          ))}
        </ul>
      </div>
      {isLoading && <Carregando loading={ isLoading } /> }

    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default Album;
