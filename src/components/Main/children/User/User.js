import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getUserData} from '../../../../store/actionCreators'

import {Table, Divider} from 'antd'


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [
                {
                    align: 'center',
                    title: '编号',
                    dataIndex: 'userId',
                    key: 'userId',
                },
                {
                    align: 'center',
                    title: '账号',
                    dataIndex: 'userName',
                    key: 'userName',
                },
                {
                    align: 'center',
                    title: '昵称',
                    dataIndex: 'userPetName',
                    key: 'userPetName',
                },
                {
                    align: 'center',
                    title: '头像',
                    dataIndex: 'userIcon',
                    key: 'userIcon',
                    render:(text, record, index)=>{
                        return (<span>
                <img src={text} alt="" style={{borderRadius:'50%',width:'50px'}}  />
            </span>);
                    }
                },
                {
                    align: 'center',
                    title: '年龄',
                    dataIndex: 'userAge',
                    key: 'userAge',
                },
                {
                    align: 'center',
                    title: '性别',
                    dataIndex: 'userSex',
                    key: 'userSex',
                },
                {
                    align: 'center',
                    title: '住址',
                    dataIndex: 'userAddress',
                    key: 'userAddress',
                },
                {
                    align: 'center',
                    title: '个性签名',
                    dataIndex: 'userStyle',
                    key: 'userStyle',
                },
                {
                    align: 'center',
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    render: () => {
                        return (
                            <span>
                    <a>查看</a>
                    <Divider type={'vertical'}/>
                    <a>删除</a>
                </span>
                        )
                    }
                }
            ]
        }
    }

    componentWillMount() {
        this.props.reqGetUserData()
    }

    //设置商品行的key值
    setRowKey(record) {
        return record.userId;
    }

    render() {
        console.log(this);
        return (
            <div>
                <Table dataSource={this.state.dataSource.length===0?this.props.userList:this.state.dataSource}
                       rowKey={this.setRowKey}
                       columns={this.state.columns}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userList:state.userList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqGetUserData() {
            const action = getUserData();
            dispatch(action);
        },
    }
}


export default connect( mapStateToProps,mapDispatchToProps)(User)