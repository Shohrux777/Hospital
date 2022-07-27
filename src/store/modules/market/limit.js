export default {
    state: {
        limit_list: {
            rows: [],
            columns: ['authorizationId', 'realSumm', 'reservedSumm', 'limitFinished', 'beginDateTime', 'endDateTime', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_m_limit(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketAuthLimitByMoneys');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateLimitMarket', res_data);
        },
    },
    mutations: {
        UpdateLimitMarket(state, data) {
            state.limit_list.rows = data;
        },
        m_limit_row_delete(state, index) {
            state.limit_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_limit_list(state) {
            return state.limit_list;
        }

    }
}