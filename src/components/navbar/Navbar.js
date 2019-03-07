import React, { Component } from 'react';
import './Navbar.scss';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import FlashOnIcon from '@material-ui/icons/FlashOnRounded';
import FlashOffIcon from '@material-ui/icons/FlashOffRounded';

class Navbar extends Component {

    logout = () => {
        this.props.logout();
    };

    handleChange = e => {
        this.props.setDarkMode(e.target.checked);
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
                            <div className="navbar-theme-toggle">
                                <FlashOnIcon color="primary"/>
                                <Switch
                                    checked={this.props.darkMode}
                                    onChange={this.handleChange}
                                    color="primary"
                                />
                                <FlashOffIcon color="primary"/>
                            </div>
                            {this.props.isLoggedIn ? <div><Link to="/" className="link"><Button onClick={this.logout} variant="text">Logout</Button></Link></div> : null}
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Navbar;
