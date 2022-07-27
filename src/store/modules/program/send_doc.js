export default {
    state: {
        patient_client_list: [],
        patient_info: {},
        patient_list_doc_id: []
    },
    actions: {
        async fetch_patient_client(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Patients/getPatientLastRegistrationsList');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdatePatient_client_list', res_data);
        },
        async fetch_search_patient(ctx, name) {
            const res = await fetch(ctx.rootState.hostname + '/Patients/searchPatientsByFioList?FIO=' + name);
            const res_data = await res.json();
            ctx.commit('UpdateSearch_patient', res_data);
        },
        async fetch_get_patient_list_Doc_Id(ctx, AuthId) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getDoctorPatientsListByAuthId?AuthId=' + AuthId);
            const res_data = await res.json();
            ctx.commit('UpdatePatient_list', res_data);
        }
    },
    mutations: {
        UpdatePatient_client_list(state, data) {
            state.patient_client_list = data;
        },
        UpdatePatient_list(state, data) {
            console.log(data);
            state.patient_list_doc_id = data;
        },
        UpdateSearch_patient(state, data) {
            state.patient_client_list = data
        },
        // client_row_delete(state, index) {
        //     state.patient_client_list.rows.splice(parseInt(index), 1);
        // }
        choose_patient_client(state, data) {
            console.log('datayuuuuu')
            console.log(data)
            state.patient_info = data;
        },
        update_patient_list(state) {
            state.patient_info = {};
        }

    },
    getters: {
        get_patient_client_list(state) {
            return state.patient_client_list;
        },
        get_patient_info(state) {
            return state.patient_info;
        },
        get_patient_list_doc_id(state) {
            return state.patient_list_doc_id;
        }


    }
}