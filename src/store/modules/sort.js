export default {
    state: {
        sort_list: [],
    },
    actions: {
        async fetch_sort_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpSorts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateSort', res_data);
        }
    },
    mutations: {
        UpdateSort(state, data) {
            state.sort_list = data;
        }

    },
    getters: {
        sort_list(state) {
            return state.sort_list;
        }
    }
}