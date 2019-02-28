import React, { Component } from 'react';
import { FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@material-ui/core';
import './Search.scss';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';

class Search extends Component {

    state = {
        q: '',
        limit: '10'
    };

    setQuery = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    setLimit = e => {
        this.setState({
            limit: e.target.value
        });
    };

    submitSearch = e => {
        e.preventDefault();
        this.props.history.push(`/search?q=${this.state.q}&limit=${this.state.limit}`);
    };

    render() {
        return (
            <main className="search-container">
                <div className="search-input">
                    <form onSubmit={this.submitSearch}>
                        <TextField
                            fullWidth={true}
                            placeholder="Search for an Artist"
                            name="q"
                            variant="outlined"
                            autoComplete="off"
                            autoFocus={true}
                            onChange={this.setQuery}
                            style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 5px rgba(104, 104, 104, 0.8)' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.submitSearch}>
                                            <SearchOutlined/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}/>
                        <RadioGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} value={this.state.limit} onChange={this.setLimit}>
                            <FormControlLabel control={<Radio color="primary"/>} label="10 results" value="10"/>
                            <FormControlLabel control={<Radio color="primary"/>} label="20 results" value="20"/>
                            <FormControlLabel control={<Radio color="primary"/>} label="50 results" value="50"/>
                        </RadioGroup>
                    </form>
                </div>
            </main>
        );
    }
}

export default Search;
