import config from '../config/spotify.json';
import queryString from "querystring";

export default class AuthService {

    static TOKEN_KEY = 'access-token';
    static AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?client_id=${config.clientId}&redirect_uri=${window.location.origin}&response_type=token`;

    static getAccessTokenFromRedirect() {

        const params = queryString.parse(window.location.hash.slice(1));            // slice(1) to ignore leading #

        if (params.access_token && typeof params.access_token === 'string') {
            return params.access_token;
        } else {
            return null;
        }

    }

    static getAccessToken() {
        return window.localStorage.getItem(this.TOKEN_KEY);
    }

    static setAccessToken(token) {
        window.localStorage.setItem(this.TOKEN_KEY, token);
    }

    static isLoggedIn() {
        return !!this.getAccessToken();
    };

    static logout() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    };

    static getAuthorizationHeader() {
        return {
            headers: {
                Authorization: `Bearer ${this.getAccessToken()}`
            }
        };
    };

}
