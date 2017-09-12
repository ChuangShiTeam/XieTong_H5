export default {
    namespace: 'index',

    state: {
        course_list: [],
        scroll_top: 0,
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
