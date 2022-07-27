export default {
    state: {
        suroviy_vid_list: [],
    },
    actions: {
        async fetch_suroviy_vid_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpSuroviyVids');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('SuroviyVidList', res_data);
        }
    },
    mutations: {
        SuroviyVidList(state, data) {
            state.suroviy_vid_list = data;
        }

    },
    getters: {
        suroviy_vid_list(state) {
            return state.suroviy_vid_list;
        }
    }
}