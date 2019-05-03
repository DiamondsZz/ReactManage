import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Table, Divider, Button, Modal, Popconfirm, message, InputNumber, Input} from 'antd'

import shopList from './../../mock/shopList'

import {getShopData, updateShopData} from './../../store/actionCreators'

const {TextArea} = Input;


class Shop extends Component {


    constructor(props) {
        super(props);
        this.state = {

            showModalVisible: false,
            selectedShop: {},
            updateModalVisible: false,
            updatedShop: {
                shopName: '',
                shopPrice: 0,
                shopIntroduce: ''
            },

            dataSource: [],
            columns: [
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
            ]


        }


    }

    componentWillMount() {
        this.props.reqGetShopData(shopList);
    }

    shopShow = (record) => {
        // console.log(record);
        this.setState({
            showModalVisible: true,
            selectedShop: record
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

    shopNameChange(e) {
        this.setState({
            updatedShop: {
                shopName: e.target.value
            }
        })
    }

    shopPriceChange = (value) => {
        this.setState({
            updatedShop: {
                shopPrice: value
            }
        })
    }
    shopIntroduceChange = (e) => {
        this.setState({
            updatedShop: {
                shopIntroduce: e.target.value
            }
        })
    }


    shopSave = () => {
        //store.dispatch(updateShopData({oldShop: this.state.selectedShop, newShop: this.state.updatedShop}));
        this.props.reqUpdateShopData({oldShop: this.state.selectedShop, newShop: this.state.updatedShop})
        this.setState({
            updateModalVisible: false,
        });
        message.success('保存成功！', 2)
    };


    shopDeleteConfirm = (shop) => {

        let shopList = this.props.shopList;
        shopList.map((value, index, shopList) => {
            if (value.shopId === shop.shopId) {
                shopList.splice(index, 1);
            }
        })

        this.props.reqGetShopData(shopList);
        this.setState({
            dataSource:this.props.shopList
        })
        message.success('删除成功！', 2)
    }

    shopDeleteCancel() {
        message.error('取消删除！', 2)
    }


    render() {
        this.state.dataSource = this.props.shopList;
        return (
            <div className="shop">
                <Table dataSource={this.state.dataSource} columns={this.state.columns} bordered={true}/>

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
                                <span> <Input onChange={(e) => this.shopNameChange(e)}/> </span>
                            </li>
                            <li className="shop-update-price">
                                <span>商品价格:</span><br/>
                                <span> <InputNumber min={1} max={1000} autoFocus={true}
                                                    onChange={this.shopPriceChange}/> </span>
                            </li>
                            <li className="shop-update-introduce">
                                <span>商品介绍:</span><br/>

                                <span> <TextArea autosize={{minRows: 2, maxRows: 6}}
                                                 onChange={(e) => this.shopIntroduceChange(e)}/> </span>
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

const mapStateToProps = (state) => {
    return {
        shopList: state.shopList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reqGetShopData(shopList) {
            const action = getShopData(shopList);
            dispatch(action)
        },
        reqUpdateShopData(shop) {
            const action = updateShopData(shop);
            dispatch(action)
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Shop);