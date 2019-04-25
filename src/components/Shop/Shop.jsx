import React, {Component} from 'react'

import {Table, Divider, Button} from 'antd'

import shopList from './../../mock/shopList'
import store from './../../store/'

const dataSource = shopList;

const columns = [
    {
        align:'center',
        title: '商品编号',
        dataIndex: 'shopId',
        key: 'shopId',
    },
    {
        align:'center',
        title: '商品图片',
        dataIndex: 'shopImg',
        key: 'shopImg',
        render:(text,record,index)=>{
            return (<span>
                <img src={text} alt="" width={'50px'}/>
            </span>);
        }
    },
    {
        align:'center',
        title: '商品名称',
        dataIndex: 'shopName',
        key: 'shopName',
    },
    {
        align:'center',
        title: '商品价格',
        dataIndex: 'shopPrice',
        key: 'shopPrice',
    },
    {
        align:'center',
        title: '操作',
        dataIndex: 'shopAction',
        key: 'shopAction',
        render: () => {
            return (
                <span>
                    <Button type={'primary'} ghost>查看</Button>
                      <Divider type={'vertical'}/>
                    <Button type={'danger'}>增加</Button>
                      <Divider type={'vertical'}/>
                    <Button type={'primary'}>修改</Button>
                      <Divider type={'vertical'}/>
                    <Button type={'danger'} ghost>删除</Button>
            </span>
            )
        }
    }
];

class Shop extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(store.getState());
    }

    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={columns} bordered={true} type={'checkbox'}/>
            </div>
        );
    }
}


export default Shop;