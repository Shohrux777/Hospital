export default {
    state: {
        auth_user_list: [],
        auth_user_limit: []
    },
    actions: {
        async fetch_auth_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Authorization');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateAuthUser', res_data);
        }
    },
    mutations: {
        UpdateAuthUser(state, data) {
            console.log(data)
            state.auth_user_list = data;
            state.auth_user_limit = data.map(item => {
                return {
                    Authid: item.id,
                    login: item.login,
                    fio: item.users.fio,
                    userId: item.users.id,
                }
            });
        },

    },
    getters: {
        auth_user_list(state) {
            return state.auth_user_list;
        },
        get_auth_user_limit(state) {
            return state.auth_user_limit;
        },
    }
}