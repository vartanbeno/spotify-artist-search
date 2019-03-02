import React, { Component } from 'react';
import { FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@material-ui/core';
import './Search.scss';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { withRouter } from 'react-router-dom';
import SpotifyService from '../../services/SpotifyService';
import ArtistSuggestion from '../../models/artist/ArtistSuggestion';
import SearchSuggestions from './search-suggestions/SearchSuggestions';

class Search extends Component {

    state = {
        q: '',
        limit: '10',
        searchAsYouType: null,
        showSearchSuggestions: true,
        showSearchSuggestionStates: {
            searchBarFocused: false,
            listFocused: false
        },
        searchSuggestions: []
    };

    componentDidMount() {
        this.addListeners();
        if (this.props.query) {
            this.setState({ q: this.props.query });
        }
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {
        document.addEventListener('mousedown', this.handleClickInsideOrOutsideList);
        document.addEventListener("keydown", this.hideListOnEsc);
    };

    removeListeners = () => {
        document.removeEventListener('mousedown', this.handleClickInsideOrOutsideList);
        document.removeEventListener("keydown", this.hideListOnEsc);
    };

    setSuggestionsNode = node => {
        this.suggestionsNode = node;
    };

    handleClickInsideOrOutsideList = e => {
        if (this.suggestionsNode) {
            this.setState({
                showSearchSuggestionStates: {
                    ...this.state.showSearchSuggestionStates,
                    listFocused: this.suggestionsNode.contains(e.target)
                }
            });
        }
    };

    hideListOnEsc = e => {
        if (e.keyCode === 27) {
            this.setState({ showSearchSuggestions: false });
        }
    };

    setQuery = e => {
        if (e.target.value.replace(/\s+/g, " ").trim() === this.state.q.replace(/\s+/g, " ").trim()) {
            this.setState({ showSearchSuggestions: true });
            return;
        }
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.searchAsYouType(this.state.q));
    };

    setLimit = e => {
        this.setState({
            limit: e.target.value
        });
    };

    submitSearch = e => {
        e.preventDefault();
        if (!this.state.q.trim()) {
            this.props.openSnackbar('You must provide a search query.');
            return;
        }
        clearTimeout(this.state.searchAsYouType);
        this.props.history.push(`/search?q=${this.state.q}&limit=${this.state.limit}`);
    };

    searchAsYouType = q => {
        clearTimeout(this.state.searchAsYouType);

        if (!q.trim()) {
            this.setState({ searchSuggestions: [] });
            return;
        }

        this.setState({
            searchAsYouType: setTimeout(() => {
                SpotifyService.searchArtists(q, 5).then(
                    res => {

                        const artists = [];
                        res.data.artists.items.forEach(artist => {

                            const { id, name, images } = artist;
                            const image = images.length ? images[0].url : null;

                            artists.push(new ArtistSuggestion(id, name, image));

                        });

                        this.setState({
                            showSearchSuggestions: true,
                            searchSuggestions: artists
                        });

                    },
                    err => this.props.openSnackbar(err.response.data.error.message)
                );
            }, 350)
        })
    };

    focusSearchBar = e => {
        this.setState({
            showSearchSuggestions: true,
            showSearchSuggestionStates: {
                ...this.state.showSearchSuggestionStates,
                searchBarFocused: true
            }
        });
    };

    unfocusSearchBar = e => {
        this.setState({
            showSearchSuggestionStates: {
                ...this.state.showSearchSuggestionStates,
                searchBarFocused: false
            }
        });
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
                        onFocus={this.focusSearchBar}
                        onBlur={this.unfocusSearchBar}
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
                    {
                        this.state.searchSuggestions.length && this.state.showSearchSuggestions && (this.state.showSearchSuggestionStates.searchBarFocused || this.state.showSearchSuggestionStates.listFocused) ?
                            <div ref={this.setSuggestionsNode} className="search-suggestions-container">
                                <SearchSuggestions searchSuggestions={this.state.searchSuggestions}/>
                            </div>
                            :
                            null
                    }
                </form>
            </div>
        );
    }
}

export default withRouter(Search);
