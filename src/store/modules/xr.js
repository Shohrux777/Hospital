export default {
    state: {
        characterList: {
            rows: [],
            columns: ['name', 'nameForPrint', 'activeStatus'],
            col: []
        },
        xr_list: [],
        xr_listSelect: [],
    },
    actions: {
        async fetchCharacter(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCharacteristics');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateCharacter', res_data);
        }
    },
    mutations: {
        UpdateCharacter(state, data) {
            state.characterList.rows = data;
            state.xr_list = state.characterList.rows;
        },
        onSelect_xrList(state, res_data) {
            state.xr_listSelect.unshift(res_data);

            for (var i = 0; i < state.xr_list.length; i++) {
                if (res_data.id == state.xr_list[i].id) {
                    state.xr_list.splice(i, 1);
                    break;
                }
            }
        },
        onSelect_selected_xr_list(state, res_data) {
            state.xr_list.unshift(res_data);

            for (var i = 0; i < state.xr_listSelect.length; i++) {
                if (res_data.id == state.xr_listSelect[i].id) {
                    state.xr_listSelect.splice(i, 1);
                    break;
                }
            }
        },
        Clear_selected_xr_list(state) {
            state.xr_listSelect = [];
        },
        xr_delete_row(state, index) {
            state.characterList.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        CharacterList(state) {
            return state.characterList;
        },
        AllXr_list(state) {
            return state.xr_list;
        },
        selected_xr_list(state) {
            return state.xr_listSelect;
        }
    }
}