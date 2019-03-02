import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <header className="nav-container">
                <AppBar position="static" color="inherit">
                    <Toolbar className="navbar">
                        <Link to="/" className="title link">
                            <img src="/assets/images/spotify-logo/spotify-logo-green.png" alt="Spotify Logo" className="spotify-logo"/>
                            <Typography variant="h5" color="inherit">
                                Artist Search
                            </Typography>
                        </Link>
                        <div className="buttons">
                            {this.props.isLoggedIn ? <Link to="/" className="link"><Button onClick={this.logout} variant="text">Logout</Button></Link> : null}
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
