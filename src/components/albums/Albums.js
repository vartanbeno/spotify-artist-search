import React, { Component } from 'react';
import './Albums.scss';
import { withRouter } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Typography } from '@material-ui/core';
import Album from './album/Album';

class Albums extends Component {

    state = {
        id: null
    };

    componentDidMount() {
        this.setState({ id: this.props.match.params.id }, () => this.getArtistNameAndAlbums());
    }

    changeArtist = id => {
        if (id !== this.state.id) {
            this.setState({ id }, () => this.getArtistNameAndAlbums());
        }
    };

    getArtistNameAndAlbums = () => {
        this.props.getArtistNameById(this.state.id);
        this.props.getAlbumsByArtistId(this.state.id);
    };

    render() {

        const { artistName, albums } = this.props;

        return (
            <div className="albums-container">
                <div className="albums-header">
                    <Typography variant="h4">{artistName}</Typography>
                    <Typography variant="h6" color="textSecondary">Albums</Typography>
                </div>
                {
                    albums ?
                        <div className="albums">
                            {albums.map(album => (
                                <div key={album.id} className="album">
                                    <Album album={album} changeArtist={this.changeArtist}/>
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
