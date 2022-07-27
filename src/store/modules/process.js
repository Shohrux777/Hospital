export default {
    state: {
        processList: {
            rows: [],
            columns: ['id', 'name', 'activeStatus'],
            col: []
        },
        allprocess: [],
    },
    actions: {
        async fetchprocessAll(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpProccesses');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateprocessList', res_data);
        }
    },
    mutations: {
        UpdateprocessList(state, data) {
            state.processList.rows = data;
            state.allprocess = state.processList.rows;
        },
        main_process_delete_row(state, index) {
            state.processList.rows.splice(parseInt(index), 1);
        }


    },
    getters: {
        processGetList(state) {
            return state.processList;
        },
        processAll(state) {
            return state.allprocess;

        }

    }
}