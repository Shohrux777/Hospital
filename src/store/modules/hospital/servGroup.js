export default {
    state: {
        service_group_list: [],
    },
    actions: {
        async fetch_service_group(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalServiceTypeGroups');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateService_group', res_data);
        }
    },
    mutations: {
        UpdateService_group(state, data) {
            state.service_group_list = data;
        }

    },
    getters: {
        get_service_group_list(state) {
            return state.service_group_list;
        }

    }
}