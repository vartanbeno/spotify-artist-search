import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lightGreen, red } from '@material-ui/core/colors';
import Login from './components/login/Login';
import Search from './components/search/Search';
import SearchResults from './components/search/search-results/SearchResults';
import SpotifyService from './services/SpotifyService';
import AuthService from './services/AuthService';
import './App.scss';
import Albums from './components/albums/Albums';
import Album from './models/album/Album';
import AlbumArtist from './models/album/AlbumArtist';
import SnackbarWrapper from './components/snackbar-wrapper/SnackbarWrapper';

const theme = createMuiTheme({
    palette: {
        primary: {
            /**
             * Spotify's official green
             * Source: https://developer.spotify.com/branding-guidelines/
             */
            main: '#1DB954'
        },
        secondary: lightGreen,
        error: red
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {

    state = {
        isLoggedIn: AuthService.isLoggedIn(),
        artistName: null,
        albums: null
    };

    componentDidMount() {
        const token = AuthService.getAccessTokenFromRedirect();
        if (token) {
            this.setAccessToken(token);
        }
    }

    setAccessToken(token) {
        AuthService.setAccessToken(token);
        this.setState({
            isLoggedIn: true
        });
    }

    logout = () => {
        AuthService.logout();
        this.setState({
            isLoggedIn: false
        });
    };

    setSnackbar = node => {
        this.snackbar = node;
    };

    openSnackbar = message => {
        this.snackbar.open(message);
    };

    getArtistNameById = id => {
        this.setState({ artistName: null });
        SpotifyService.searchArtistById(id).then(
            res => this.setState({ artistName: res.data.name }),
            err => {
                this.setState({ artistName: '' });
                this.snackbar.open(err.response.data.error.message);
            }
        );
    };

    getAlbumsByArtistId = id => {
        this.setState({ albums: null });
        SpotifyService.searchAlbumsByArtistId(id).then(
            res => {

                const albums = [];
                res.data.items.forEach(album => {

                    const { id, name, artists, total_tracks, release_date, images, external_urls } = album;
                    const image = images.length ? images[0].url : null;
                    const url = external_urls.spotify;

                    const albumArtists = artists.map(artist => new AlbumArtist(artist.id, artist.name));

                    albums.push(new Album(id, name, albumArtists, total_tracks, release_date, image, url));

                });

                this.setState({
                    albums: albums
                });

                if (!albums.length) {
                    this.snackbar.open('This artist doesn\'t have any albums.');
                }

            },
            err => {
                this.setState({ albums: [] });
                this.snackbar.open(err.response.data.error.message);
            }
        );
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className="App">
                        <Navbar logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>
                        <Route exact path="/" render={props => (
                            this.state.isLoggedIn ?
                                <div className="search-container">
                                    <Search openSnackbar={this.openSnackbar}/>
                                </div>
                                :
                                <Login/>
                        )}/>
                        <Route exact path="/search" render={props => (
                            this.state.isLoggedIn ? <SearchResults openSnackbar={this.openSnackbar}/> : null
                        )}/>
                        <Route exact path="/artist/:id/albums" render={props => (
                            this.state.isLoggedIn ? <Albums getArtistNameById={this.getArtistNameById} artistName={this.state.artistName} getAlbumsByArtistId={this.getAlbumsByArtistId} albums={this.state.albums}/> : null
                        )}/>
                    </div>
                </Router>
                <SnackbarWrapper ref={this.setSnackbar}/>
            </MuiThemeProvider>
        );
    }
}

export default App;
