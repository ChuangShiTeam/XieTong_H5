import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, Button, Modal} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

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

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
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

    }

    handleLogout() {
        alert('退出系统', '退出后不会删除任何历史记录，下次登录依然可以使用本帐号。', [
            {text: '取消', onPress: () => console.log('cancel')},
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

        return (
            <div>
                <NavBar iconName=""
                        mode="dark"
                >个人中心</NavBar>
                <WhiteSpace size="lg"/>
                <List>
                    <Item multipleLine
                          thumb={<img src={require('../assets/image/logo.png')}
                                      style={{width: '100px', height: '100px'}}/>}
                    >
                        钟永强
                        <Brief>一年级一班</Brief>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/send.svg')} arrow="horizontal"
                        onClick={this.handleCourse.bind(this)}
                    >
                        我的课程
                    </Item>
                    <Item
                        thumb={require('../assets/svg/lock.svg')} arrow="horizontal"
                        onClick={this.handleCourse.bind(this)}
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
