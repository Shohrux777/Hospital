export default {
    state: {
        categoryList: {
            rows: [],
            columns: ['name', 'nameForPrint', 'erpProductTypeId', 'activeStatus'],
            col: []
        },
        allcategory: [],
    },
    actions: {
        async fetchCategoryAll(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCategories');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatecategoryList', res_data);
        }
    },
    mutations: {
        UpdatecategoryList(state, data) {
            state.categoryList.rows = data;
            state.allcategory = data;
        }

    },
    getters: {
        categoryGetList(state) {
            return state.categoryList;
        },
        categoryAll(state) {
            return state.allcategory;

        }

    }
}