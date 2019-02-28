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
        searchResults: null
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

    searchArtists = async (query, limit) => {
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

            },
            err => {
                // todo display error message if token invalid
                console.log(err);
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
                                    <Search/>
                                </div>
                                :
                                <Login/>
                        )}/>
                        <Route exact path="/search" render={props => (
                            this.state.isLoggedIn ? <SearchResults searchArtists={this.searchArtists} artists={this.state.searchResults}/> : null
                        )}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
