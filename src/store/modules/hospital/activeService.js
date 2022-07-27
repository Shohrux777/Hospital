export default {
    state: {
        active_service_remove: {
            rows: [],
            columns: ['service_type'],
            col: []
        },
    },
    actions: {
        async fetch_active_service_remove(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitelRequiredServiceTypesAllPatcientsAndNotPatcients');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Updateactive_service_remove', res_data);
        }
    },
    mutations: {
        Updateactive_service_remove(state, data) {
            console.log('data mana bu')
            console.log(data);
            state.active_service_remove.rows = []
            for (let i = 0; i < data.length; i++) {
                var a = {
                    id: null,
                    service_type: '',
                }
                a.id = data[i].id
                a.service_type = data[i].serviceType.name
                state.active_service_remove.rows.push(a);
            }
            console.log(state.active_service_remove.rows)

        },
        active_service_remove_row_delete(state, index) {
            state.active_service_remove.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_active_service_remove(state) {
            return state.active_service_remove;
        },

    }
}