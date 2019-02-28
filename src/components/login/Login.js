import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import './Login.scss';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import AuthService from '../../services/AuthService';

const style = theme => createStyles({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    spotify: {
        color: theme.palette.primary.main
    },
    link: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
});

class Login extends Component {

    login = () => {
        return AuthService.AUTHORIZATION_URL;
    };

    render() {
        return (
            <main className="login-container">
                <Paper className={this.props.classes.root} elevation={3}>
                    <div className="login-header">
                        <Typography variant="h5">
                            Login with <span className={this.props.classes.spotify}>Spotify</span>
                        </Typography>
                        <img src="assets/images/spotify-icon/spotify-icon-green.png" alt="Spotify Icon" className="spotify-icon"/>
                    </div>
                    <Typography variant="body1" className="link-container">
                        {/* Must use <a> tag instead of <Link> since it's an external link. */}
                        Click <a href={this.login()} className={this.props.classes.link}>here</a> to login.
                    </Typography>
                </Paper>
            </main>
        );
    }
}

export default withStyles(style)(Login);
