
export default {
    namespace: 'course',

    state: {
        scroll_top: 0,
        list: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
