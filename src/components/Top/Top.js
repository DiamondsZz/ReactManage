import React, {Component} from 'react'
import {Icon} from 'antd';

class Top extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='top'>
                <ul>
                    <li className='top-person'><Icon type='user' style={{fontSize:'16px'}}/><span >个人中心</span></li>
                    <li className='top-msg'><Icon type='bell' style={{fontSize:'16px'}}/></li>
                    <li className='top-close'><Icon type='poweroff'style={{fontSize:'16px'}}/><span>退出</span></li>
                </ul>
            </div>
        );
    }
}


export default Top;