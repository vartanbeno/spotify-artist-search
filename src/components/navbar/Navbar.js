import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

class Navbar extends Component {

    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <header className="nav-container">
                <AppBar position="static" color="inherit">
                    <Toolbar className="navbar">
                        <a href="/" className="title">
                            <img src="assets/images/spotify-logo/spotify-logo-green.png" alt="Spotify Icon" className="spotify-logo"/>
                            <Typography variant="h5" color="inherit">
                                Artist Search
                            </Typography>
                        </a>
                        <div className="buttons">
                            {this.props.isLoggedIn ? <Button onClick={this.logout} variant="text" href="/">Logout</Button> : null}
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
