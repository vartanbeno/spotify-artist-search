import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PageNotFound extends Component {

    componentDidMount() {
        setTimeout(() => this.props.openSnackbar('Invalid URL.'));
    }

    render() {
        return (
            <Redirect to="/"/>
        )
    }
}

export default PageNotFound;
