export default {
    state: {
        productList: [],
    },
    actions: {
        async fetchPruductType(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpProductTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('ProductTypeList', res_data);
        }
    },
    mutations: {
        ProductTypeList(state, data) {
            state.productList = data;
        }

    },
    getters: {
        productGetList(state) {
            return state.productList;
        }
    }
}