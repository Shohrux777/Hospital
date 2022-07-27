export default {
    state: {
        m_department: {
            rows: [],
            columns: ['name', 'company_name', 'activeStatus'],
            col: []
        },
        departId_comp: [],
        departList: [],
    },
    actions: {
        async fetchDepartments(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Departments');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDepartment', res_data);
        },
        // async fetchDept_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/dept_column/' + id);
        //     const res_data = await res.json();
        //     // console.log(ctx.rootState.hostname);
        //     ctx.commit('updateDept_column', res_data);
        // },
    },
    mutations: {
        updateDepartment(state, data) {
            console.log(data)
            state.departList = data;
            state.m_department.rows = [];
            for (let i = 0; i < data.length; i++) {
                var a = {
                    name: '',
                    company_name: '',
                    activeStatus: 'false',
                    id: null,
                    comp_id: null
                }
                a.name = data[i].name
                a.id = data[i].id
                a.comp_id = data[i].company.id
                a.company_name = data[i].company.name
                a.activeStatus = data[i].activeStatus
                state.m_department.rows.push(a);
            }
            // state.m_department.rows = data;
            console.log('ds')
            console.log(state.m_department.rows)
        },
        get_deparment_id_comp(state, index) {
            state.departId_comp = [];
            for (let i = 0; i < state.departList.length; i++) {
                if (state.departList[i].companyId == index) {
                    state.departId_comp.push(state.departList[i])
                }
            }

        },
        dept_row_delete(state, index) {
            state.m_department.rows.splice(parseInt(index), 1);
        },
        updateDept_column(state, data) {
            state.m_department.col = data;

            //status true bolgan ustun nomlarini olish uchun
            state.m_department.columns = data[0].columns.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allDepartments(state) {
            return state.m_department;
        },
        get_companylist(state) {
            return state.company_list;
        },
        getDepartId(state) {
            return state.departId_comp;
        }


    }
}