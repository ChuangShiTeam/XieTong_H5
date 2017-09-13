export default {
    namespace: 'index',

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
