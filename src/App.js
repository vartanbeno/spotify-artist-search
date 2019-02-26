import React, { Component } from 'react';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green, lightGreen, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: lightGreen,
        error: red
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/"/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
