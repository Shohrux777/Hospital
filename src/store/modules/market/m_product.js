export default {
    state: {
        m_product_list: {
            rows: [],
            columns: ['name', 'price', 'nameForPrint', 'code', 'specs', 'manifacturerName', 'activeStatus'],
            col: []
        },
        product_list_by_group: []
    },
    actions: {
        async fetch_m_product(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProducts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_m_product_list', res_data);
        },
        async fetch_product_list_sub_id(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroupDetails/getProductListByMarketProductGroupId?MarketProductGroupId=' + id);
            const res_data = await res.json();
            ctx.commit('UpdateProductListSubId', res_data);
        }
    },
    mutations: {
        Update_m_product_list(state, data) {
            console.log('data ekan')
            console.log(data)
            state.m_product_list.rows = data;
        },
        UpdateProductListSubId(state, data) {
            state.product_list_by_group = data;
        },
        m_product_row_delete(state, index) {
            state.m_product_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_m_product_list(state) {
            return state.m_product_list;
        },
        product_list_by_group(state) {
            return state.product_list_by_group;
        }

    }
}