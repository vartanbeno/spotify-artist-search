import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SnackbarWrapper extends Component {

    state = {
        open: false,
        message: ''
    };

    open = message => {
        this.setState({
            open: true,
            message: message
        });
    };

    close = (e, reason) => {
        if (reason !== 'clickaway') {
            this.setState({ open: false });
        }
    };

    render() {
        return (
            <Snackbar
                className="snackbar"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.close}
                message={<span>{this.state.message}</span>}
            />
        );
    }
}

export default SnackbarWrapper;
