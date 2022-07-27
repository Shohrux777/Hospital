export default {
    state: {
        unpay_patient_list: [],
        service_pay_list: [],
        summ: 0,
        check_print_list: [],
        check_sum: 0,
        debit_sum:0,
        pay_debit: {
            debit: 0,
            pay: 0,
            card: false,
            patient: '',
            date: '',
        },
        checkInfo: {
            checkid: 0,
            cash: 0,
            card: 0,
        }
    },
    actions: {
        async fetch_unpayed_patient(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getUnpaidPatientList');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateUnpayedPatient', res_data);
        },
        async fetch_service_pay_list(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getPatientPayedServiceByPatientIdListForPayment?PatientId=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateServicePay', res_data);
        }
    },
    mutations: {
        updateDebit(state, data){
            state.debit_sum = data
        },
        UpdatecheckInfo(state, data){
            state.checkInfo.checkId = data.check
            state.checkInfo.cash = data.cash
            state.checkInfo.card = data.card
        },
        UpdatePay_debit(state, data){
            var time = new Date()
            time = time.toISOString().slice(0, 10);
            state.pay_debit.debit = data.debit
            state.pay_debit.pay = data.pay
            state.pay_debit.card = data.card
            state.pay_debit.patient = data.patient
            state.pay_debit.date = time

        },
        UpdateUnpayedPatient(state, data) {
            state.unpay_patient_list = data;
        },
        UpdateServicePay(state, data) {
            console.log(data);
            state.service_pay_list = data;
            state.summ = 0;
            for (let i = 0; i < data.length; i++) {
                state.summ += data[i].summ
            }
        },
        Update_check_data(state, data) {
            state.check_sum = 0;
            for (let i = 0; i < data.length; i++) {
                state.check_sum += data[i].summ
            }
            console.log("check data");
            console.log(data);
            var list = [];
            list = data
            console.log(list);
            state.check_print_list = [];
            for (let i = 0; i < list.length; i++) {
                var check = {
                    ServicePayId: null,
                    serviceName: "",
                    summ: 0,
                    qty: 1,
                }
                check.ServicePayId = list[i].serviceTypeId;
                check.serviceName = list[i].serviceName;
                check.summ = list[i].summ;
                console.log('list[i].serviceTypeId')
                console.log(list[i].serviceTypeId)

                for (let j = i + 1; j < list.length; j++) {
                    if (list[i].serviceTypeId == list[j].serviceTypeId) {
                        check.qty += 1;
                        list.splice(j, 1);
                        j--;
                    }
                }
                state.check_print_list.push(check);
            }
            console.log(state.check_print_list)



            // state.check_print_list = data

        }

    },
    getters: {
        get_unpay_patient_list(state) {
            return state.unpay_patient_list;
        },
        get_service_pay_list(state) {
            return state.service_pay_list;
        },
        summa(state) {
            return state.summ
        },
        get_check_sum(state) {
            return state.check_sum
        },
        get_check_print_list(state) {
            return state.check_print_list;
        },
        debit_sum(state) {
            return state.debit_sum;
        },
        pay_debit(state) {
            return state.pay_debit;
        },
        checkInfo(state) {
            return state.checkInfo;
        },
        

    }
}