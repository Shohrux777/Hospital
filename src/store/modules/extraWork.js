export default {
    state: {
        extra_work_list: [],
    },
    actions: {
        async fetch_extra_work_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpExtraWorks');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('ExtraWorkList', res_data);
        }
    },
    mutations: {
        ExtraWorkList(state, data) {
            state.extra_work_list = data;
        }

    },
    getters: {
        extra_work_list(state) {
            return state.extra_work_list;
        }
    }
}