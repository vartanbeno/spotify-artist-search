import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import './Login.scss';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import config from '../../config/spotify.json';

const style = (theme) => createStyles({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    linkSection: {
        paddingTop: '8px'
    },
    link: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
});

const { clientId, redirectUri, responseType } = config;

const authorization = `
    https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}
`;

class Login extends Component {
    render() {
        return (
            <main className="login-container">
                <Paper className={this.props.classes.root} elevation={3}>
                    <div className="login-header">
                        <Typography variant="h5">
                            Login with Spotify
                        </Typography>
                        <img src="assets/images/spotify-icon/spotify-icon-green.png" alt="Spotify Icon" className="spotify-icon"/>
                    </div>
                    <Typography variant="body1" className={this.props.classes.linkSection}>
                        {/* Must use <a> tag instead of <Link> since it's an external link. */}
                        Click <a href={authorization} className={this.props.classes.link}>here</a> to login.
                    </Typography>
                </Paper>
            </main>
        );
    }
}

export default withStyles(style)(Login);
