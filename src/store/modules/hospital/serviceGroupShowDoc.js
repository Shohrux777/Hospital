export default {
    state: {
        service_group_show_doc: {
            rows: [],
            columns: ['name', 'withoutReturnStatus'],
            col: []
        },
    },
    actions: {
        async fetch_service_group_show_doc(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalServiceTypeByGroupPermissions');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateService_group_show_doc', res_data);
        }
    },
    mutations: {
        UpdateService_group_show_doc(state, data) {
            console.log('data')
            state.service_group_show_doc.rows = []
            for (let i = 0; i < data.length; i++) {
                var a = {
                    name: '',
                    id: null,
                    service_group_id: null,
                    withoutReturnStatus: 'false',
                }
                a.name = data[i].serviceTypeGroup.name
                a.service_group_id = data[i].serviceTypeGroup.id
                a.id = data[i].id
                a.withoutReturnStatus = data[i].withoutReturnStatus
                state.service_group_show_doc.rows.push(a);
            }
            console.log(state.service_group_show_doc.rows)

        },
        service_group_show_doc_row_delete(state, index) {
            state.service_group_show_doc.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_service_group_show_doc(state) {
            return state.service_group_show_doc;
        },

    }
}