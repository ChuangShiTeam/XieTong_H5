import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, List} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class CourseIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '我的课程';

        document.body.scrollTop = this.props.course.scroll_top;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'course/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
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
                <NavBar leftContent="返回"
                        mode="dark"
                        onLeftClick={this.handleBack.bind(this)}
                >我的课程</NavBar>
                <WhiteSpace size="lg"/>
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

export default connect(({course}) => ({course}))(CourseIndex);
