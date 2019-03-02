import React, { Component } from 'react';
import './Albums.scss';
import { withRouter } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Avatar, Typography } from '@material-ui/core';
import SpotifyService from '../../services/SpotifyService';
import AlbumArtist from '../../models/album/AlbumArtist';
import AlbumModel from '../../models/album/Album';
import Album from './album/Album';
import AlbumMainArtist from '../../models/album/AlbumMainArtist';

class Albums extends Component {

    state = {
        id: null,
        artist: '',
        albums: null
    };

    componentDidMount() {
        this.setIdAndSearch(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const id = nextProps.match.params.id;
        if (this.state.id !== id) {
            this.setIdAndSearch(id);
        }
    }

    setIdAndSearch = id => {
        this.setState({ id }, () => this.getArtistAndAlbums());
    };

    getArtistAndAlbums = () => {
        this.getArtistById(this.state.id);
        this.getAlbumsByArtistId(this.state.id);
    };

    getArtistById = id => {
        SpotifyService.searchArtistById(id).then(
            res => {
                const { id, name, images } = res.data;
                const image = images.length ? images[0].url : null;
                this.setState({ artist: new AlbumMainArtist(id, name, image) });
            },
            err => {
                this.setState({ artist: '' });
                this.props.openSnackbar(err.response.data.error.message);
            }
        );
    };

    getAlbumsByArtistId = id => {
        SpotifyService.searchAlbumsByArtistId(id).then(
            res => {

                const albums = res.data.items.map(album => {

                    const { id, name, artists, total_tracks, release_date, images, external_urls } = album;
                    const image = images.length ? images[0].url : null;
                    const url = external_urls.spotify;

                    const albumArtists = artists.map(artist => new AlbumArtist(artist.id, artist.name));

                    return new AlbumModel(id, name, albumArtists, total_tracks, release_date, image, url);

                });

                this.setState({
                    albums: albums
                });

                if (!albums.length) {
                    this.props.openSnackbar('This artist doesn\'t have any albums.');
                }

            },
            err => {
                this.setState({ albums: [] });
                this.props.openSnackbar(err.response.data.error.message);
            }
        );
    };

    render() {
        return (
            this.state.albums && this.state.artist ?
                <div className="albums-container">
                    <div className="albums-header">
                        <div className="artist-name-and-image">
                            <Typography variant="h4">{this.state.artist.name}</Typography>
                            {
                                this.state.artist.image ? <Avatar className="artist-image" alt={this.state.artist.name} src={this.state.artist.image}/> : null
                            }
                        </div>
                        <Typography variant="h6" color="textSecondary">Albums</Typography>
                    </div>
                    <div className="albums">
                        {this.state.albums.map(album => (
                            <div key={album.id} className="album">
                                <Album album={album}/>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <Loader/>
        );
    }
}

export default withRouter(Albums);
