export default {
    state: {
        patient_auth_id: [],
        service_patientId: [],
        service_patientId_for_finish: [],
        get_doctor_list_by_casher: {
            rows: [],
            columns: ['fio', 'phoneNumber', 'activeStatus'],
            col: []
        },
        getPatientInfo: {},
        ServiceListForSelect: [],


        selectPatient: {
            active_bemor : -1,
            name: '',
            bornDate: '',
            address: '',
            patient_id: '',
            phoneNum: '',
            men: false,
            girl:false,
            finishPermission: false,
        }
    },
    actions: {
        async fetch_authId_patient_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getDoctorPatientsListByAuthId?AuthId=' + localStorage.AuthId);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateAuth_patient_list', res_data);
        },
        async fetch_service_patientId(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getPatientPayedServiceByPatientIdListByDoctrAuthId?PatientId=' + id +
                '&doctirAuthId=' + localStorage.AuthId);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateService_patientId', res_data);
        },
        async fetch_service_patientId_for_finish(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getPatientPayedServiceByPatientIdList?PatientId=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateService_patientId_for_finish', res_data);
        },
        async fetch_get_doctor_list(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalRegistrationPermissionDoctors/getDoctorListByRegistratorAuthId?registratorAuthId=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('Update_get_doctor_list', res_data);
        },
    },
    mutations: {
        UpdateAuth_patient_list(state, data) {
            console.log(data)
            state.patient_auth_id = data;
        },
        UpdateService_patientId(state, data) {
            console.log(data)
            state.service_patientId = data;
        },
        uppdateServiceEmpty(state){
            state.service_patientId = [];
        },
        updatePatientInfo(state,data){
            state.getPatientInfo = data;
        },
        UpdateService_patientId_for_finish(state, data) {
            console.log('data')
            console.log(data)
            state.service_patientId_for_finish = data;
        },
        Update_get_doctor_list(state, data) {
            state.get_doctor_list_by_casher.rows = data.map(item => {
                return {
                    id: item.id,
                    DocAuthId: item.doctorAuthId,
                    fio: item.doctorAuth.users.fio,
                    phoneNumber: item.doctorAuth.users.phoneNumber,
                    activeStatus: item.doctorAuth.activeStatus,
                    doctorAuth: item.doctorAuth
                }
            });
            console.log('state.get_doctor_list_by_casher')
            console.log(state.get_doctor_list_by_casher)
        },
        m_client_by_row_delete(state, index) {
            state.get_doctor_list_by_casher.rows.splice(parseInt(index), 1);

        },



        UpdateServiceListForSelect(state,i){
            state.ServiceListForSelect[i].typeof = !state.ServiceListForSelect[i].typeof
            state.ServiceListForSelect.push({ payedDate: '111111111'})
            state.ServiceListForSelect.splice(state.ServiceListForSelect.length-1,1)
        },
        AddServiceListForSelect(state,data){
            state.ServiceListForSelect = data;
            console.log('state.ServiceListForSelect')
            console.log(state.ServiceListForSelect)
            for(let i=0; i<state.ServiceListForSelect.length; i++){
                state.ServiceListForSelect[i].typeof = false;
            }
        },
        DelServiceListForSelect(state,i){
            state.ServiceListForSelect.splice(i, 1)
        },
        ClearServiceListForSelect(state){
            state.ServiceListForSelect = []
        },
        allCheckedServiceList(state){
            for(let i=0; i<state.ServiceListForSelect.length; i++){
                state.ServiceListForSelect[i].typeof = true;
            }
            state.ServiceListForSelect.push({ payedDate: '111111111'})
            state.ServiceListForSelect.splice(state.ServiceListForSelect.length-1,1)
        },
        UpdateselectPatient(state,data){
            console.log('select user info');
            console.log(data);
            state.selectPatient = data
        }

    },
    getters: {
        get_patient_auth_id(state) {
            return state.patient_auth_id;
        },
        get_service_patientId(state) {
            return state.service_patientId;
        },
        get_service_patientId_for_finish(state) {
            return state.service_patientId_for_finish;
        },
        get_doctor_list_by_casher(state) {
            return state.get_doctor_list_by_casher;
        },
        getPatientInfo(state) {
            return state.getPatientInfo;
        },
        selectPatient(state) {
            return state.selectPatient;
        },
        ServiceListForSelect(state){
            return state.ServiceListForSelect
        }

    }
}