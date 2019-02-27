import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green, lightGreen, red } from '@material-ui/core/colors';
import Login from './components/login/Login';
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from 'querystring';
import Search from './components/search/Search';
import SearchResults from './components/search/search-results/SearchResults';
import axios from 'axios';
import Artist from './models/Artist';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: lightGreen,
        error: red
    },
    typography: {
        useNextVariants: true
    }
});

const style = {
    root: {
        display: 'flex',
        flexFlow: 'column',
    }
};

const TOKEN_KEY = 'access-token';

class App extends Component {

    state = {
        isLoggedIn: this.isLoggedIn(),
        searchResults: []
    };

    componentDidMount() {
        const params = queryString.parse(window.location.hash.slice(1));            // slice(1) to ignore leading #
        if (params.access_token && typeof params.access_token === 'string') {
            this.setAccessToken(params.access_token);
        }
    }

    getAccessToken() {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    setAccessToken(token) {
        this.setState({
            isLoggedIn: true
        });
        return window.localStorage.setItem(TOKEN_KEY, token);
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    };

    logout = () => {
        window.localStorage.clear();
        this.setState({
            isLoggedIn: false
        });
    };

    getAuthorizationHeader = () => {
        return {
            headers: {
                Authorization: `Bearer ${this.getAccessToken()}`
            }
        };
    };

    getSearchEndpoint = (artist, limit = 10) => {
        return `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=${limit}`;
    };

    searchArtists = (query, limit) => {
        this.setState({
            searchResults: []
        });

        axios.get(this.getSearchEndpoint(query, limit), this.getAuthorizationHeader()).then(
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
                // todo: check if 401
            }
        );
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className={`App ${this.props.classes.root}`}>
                        <Navbar logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>
                        <Route exact path="/" component={this.state.isLoggedIn ? Search : Login}/>
                        <Route exact path="/search" render={props => (
                            this.state.isLoggedIn ? <SearchResults searchArtists={this.searchArtists} artists={this.state.searchResults}/> : null
                        )}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(style)(App);
