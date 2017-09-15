import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, InputItem, Button, Toast} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';
import storage from '../util/storage';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '佛山协同国际学校选课平台';

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                Toast.loading('加载中..', 0);

                http.request({
                    url: '/mobile/xietong/student/login',
                    data: values,
                    success: function (data) {
                        Toast.success('登录成功');

                        storage.setToken(data.token);
                        storage.setStudentName(data.student_name);
                        storage.setClazzName(data.clazz_name);

                        setTimeout(function () {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/index',
                                query: {}
                            }));
                        }.bind(this), 200);
                    }.bind(this),
                    complete: function () {
                        
                    }.bind(this)
                });
            }
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <NavBar className="header"
                                iconName=""
                                mode="dark"
                        >佛山协同国际学校选课系统</NavBar>

                }
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <div style={{height: '100px'}}></div>

                }
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        {...getFieldProps('user_account', {
                            rules: [{
                                required: true,
                                message: '请输入学号',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('user_account')}
                        clear
                        placeholder="请输入学号"
                    >学号:</InputItem>
                    <InputItem
                        {...getFieldProps('user_password', {
                            rules: [{
                                required: true,
                                message: '请输入密码',
                            }],
                            initialValue: '',
                        })}
                        type="password"
                        error={!!getFieldError('user_password')}
                        clear
                        placeholder="请输入密码"
                    >密码:</InputItem>
                </List>

                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录系统</Button>
                </WingBlank>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

Login = createForm()(Login);

export default connect(({}) => ({}))(Login);
