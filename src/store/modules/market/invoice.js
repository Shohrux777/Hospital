export default {
    state: {
        invoice_list: {
            rows: [],
            columns: ['companyId', 'marketAgentId', 'authorizationId', 'createdDateTime', 'note', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_m_invoice(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketInvoices');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateInvoiceMarket', res_data);
        }
    },
    mutations: {
        UpdateInvoiceMarket(state, data) {
            state.invoice_list.rows = data;
        },
        invoice_delete_row(state, index) {
            state.invoice_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_invoice_list(state) {
            return state.invoice_list;
        }

    }
}