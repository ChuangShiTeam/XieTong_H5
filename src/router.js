import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import Index from './view/Index';
import My from './view/My';
import Login from './view/Login';
import Password from './view/Password';
import CourseIndex from './view/CourseIndex';
import CourseDetail from './view/CourseDetail';

import storage from "./util/storage";
import constant from './util/constant';
import notification from './util/notification';

function RouterConfig({history}) {

    const handleEnter = function (next, replace, callback) {
        if ((storage.getToken() === '' || storage.getToken() === null || storage.getToken() === undefined) && next.location.pathname !== '/login') {

            replace('/login');
        }

        callback();
    };

    const handleChange = function (next, replace, callback) {
        if ((storage.getToken() === '' || storage.getToken() === null) && next.location.pathname !== '/login') {

            replace('/login');
        }

        notification.emit('notification_main_load', {
            path: replace.location.pathname
        });

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to={constant.index}/>
                <Route component={Main} onEnter={handleEnter} onChange={handleChange}>
                    <Route path="/index" component={Index}/>
                    <Route path="/my" component={My}/>
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/password" component={Password}/>
                <Route path="/course/index" component={CourseIndex}/>
                <Route path="/course/detail/:course_id" component={CourseDetail}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
