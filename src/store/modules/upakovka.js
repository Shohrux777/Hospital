export default {
    state: {
        upakovka_list: [],
    },
    actions: {
        async fetch_upakovka_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpUpakopkas');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateUpakovka', res_data);
        }
    },
    mutations: {
        UpdateUpakovka(state, data) {
            state.upakovka_list = data;
        }

    },
    getters: {
        upakovka_list(state) {
            return state.upakovka_list;
        }
    }
}