export default {
    state: {
        client_list: {
            rows: [],
            columns: ['fio', 'passportSerialNumber', 'address', 'phoneNumber', 'activeStatus'],
            col: []
        },
        patient_list_last: {
            rows: [],
            columns: ['fio', 'passportSerialNumber','bornDate', 'phoneNumber','registratedDate', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_client(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Patients');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateClient_list', res_data);
        },
        async fetch_patient_list_last(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Patients/getPatientLastRegistrationsList');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatePatient__list_last', res_data);
        },
        async fetch_search_patient_name(ctx, name) {
            const res = await fetch(ctx.rootState.hostname + '/Patients/searchPatientsByFioList?FIO=' + name);
            const res_data = await res.json();
            ctx.commit('UpdateSearch_patient_name', res_data);
        },
    },
    mutations: {
        UpdateClient_list(state, data) {
            console.log('data ekan')
            console.log(data)
            state.client_list.rows = data;
        },
        UpdatePatient__list_last(state, data) {
            console.log('dasd asd asdas ')
            console.log(data)
            state.patient_list_last.rows = data;
        },
        UpdateSearch_patient_name(state, data) {
            console.log(data)
            state.patient_list_last.rows = data;
        },
        client_row_delete(state, index) {
            state.client_list.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_client_list(state) {
            return state.client_list;
        },
        get_patient_list_last(state) {
            return state.patient_list_last;
        },

    }
}