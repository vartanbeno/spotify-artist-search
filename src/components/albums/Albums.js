import React, { Component } from 'react';
import './Albums.scss';
import { withRouter } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Typography } from '@material-ui/core';
import SpotifyService from '../../services/SpotifyService';
import AlbumArtist from '../../models/album/AlbumArtist';
import AlbumModel from '../../models/album/Album';
import Album from './album/Album';

class Albums extends Component {

    state = {
        id: null,
        artistName: '',
        albums: []
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
        this.setState({ id }, () => this.getArtistNameAndAlbums());
    };

    getArtistNameAndAlbums = () => {
        this.getArtistNameById(this.state.id);
        this.getAlbumsByArtistId(this.state.id);
    };

    getArtistNameById = id => {
        SpotifyService.searchArtistById(id).then(
            res => this.setState({ artistName: res.data.name }),
            err => {
                this.setState({ artistName: '' });
                this.props.openSnackbar(err.response.data.error.message);
            }
        );
    };

    getAlbumsByArtistId = id => {
        SpotifyService.searchAlbumsByArtistId(id).then(
            res => {

                const albums = [];
                res.data.items.forEach(album => {

                    const { id, name, artists, total_tracks, release_date, images, external_urls } = album;
                    const image = images.length ? images[0].url : null;
                    const url = external_urls.spotify;

                    const albumArtists = artists.map(artist => new AlbumArtist(artist.id, artist.name));

                    albums.push(new AlbumModel(id, name, albumArtists, total_tracks, release_date, image, url));

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
            <div className="albums-container">
                <div className="albums-header">
                    <Typography variant="h4">{this.state.artistName}</Typography>
                    <Typography variant="h6" color="textSecondary">Albums</Typography>
                </div>
                {
                    this.state.albums ?
                        <div className="albums">
                            {this.state.albums.map(album => (
                                <div key={album.id} className="album">
                                    <Album album={album}/>
                                </div>
                            ))}
                        </div>
                        :
                        <Loader/>
                }
            </div>
        );
    }
}

export default withRouter(Albums);
