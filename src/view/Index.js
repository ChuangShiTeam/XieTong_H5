import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, List, Toast} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';
import constant from '../util/constant';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            list: true
        }
    }

    componentDidMount() {
        document.title = '课程列表';

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'index/fetch',
            data: {
                scroll_top: document.documentElement.scrollTop
            },
        });
    }

    handleLoad() {
        http.request({
            url: '/mobile/xietong/course/list',
            data: {},
            success: function (data) {
                // Toast.hide();
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < constant.course_time.length; j++) {
                        if (data[i].course_time === constant.course_time[j].value) {
                            data[i].course_time = constant.course_time[j].text;
                            break
                        }
                    }
                }

                this.setState({
                    is_load: true,
                    list: data
                });
            }.bind(this),
            complete: function () {
                document.documentElement.scrollTop = this.props.index.scroll_top;
            }.bind(this)
        });
    }

    handleCourse(course_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/course/detail/' + course_id,
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
                        <NavBar className="header"
                                iconName=""
                                mode="dark"
                        >课程列表</NavBar>

                }
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <div style={{height: '100px'}}></div>

                }
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        this.state.list.map((item, index) => {
                            return (
                                <List key={index}>
                                    <Item arrow="horizontal"
                                          multipleLine
                                          extra={item.is_apply ? "已申请" : ""}
                                          onClick={this.handleCourse.bind(this, item.course_id)}
                                    >
                                        <div>
                                            <span className="index-title">课程: </span>{item.course_name}
                                        </div>
                                        <div>
                                            <span className="index-title">时间: </span>{item.course_time}
                                        </div>
                                        <div>
                                            <span className="index-title">人数: </span>{item.course_apply_limit}
                                        </div>
                                    </Item>
                                </List>
                            )
                        }) : ''
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
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
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
