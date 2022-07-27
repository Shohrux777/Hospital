export default {
    state: {
        position_list: {
            rows: [],
            columns: ['name', 'code', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_position(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Positions');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatePosition_list', res_data);
        }
    },
    mutations: {
        UpdatePosition_list(state, data) {
            state.position_list.rows = data;
        },
        position_row_delete(state, index) {
            state.position_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_position_list(state) {
            return state.position_list;
        },

    }
}