import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import loader from './components/loader.vue'
import circleBtn from './components/small/circle_btn.vue'
import alert from "./components/alert.vue";
import Toast from "./components/alertNew.vue";
import AlertError from "./components/AlertError.vue";
import massage_box from "./components/massage_box.vue";
import Vuelidate from 'vuelidate'
import VueApexCharts from 'vue-apexcharts'
import VMdDateRangePicker from "v-md-date-range-picker";




Vue.component('apexchart', VueApexCharts)
Vue.component('loader', loader)
Vue.component('circle-btn', circleBtn)
Vue.component('Toast', Toast)
Vue.component('AlertError', AlertError)
Vue.component('alert', alert)
Vue.component('massage_box', massage_box)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VMdDateRangePicker);
Vue.use(VueApexCharts)


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')