import React, { Component } from 'react';
import './SearchResults.scss';
import queryString from "querystring";
import SearchResult from './search-result/SearchResult';

class SearchResults extends Component {

    state = {
        q: '',
        limit: 10
    };

    componentDidMount() {
        const params = queryString.parse(window.location.search.slice(1));
        this.setState({
            q: params.q,
            limit: Number(params.limit)
        }, () => {
            if (this.state.q) {
                this.searchArtists(this.state.q, this.state.limit);
            }
        });
    }

    searchArtists = (query, limit) => {
        this.props.searchArtists(query, limit);
    };

    render() {
        return (
            <div style={{ display: 'grid', gridGap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', padding: 32 }}>
                {this.props.artists.map(artist => (
                    <div key={artist.id} style={{ display: 'flex', justifyContent: 'center' }}>
                        <SearchResult artist={artist}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default SearchResults;
