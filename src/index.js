import dva from 'dva';
import Router from './router';
import {useRouterHistory} from 'dva/router';
import {createHashHistory} from 'history';
import FastClick from 'fastclick';

import './view/Style.css';

import index from './model/index';
import course from './model/course';

let result = true;

if (result) {

    FastClick.attach(document.body);

    const app = dva({
        history: useRouterHistory(createHashHistory)({queryKey: false}),
    });

    app.model(index);
    app.model(course);

    app.router(Router);

    document.getElementById("loading").remove();

    app.start('#root');
}