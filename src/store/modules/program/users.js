export default {
    state: {
        users_list: {
            rows: [],
            columns: ['fio', 'pol', 'phone', 'depart_name', 'room_name', 'position_name'],
            col: []
        },
        user_list_limit: []
    },
    actions: {
        async fetch_users(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Users');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateUsers_list', res_data);
        }
    },
    mutations: {
        UpdateUsers_list(state, data) {
            console.log(data)
            state.users_list.rows = [];
            state.user_list_limit = data
            for (let i = 0; i < data.length; i++) {
                var a = {
                    fio: '',
                    id: null,
                    phone: '',
                    depart_name: '',
                    depart_id: null,
                    room_name: '',
                    room_id: null,
                    activeStatus: 'false',
                    position_name: '',
                    position_id: null,
                    pol: '',
                    polId: null,
                    img: '',
                    authorization: {}
                }
                a.fio = data[i].fio
                a.id = data[i].id
                a.phone = data[i].phoneNumber
                a.depart_name = data[i].department.name
                a.depart_id = data[i].department.id
                a.room_name = data[i].rooms.name
                a.room_id = data[i].rooms.id
                a.activeStatus = data[i].activeStatus
                a.position_name = data[i].position.name
                a.position_id = data[i].position.id
                a.img = data[i].image
                a.authorization = data[i].authorization
                a.polId = data[i].polType
                if (data[i].polType == 1) {
                    a.pol = 'Мужской'
                } else {
                    a.pol = 'Женский'
                }
                state.users_list.rows.push(a);
            }

        },
        users_row_delete(state, index) {
            state.users_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_users_list(state) {
            return state.users_list;
        },
        get_user_list_limit(state) {
            return state.user_list_limit;
        },

    }
}