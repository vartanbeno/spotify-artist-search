import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lightGreen, red } from '@material-ui/core/colors';
import Login from './components/login/Login';
import Search from './components/search/Search';
import SearchResults from './components/search/search-results/SearchResults';
import Artist from './models/Artist';
import SpotifyService from './services/SpotifyService';
import AuthService from './services/AuthService';
import './App.scss';
import Snackbar from '@material-ui/core/Snackbar';
import Albums from './components/albums/Albums';
import Album from './models/Album';
import AlbumArtist from './models/AlbumArtist';

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
        searchResults: null,
        artistName: null,
        albums: null,
        snackbarOpen: false,
        snackbarMessage: ''
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

    searchArtists = (query, limit) => {

        if (!query.trim()) {
            this.setState({
                searchResults: [],
                snackbarOpen: true,
                snackbarMessage: 'Your search doesn\'t contain anything!'
            });
            return;
        }

        this.setState({
            searchResults: null
        });

        SpotifyService.searchArtists(query, limit).then(
            res => {

                const artists = [];
                res.data.artists.items.forEach(artist => {

                    const { id, name, images, followers, popularity } = artist;
                    const image = images.length ? images[0].url : null;

                    artists.push(new Artist(id, name, image, followers.total, popularity));

                });

                this.setState({
                    searchResults: artists
                });

                if (!artists.length) {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: 'Your search didn\'t return any results.'
                    });
                }

            },
            err => {
                this.setState({ searchResults: [] });
                this.openSnackbar(err.response.data.error.message);
            }
        );
    };

    getArtistNameById = id => {
        this.setState({ artistName: null });
        SpotifyService.searchArtistById(id).then(
            res => this.setState({ artistName: res.data.name }),
            err => {
                this.setState({ artistName: '' });
                this.openSnackbar(err.response.data.error.message);
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
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: 'This artist doesn\'t have any albums.'
                    });
                }

            },
            err => {
                this.setState({ albums: [] });
                this.openSnackbar(err.response.data.error.message);
            }
        );
    };

    openSnackbar = message => {
        this.setState({
            snackbarOpen: true,
            snackbarMessage: message
        });
    };

    closeSnackbar = (e, reason) => {
        if (reason !== 'clickaway') {
            this.setState({ snackbarOpen: false });
        }
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
                                    <Search/>
                                </div>
                                :
                                <Login/>
                        )}/>
                        <Route exact path="/search" render={props => (
                            this.state.isLoggedIn ? <SearchResults searchArtists={this.searchArtists} artists={this.state.searchResults}/> : null
                        )}/>
                        <Route exact path="/artist/:id/albums" render={props => (
                            this.state.isLoggedIn ? <Albums getArtistNameById={this.getArtistNameById} artistName={this.state.artistName} getAlbumsByArtistId={this.getAlbumsByArtistId} albums={this.state.albums}/> : null
                        )}/>
                    </div>
                </Router>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    message={<span>{this.state.snackbarMessage}</span>}
                />
            </MuiThemeProvider>
        );
    }
}

export default App;
