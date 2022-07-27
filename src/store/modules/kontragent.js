export default {
    state: {

        m_kontragent: {
            rows: [],
            columns: ['name', 'client', 'supplier', 'maincompany', 'phoneNumber', 'address'],
            col: []
        },
        allcompanys: [],
        filialList: [],
        postavchikList: [],

    },
    actions: {
        async fetchKontragets(ctx, { hostname }) {
            const res = await fetch(hostname + '/Companies');
            const res_data = await res.json();
            ctx.commit('updateData', res_data);
        },
        // async fetchKontragent_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/kontragent_column/' + id);
        //     const res_data = await res.json();
        //     // console.log(ctx.rootState.hostname);
        //     ctx.commit('updateKontragent_column', res_data);
        // },
    },
    mutations: {
        updateData(state, data) {
            state.filialList = [];
            state.postavchikList = [];
            state.m_kontragent.rows = data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].maincompany == true) {
                    console.log(data[i]);
                    state.filialList.push(data[i])
                } else {
                    state.postavchikList.push(data[i])
                }
            }
            state.allcompanys = state.m_kontragent.rows
                //console.log(data.[0]);
        },
        kontragent_row_delete(state, index) {
            state.m_kontragent.rows.splice(parseInt(index), 1);
        },
        // updateKontragent_column(state, data) {
        //     state.m_kontragent.col = data;

        //     //status true bolgan ustun nomlarini olish uchun
        //     state.m_kontragent.columns = data[0].columns.filter(obj => { return obj.status === true }).map(({ name }) => name);
        // },
        // update_companylist(state)
        // {
        //   var i;
        //   for( i in state.m_kontragent.rows)
        //   {
        //     state.company_list.push({
        //       id : state.m_kontragent.rows[i].id,
        //       name : state.m_kontragent.rows[i].k_name
        //     });
        //   }
        // }
    },
    getters: {
        allKontragents(state) {

            return state.m_kontragent;
        },
        get_filial_list(state) {
            return state.filialList;
        },
        get_postavchik_list(state) {
            return state.postavchikList;
        },
        allcompanys(state) {
            return state.allcompanys;
        }
    }
}