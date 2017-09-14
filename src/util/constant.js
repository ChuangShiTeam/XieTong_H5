export default {
    // host: 'http://localhost:8080',
    // is_test: true,
    host: 'http://api.chuangshi.nowui.com',
    // is_test: false,
    platform: 'H5',
    version: '9.9.8',
    name: '济颐馆',
    h5Host: 'http://h5.jiyiguan.nowui.com/?#/',
    app_id: '749388e5dac3465f922c54e61d16a993',
    wechat_app_id: 'wx934f793803320ecd',
    index: 'index',
    menu: [{
        key: 'index',
        title: '首页',
        url: '/index',
        path: '/index',
        icon: 'index.svg',
        selected_icon: 'index_active.svg'
    }, {
        key: 'my',
        title: '个人',
        url: '/my',
        path: '/my',
        icon: 'my.svg',
        selected_icon: 'my_active.svg'
    }],
    course_time: [{
        value: '17',
        text: '星期一第七节'
    }, {
        value: '27',
        text: '星期二第七节'
    }, {
        value: '28',
        text: '星期二第八节'
    }, {
        value: '47',
        text: '星期四第七节'
    }, {
        value: '48',
        text: '星期四第八节'
    }, {
        value: '56',
        text: '星期五第六节'
    }]
};