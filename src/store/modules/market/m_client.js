export default {
    state: {
        m_client_list: {
            rows: [],
            columns: ['m_name', 'statya', 'part', 'codeStr', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_m_client(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketClientInfoes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_m_client_list', res_data);
        }
    },
    mutations: {
        Update_m_client_list(state, data) {
            state.m_client_list.rows = [];
            for (let i = 0; i < data.length; i++) {
                var a = {
                    m_name: data[i].userFullName,
                    statya: data[i].statya,
                    part: data[i].part,
                    codeStr: data[i].codeStr,
                    activeStatus: data[i].activeStatus,
                    id: data[i].id,
                    authorizationId: data[i].authorizationId
                }
                state.m_client_list.rows.push(a);
            }
            console.log(state.m_client_list)
        },
        m_client_row_delete(state, index) {
            state.m_client_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_m_client_list(state) {
            return state.m_client_list;
        },

    }
}