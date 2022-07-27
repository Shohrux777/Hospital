export default {
    state: {
        province_list: {
            rows: [],
            columns: ['name', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_province(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Provinces');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateProvince_list', res_data);
        }
    },
    mutations: {
        UpdateProvince_list(state, data) {
            console.log('data ekan')
            console.log(data)
            state.province_list.rows = data;
        },
        province_row_delete(state, index) {
            state.province_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_province_list(state) {
            return state.province_list;
        },

    }
}