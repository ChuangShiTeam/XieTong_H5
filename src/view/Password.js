import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, InputItem, Button, Toast} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';

class Password extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '重置密码';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                Toast.loading('加载中..', 0);

                http.request({
                    url: '/mobile/student/login',
                    data: values,
                    success: function (data) {
                        Toast.hide();

                        this.props.dispatch(routerRedux.push({
                            pathname: '/index',
                            query: {}
                        }));
                    }.bind(this),
                    complete() {

                    },
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
                        <NavBar leftContent="返回"
                                mode="dark"
                                onLeftClick={this.handleBack.bind(this)}
                        >重置密码</NavBar>

                }
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        {...getFieldProps('user_password', {
                            rules: [{
                                required: true,
                                message: '请输入密码',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('user_password')}
                        clear
                        placeholder="请输入密码"
                    >密码:</InputItem>
                    <InputItem
                        {...getFieldProps('user_password_2', {
                            rules: [{
                                required: true,
                                message: '请输入确认密码',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('user_password_2')}
                        clear
                        placeholder="请输入确认密码"
                    >确认密码:</InputItem>
                </List>

                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
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

Password = createForm()(Password);

export default connect(({}) => ({}))(Password);
