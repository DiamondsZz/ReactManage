import React, {Component} from 'react'
import {Table,Divider} from 'antd'

import store from '../../store/index'


const dataSource = [
    {
        key: '1',
        id:1,
        sex:'男',
        name: '胡彦祖',
        userName:'123',
        age: 42,
        address: '西湖区湖底公园1号',
        style:'我最牛逼'
    },
    {
        key: '2',
        id:2,
        sex:'女',
        userName:'321',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园2号',
        style:'你是智障'
    }
];

const columns = [


    {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '账号',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '头像',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '个性签名',
        dataIndex: 'style',
        key: 'style',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render:()=>{
            return (
                <span>
                    <a>查看</a>
                    <Divider type={'vertical'}/>
                    <a>删除</a>
                </span>
            )
        }
    }
];

class User extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        console.log(this);
    }

    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        );
    }
}


export default User;