export default {
    state: {
        district_list: {
            rows: [],
            columns: ['name', 'province_name', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_district(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Districts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateDistrict_list', res_data);
        }
    },
    mutations: {
        UpdateDistrict_list(state, data) {
            state.district_list.rows = [];
            for (let i = 0; i < data.length; i++) {
                var a = {
                    name: '',
                    id: null,
                    province_name: '',
                    province_id: null,
                    activeStatus: 'false',
                }
                a.name = data[i].name
                a.id = data[i].id
                a.province_name = data[i].province.name
                a.province_id = data[i].province.id
                a.activeStatus = data[i].activeStatus
                state.district_list.rows.push(a);
            }
        },
        district_row_delete(state, index) {
            state.district_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_district_list(state) {
            return state.district_list;
        },

    }
}