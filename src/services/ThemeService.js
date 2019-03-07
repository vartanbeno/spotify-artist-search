export default class ThemeService {

    static THEME_KEY = 'night';
    static TRUE = 'true';

    static isDarkMode() {
        return window.localStorage.getItem(this.THEME_KEY) === this.TRUE;
    }

    static setDarkMode() {
        window.localStorage.setItem(this.THEME_KEY, this.TRUE);
    }

    static unsetDarkMode() {
        window.localStorage.removeItem(this.THEME_KEY);
    }

    static switchMode(bool) {
        if (bool) {
            this.setDarkMode();
        } else {
            this.unsetDarkMode();
        }
    }

}
