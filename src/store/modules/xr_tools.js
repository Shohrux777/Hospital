export default {
    state: {
        xrToolsList: {
            rows: [],
            columns: ['name', 'nameForPrint', 'erpCharacteristicsId', 'activeStatus'],
            col: []
        },
        xrToolsAll: [],
        xrToolsCategory: [],
    },
    actions: {
        async fetchXr_tool(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCharacteristicsDetails');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateXrTools', res_data);
        },
        async fetchXrToolJson(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCategories/' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('GetIdXrTools', res_data);
        }
    },
    mutations: {
        UpdateXrTools(state, data) {
            state.xrToolsList.rows = data;
            state.xrToolsAll = state.xrToolsList.rows;
        },
        GetIdXrTools(state, data) {
            state.xrToolsCategory = []
            for (let i = 0; i < data.categoryDetailList.length; i++) {
                state.xrToolsCategory.push(data.categoryDetailList[i].erpCharacteristics)
            }
        },
        xrTool_delete_row(state, index) {
            state.xrToolsList.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        allXr_tool(state) {
            return state.xrToolsList;
        },
        xrToolsAll(state) {
            return state.xrToolsAll;
        },
        xrToolsCategory(state) {
            return state.xrToolsCategory
        }
    }
}