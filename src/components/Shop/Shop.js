import React, {Component} from 'react'

import {Table, Divider, Button, Modal, Popconfirm, message, InputNumber, Input} from 'antd'

import shopList from './../../mock/shopList'
import store from './../../store/'
import {getShopData,updateShopData} from './../../store/actionCreators'

const {TextArea} = Input



class Shop extends Component {
    constructor(props) {
        super(props);
        this.state={



        }

        this.state=store.getState();
        store.subscribe(()=>{
            this.setState(store.getState());
        })
    }


    dataSource = [];
    columns = [
        {
            align: 'center',
            title: '商品编号',
            dataIndex: 'shopId',
            key: 'shopId',
        },
        {
            align: 'center',
            title: '商品图片',
            dataIndex: 'shopImg',
            key: 'shopImg',
            render: (text, record, index) => {
                return (<span>
                <img src={text} alt="" width={'50px'}/>
            </span>);
            }
        },
        {
            align: 'center',
            title: '商品名称',
            dataIndex: 'shopName',
            key: 'shopName',
        },
        {
            align: 'center',
            title: '商品价格',
            dataIndex: 'shopPrice',
            key: 'shopPrice',
        },
        {
            align: 'center',
            title: '操作',
            dataIndex: 'shopAction',
            key: 'shopAction',
            render: (text, record, index) => {
                return (
                    <span>
                    <Button type={'primary'} ghost onClick={() => this.shopShow(record)}>查看</Button>
                      <Divider type={'vertical'}/>
                    <Button type={'danger'}>增加</Button>
                      <Divider type={'vertical'}/>
                    <Button type={'primary'} onClick={() => this.shopUpdate(record)}>修改</Button>
                      <Divider type={'vertical'}/>
                    <Popconfirm title="确定要删除吗？"
                                onConfirm={() => this.shopDeleteConfirm(record)} onCancel={this.shopDeleteCancel}
                                okText="是" cancelText="否">
                     <Button type={'danger'} ghost>删除</Button>
                     </Popconfirm>
            </span>
                )
            }
        }
    ];



    shopShow = (record) => {
        // console.log(record);
        this.setState({
            showModalVisible: true,
            selectedShop: record
        }, () => {
            //console.log(this.state);  //异步
        });
    };

    showHandleCancel = () => {
        this.setState({
            showModalVisible: false,
        })
    }

    shopUpdate = (record) => {
        // console.log(record);

        this.setState({
            updateModalVisible: true,
            selectedShop: record
        });
    };

    updateHandleCancel = () => {
        this.setState({
            updateModalVisible: false,
        })
    }

    shopNameChange(e){
        this.state.updatedShop.shopName=e.target.value;
    }
    shopPriceChange=(value)=>{
        this.state.updatedShop.shopPrice=value;
    }
    shopIntroduceChange=(e)=>{
        this.state.updatedShop.shopIntroduce=e.target.value;
    }


    shopSave=()=> {
        store.dispatch(updateShopData({oldShop:this.state.selectedShop,newShop:this.state.updatedShop}));

        this.dataSource=(store.getState().shopList);

        message.success('保存成功！', 2)

    }


    shopDeleteConfirm = (shop) => {

        let shopList=store.getState().shopList;
        shopList.map((value,index,shopList)=>{
            if(value.shopId===shop.shopId)
            {
                shopList.splice(index, 1);
            }
        })
        store.dispatch(getShopData(shopList))

        message.success('删除成功！', 2)
    }

    shopDeleteCancel() {
        message.error('取消删除！', 2)
    }

    UNSAFE_componentWillMount(){
        store.dispatch(getShopData(shopList))

    }

    componentDidMount() {


        store.dispatch(getShopData(shopList))

        this.dataSource = this.state.shopList;

    }

    render() {
        return (
            <div className="shop">
                <Table dataSource={this.dataSource} columns={this.columns} bordered={true}/>

                <Modal
                    title="商品信息"
                    visible={this.state.showModalVisible}
                    onCancel={this.showHandleCancel}
                    footer={null}
                    centered={true}
                >
                    <div className="shop-selected">
                        <ul>
                            <li className="shop-selected-id"><span>商品编号:</span>
                                <span>{this.state.selectedShop.shopId}</span>
                            </li>
                            <li className="shop-selected-name"><span>商品名称:</span>
                                <span>{this.state.selectedShop.shopName}</span>
                            </li>
                            <li className="shop-selected-price"><span>商品价格:</span>
                                <span>{this.state.selectedShop.shopPrice}</span>
                            </li>
                            <li className="shop-selected-introduce"><span>商品介绍:</span>
                                <span> </span>
                            </li>
                        </ul>
                        <img src={this.state.selectedShop.shopImg} alt=""/>
                    </div>

                </Modal>


                <Modal
                    title="商品信息"
                    visible={this.state.updateModalVisible}
                    onCancel={this.updateHandleCancel}
                    footer={null}
                    centered={true}
                >
                    <div className="shop-update">
                        <ul>
                            <li className="shop-update-name">
                                <span>商品名称:</span><br/>
                                <span> <Input  onChange ={(e)=>this.shopNameChange(e)}/> </span>
                            </li>
                            <li className="shop-update-price">
                                <span>商品价格:</span><br/>
                                <span> <InputNumber min={1} max={1000} autoFocus={true}
                                                    onChange={this.shopPriceChange}      /> </span>
                            </li>
                            <li className="shop-update-introduce">
                                <span>商品介绍:</span><br/>

                                <span> <TextArea autosize={{minRows: 2, maxRows: 6}}
                                                 onChange={(e)=>this.shopIntroduceChange(e)}  /> </span>
                            </li>
                        </ul>
                        <img src="" alt=""/>
                    </div>
                    <div className="shop-save"><Button type={'danger'} onClick={this.shopSave}>保存</Button></div>
                </Modal>


            </div>
        );
    }
}


export default Shop;