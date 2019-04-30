import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

class Left extends Component {

    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['dataShow', 'dataManage'];

    state = {
        openKeys: ['dataShow'],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };


    render() {
        return (
            <div className='left'>
                <Menu
                    className='left-menu'
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    <SubMenu key="home" title={<span><Icon type="mail"/><span>首页</span></span>}>
                        <Menu.Item key="0"> <Link to='/'>数据统计</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="dataShow" title={<span><Icon type="mail"/><span>数据显示</span></span>}>
                        <Menu.Item key="1"> <Link to='/user'>用户信息</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/shop'>商品信息</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="dataManage" title={<span><Icon type="appstore"/><span>数据管理</span></span>}>
                        <Menu.Item key="5">商家管理</Menu.Item>
                        <Menu.Item key="6">用户管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}


export default Left;