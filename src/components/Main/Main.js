import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import Shop from "./../../components/Shop/Shop";
import User from "./../../components/User/User";

import {Layout} from 'antd';
import Top from './../../components/Top/Top'
import Left from './../../components/Left/Left'

const {
    Header, Sider, Content,
} = Layout;


class Main extends  Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="main">
                <Layout className="main-content">
                <Header className='header'><Top  history={this.props.history}/></Header>
                <Layout className="sub">
                    <Sider className='sider'><Left/></Sider>
                    <Content className='content'>
                        <Route path='/main/user' component={User}/>

                        <Route path='/main/shop' component={Shop}/>


                    </Content>
                </Layout>
            </Layout>
            </div>
        )

    }
}

export default  Main