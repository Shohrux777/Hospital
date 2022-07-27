export default {
    state: {
        agent_list: {
            rows: [],
            columns: ['fullName', 'phoneNumber', 'companyName', 'code', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_m_agent(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketAgents');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateAgentMarket', res_data);
        },
    },
    mutations: {
        UpdateAgentMarket(state, data) {
            state.agent_list.rows = data;
        },
        m_agent_row_delete(state, index) {
            state.agent_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_agent_list(state) {
            return state.agent_list;
        }

    }
}