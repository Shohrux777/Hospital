export default {
    state: {
        zakaz_product_list: [],
        product_qty: 0,
        product_summ: 0,
    },
    actions: {
        // async fetch_m_Measure(ctx) {
        //     const res = await fetch(ctx.rootState.hostname + '/MarketUnitMeasurments');
        //     const res_data = await res.json();
        //     // console.log(ctx.rootState.hostname);
        //     ctx.commit('UpdateMeasureMarket', res_data);
        // }
    },
    mutations: {
        add_product_order(state, data) {
            console.log(data);
            state.product_qty++;
            state.product_summ += data.price;
            var a = {
                id: null,
                image: '',
                price: null,
                name: '',
                manifacturerName: '',
                specs: '',
                code: '',
                marketUnitMeasurmentId: null,
                qty: 1,
                img: '',
            }
            var s = 0
            var index = 0
            a.id = data.id
            a.image = data.image
            a.price = data.price
            a.name = data.name
            a.manifacturerName = data.manifacturerName
            a.specs = data.specs
            a.marketUnitMeasurmentId = data.marketUnitMeasurmentId
            a.code = data.code
            a.img = data.image
            if (state.zakaz_product_list.length == 0) {
                state.zakaz_product_list.push(a)
            } else {
                for (var i = 0; i < state.zakaz_product_list.length; i++) {
                    if (state.zakaz_product_list[i].id === data.id) {
                        s++;
                        index = i;
                        break;
                    }
                }
                if (s == 0) {
                    state.zakaz_product_list.push(a)
                } else {
                    state.zakaz_product_list[index].qty++;
                }
            }
            console.log(state.zakaz_product_list);
        },
        up_add_product(state, i) {
            state.product_qty++;
            state.zakaz_product_list[i].qty++;
            state.product_summ += state.zakaz_product_list[i].price
        },
        down_minus_product(state, i) {
            state.product_qty--;
            state.zakaz_product_list[i].qty--;
            state.product_summ -= state.zakaz_product_list[i].price
        },
        del_product_item(state, i) {
            state.product_qty -= state.zakaz_product_list[i].qty
            state.product_summ -= state.zakaz_product_list[i].qty * state.zakaz_product_list[i].price
            state.zakaz_product_list.splice(parseInt(i), 1);
        },
        del_all_product(state) {
            state.zakaz_product_list = [];
            state.product_qty = 0;
            state.product_summ = 0;
        }

    },
    getters: {
        zakaz_product_list(state) {
            return state.zakaz_product_list;
        },
        product_qty(state) {
            return state.product_qty;
        },
        product_summ(state) {
            return state.product_summ;
        }

    }
}