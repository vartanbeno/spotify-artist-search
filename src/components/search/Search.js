import React, { Component } from 'react';
import { InputAdornment } from '@material-ui/core';
import './Search.scss';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';

class Search extends Component {

    state = {
        q: ''
    };

    searchChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitSearch = (e) => {
        e.preventDefault();
        this.props.history.push('/search?q=' + this.state.q);
        this.setState({
            q: ''
        });
    };

    render() {
        return (
            <main className="search-container">
                <div className="search-input">
                    <form onSubmit={this.submitSearch}>
                        <TextField
                            fullWidth={true}
                            label="Search for an Artist"
                            name="q"
                            variant="outlined"
                            autoComplete="off"
                            autoFocus={true}
                            onChange={this.searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlined/>
                                    </InputAdornment>
                                )
                            }}/>
                    </form>
                </div>
            </main>
        );
    }
}

export default Search;
