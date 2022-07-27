export default {
    state: {
        serviceTypeList: {
            rows: [],
            columns: ['id', 'name', 'activeStatus'],
            col: []
        },
        allserviceType: [],
    },
    actions: {
        async fetch_service_type_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpserviceTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateserviceTypeList', res_data);
        }
    },
    mutations: {
        UpdateserviceTypeList(state, data) {
            state.serviceTypeList.rows = data;
            state.allserviceType = state.serviceTypeList.rows;
        },
        main_serviceType_delete_row(state, index) {
            state.serviceTypeList.rows.splice(parseInt(index), 1);
        }


    },
    getters: {
        service_type_list(state) {
            return state.serviceTypeList.rows;
        },
        serviceTypeAll(state) {
            return state.allserviceType;

        }

    }
}