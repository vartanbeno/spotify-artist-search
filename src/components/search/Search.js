import React, { Component } from 'react';
import { FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@material-ui/core';
import './Search.scss';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { withRouter } from 'react-router-dom';

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
        if (this.props.searchArtists) {
            this.props.searchArtists();
        }
    };

    render() {
        return (
            <div className="search-input-container">
                <form onSubmit={this.submitSearch}>
                    <RadioGroup className="radio-buttons-container" value={this.state.limit} onChange={this.setLimit}>
                        <FormControlLabel control={<Radio color="primary"/>} label="10 results" value="10"/>
                        <FormControlLabel control={<Radio color="primary"/>} label="20 results" value="20"/>
                        <FormControlLabel control={<Radio color="primary"/>} label="50 results" value="50"/>
                    </RadioGroup>
                    <TextField
                        className="search-input"
                        fullWidth={true}
                        placeholder="Search for an Artist"
                        name="q"
                        defaultValue={this.props.query}
                        variant="outlined"
                        autoComplete="off"
                        autoFocus={true}
                        onChange={this.setQuery}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={this.submitSearch}>
                                        <SearchOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default withRouter(Search);
