export default {
    state: {
        contragent_list: {
            rows: [],
            columns: ['name', 'phoneNumber', 'address', 'district', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_contragent(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Contragents');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateContragent_list', res_data);
        }
    },
    mutations: {
        UpdateContragent_list(state, data) {
            console.log('contragent')
            console.log(data)
            state.contragent_list.rows = data.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    district: item.districts.name,
                    activeStatus: item.activeStatus
                }
            });
        },
        contragent_row_delete(state, index) {
            state.contragent_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_contragent_list(state) {
            return state.contragent_list;
        },

    }
}