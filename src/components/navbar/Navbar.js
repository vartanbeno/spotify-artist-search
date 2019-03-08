import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FlashOffIcon from '@material-ui/icons/FlashOffRounded';
import SunIcon from '@material-ui/icons/WbSunnyRounded';

class Navbar extends Component {

    logout = () => {
        this.props.logout();
    };

    makeDark = e => {
        this.props.setDarkMode(true);
    };

    makeLight = e => {
        this.props.setDarkMode(false);
    };

    render() {
        return (
            <header className="nav-container">
                <AppBar position="static" color="inherit">
                    <Toolbar className="navbar" variant="dense">
                        <Link to="/" className="title-logo link">
                            <img src="/assets/images/spotify-logo/spotify-logo-green.png" alt="Spotify Logo" className="spotify-logo"/>
                            <Typography variant="h6" className="title">
                                Artist Search
                            </Typography>
                        </Link>
                        <div className="navbar-buttons">
                            {this.props.isLoggedIn ? <div><Link to="/" className="link"><Button onClick={this.logout} variant="text" size="small">Logout</Button></Link></div> : null}
                            {
                                this.props.darkMode ?
                                    <div>
                                        <IconButton onClick={this.makeLight} color="primary" style={{ padding: 8 }}>
                                            <SunIcon/>
                                        </IconButton>
                                    </div>
                                    :
                                    <div>
                                        <IconButton onClick={this.makeDark} color="primary" style={{ padding: 8 }}>
                                            <FlashOffIcon/>
                                        </IconButton>
                                    </div>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
