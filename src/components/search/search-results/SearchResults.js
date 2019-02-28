import React, { Component } from 'react';
import './SearchResults.scss';
import SearchResult from './search-result/SearchResult';
import Loader from '../../loader/Loader';
import SpotifyService from '../../../services/SpotifyService';
import { Typography } from '@material-ui/core';
import Search from '../Search';

class SearchResults extends Component {

    state = {
        q: '',
        limit: 10
    };

    componentDidMount() {
        this.searchArtists();
    }

    searchArtists = () => {
        const { q, limit } = SpotifyService.getQueryAndLimitParameters();
        this.setState({
            q: q,
            limit: Number(limit)
        }, () => {
            if (this.state.q) {
                this.props.searchArtists(this.state.q, this.state.limit);
            }
        });
    };

    render() {

        const { artists } = this.props;

        return (
            <div className="search-results-container">
                <div className="search-field">
                    {this.state.q ? <Search query={this.state.q} searchArtists={this.searchArtists}/> : null}
                </div>
                {
                    artists ?
                        <div className="search-results">
                            {artists.map(artist => (
                                <div key={artist.id} className="search-result">
                                    <SearchResult artist={artist}/>
                                </div>
                            ))}
                        </div>
                        :
                        <Loader/>
                }
            </div>
        )
    }
}

export default SearchResults;
