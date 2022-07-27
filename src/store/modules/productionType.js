export default {
    state: {
        productionList: [],
    },
    actions: {
        async fetchPruductionType(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpPruductionTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('ProductionTypeList', res_data);
        }
    },
    mutations: {
        ProductionTypeList(state, data) {
            state.productionList = data;
        }

    },
    getters: {
        productionGetList(state) {
            return state.productionList;
        }

    }
}