export default {
    state: {
        colorGroupList: {
            rows: [],
            columns: ['name', 'code', 'generatedValue', 'activeStatus'],
            col: []
        },
        colorVariantType: {
            rows: [],
            columns: ['name', 'code', 'gCode', 'activeStatus'],
            col: []
        },
        colorVariant: {
            rows: [],
            columns: ['name', 'code', 'gCode', 'activeStatus'],
            col: []
        },
        guscolor: {
            rows: [],
            columns: ['id', 'name', 'activeStatus'],
            col: []
        },
        Erpcolor: {
            rows: [],
            columns: ['id', 'name', 'colorCode', 'dieingCode', 'pantoneCode', 'activeStatus'],
            col: []
        },
        allColorGroup: [],
    },
    actions: {
        async fetchErpColor(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpColors');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateErpColor', res_data);
        },
        async fetchColorGroup(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpColorGroups');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateColorGroup', res_data);
        },
        async fetchColorVariantType(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpColorVariantTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateColorVariantType', res_data);
        },
        async fetchColorVariant(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpColorVariants');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateColorVariant', res_data);
        },
        async fetchColorGus(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpColorGustotas');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateGusColor', res_data);
        }
    },
    mutations: {
        UpdateErpColor(state, data) {
            state.Erpcolor.rows = data;
            console.log('hit')
            console.log(data);
        },
        UpdateGusColor(state, data) {
            state.guscolor.rows = data;
            // state.allColorGroup = state.colorGroupList.rows;
        },
        UpdateColorVariantType(state, data) {
            state.colorVariantType.rows = data;
        },
        UpdateColorVariant(state, data) {
            state.colorVariant.rows = data;
            console.log(data);
        },
        UpdateColorGroup(state, data) {
            state.colorGroupList.rows = data;
            state.allColorGroup = state.colorGroupList.rows;
        },
        color_group_delete_row(state, index) {
            state.colorGroupList.rows.splice(parseInt(index), 1);
        },
        color_variant_type_delete_row(state, index) {
            state.colorVariantType.rows.splice(parseInt(index), 1);
        },
        gus_color_delete_row(state, index) {
            state.guscolor.rows.splice(parseInt(index), 1);
        },
        color_delete_row(state, index) {
            state.Erpcolor.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        ErpcolorList(state) {
            return state.Erpcolor;
        },
        colorGroupList(state) {
            return state.colorGroupList;
        },
        allColorGroup(state) {
            return state.allColorGroup;
        },
        colorVariantType(state) {
            return state.colorVariantType;
        },
        colorVariant(state) {
            return state.colorVariant;
        },
        guscolor(state) {
            return state.guscolor;
        }

    }
}