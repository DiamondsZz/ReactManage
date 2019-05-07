import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Breadcrumb, Table, Divider, Button, Modal, Popconfirm, message, InputNumber, Input} from 'antd'

import {getShopData, updateShopData, deleteShopData} from './../../store/actionCreators'

const {TextArea} = Input;
const Search = Input.Search;

class Shop extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //面包屑路由
            routes: [
                {
                path: '/',
                breadcrumbName: '首页'
            }, {
                path: '/shop',
                breadcrumbName: '商品信息'
            }],
            searchValue: '', //搜索框输入值
            showModalVisible: false, //查看Modal
            selectedShop: {},//当前被选中商品
            updateModalVisible: false, //修改Modal
            updatedShop: {
                shopName: '',
                shopPrice: '',
                shopDes: ''
            }, //被修改商品的修改数据
            addModalVisible: false, //添加Modal
            addedShop: {
                shopName: '',
                shopPrice: '',
                shopDes: ''
            }, //被添加商品的数据
            dataSource: [], //Talbe数据对象源
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
                    sorter: (a, b) => a.shopPrice - b.shopPrice, //商品价格排序
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
                    <Button type={'primary'} onClick={() => this.shopUpdate(record)}>修改</Button>
                      <Divider type={'vertical'}/>
                    <Popconfirm title="确定要删除吗？"
                                onConfirm={() => this.shopDeleteConfirm(record)} onCancel={this.shopDeleteCancel}
                                okText="是" cancelText="否">
                     <Button type={'danger'}>删除</Button>
                     </Popconfirm>
            </span>
                        )
                    }
                }
            ],
            //商品当前行选择
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log('selectedRows: ', selectedRows);
                },
                getCheckboxProps: record => ({
                    name: record.name
                })


            }


        }


    }

    //挂载前请求商品数据
    componentWillMount() {
        this.props.reqGetShopData();
    }



    //商品查看Modal显示
    shopShow = (record) => {
        // console.log(record);
        this.setState({
            showModalVisible: true,
            selectedShop: record
        });
    };
    //商品查看Modal隐藏
    showHandleCancel = () => {
        this.setState({
            showModalVisible: false,
        })
    }

    //商品数据修改Modal显示
    shopUpdate = (record) => {
        // console.log(record);
        this.setState({
            updateModalVisible: true,
            selectedShop: record
        });
    };
    //商品修改Modal隐藏
    updateHandleCancel = () => {
        this.setState({
            updateModalVisible: false,
            //清空上一次商品修改数据
            updatedShop: {
                shopName: '',
                shopPrice: '',
                shopDes: ''
            },
        })

    }


    //商品数据添加Modal显示
    shopAdd= () => {
        this.setState({
            addModalVisible: true,
        });
    };
    //商品添加Modal隐藏
    addHandleCancel = () => {
        this.setState({
            addModalVisible: false,
            //清空上一次商品修改数据
            addedShop: {
                shopName: '',
                shopPrice: '',
                shopDes: ''
            },
        })
    }









    //记录商品名字改变
    shopNameChange(e) {
        let updatedShop = this.state.updatedShop;
        this.setState({
            updatedShop: Object.assign(updatedShop, {
                shopName: e.target.value
            })
        })
    }

    //记录商品价格改变
    shopPriceChange = (value) => {
        let updatedShop = this.state.updatedShop;
        this.setState({
            updatedShop: Object.assign(updatedShop, {
                shopPrice: value
            })
        })

    }
    //记录商品描述改变
    shopDesChange = (e) => {
        let updatedShop = this.state.updatedShop;
        this.setState({
            updatedShop: Object.assign(updatedShop, {
                shopDes: e.target.value
            })
        })

    }

    //商品修改数据之后保存
    shopSave = () => {
        //console.log(this.state.updatedShop);
        if (this.state.updatedShop.shopName === '') {
            message.error('商品名字不能为空！', 2)

        } else if (this.state.updatedShop.shopPrice === '' || this.state.updatedShop.shopPrice === null) {
            message.error('商品价格不能为空！', 2)

        } else if (this.state.updatedShop.shopDes === '') {
            message.error('商品描述不能为空！', 2)
        }
        else {
            let shop = Object.assign({}, this.state.selectedShop, this.state.updatedShop)
            this.props.reqUpdateShopData(shop)
            this.setState({
                updateModalVisible: false,
            });
            message.success('保存成功！', 2)
        }

    };

    //商品删除
    shopDeleteConfirm = (shop) => {
        this.props.reqDeleteShopData(shop);
        message.success('删除成功！', 2)
    }

    shopDeleteCancel() {
        message.error('取消删除！', 2)
    }

    //设置商品行的key值
    setRowKey(record) {
        return record.shopId;
    }

    //面包屑
    itemRender(route, params, routes, paths) {
        //console.log("route",route);
        //console.log("routes",routes);
        //console.log("paths",paths);
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    //汉字转 unicode 16进制
    word2Unicode(word) {
        let str = '';
        for (let i = 0; i < word.length; i++) {
            str += '\\u' + word[i].charCodeAt(0).toString(16);
        }
        return str;
    }


    //搜索商品
    searchShop(value) {

        this.setState({
            dataSource:this.props.shopList,  //初始化dataSource
            searchValue: value
        }, () => {
            console.log(this.state.searchValue);
            let searchShopList = [];
            let pattern = new RegExp(this.word2Unicode(this.state.searchValue));
            this.state.dataSource.map((shop, index) => {
                if (pattern.test(shop.shopName)) {
                    searchShopList.push(shop);
                }
            })
            if (searchShopList.length !== 0) {
                this.setState({
                    dataSource: searchShopList
                })
            } else {
                message.error('暂无该商品', 2);
            }
        })


    }





    render() {
        console.log(this);
        return (
            <div className="shop">

                <Breadcrumb className='shop-bread' separator=">" routes={this.state.routes}
                            itemRender={this.itemRender}/>

                <div className="shop-top">
                    <Button className='shop-add-btn' type={'primary'}  onClick={() => this.shopAdd()}>添加商品</Button>
                    <Search
                        className='shop-search'
                        placeholder="请输入商品名称"
                        onSearch={value => {
                            this.searchShop(value)
                        }}
                        enterButton
                    />
                </div>

                <Table dataSource={this.state.dataSource.length===0?this.props.shopList:this.state.dataSource} columns={this.state.columns}
                       rowSelection={this.state.rowSelection}
                       rowKey={this.setRowKey}/>

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
                            <li className="shop-selected-introduce"><span>商品描述:</span>
                                <span>{this.state.selectedShop.shopDes} </span>
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
                                <span> <Input value={this.state.updatedShop.shopName}
                                              onChange={(e) => this.shopNameChange(e)}/> </span>
                            </li>
                            <li className="shop-update-price">
                                <span>商品价格:</span><br/>
                                <span> <InputNumber min={1} max={1000} autoFocus={true}
                                                    value={this.state.updatedShop.shopPrice}
                                                    onChange={this.shopPriceChange}/> </span>
                            </li>
                            <li className="shop-update-introduce">
                                <span>商品介绍:</span><br/>

                                <span> <TextArea autosize={{minRows: 2, maxRows: 6}}
                                                 value={this.state.updatedShop.shopDes}
                                                 onChange={(e) => this.shopDesChange(e)}/> </span>
                            </li>
                        </ul>
                        <img src="" alt=""/>
                    </div>
                    <div className="shop-save"><Button type={'danger'} onClick={this.shopSave}>保存</Button></div>
                </Modal>


                <Modal
                    title="商品信息"
                    visible={this.state.addModalVisible}
                    onCancel={this.addHandleCancel}
                    footer={null}
                    centered={true}
                >
                    <div className="shop-add">
                        <ul>
                            <li className="shop-add-name">
                                <span>商品名称:</span><br/>
                                <span> <Input value={this.state.addedShop.shopName}
                                              onChange={(e) => this.addShopNameChange(e)}/> </span>
                            </li>
                            <li className="shop-add-price">
                                <span>商品价格:</span><br/>
                                <span> <InputNumber min={1} max={1000} autoFocus={true}
                                                    value={this.state.addedShop.shopPrice}
                                                    onChange={this.addShopPriceChange}/> </span>
                            </li>
                            <li className="shop-add-introduce">
                                <span>商品介绍:</span><br/>
                                <span> <TextArea autosize={{minRows: 2, maxRows: 6}}
                                                 value={this.state.addedShop.shopDes}
                                                 onChange={(e) => this.addShopDesChange(e)}/> </span>
                            </li>
                        </ul>
                        <img src="" alt=""/>
                    </div>
                    <div className="shop-add-confirm"><Button type={'danger'} onClick={this.shopAddConfirm}>添加</Button></div>
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
            dispatch(action);
        },
        reqUpdateShopData(shop) {
            const action = updateShopData(shop);
            dispatch(action)
        },
        reqDeleteShopData(shop) {
            const action = deleteShopData(shop);
            dispatch(action)
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Shop);