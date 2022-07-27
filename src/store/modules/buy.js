export default {
    state: {
        buy_list: {
            rows: [],
            columns: ['dateTime', 'sklad_name', 'filial_name', 'qty', 'summ', 'client_name', 'erpServiceTypeId', 'currency_name', 'department_name'],
            col: []
        },
        all_buy_list: [],
    },
    actions: {
        async fetch_buy_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpInvoices');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateBuy_list', res_data);
        }
    },
    mutations: {
        UpdateBuy_list(state, data) {
            console.log(data)
            state.buy_list.rows = []
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].invoiceItems.length; j++) {
                    var a = {
                        dateTime: '',
                        sklad: {},
                        sklad_id: null,
                        sklad_name: '',
                        filial: {},
                        filial_id: null,
                        filial_name: '',
                        department: {},
                        department_id: null,
                        department_name: '',
                        currency: {},
                        currency_name: '',
                        invoiceItems: {},
                        qty: null,
                        summ: 0,
                        erpServiceTypeId: null,
                        invcompany: {},
                        client_name: '',

                    }
                    a.dateTime = data[i].dateTime.slice(0, 19);
                    a.sklad = data[i].mainWarehouse;
                    a.sklad_id = data[i].mainWarehouseId;
                    a.sklad_name = data[i].mainWarehouse.name
                    a.filial = data[i].mainCompany
                    a.filial_id = data[i].mainCompanyId
                    a.filial_name = data[i].mainCompany.name
                    a.department = data[i].mainDepartment
                    a.department_id = data[i].mainDepartmentId
                    a.department_name = data[i].mainDepartment.name
                    a.currency = data[i].currency
                    a.currency_name = data[i].currency.name
                    a.invoiceItems = data[i].invoiceItems
                    a.qty = data[i].invoiceItems[j].qty
                    a.summ = data[i].invoiceItems[j].summ
                    a.erpServiceTypeId = data[i].erpServiceTypeId
                    a.invcompany = data[i].invcompany
                    a.client_name = data[i].invcompany.name

                    state.buy_list.rows.push(a);
                }

            }
            console.log(state.buy_list)
            state.all_buy_list = data;
        }

    },
    getters: {
        get_buy_list(state) {
            return state.buy_list;
        },
        get_buy_all_list(state) {
            return state.all_buy_list;

        }

    }
}