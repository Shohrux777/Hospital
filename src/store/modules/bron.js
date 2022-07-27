export default {
    state: {
        bron_room_list: {
            rows: [],
            columns: ['room_name','room_beds_count','room_type','note'],
            col: []
        },
        bron_beds_list: {
            rows: [],
            columns: ['beds_name', 'beds_type'],
            col: []
        },
        bron_rb_list: {
            rows: [],
            columns: ['hospitalBronRoomsid', 'hospitalBronRoomBedsid'],
            col: []
        },
        price_type_room: {
            rows: [],
            columns: ['name', 'sum', 'days_count', 'discount_sum', 'note'],
            col: []
        },
    
    },
    actions: {
        async fetch_bron_room(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalBronRooms');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_bron_room', res_data);
        },
        async fetch_bron_beds(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalBronRoomBeds');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_bron_beds', res_data);
        },
        async fetch_bron_rb(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalBronRoomAddBeds');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_bron_rb', res_data);
        },
        async fetch_price_type_room(ctx){
            const res = await fetch(ctx.rootState.hostname + '/HospitalBronRooms/getPaginationHospitalBedsTypeAndPrice?page=0&size=500');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_price_room', res_data);
        }
    },
    mutations: {
        Update_bron_room(state, data) {
            state.bron_room_list.rows = data;
        },
        bron_room_row_delete(state, index) {
            state.bron_room_list.rows.splice(parseInt(index), 1);
        },

        Update_bron_beds(state, data) {
            state.bron_beds_list.rows = data;
        },
        bron_beds_row_delete(state, index) {
            state.bron_beds_list.rows.splice(parseInt(index), 1);
        },

        Update_bron_rb(state, data) {
            console.log(data)
            state.bron_rb_list.rows = data;
        },
        bron_rb_row_delete(state, index) {
            state.bron_rb_list.rows.splice(parseInt(index), 1);
        },
        price_room_row_delete(state, index) {
            state.price_type_room.rows.splice(parseInt(index), 1);
        },

        Update_price_room(state, data){
            state.price_type_room.rows = data.items_list;
        }

    },
    getters: {
        bron_room_list(state) {
            return state.bron_room_list;
        },

        bron_beds_list(state) {
            return state.bron_beds_list;
        },

        bron_rb_list(state) {
            return state.bron_rb_list;
        },

        price_type_room(state) {
            return state.price_type_room;
        }

    }
}