import React, { Component } from 'react';
import './SearchResults.scss';
import SearchResult from './search-result/SearchResult';
import Loader from '../../loader/Loader';
import SpotifyService from '../../../services/SpotifyService';
import Search from '../Search';
import Artist from '../../../models/artist/Artist';

class SearchResults extends Component {

    state = {
        q: null,
        limit: 10,
        results: []
    };

    componentDidMount() {
        this.setQueryAndLimit();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setQueryAndLimit();
    }

    setQueryAndLimit = () => {
        const { q, limit } = SpotifyService.getQueryAndLimitParameters();
        this.setState({
            q: q,
            limit: Number(limit)
        }, () => this.searchArtists(this.state.q, this.state.limit));
    };

    searchArtists = (query, limit) => {
        SpotifyService.searchArtists(query, limit).then(
            res => {

                const artists = [];
                res.data.artists.items.forEach(artist => {

                    const { id, name, images, followers, popularity } = artist;
                    const image = images.length ? images[0].url : '/assets/images/artist-default.png';
                    const rating = Math.ceil(popularity/20) || 1;

                    artists.push(new Artist(id, name, image, followers.total, rating));

                });

                this.setState({
                    results: artists
                });

                if (!artists.length) {
                    this.props.openSnackbar('Your search didn\'t return any results.');
                }

            },
            err => {
                this.setState({ results: [] });
                this.props.openSnackbar(err.response.data.error.message);
            }
        );
    };

    render() {

        const { openSnackbar } = this.props;

        return (
            <div className="search-results-page">
                <div className="search-field">
                    {this.state.q != null ? <Search query={this.state.q} openSnackbar={openSnackbar}/> : null}
                </div>
                <div className="search-results-container">
                    {
                        this.state.results ?
                            <div className="search-results">
                                {this.state.results.map(artist => (
                                    <div key={artist.id} className="search-result">
                                        <SearchResult artist={artist}/>
                                    </div>
                                ))}
                            </div>
                            :
                            <Loader/>
                    }
                </div>
            </div>
        )
    }
}

export default SearchResults;
