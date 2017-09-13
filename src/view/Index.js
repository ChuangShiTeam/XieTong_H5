import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, List} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            list: []
        }
    }

    componentDidMount() {
        document.title = '课程列表';

        document.body.scrollTop = this.props.index.scroll_top;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'index/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleCourse() {
        this.props.dispatch(routerRedux.push({
            pathname: '/course/detail',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <NavBar iconName=""
                                mode="dark"
                        >课程列表</NavBar>

                }
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        <List>
                            <Item arrow="horizontal"
                                  multipleLine
                                  extra="已申请"
                                  onClick={this.handleCourse.bind(this)}
                            >
                                <div>
                                    <span className="index-title">课程: </span>走进音乐艺术
                                </div>
                                <div>
                                    <span className="index-title">时间: </span>星期二第八节
                                </div>
                                <div>
                                    <span className="index-title">人数: </span>20
                                </div>
                            </Item>
                            <Item arrow="horizontal"
                                  multipleLine
                                  extra="已申请"
                                  onClick={this.handleCourse.bind(this)}
                            >
                                <div>
                                    <span className="index-title">课程: </span>走进音乐艺术
                                </div>
                                <div>
                                    <span className="index-title">时间: </span>星期二第八节
                                </div>
                                <div>
                                    <span className="index-title">人数: </span>20
                                </div>
                            </Item>
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.list.length === 0 ?
                        <div>
                            <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
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

export default connect(({index}) => ({index}))(Index);
