import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green, lightGreen, red } from '@material-ui/core/colors';
import Login from './components/login/Login';
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from 'querystring';
import Search from './components/search/Search';

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
        isLoggedIn: this.isLoggedIn()
    };

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

    componentDidMount() {
        const params = queryString.parse(window.location.hash.slice(1));            // slice(1) to ignore leading #
        if (params.access_token && typeof params.access_token === 'string') {
            this.setAccessToken(params.access_token);
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className={`App ${this.props.classes.root}`}>
                        <Navbar logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>
                        <Route exact path="/" component={this.state.isLoggedIn ? Search : Login}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(style)(App);
