import React, {Component} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux';


import {Layout} from 'antd';
import Top from './children/Top/Top'
import Left from './children/Left/Left'
import Shop from "./children/Shop/Shop";
import User from "./children/User/User";
import Index from "./children/Index/Index";


const {
    Header, Sider, Content,
} = Layout;


class Main extends  Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        //console.log(this)
        return (
            <div className="main">
                <Layout className="main-content">
                    <Header className='header'><Top  history={this.props.history}/></Header>
                    <Layout className="sub">
                        <Sider className='sider'><Left/></Sider>
                        <Content className='content'>
                            <Switch>
                                <Route path='/main/index'  component={Index}/>
                                <Route path='/main/user' component={User}/>
                                <Route path='/main/shop' component={Shop}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )

    }
}

export default  Main