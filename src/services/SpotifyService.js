import axios from 'axios';
import AuthService from './AuthService';
import queryString from "querystring";

export default class SpotifyService {

    static getQueryAndLimitParameters() {
        const params = queryString.parse(window.location.search.slice(1));
        return {
            q: params.q,
            limit: params.limit
        }
    }

    static searchArtistById(id) {
        return axios.get(`https://api.spotify.com/v1/artists/${id}`, AuthService.getAuthorizationHeader());
    }

    static getSearchArtistsEndpoint(query, limit) {
        return `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=${limit}`;
    }

    static searchArtists(query, limit) {
        return axios.get(this.getSearchArtistsEndpoint(query, limit), AuthService.getAuthorizationHeader());
    }

    static getSearchAlbumsByArtistIdEndpoint(artistId) {
        return `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`;
    }

    static searchAlbumsByArtistId(artistId) {
        return axios.get(this.getSearchAlbumsByArtistIdEndpoint(artistId), AuthService.getAuthorizationHeader());
    }

}
