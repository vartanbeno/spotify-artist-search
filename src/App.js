import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lightGreen, red } from '@material-ui/core/colors';
import Login from './components/login/Login';
import Search from './components/search/Search';
import SearchResults from './components/search/search-results/SearchResults';
import AuthService from './services/AuthService';
import './App.scss';
import Albums from './components/albums/Albums';
import SnackbarWrapper from './components/snackbar-wrapper/SnackbarWrapper';
import PageNotFound from './components/page-not-found/PageNotFound';

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
        isLoggedIn: AuthService.isLoggedIn()
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

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className="App">
                        <Navbar logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>

                        <Switch>
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
                                this.state.isLoggedIn ? <Albums openSnackbar={this.openSnackbar}/> : null
                            )}/>
                            <Route render={props => <PageNotFound openSnackbar={this.openSnackbar}/>}/>
                        </Switch>
                    </div>
                </Router>
                <SnackbarWrapper ref={this.setSnackbar}/>
            </MuiThemeProvider>
        );
    }
}

export default App;
