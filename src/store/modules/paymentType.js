export default {
    state: {
        paymentTypeList: {
            rows: [],
            columns: ['id', 'name', 'activeStatus'],
            col: []
        },
        allpaymentType: [],
    },
    actions: {
        async fetchpaymentTypeAll(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpPaymentTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatepaymentTypeList', res_data);
        }
    },
    mutations: {
        UpdatepaymentTypeList(state, data) {
            state.paymentTypeList.rows = data;
            state.allpaymentType = state.paymentTypeList.rows;
        },
        main_paymentType_delete_row(state, index) {
            state.paymentTypeList.rows.splice(parseInt(index), 1);
        }


    },
    getters: {
        payment_type_list(state) {
            return state.paymentTypeList;
        },
        paymentTypeAll(state) {
            return state.allpaymentType;

        }

    }
}