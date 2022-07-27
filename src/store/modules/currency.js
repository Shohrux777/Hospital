export default {
    state: {
        currencyList: [],
    },
    actions: {
        async fetchCurrency(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ErpCurrencies');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('UpdateCurrency', res_data);
        }
    },
    mutations: {
        UpdateCurrency(state, data) {
            state.currencyList = [];
            for (let i = data.length - 4; i < data.length; i++) {
                state.currencyList.push(data[i]);
            }
            // state.currencyList = data;
        }

    },
    getters: {
        CurrencyList(state) {
            return state.currencyList;
        }
    }
}