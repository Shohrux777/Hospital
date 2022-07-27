export default {
    state: {
        productList: {
            rows: [],
            columns: ['name', 'category', 'production', 'measure', 'measure2', 'activeStatus'],
            col: []
        },
        allproduct: [],
    },
    actions: {
        async fetchproductAll(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpProducts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateproductList', res_data);
        }
    },
    mutations: {
        UpdateproductList(state, data) {
            state.productList.rows = [];
            for (let i = 0; i < data.length; i++) {
                var a = {
                    id: null,
                    name: '',
                    category: '',
                    production: '',
                    measure: '',
                    measure2: '',
                    activeStatus: true
                }
                a.name = data[i].name
                a.id = data[i].id
                a.category = data[i].category.name
                a.production = data[i].pruductionType.name
                a.measure = data[i].unitmeasurment.name
                a.measure2 = data[i].unitmeasurment2.name
                a.activeStatus = data[i].activeStatus
                state.productList.rows.push(a);
            }
            console.log('dasddas')
            console.log(state.productList)
                // state.allproduct = state.productList.rows;
        },
        product_delete_row(state, index) {
            state.productList.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        productList(state) {
            return state.productList;
        },
        productAll(state) {
            return state.allproduct;

        }

    }
}