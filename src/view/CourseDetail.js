import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, Button, Modal, Toast} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';
import constant from '../util/constant';

const alert = Modal.alert;

class CourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            course: {}
        }
    }

    componentDidMount() {
        document.title = '课程详情';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'course/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        Toast.loading('加载中..', 0);
        
        http.request({
            url: '/mobile/xietong/course/find',
            data: {
                course_id: this.props.params.course_id
            },
            success: function (data) {
                Toast.hide();
                for (let i = 0; i < constant.course_time.length; i++) {
                    if (data.course_time == constant.course_time[i].value) {
                        data.course_time = constant.course_time[i].text;
                        break
                    }
                }
                this.setState({
                    course: data
                });
            }.bind(this),
            complete() {

            },
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleSubmit() {
        http.request({
            url: '/mobile/xietong/course/apply/save',
            data: {
                course_id: this.props.params.course_id
            },
            success: function (data) {
                Toast.success('申请成功');

                let list = this.props.index.list;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].course_id == this.props.params.course_id) {
                        list[i].is_apply = true;
                    }
                }

                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        list: list
                    }
                });

                setTimeout(function () {
                    this.handleBack();
                }.bind(this), constant.timeout * 300);
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleCancel() {
        alert('取消课程', '将删除该门课程的选课记录。', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定',
                onPress: () => new Promise((resolve) => {
                    http.request({
                        url: '/mobile/xietong/course/apply/delete',
                        data: {
                            course_id: this.props.params.course_id
                        },
                        success: function (data) {
                            Toast.success('取消成功');

                            let list = this.props.index.list;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].course_id == this.props.params.course_id) {
                                    list[i].is_apply = false;
                                }
                            }

                            this.props.dispatch({
                                type: 'index/fetch',
                                data: {
                                    list: list
                                }
                            });

                            setTimeout(function () {
                                this.handleBack();
                            }.bind(this), constant.timeout * 300);
                        }.bind(this),
                        complete: function () {
                            resolve();
                        }.bind(this)
                    });
                }),
            },
        ])
    }

    render() {
        const Item = List.Item;

        let status = 0;

        if (this.state.course.is_limit) {
            status = 3;
        } else {
            if (this.state.course.is_apply) {
                status = 2;
            } else {
                status = 1;
            }
        }

        return (
            <div>
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <NavBar leftContent="返回"
                                mode="dark"
                                onLeftClick={this.handleBack.bind(this)}
                        >课程详情</NavBar>

                }
                <WhiteSpace size="lg"/>
                <List>
                    <Item>
                        <span className="index-title">名称: </span>{this.state.course.course_name}
                    </Item>
                    <Item>
                        <span className="index-title">时间: </span>{this.state.course.course_time}
                    </Item>
                    <Item>
                        <span className="index-title">人数: </span>{this.state.course.course_apply_limit}
                    </Item>
                    <Item>
                        <div className="index-title">地点: </div>
                        <div className="index-name">{this.state.course.course_address}</div>
                    </Item>
                    <Item wrap>
                        <div className="index-title">介绍: </div>
                        <div className="index-name">{this.state.course.course_content}</div>
                    </Item>
                </List>

                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    {
                        status === 1 ?
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>立即申请</Button>
                            :
                            ''

                    }
                    {
                        status === 2 ?
                            <Button onClick={this.handleCancel.bind(this)}>取消申请</Button>
                            :
                            ''

                    }
                    {
                        status === 3 ?
                            <Button>该课程已经被别人申请完了</Button>
                            :
                            ''

                    }
                </WingBlank>
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

export default connect(({index}) => ({index}))(CourseDetail);
