import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Breadcrumb, Table, Divider, Button, Modal, Popconfirm, message, InputNumber, Input, Upload, Icon} from 'antd'

import {getShopData, updateShopData, deleteShopData, addShopData} from './../../store/actionCreators'

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
                shopImg: '',
                shopImgType: '',
                shopDes: ''
            }, //被添加商品的数据
            addShopImgLoading: false,  //添加商品 上传图片 加载中状态
            addShopImgUrl: '', //添加商品 上传图片路径

            updateBtnDisable: true,  //修改按钮禁用
            deleteBtnDisable: true,  // 删除按钮禁用


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
                      <Button type={'primary'}  disabled={this.state.updateBtnDisable} onClick={() => this.shopUpdate(record)}>修改</Button>
                      <Divider type={'vertical'}/>
                       <span style={{display:this.state.deleteBtnDisable?'none':'inline'}} >
                      <Popconfirm
                          title="确定要删除吗？"
                          onConfirm={() => this.shopDeleteConfirm(record)} onCancel={this.shopDeleteCancel}
                          okText="是" cancelText="否">
                     <Button type={'danger'} >删除</Button>
                     </Popconfirm>
                      </span>

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

    //汉字转 unicode 16进制
    word2Unicode(word) {
        let str = '';
        for (let i = 0; i < word.length; i++) {
            str += '\\u' + word[i].charCodeAt(0).toString(16);
        }
        return str;
    }


    //获取上传图片的base64格式
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }


    //上传之前图片限制
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('只能上传JPG图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片不能小于2MB!');
        }
        return isJPG && isLt2M;
    }


    //挂载前请求商品数据
    componentWillMount() {
        this.props.reqGetShopData();
        if(this.props.user.userPermission===0){
            this.setState({
                updateBtnDisable: true,
                deleteBtnDisable: true,
            })
        }else  if(this.props.user.userPermission===1){
            this.setState({
                updateBtnDisable: false,
                deleteBtnDisable: false,
            })
        }
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
    shopAdd = () => {
        this.setState({
            addModalVisible: true,
        });
    };
    //商品添加Modal隐藏
    addHandleCancel = () => {
        this.setState({
            addModalVisible: false,
            //清空上一次商品添加数据
            addedShop: {
                shopName: '',
                shopPrice: '',
                shopImg: '',
                shopImgType: '',
                shopDes: ''
            }
        })
    }


    //记录添加商品名字改变
    addShopNameChange(e) {
        let addedShop = this.state.addedShop;
        this.setState({
            addedShop: Object.assign(addedShop, {
                shopName: e.target.value
            })
        })
    }

    //记录添加商品名字改变
    addShopPriceChange = (value) => {
        let addedShop = this.state.addedShop;
        this.setState({
            addedShop: Object.assign(addedShop, {
                shopPrice: value
            })
        })
    }

    //记录添加商品名字改变
    addShopDesChange(e) {
        let addedShop = this.state.addedShop;
        this.setState({
            addedShop: Object.assign(addedShop, {
                shopDes: e.target.value
            })
        })
    }


    //监听上传图片状态改变
    addImgChange = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({addShopImgLoading: true});
            return;
        }
        if (info.file.status === 'done') {

            this.getBase64(info.file.originFileObj, addShopImgUrl => this.setState({
                addShopImgUrl,
                addShopImgLoading: false,
            }, () => {
                let addedShop = this.state.addedShop;
                this.setState({
                    addedShop: Object.assign(addedShop, {
                        shopImg: this.state.addShopImgUrl,  //记录添加商品图片的base64格式
                        shopImgType: info.file.type
                    })
                })
                message.success("图片上传成功");
            }));

        }
    }

    //商品添加提交
    shopAddConfirm = () => {
        console.log(this.state.addedShop);
        if (this.state.addedShop.shopName === '') {
            message.error('商品名字不能为空！', 2)

        } else if (this.state.addedShop.shopPrice === '' || this.state.addedShop.shopPrice === null) {
            message.error('商品价格不能为空！', 2)

        } else if (this.state.addedShop.shopDes === '') {
            message.error('商品描述不能为空！', 2)
        } else if (this.state.addedShop.shopImg === '') {
            message.error('请上传商品图片哦！', 2)
        } else {
            let shop = this.state.addedShop;
            this.props.reqAddShopData(shop)
            this.setState({
                addModalVisible: false,
            });
            message.success('添加成功！', 2)
        }
    }


    //记录修改商品名字改变
    shopNameChange(e) {
        let updatedShop = this.state.updatedShop;
        this.setState({
            updatedShop: Object.assign(updatedShop, {
                shopName: e.target.value
            })
        })
    }

    //记录修改商品价格改变
    shopPriceChange = (value) => {
        let updatedShop = this.state.updatedShop;
        this.setState({
            updatedShop: Object.assign(updatedShop, {
                shopPrice: value
            })
        })

    }
    //记录修改商品描述改变
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

    //搜索商品
    searchShop(value) {

        this.setState({
            dataSource: this.props.shopList,  //初始化dataSource
            searchValue: value
        }, () => {
            //console.log(this.state.searchValue);
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

        const uploadButton = (
            <div>
                <Icon type={this.state.addShopImgLoading ? 'loading' : 'plus'}/>
                <div>点击上传</div>
            </div>
        );


        return (
            <div className="shop">

                <Breadcrumb className='shop-bread' separator=">" routes={this.state.routes}
                            itemRender={this.itemRender}/>

                <div className="shop-top">
                    <Button className='shop-add-btn' type={'primary'} onClick={() => this.shopAdd()}>添加商品</Button>
                    <Search
                        className='shop-search'
                        placeholder="请输入商品名称"
                        onSearch={value => {
                            this.searchShop(value)
                        }}
                        enterButton
                    />
                </div>

                <Table dataSource={this.state.dataSource.length === 0 ? this.props.shopList : this.state.dataSource}
                       columns={this.state.columns}
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
                        <Upload
                            className="shop-add-img"
                            listType="picture-card"
                            showUploadList={false}
                            action='http://localhost:3003/manage/addShopImg'
                            beforeUpload={this.beforeUpload}
                            onChange={this.addImgChange}
                        >
                            {this.state.addShopImgUrl ? <img src={this.state.addShopImgUrl}/> : uploadButton}
                        </Upload>

                    </div>
                    <div className="shop-add-confirm"><Button type={'danger'} onClick={this.shopAddConfirm}>添加</Button>
                    </div>
                </Modal>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shopList: state.shopList,
        user:state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reqGetShopData() {
            const action = getShopData();
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
        reqAddShopData(shop) {
            const action = addShopData(shop);
            dispatch(action)
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Shop);