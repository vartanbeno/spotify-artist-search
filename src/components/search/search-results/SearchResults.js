import React, { Component } from 'react';
import './SearchResults.scss';
import queryString from "querystring";
import axios from 'axios';

class SearchResults extends Component {

    state = {
        q: '',
        artists: []
    };

    componentDidMount() {
        this.setState({
            q: queryString.parse(window.location.search.slice(1)).q
        }, () => {
            if (this.state.q) {
                this.searchArtists(this.state.q);
            }
        });
    }

    getSearchEndpoint(artist, limit) {
        return `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=${limit}`;
    }

    searchArtists(query) {
        axios.get(this.getSearchEndpoint(query, 5), this.props.authorizationHeader).then(
            res => this.setState({
                artists: res.data.artists.items
            }),
            err => {
                // todo: check if 401
            }
        );
    }

    render() {
        return (
            <main className="search-container">
                <h3>{this.state.q}</h3>
                {this.state.artists.map(artist => <h4 key={artist.id}>{artist.name}</h4>)}
            </main>
        );
    }
}

export default SearchResults;
