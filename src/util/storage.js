import constant from './constant';

const token_key = 'token_' + constant.version;
const student_name_key = 'student_name_' + constant.version;
const clazz_name_key = 'clazz_name_' + constant.version;

function getToken() {
    let token = localStorage.getItem(token_key);

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setToken(token) {
    localStorage.clear();

    localStorage.setItem(token_key, token);
}

function getStudentName() {
    let student_name = localStorage.getItem(student_name_key);

    if (student_name === null) {
        return '';
    } else {
        return student_name;
    }
}

function setStudentName(student_name) {
    localStorage.setItem(student_name_key, student_name);
}

function getClazzName() {
    let clazz_name = localStorage.getItem(clazz_name_key);

    if (clazz_name === null) {
        return '';
    } else {
        return clazz_name;
    }
}

function setClazzName(clazz_name) {
    localStorage.setItem(clazz_name_key, clazz_name);
}

export default {
    getToken: getToken,
    setToken: setToken,
    getStudentName: getStudentName,
    setStudentName: setStudentName,
    getClazzName: getClazzName,
    setClazzName: setClazzName
};
