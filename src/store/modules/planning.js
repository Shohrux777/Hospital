export default {
    state: {
        // characterList: {
        //     rows: [],
        //     columns: ['name', 'nameForPrint', 'activeStatus'],
        //     col: []
        // },
        plan_list: [],
        plan_listSelect: [],
    },
    actions: {
        async fetchPlanning(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpPlanningTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatePlannig', res_data);
        }
    },
    mutations: {
        UpdatePlannig(state, data) {
            // state.characterList.rows = data;
            state.plan_list = data;
        },
        onSelect_pTList(state, res_data) {
            state.plan_listSelect.unshift(res_data);

            for (var i = 0; i < state.plan_list.length; i++) {
                if (res_data.id == state.plan_list[i].id) {
                    state.plan_list.splice(i, 1);
                    break;
                }
            }
        },
        onSelect_selected_pTList(state, res_data) {
            state.plan_list.unshift(res_data);

            for (var i = 0; i < state.plan_listSelect.length; i++) {
                if (res_data.id == state.plan_listSelect[i].id) {
                    state.plan_listSelect.splice(i, 1);
                    break;
                }
            }
        },
        Clear_selected_plan_list(state) {
            state.plan_listSelect = [];
        }

    },
    getters: {
        // CharacterList(state) {
        //     return state.characterList;
        // },
        Allplan_list(state) {
            return state.plan_list;
        },
        selected_plan_list(state) {
            return state.plan_listSelect;
        }
    }
}