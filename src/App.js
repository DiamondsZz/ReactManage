import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'

import {Layout} from 'antd';

import Top from './components/Top/Top'
import Left from './components/Left/Left'
import User from './components/User/User'
import Shop from './components/Shop/Shop'

const {
    Header, Sider, Content,
} = Layout;

class App extends Component {

    componentDidMount() {
    }


    render() {
        return (
            <Router>
            <div className="App">
                <Layout className="main">
                    <Header className='header'><Top/></Header>
                    <Layout className="sub">
                        <Sider className='sider'><Left/></Sider>
                        <Content>
                            <Route path='/user' component={User}/>
                            <Route path='/shop' component={Shop}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
            </Router>
        );
    }
}

export default App;
