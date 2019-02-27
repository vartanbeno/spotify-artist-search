import React, { Component } from 'react';
import './Loader.scss';
import { CircularProgress } from '@material-ui/core';

class Loader extends Component {

    render() {
        return (
            <div className="loader-container">
                <CircularProgress/>
            </div>
        )
    }
}

export default Loader;
