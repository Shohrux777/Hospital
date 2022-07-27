export default {
    state: {
        m_group_list: {
            rows: [],
            columns: ['name', 'pictureStr', 'mainProductGroup'],
            col: []
        },
        m_group_details_list: {
            rows: [],
            columns: ['marketProductId', 'marketProductGroupId', 'mainProductGroup'],
            col: []
        },
        all_group_list: [],
        main_group_list: [],
        sub_product_group_list: [],
        sub_product_main_id: [],
        product_get_sub_id: []
    },
    actions: {
        async fetch_m_group(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroups');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateGroupMarket', res_data);
        },
        async fetch_m_group_details(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroupDetails');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateGroupDetailsMarket', res_data);
        },
        async fetch_main_group(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroups/getMainProductGroup');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateMainGroupMarket', res_data);
        },
        async fetch_main_group_id(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroups/getSubProductGroupByMainId?ProductGroupId=' + id);
            const res_data = await res.json();
            ctx.commit('UpdateSubGroupMainId', res_data);
        },
        async fetch_sub_group_id_get_product(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/MarketProductGroups/getSubProductGroupAndProductsByProductGroupId?ProductGroupId=' + id);
            const res_data = await res.json();
            ctx.commit('UpdateProductAndGroupSubId', res_data);
        }

    },
    mutations: {
        UpdateGroupMarket(state, data) {
            state.m_group_list.rows = data;
            state.sub_product_group_list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].mainProductGroup == false) {
                    state.sub_product_group_list.push(data[i]);
                }
            }
        },
        m_product_group_row_delete(state, index) {
            state.m_group_list.rows.splice(parseInt(index), 1);
        },
        UpdateGroupDetailsMarket(state, data) {
            state.m_group_details_list.rows = data;
        },
        UpdateMainGroupMarket(state, data) {
            console.log(data);
            state.main_group_list = data;
        },
        UpdateSubGroupMainId(state, data) {
            console.log(data);
            state.sub_product_main_id = data;
        },
        UpdateProductAndGroupSubId(state, data) {
            console.log(data);
            state.product_get_sub_id = data;
        },

    },
    getters: {
        m_group_list_m(state) {
            return state.m_group_list;
        },
        m_group_details_list(state) {
            return state.m_group_details_list;
        },
        main_group_list(state) {
            return state.main_group_list;
        },
        sub_product_group_list(state) {
            return state.sub_product_group_list
        },
        sub_product_main_id(state) {
            return state.sub_product_main_id;
        },
        product_get_sub_id(state) {
            return state.product_get_sub_id;
        }



    }
}