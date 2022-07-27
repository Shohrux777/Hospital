export default {
    state: {
        measureList: [],
    },
    actions: {
        async fetchMeasure(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpUnitmeasurments');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('measureTypeList', res_data);
        }
    },
    mutations: {
        measureTypeList(state, data) {
            state.measureList = data;
        }

    },
    getters: {
        measureGetList(state) {
            return state.measureList;
        }

    }
}