export default {
    state: {
        report_by_data_contragent: {
            rows: [],
            columns: ['contragent_name', 'patient_name', 'service_name', 'service_price', 'payDate', 'payed', 'finish'],
            col: []
        },
        report_by_data_time: {
            rows: [],
            columns: ['contragent_name', 'patient_name', 'service_name', 'service_price', 'paymentInCard', 'paymentInCash', 'payed', 'finish'],
            col: []
        },
        report_by_data: [],
        report_qty_summ: {
            qty: 0,
            summ: 0,
        },
        report_by_time_card_cash: {
            card: 0,
            cash: 0,
            qty: 0,
            summ: 0
        },
        report_by_cont_card_cash: {
            card: 0,
            cash: 0,
        },
        daily_report_list: []
    },
    actions: {
        async fetch_report_by_data_cont(ctx, a) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getPaymentsListByContragentAndDateTime?ContragentId=' + a.contId +
                '&beginDate=' + a.time1 + '&endDate=' + a.time2);
            const res_data = await res.json();
            ctx.commit('Updatereport_by_data_contragent', res_data);
        },
        async fetch_report_by_data_time(ctx, a) {
            const res = await fetch(ctx.rootState.hostname + '/Payments/getPaymentsListByContragentAndDateTime?ContragentId=' + a.contId +
                '&beginDate=' + a.time1 + '&endDate=' + a.time2);
            const res_data = await res.json();
            ctx.commit('Updatereport_by_data_time', res_data);
        },
        async fetch_report_by_data(ctx, a) {
            const res = await fetch(ctx.rootState.hostname + '/HospitalContragentDebitPaymentReports/getContragentPaymentsByDate?begindate=' + a.time1 + '&endDate=' + a.time2);
            const res_data = await res.json();
            ctx.commit('Updatereport_by_data', res_data);
        },

    },
    mutations: {
        Updatereport_by_data(state, data) {
            console.log('data');
            console.log(data);
            state.report_by_data = data;
        },
        Updatereport_by_data_contragent(state, data) {
            state.report_qty_summ.summ = data.reduce((total, item) => {
                return total + item.summ
            }, 0)
            state.report_by_cont_card_cash.card = data.reduce((total, item) => {
                return total + item.paymentInCard
            }, 0)
            state.report_by_cont_card_cash.cash = data.reduce((total, item) => {
                return total + item.paymentInCash
            }, 0)
            state.report_qty_summ.qty = data.length;
            console.log(data)
            state.report_by_data_contragent.rows = data.map(item => {
                return {
                    id: item.id,
                    contragent_name: item.contragent.name,
                    patient_name: item.patients.fio,
                    service_name: item.serviceName,
                    service_price: item.summ,
                    payDate: item.payedDate.slice(0, 10),
                    payed: item.finishPayment,
                    paymentInCard: item.paymentInCard,
                    paymentInCash: item.paymentInCash,
                    finish: item.finish,
                    service_Group: item.serviceType.hospitalServiceTypeGroup.name
                }
            });
        },
        dibet_delite_cont(state, index) {
            state.report_by_data.splice(parseInt(index), 1);
        },
        Updatereport_by_data_time(state, data) {
            // console.log('fetch get')
            // console.log(data)
            state.report_by_time_card_cash.card = data.reduce((total, item) => {
                return total + item.paymentInCard
            }, 0)
            state.report_by_time_card_cash.cash = data.reduce((total, item) => {
                return total + item.paymentInCash
            }, 0)
            state.report_by_time_card_cash.summ = data.reduce((total, item) => {
                return total + item.summ
            }, 0)
            state.report_by_time_card_cash.qty = data.length;
            // console.log(state.report_by_time_card_cash)
            state.report_by_data_time.rows = data.map(item => {
                return {
                    id: item.id,
                    contragent_name: item.contragent.name,
                    patient_name: item.patients.fio,
                    service_name: item.serviceName,
                    service_price: item.summ,
                    paymentInCard: item.paymentInCard,
                    paymentInCash: item.paymentInCash,
                    payed: item.finishPayment,
                    finish: item.finish,
                    serviceGroup: item.serviceType.hospitalServiceTypeGroup.name,
                    regisdate: item.registratedDate
                }
            });
            var list = [];
            list = data
            console.log(list)
            state.daily_report_list = [];
            for (let i = 0; i < list.length; i++) {
                var daily = {
                    service_group: '',
                    cash: 0,
                    card: 0,
                    date: null,
                    qty: 0,
                }
                if (list[i].finishPayment == true) {
                    daily.qty++;
                }
                daily.service_group = list[i].serviceType.hospitalServiceTypeGroup.name;
                daily.cash = list[i].paymentInCash;
                daily.card = list[i].paymentInCard;
                daily.date = list[i].registratedDate.slice(0, 10);
                console.log('list[i].serviceTypeId')
                console.log(daily.service_group)

                for (let j = i + 1; j < list.length; j++) {
                    if (daily.service_group == list[j].serviceType.hospitalServiceTypeGroup.name) {
                        if (list[j].finishPayment == true) {
                            daily.qty++;
                        }
                        daily.cash += list[j].paymentInCash;
                        daily.card += list[j].paymentInCard;
                        list.splice(j, 1);
                        j--;
                    }
                }
                state.daily_report_list.push(daily);
            }
            // console.log(state.daily_report_list)
        },
    },
    getters: {
        get_report_by_data_contragent(state) {
            return state.report_by_data_contragent;
        },
        get_report_by_data_time(state) {
            return state.report_by_data_time;
        },
        get_report_qty_summ(state) {
            return state.report_qty_summ;
        },
        get_report_by_time_card_cash(state) {
            return state.report_by_time_card_cash;
        },
        get_report_by_cont_card_cash(state) {
            return state.report_by_cont_card_cash;
        },
        get_report_by_data(state) {
            return state.report_by_data;
        },
        get_daily_report_list(state) {
            return state.daily_report_list;
        }


    }
}