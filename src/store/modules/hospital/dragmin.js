export default {
    state: {
        drag_min_product_real_qty: [],
        min_drag_list_for_admin: [],
    },
    actions: {
        async fetch_product_real_qty(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductRealQties');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateReal_qty', res_data);
        },
        async fetch_min_drag_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductRealQties/getMinLimitLeftProducts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_Min_drag_list', res_data);
        }
    },
    mutations: {
        UpdateReal_qty(state, data) {
            // console.log('juda zur ishlayabdi');
            // console.log(data);
            state.drag_min_product_real_qty = data;
        },
        Update_Min_drag_list(state, data) {
            state.min_drag_list_for_admin = data;
        }

    },
    getters: {
        get_drag_min_product_real_qty(state) {
            return state.drag_min_product_real_qty;
        },
        get_min_drag_list_for_admin(state) {
            return state.min_drag_list_for_admin;
        }

    }
}