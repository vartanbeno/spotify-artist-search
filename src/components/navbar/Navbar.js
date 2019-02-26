import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

class Navbar extends Component {
    state = {
        isLoggedIn: this.isLoggedIn()
    };

    isLoggedIn() {
        return !!localStorage.getItem('access-token');
    }

    logout() {
        window.localStorage.clear();
    }

    render() {
        return (
            <header className="nav-container">
                <AppBar position="static" color="inherit">
                    <Toolbar className="navbar">
                        <div className="title">
                            <img src="assets/images/spotify-logo/spotify-logo-green.png" alt="Spotify Icon" className="spotify-logo"/>
                            <Typography variant="h5" color="inherit">
                                Artist Search
                            </Typography>
                        </div>
                        <div className="buttons">
                            {this.state.isLoggedIn ? <Button onClick={this.logout} variant="flat">Logout</Button> : null}
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
