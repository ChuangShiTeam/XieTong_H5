import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, Button, Modal} from 'antd-mobile';

import validate from '../util/validate';
import storage from '../util/storage';

const alert = Modal.alert;

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '个人中心';

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        setTimeout(function () {
            this.setState({
                is_load: true
            });
        }.bind(this), 150);
    }

    componentWillUnmount() {

    }

    handleCourse() {
        this.props.dispatch(routerRedux.push({
            pathname: '/course/index',
            query: {}
        }));
    }

    handlePassword() {
        this.props.dispatch(routerRedux.push({
            pathname: '/password',
            query: {}
        }));
    }

    handleLogout() {
        alert('退出系统', '退出后不会删除任何历史记录，下次登录依然可以使用本帐号。', [
            {text: '取消', onPress: () => {}},
            {
                text: '确定',
                onPress: () => new Promise((resolve) => {
                    resolve();

                    this.props.dispatch(routerRedux.push({
                        pathname: '/login',
                        query: {}
                    }));
                }),
            },
        ])
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        let clazz_name = storage.getClazzName();
        if (clazz_name) {
            if (clazz_name.length === 3) {
                clazz_name = clazz_name.substring(0, 1) + "年级" + parseInt(clazz_name.substring(1, 3)) + "班"
            } else if (clazz_name.length === 4) {
                clazz_name = clazz_name.substring(0, 2) + "年级" + parseInt(clazz_name.substring(2, 4)) + "班"
            }
        }

        return (
            <div>
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <NavBar className="header"
                                iconName=""
                                mode="dark"
                        >个人中心</NavBar>

                }
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <div style={{height: '100px'}}></div>

                }
                <WhiteSpace size="lg"/>
                <List>
                    <Item multipleLine
                          thumb={<img src={require('../assets/image/logo.png')}
                                      style={{width: '100px', height: '100px'}}/>}
                    >
                        {storage.getStudentName()}
                        <Brief>
                            {clazz_name}
                        </Brief>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/send.svg')} arrow="horizontal"
                        onClick={this.handleCourse.bind(this)}
                    >
                        我的选课
                    </Item>
                    <Item
                        thumb={require('../assets/svg/lock.svg')} arrow="horizontal"
                        onClick={this.handlePassword.bind(this)}
                    >
                        重置密码
                    </Item>
                </List>

                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    <Button onClick={this.handleLogout.bind(this)}>退出系统</Button>
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

export default connect(({}) => ({}))(My);
