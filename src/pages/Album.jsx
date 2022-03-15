import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: [],
      artistName: '',
      albumName: '',
      musicasFavoritas: [],
      loading: false,
    };
    this.myfavorita = this.myfavorita.bind(this);
    this.fetchMusics = this.fetchMusics.bind(this);
    this.recuperaFav = this.recuperaFav.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
    this.recuperaFav();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const musicstrack = musics.filter((item, index) => index !== 0);
    this.setState({ album: musicstrack,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName });
  }

  async myfavorita({ target }) {
    const { album } = this.state;
    const obj = album[target.name];
    if (target.checked === true) {
      this.setState({ loading: true });
      await addSong(obj);
    } else {
      this.setState({ loading: true });
      await removeSong(obj);
    }
    this.setState({ loading: false }, () => this.recuperaFav());
  }

  async recuperaFav() {
    this.setState({ loading: true });
    const musicsFavoritas = await getFavoriteSongs();
    const idFavoritas = musicsFavoritas.map(({ trackId }) => trackId);
    this.setState({ musicasFavoritas: idFavoritas, loading: false });
  }

  render() {
    const { album, artistName, albumName, loading, musicasFavoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Carregando />
          : (
            <>
              <h1 data-testid="artist-name">{artistName}</h1>
              <h2 data-testid="album-name">{albumName}</h2>
              <div>

                {album.map(({ trackName, previewUrl, trackId }, index) => (
                  <MusicCard
                    key={ index }
                    musicasFavoritas={ musicasFavoritas }
                    trackId={ trackId }
                    myfavorita={ this.myfavorita }
                    nomemusic={ trackName }
                    previewUrl={ previewUrl }
                  />
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;
export default Album;
