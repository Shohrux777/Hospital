export default {
    state: {
        m_measure_list: [],
    },
    actions: {
        async fetch_m_Measure(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketUnitMeasurments');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateMeasureMarket', res_data);
        }
    },
    mutations: {
        UpdateMeasureMarket(state, data) {
            state.m_measure_list = data;
        }

    },
    getters: {
        m_measure_list(state) {
            return state.m_measure_list;
        }

    }
}