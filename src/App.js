import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'

import Login from './components/Login/Login'
import Main from './components/Main/Main'


class App extends Component {


    render() {
        return (
            <Router>
            <div className="App">
                <Route path='/' exact={true} component={Login}/>
                <Route path='/main' component={Main}/>
            </div>
            </Router>
        );
    }
}

export default App;
