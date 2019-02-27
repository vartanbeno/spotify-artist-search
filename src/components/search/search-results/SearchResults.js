import React, { Component } from 'react';
import './SearchResults.scss';
import queryString from "querystring";
import SearchResult from './search-result/SearchResult';

class SearchResults extends Component {

    state = {
        q: ''
    };

    componentDidMount() {
        this.setState({
            q: queryString.parse(window.location.search.slice(1)).q
        }, () => {
            if (this.state.q) {
                this.searchArtists(queryString.parse(window.location.search.slice(1)).q);
            }
        });
    }

    searchArtists = (query) => {
        this.props.searchArtists(query);
    };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: 32 }}>
                {this.props.artists.map(artist => (
                    <div key={artist.id} style={{ margin: '0 8px 16px 8px' }}>
                        <SearchResult artist={artist}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default SearchResults;
