export default {
    state: {
        min_sklad: {
            rows: [],
            columns: ['name', 'department_name', 'activeStatus'],
            col: []
        },
        get_id_sklad: [],
    },
    actions: {
        async fetchSklads(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpWarehouses');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateSklad', res_data);
        },
        async fetch_sklad_list_id(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/ErpWarehouses/GetWarehouseByDepartmentId?DepartmentId=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateSkladId', res_data);
        },
    },
    mutations: {
        updateSklad(state, data) {
            console.log(data)
            state.min_sklad.rows = [];
            for (let i = 0; i < data.length; i++) {
                var a = {
                    name: '',
                    department_name: '',
                    activeStatus: 'false',
                    id: null
                }
                a.name = data[i].name
                a.id = data[i].id
                a.department_name = data[i].department.name
                a.activeStatus = data[i].activeStatus
                state.min_sklad.rows.push(a);
            }
            // state.min_sklad.rows = data;
            console.log('ds')
            console.log(state.min_sklad.rows)
        },
        updateSkladId(state, data) {
            state.get_id_sklad = data
        },
        sklad_row_delete(state, index) {
            state.min_sklad.rows.splice(parseInt(index), 1);
        },
        // updateDept_column(state, data) {
        //     state.min_sklad.col = data;

        //     //status true bolgan ustun nomlarini olish uchun
        //     state.min_sklad.columns = data[0].columns.filter(obj => { return obj.status === true }).map(({ name }) => name);
        // },

    },
    getters: {
        min_sklad(state) {
            return state.min_sklad;
        },
        get_sklad(state) {
            return state.get_id_sklad;
        }

    }
}