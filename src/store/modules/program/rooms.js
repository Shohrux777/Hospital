export default {
    state: {
        rooms_list: {
            rows: [],
            columns: ['name', 'number', 'type', 'bedsCount'],
            col: []
        },
    },
    actions: {
        async fetch_rooms(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Rooms');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateRooms_list', res_data);
        }
    },
    mutations: {
        UpdateRooms_list(state, data) {
            console.log(data);
            state.rooms_list.rows = data;
        },
        rooms_row_delete(state, index) {
            state.rooms_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_rooms_list(state) {
            return state.rooms_list;
        },

    }
}