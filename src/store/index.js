import Vue from 'vue'
import Vuex from 'vuex'
import productionType from '../store/modules/productionType'
import productType from '../store/modules/productType'
import category from '../store/modules/category'
import izm from '../store/modules/ed_izm'
import xr from '../store/modules/xr'
import xr_tools from '../store/modules/xr_tools'
import planning from '../store/modules/planning'
import currency from '../store/modules/currency'
import kontragent from '../store/modules/kontragent'
import department from './modules/department'
import color from './modules/color'
import buy from './modules/buy'
import process from './modules/process'
import product from './modules/product'
import sklad from './modules/sklad'
import paymentType from './modules/paymentType'
import serviceType from './modules/serviceType'
import suroviy from './modules/suroviy'
import extraWork from './modules/extraWork'
import sort from './modules/sort'
import upakovka from './modules/upakovka'
import position from './modules/program/position'
import rooms from './modules/program/rooms'
import bron from './modules/bron'
import users from './modules/program/users'
import contragent from './modules/program/kontragent'
import province from './modules/program/province'
import district from './modules/program/district'
import client from './modules/program/client'
import m_izm from './modules/market/m_izm'
import m_product from './modules/market/m_product'
import m_group from './modules/market/m_group'
import m_client from './modules/market/m_client'
import m_zakaz from './modules/market/m_zakaz'
import invoice from './modules/market/invoice'
import agent from './modules/market/agent'
import limit from './modules/market/limit'
import calcType from './modules/calcType'
import send_doc from './modules/program/send_doc'
import servicetype from './modules/program/servicetype'
import patient_type from './modules/program/patient_type'
import authorization from './modules/hospital/authorization'
import cashbox from './modules/hospital/cashbox'
import doctor from './modules/hospital/doctor'
import report from './modules/hospital/report'
import servGroup from './modules/hospital/servGroup'
import dragMin from './modules/hospital/dragmin'
import serviceGroupShowDoc from './modules/hospital/serviceGroupShowDoc'
import activeService from './modules/hospital/activeService'



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
         hostname: 'http://62.209.128.51:5003/api',
        // hostname: 'http://62.209.128.51:5003/api',
        // hostname: 'http://localhost:5003/api',
        // hostname: 'http://localhost:5003/api',
        alert: false,
        info_product: false,
        cashPay_card: true,
        patient_name_for_cash: '',
        get_analiz_list: [],
        
        result_list: [],
        shablonLists: [],
        debitResultPatient: [{
        real_qty:0
        }],

          
        shablon_content: {
            name: '',
            title: ''
        },
        sablonSavepatient: {
            content: '',
            title: ''
        },
        patientIdforDoctor: null,


        pagination: {
            page: 0,
            size: 10
        },
        current_list: {
            current_item_count: 10,
            current_page: 1,
            items_count: localStorage.Items_count,
        },
        ochred: {
            doc_name : '',
            client_name: '',
            born_date: '',
            phone_number: ''
        },
        ochredService: [],
        dontShowPagination: true,
    },
    mutations: {
        updatePatientId(state, data){
            state.patientIdforDoctor = data
        },
        updatePatentResults(state, data){
            state.result_list = data
        },
        UpdateshablonLists(state, data){
            // console.log('men uchun ham')
            // console.log(data)
            state.shablonLists = data
        },
        UpdateAnalizList(state,data){
            // console.log('analiz list')
            // console.log(data)
            state.get_analiz_list = data
        },
        Updatedebit(state, data){
            state.debitResultPatient[0].real_qty = data
        },
        updateShablon(state, data){
            state.shablon_content.name = data.name
            state.shablon_content.title = data.title
        },
        updateShablonPatient(state, data){
            state.sablonSavepatient.content = data.content
            state.sablonSavepatient.title = data.title
        },
        update_patient_name(state, data) {
            state.patient_name_for_cash = data
        },
        update_pagination(state, { size, page }) {
            // console.log('hiy girl')
            // console.log(size)
            // console.log(page)
            state.pagination.page = page;
            state.pagination.size = size;
            //   console.log(size)
        },
        update_pagination_first(state, { current_item_count, current_page, items_count }) {
            state.current_list.current_item_count = current_item_count;
            state.current_list.current_page = current_page;
            state.current_list.items_count = items_count;
            localStorage.Items_count = items_count
            state.dontShowPagination = true
        },
        ochred_add_check(state, data){
            state.ochred =  data
        },
        ochred_add_service(state, data){
            state.ochredService =  data
        }
    },
    getters: {
        get_pagination(state) {
            return state.pagination;
        },
        get_current_list(state) {
            return state.current_list
        },
        dontShowPagination(state) {
            return state.dontShowPagination
        },
        result_list(state) {
            return state.result_list
        },
        shablonLists(state) {
            return state.shablonLists
        },
        get_analiz_list(state) {
            return state.get_analiz_list
        },
        debitResultPatient(state) {
            return state.debitResultPatient
        },
        shablon_content(state) {
            return state.shablon_content
        },
        sablonSavepatient(state) {
            return state.sablonSavepatient
        },
        patientIdforDoctor(state) {
            return state.patientIdforDoctor
        },
        get_ochred(state){
            return state.ochred
        },
        get_ochredService(state){
            return state.ochredService
        }
        
    },
    actions: {},
    modules: {
        productionType,
        productType,
        xr,
        xr_tools,
        izm,
        planning,
        category,
        currency,
        kontragent,
        department,
        color,
        buy,
        process,
        product,
        sklad,
        paymentType,
        serviceType,
        suroviy,
        extraWork,
        sort,
        users,
        upakovka,
        position,
        rooms,
        bron,
        contragent,
        district,
        province,
        client,
        m_izm,
        m_group,
        m_product,
        m_client,
        m_zakaz,
        invoice,
        calcType,
        send_doc,
        servicetype,
        patient_type,
        authorization,
        cashbox,
        agent,
        doctor,
        report,
        limit,
        servGroup,
        dragMin,
        serviceGroupShowDoc,
        activeService
    }
})