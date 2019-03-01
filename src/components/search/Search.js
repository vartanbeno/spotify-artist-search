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
        showSearchSuggestions: false,
        showList: false,
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

    showSearchSuggestions = e => {
        this.setState({ showSearchSuggestions: true });
    };

    hideSearchSuggestions = e => {
        this.setState({ showSearchSuggestions: false });
    };

    showList = e => {
        this.setState({ showList: true });
    };

    hideList = e => {
        this.setState({ showList: false });
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
                        onFocus={this.showSearchSuggestions}
                        onBlur={this.hideSearchSuggestions}
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
                        this.state.searchSuggestions.length && (this.state.showSearchSuggestions || this.state.showList) ?
                            <div className="search-input-container" onMouseEnter={this.showList} onMouseLeave={this.hideList} onBlur={this.hideList} onMouseDown={this.showList} style={{ backgroundColor: '#fff', borderRadius: '4px', zIndex: 1, position: 'absolute', boxShadow: '0 1px 5px rgba(104, 104, 104, 0.8)' }}>
                                <List style={{ padding: 0 }}>
                                    {this.state.searchSuggestions.map(artist =>
                                        <Link key={artist.id} to={`/artist/${artist.id}/albums`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
