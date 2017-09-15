import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, Button, Modal, Toast, NoticeBar, Result, Icon} from 'antd-mobile';

import validate from '../util/validate';
import http from '../util/http';
import constant from '../util/constant';

const alert = Modal.alert;

class CourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_submit: false,
            course: {},
            confirm_count: 0,
            course_apply_history_status: 'WAITING',
            course_apply_history_result: ''
        }
    }

    componentDidMount() {
        document.title = '课程详情';

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
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
                    is_load: true,
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
        Toast.loading('加载中..', 0);

        http.request({
            url: '/mobile/xietong/course/apply/save',
            data: {
                course_id: this.props.params.course_id
            },
            success: function (data) {
                // Toast.success('申请成功');
                //
                // let list = this.props.index.list;
                // for (let i = 0; i < list.length; i++) {
                //     if (list[i].course_id === this.props.params.course_id) {
                //         list[i].is_apply = true;
                //     }
                // }
                //
                // this.props.dispatch({
                //     type: 'index/fetch',
                //     data: {
                //         list: list
                //     }
                // });
                //
                // setTimeout(function () {
                //     this.handleBack();
                // }.bind(this), constant.timeout * 300);


                Toast.hide();

                this.setState({
                    is_submit: true
                });

                setTimeout(() => {
                    this.handleConfirm(data);
                }, 500);
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleConfirm(course_apply_history_id) {
        http.request({
            url: '/mobile/xietong/course/apply/history/find',
            data: {
                course_apply_history_id: course_apply_history_id
            },
            success: function (data) {
                if (data) {
                    if (data.course_apply_history_status === 'SUCCESS') {
                        this.setState({
                            course_apply_history_status: 'SUCCESS'
                        });
                    } else if (data.course_apply_history_status === 'WAITING') {

                    } else {
                        this.setState({
                            course_apply_history_status: 'FAIL',
                            course_apply_history_result: data.course_apply_history_result
                        });
                    }
                } else {
                    // if (this.state.confirm_count < 20) {
                    //     this.setState({
                    //         confirm_count: this.state.confirm_count + 1
                    //     });
                    //
                    //     setTimeout(() => {
                    //         this.handleConfirm(course_apply_history_id);
                    //     }, 500);
                    // } else {
                    //     this.setState({
                    //         course_apply_history_status: 'FAIL',
                    //         course_apply_history_result: '网络缓慢,请刷新再尝试'
                    //     });
                    // }
                }
            }.bind(this),
            complete() {

            },
        });
    }

    handleCancel() {
        alert('取消课程', '将取消该门课程的申请。', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定',
                onPress: () => new Promise((resolve) => {
                    Toast.loading('加载中..', 0);

                    http.request({
                        url: '/mobile/xietong/course/apply/delete',
                        data: {
                            course_id: this.props.params.course_id
                        },
                        success: function (data) {
                            Toast.hide();

                            this.setState({
                                is_submit: true,
                                course_apply_history_status: 'CANCEL',
                            });
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

        if (this.state.course.is_apply) {
            status = 2;
        } else {
            if (this.state.course.is_limit) {
                status = 3;
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
                        <NavBar className="header"
                                leftContent="返回"
                                mode="dark"
                                onLeftClick={this.handleBack.bind(this)}
                        >课程详情</NavBar>

                }
                {
                    validate.isWeChat() ?
                        ''
                        :
                        <div style={{height: '100px'}}></div>

                }

                {
                    this.state.is_load && status === 3 ?
                        <NoticeBar>
                            该课程已经被别人选完了
                        </NoticeBar>
                        :
                        ''

                }

                <WhiteSpace size="lg"/>

                {
                    this.state.is_submit ?
                        ''
                        :
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
                                <span className="index-title">地点: </span>{this.state.course.course_address}
                            </Item>
                            <Item wrap>
                                <div className="index-title">介绍: </div>
                                <div className="index-name">{this.state.course.course_content}</div>
                            </Item>
                        </List>

                }


                {
                    this.state.is_submit ?
                        ''
                        :
                        <WhiteSpace size="lg"/>

                }
                {
                    this.state.is_submit ?
                        ''
                        :
                        <WhiteSpace size="lg"/>

                }
                {
                    this.state.is_submit ?
                        ''
                        :
                        <WhiteSpace size="lg"/>

                }


                {
                    this.state.is_submit ?
                        ''
                        :
                        <WingBlank size="lg">
                            {
                                this.state.is_load && status === 1 ?
                                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>立即申请</Button>
                                    :
                                    ''

                            }
                            {
                                this.state.is_load && status === 2 ?
                                    <Button onClick={this.handleCancel.bind(this)}>取消申请</Button>
                                    :
                                    ''

                            }
                            {/*{*/}
                            {/*this.state.is_load && status === 3 ?*/}
                            {/*<Button>该课程已经被别人选完了</Button>*/}
                            {/*:*/}
                            {/*''*/}

                            {/*}*/}
                        </WingBlank>

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'WAITING' ?
                        <Result
                            img={<img src={require('../assets/svg/waiting.svg')} style={{ width: '1.2rem', height: '1.2rem' }} alt=""/>}
                            title="平台处理中"
                            message="已提交申请，等待平台处理"
                        />
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'SUCCESS' ?
                        <Result
                            img={<Icon
                                type="check-circle"
                                style={{fill: '#1F90E6', width: '1.2rem', height: '1.2rem'}}
                                alt=""
                            />}
                            title="选课成功"
                            message="恭喜您选中了该门课程"
                        />
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'SUCCESS' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'SUCCESS' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'SUCCESS' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'SUCCESS' ?
                        <WingBlank size="lg">
                            <Button type="primary" onClick={this.handleBack.bind(this)}>返回继续选课</Button>
                        </WingBlank>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'FAIL' ?
                        <Result
                            img={<Icon type="cross-circle-o" className="icon" style={{fill: '#F13642', width: '1.2rem', height: '1.2rem'}} />}
                            title="申请失败"
                            message={this.state.course_apply_history_result}
                        />
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'FAIL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'FAIL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'FAIL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'FAIL' ?
                        <WingBlank size="lg">
                            <Button type="primary" onClick={this.handleBack.bind(this)}>返回继续选课</Button>
                        </WingBlank>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'CANCEL' ?
                        <Result
                            img={<Icon
                                type="check-circle"
                                style={{fill: '#1F90E6', width: '1.2rem', height: '1.2rem'}}
                                alt=""
                            />}
                            title="取消成功"
                            message="您已经取消了该门课程"
                        />
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'CANCEL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'CANCEL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'CANCEL' ?
                        <WhiteSpace size="lg"/>
                        :
                        ''

                }

                {
                    this.state.is_submit && this.state.course_apply_history_status === 'CANCEL' ?
                        <WingBlank size="lg">
                            <Button type="primary" onClick={this.handleBack.bind(this)}>返回继续选课</Button>
                        </WingBlank>
                        :
                        ''

                }

                {
                    this.state.is_submit ?
                        ''
                        :
                        <WhiteSpace size="lg"/>

                }

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

export default connect(({}) => ({}))(CourseDetail);
