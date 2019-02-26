import React, { Component } from 'react';
import { InputAdornment } from '@material-ui/core';
import './Search.scss';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';

class Search extends Component {
    render() {
        return (
            <main className="search-container">
                <div className="search-input">
                    <TextField fullWidth={true} label="Search for an Artist" variant="outlined" InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchOutlined/>
                            </InputAdornment>
                        )
                    }}/>
                </div>
            </main>
        );
    }
}

export default Search;
