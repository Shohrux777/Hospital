export default {
    state: {
        calc_type_list: {
            rows: [],
            columns: ['name', 'activeStatus'],
            col: []
        },
        invoice_type_list: {}
    },
    actions: {
        async fetch_calc_type_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCalcTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Updatecalc_type_list', res_data);
        },
        async fetch_invoice_type_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpInvoiceTypes/getBuyInvoiceType');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateInvoiceType', res_data);
        }

    },
    mutations: {
        Updatecalc_type_list(state, data) {
            console.log(data)
            state.calc_type_list.rows = data;
        },
        UpdateInvoiceType(state, data) {
            console.log(data)
            state.invoice_type_list = data;
        },
        sensor_row_delete(state, index) {
            state.calc_type_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        calc_type_list(state) {
            return state.calc_type_list;
        },
        invoice_type_list(state) {
            return state.invoice_type_list
        }

    }
}