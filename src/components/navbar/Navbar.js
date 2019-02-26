import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Navbar extends Component {
    render() {
        return (
            <header className="nav-container">
                <AppBar position="static">
                    <Toolbar className="title">
                        <Typography variant="h5" color="inherit">
                            Spotify Artist Search
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
