import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux';
import {Empty} from 'antd';
import './App.css'

import Login from './components/Login/Login'
import Main from './components/Main/Main'


class App extends Component {


    render() {
        console.log(this);
        let isLogin=this.props.user.userIsLogin?!!this.props.user.userIsLogin.data[0]:false;
        return (
            <Router>
                <div className="App">
                    <Switch>    {/*  Switch 显示匹配到的第一个路由  exact 路径精准匹配  */}
                        <Route path='/' exact render={() => isLogin ? <Redirect to='/main'/> : <Redirect to='/login'/>}/>}/>
                        <Route path='/login' component={Login}/>}/>
                        <Route path='/main' render={(props) => isLogin ? <Main history={props.history}/> : <Redirect to='/login'/>}/>
                        <Route render={() => <Empty description={'页面好像不存在哦！'} style={{
                            width: '200px',
                            height: '200px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginLeft: '-100px',
                            marginTop: '-100px'
                        }}/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};


export default connect(mapStateToProps, null)(App);
