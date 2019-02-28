import React, { Component } from 'react';
import './SearchResults.scss';
import SearchResult from './search-result/SearchResult';
import Loader from '../../loader/Loader';
import SpotifyService from '../../../services/SpotifyService';

class SearchResults extends Component {

    state = {
        q: '',
        limit: 10
    };

    componentDidMount() {
        const { q, limit } = SpotifyService.getQueryAndLimitParameters();
        this.setState({
            q: q,
            limit: Number(limit)
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
        return this.props.artists ? (
            <div style={{ display: 'grid', gridGap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', padding: 32 }}>
                {this.props.artists.map(artist => (
                    <div key={artist.id} style={{ display: 'flex', justifyContent: 'center' }}>
                        <SearchResult artist={artist}/>
                    </div>
                ))}
            </div>
        ) : <Loader/>
    }
}

export default SearchResults;
