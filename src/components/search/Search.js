import React, { Component } from 'react';
import {
    Avatar,
    FormControlLabel,
    IconButton,
    InputAdornment,
    List,
    ListItem, ListItemText,
    Radio,
    RadioGroup
} from '@material-ui/core';
import './Search.scss';
import TextField from '@material-ui/core/TextField';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { Link, withRouter } from 'react-router-dom';
import SpotifyService from '../../services/SpotifyService';
import ArtistSuggestion from '../../models/artist/ArtistSuggestion';

class Search extends Component {

    state = {
        q: '',
        limit: '10',
        searchAsYouType: null,
        showSearchSuggestionStates: {
            searchBarFocused: false,
            listFocused: false
        },
        searchSuggestions: []
    };

    setQuery = e => {
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
        clearTimeout(this.state.searchAsYouType);
        e.preventDefault();
        this.props.history.push(`/search?q=${this.state.q}&limit=${this.state.limit}`);
        if (this.props.searchArtists) {
            this.props.searchArtists();
        }
    };

    searchAsYouType = q => {
        clearTimeout(this.state.searchAsYouType);

        if (!q) {
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
                            searchSuggestions: artists
                        });

                    },
                    err => console.log(err)
                );
            }, 350)
        })
    };

    focusSearchBar = e => {
        this.setState({
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

    focusList = e => {
        this.setState({
            showSearchSuggestionStates: {
                ...this.state.showSearchSuggestionStates,
                listFocused: true
            }
        });
    };

    unfocusList = e => {
        this.setState({
            showSearchSuggestionStates: {
                ...this.state.showSearchSuggestionStates,
                listFocused: false
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
                        this.state.searchSuggestions.length && (this.state.showSearchSuggestionStates.searchBarFocused || this.state.showSearchSuggestionStates.listFocused) ?
                            <div className="search-suggestions-container" onMouseEnter={this.focusList} onBlur={this.unfocusList}>
                                <List className="suggestion-list">
                                    {this.state.searchSuggestions.map(artist =>
                                        <Link key={artist.id} to={`/artist/${artist.id}/albums`} className="artist-link">
                                            <ListItem button>
                                                <Avatar src={artist.image ? artist.image : "/assets/images/artist-default.png"}/>
                                                <ListItemText color="primary" primary={artist.name}/>
                                            </ListItem>
                                        </Link>
                                    )}
                                </List>
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
