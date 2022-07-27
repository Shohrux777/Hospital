export default {
    state: {
        number_into: {
            rows: [],
            columns: ['name', 'activeStatus'],
            col: []
        },
        patient_type: {
            rows: [],
            columns: ['name', 'activeStatus'],
            col: []
        },
    },
    actions: {
        async fetch_number_into(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PatientServiceTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateNumber_into', res_data);
        },
        async fetch_patient_type(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PatientTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatePatient_type', res_data);
        }
    },
    mutations: {
        UpdateNumber_into(state, data) {
            console.log(data)
            state.number_into.rows = data;
        },
        UpdatePatient_type(state, data) {
            console.log(data)
            state.patient_type.rows = data;
        },

        number_into_row_delete(state, index) {
            state.number_into.rows.splice(parseInt(index), 1);
        },
        patient_type_row_delete(state, index) {
            state.patient_type.rows.splice(parseInt(index), 1);
        }

    },
    getters: {
        get_number_into(state) {
            return state.number_into;
        },
        get_patient_type(state) {
            return state.patient_type;
        }

    }
}