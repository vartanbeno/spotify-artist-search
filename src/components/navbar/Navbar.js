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
                    <Toolbar className="navbar" variant="dense">
                        <Link to="/" className="title-logo link">
                            <img src="/assets/images/spotify-logo/spotify-logo-green.png" alt="Spotify Logo" className="spotify-logo"/>
                            <Typography variant="h6" color="inherit" className="title">
                                Artist Search
                            </Typography>
                        </Link>
                        <div>
                            {this.props.isLoggedIn ? <Link to="/" className="link"><Button onClick={this.logout} variant="text">Logout</Button></Link> : null}
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
