import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, NavBar, WhiteSpace, WingBlank, List, Button, Modal} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

const alert = Modal.alert;

class CourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            state: 0
        }
    }

    componentDidMount() {
        document.title = '课程详情';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true,
            state: 3
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

    handleSubmit() {

    }

    handleCancel() {
        alert('取消课程', '将删除该门课程的选课记录。', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定',
                onPress: () => new Promise((resolve) => {
                    resolve();


                }),
            },
        ])
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar leftContent="返回"
                        mode="dark"
                        onLeftClick={this.handleBack.bind(this)}
                >课程详情</NavBar>
                <WhiteSpace size="lg"/>
                <List>
                    <Item>
                        <span className="index-title">名称: </span>走进音乐艺术
                    </Item>
                    <Item>
                        <span className="index-title">时间: </span>星期二第八节
                    </Item>
                    <Item>
                        <span className="index-title">人数: </span>20
                    </Item>
                    <Item>
                        <div className="index-title">地点: </div>
                        <div className="index-name">上海 上海市 黄浦区 淮海中路街道 兴业路123号新天地新里7楼裸心社</div>
                    </Item>
                    <Item wrap>
                        <div className="index-title">介绍: </div>
                        <div className="index-name">Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</div>
                    </Item>
                </List>

                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    {
                        this.state.state === 1 ?
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>立即申请</Button>
                            :
                            ''

                    }
                    {
                        this.state.state === 2 ?
                            <Button onClick={this.handleCancel.bind(this)}>取消申请</Button>
                            :
                            ''

                    }
                    {
                        this.state.state === 3 ?
                            <Button>该课程已经被别人申请完了</Button>
                            :
                            ''

                    }
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

export default connect(({}) => ({}))(CourseDetail);
