import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox,Message} from 'antd';
import {userLoginData} from "../../store/actionCreators";
class Login extends  Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    //处理登录提交
    handleSubmit = (e) => {
        e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('表单数据: ', values);

                this.props.reqUserLogin({userName:values.username,userPwd:values.password},(user)=>{
                    console.log(Object.keys(user).length);

                    if(Object.keys(user).length===0){
                        Message.error('账号或密码不正确!')
                    }else {
                        this.props.history.push('/main')
                        Message.success('登录成功!')
                    }
                });
            }
        });
    }




    render() {
        const { getFieldDecorator } =  this.props.form;
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary"
                                htmlType="submit"
                                className="login-form-button">
                           登录
                        </Button>
                        或者 <a href="">立即注册</a>
                    </Form.Item>
                </Form>
            </div>
        )

    }
}
const mapStateToProps = (state) => {
    return {
       user:state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reqUserLogin(user,callBack) {
            const action = userLoginData(user,callBack);
            dispatch(action);
        },
    }
};


const LoginForm = Form.create({ name: 'login' })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)