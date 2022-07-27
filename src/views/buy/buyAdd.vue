<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/buy">
        <a class="ml-2 mr-2 p-3" :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Purchase_Invoice')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->

    <!-- <loader v-if="loading"/> -->
    <!-- v-else -->
    <main style="border: 0.1px solid white; border-radius: 7px;" class="shadow">
      <form @submit.prevent="submit" >
        <div class="container-fluid ">
          <div class="container-fluid mt-3  shadow bgColorBack p-4" style=" border-radius: 7px;">
            <mdb-row class="">
              
              <mdb-col col="4">
                <erpSelect
                  :options="payment_type_list.rows" :btnshow="true"  @btn_add="paymentAddBtn = true"
                  @select="selectpayment_type"
                  :selected="payment_type.selected"
                  :label="$t('payment_type')"
                />
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                  :options="service_type_list" :btnshow="true" @btn_add="serviceTypeAddBtn = true"
                  @select="selectservice_type"
                  :selected="service_type.selected"
                  :label="$t('Service_type')"
                />
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                  :options="get_postavchik_list"
                  @btn_add="shown = true"
                  @select="selectkontragent"
                  :selected="kont_name"
                  :label="$t('filial')"
                />
                <small v-if="$v.kont_name.$dirty && kont_id == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
              
            </mdb-row>

            <!-- kontragent + company list -->
            <mdb-row>
              
              <mdb-col col="4">
                <erpSelect
                  :options="get_filial_list" :btnshow="false"
                  @select="selectcompany"
                  :selected="company_name"
                  :label="$t('Branch_of_the_Company')"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text" >
                  {{'select_item'}}
                </small>
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                  :options="getDepartId" :btnshow="false"
                  @select="selectdept"
                  :selected="dept_name"
                  :label="$t('dept')"
                />
                <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                  :options="get_sklad" :btnshow="false"
                  @select="selectsklad"
                  :selected="sklad_name"
                  :label="$t('sklad')"
                />
                <small v-if="$v.sklad_name.$dirty && sklad_id == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
            </mdb-row>

            <mdb-row>
              <mdb-col col="2">
                <erpSelect
                  :options="CurrencyList" :btnshow="false"
                  @select="selectvaluta"
                  :selected="valuta.selected"
                  :label="$t('menu_currency')"
                />

              </mdb-col>
              <mdb-col col="2">
                <mdb-input class="text-success" disabled   v-model="kurs_valut" size="sm" :label="$t('kurs_valyut')" icon="dollar-sign" type="number" />
                <small class="invalid-text"  v-if="$v.kurs_valut.$dirty && !$v.kurs_valut.required" >
                  {{$t('invalid_Currency')}}
                </small>
              </mdb-col>

              <mdb-col col="3">

                <date-picker disabled class="timepiker " v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
              </mdb-col>
              
                
              <mdb-col col="4">
                <erpSelect
                  :options="calc_type_list.rows" :btnshow="false"
                  @select="selectCalcType"
                  :selected="calc_type_name"
                  :label="$t('calc_type')"
                />
                <small v-if="$v.calc_type_name.$dirty && calc_type_id == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
              <mdb-col col="4"  v-if="showfor_print">
                <!-- <erpSelect

                  :options="calc_type_list" :btnshow="false"
                  @select="selectcalc_type"
                  :selected="calc_type.selected"
                  :label="$t('calc_type')"
                /> -->
                <date-picker disabled hidden class="timepiker " v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>

               
              </mdb-col>

            </mdb-row>

          </div>
          <!-- style="height : 400px"  -->
          <div class="d_table mt-4 p-1" style="position: relative;">
            <div class="d-inline">
                  <mdb-btn slot="reference" class="mr-1" outline="primary"
                    darkWaves tag="a" floating  icon="filter"  size="sm" >{{$t('Filter')}}</mdb-btn>

                  <mdb-btn class="mr-1" outline="primary" darkWaves tag="a" floating @click="showcheck_form=true"
                    icon="table"  size="sm">{{$t('editCol_columns')}}</mdb-btn>
            </div>
            <mdb-tbl class="fixed-column ">
              <mdb-tbl-head>
                <tr>
                  <td ></td>
                  <td v-bind:style="{ 'min-width': datasource.filtered_data[Index].length + 'px' }"  v-for="(column,Index) in datasource.columns" :key="Index" >
                    <span >{{$t(column)}}</span>
                  </td>

                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" >
                  <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                  @click="datasource.rows.splice( parseInt(rowIndex), 1)"></i></th>
                  <th v-if="datasource.data[0].status">
                    <lineSelect
                        :options="productList.rows" :row_index="rowIndex"
                        :searchshow="true"
                        @select="selectproduct"
                        :selected="row.product_name"
                        :label="$t('product')"
                    />

                    <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                    v-if="($v.datasource.rows.$each[rowIndex].erpProductId.$dirty && !$v.datasource.rows.$each[rowIndex].erpProductId.minValue)" >
                      {{$t('Select_product')}}
                    </small>
                  </th>
                  <th v-if="datasource.data[1].status">
                    <input v-model="row.qty" type="number" class="form-control form-control-sm">
                    <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                    v-if="($v.datasource.rows.$each[rowIndex].qty.$dirty && !$v.datasource.rows.$each[rowIndex].qty.minValue) ||
                    ($v.datasource.rows.$each[rowIndex].qty.$dirty && !$v.datasource.rows.$each[rowIndex].qty.required)" >
                      {{$t('minValue')}}
                    </small>

                  </th>


                  <th v-if="datasource.data[2].status"> <input v-model="row.ostatka" type="text" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[3].status"> <input v-model="row.ed_izm" type="text" class="form-control form-control-sm" disabled> </th>

                  <th v-if="datasource.data[4].status"> <input v-model="row.price" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[5].status"> <input v-model="row.fein" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[6].status"> <input v-model="row.pus" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[7].status"> <input v-model="row.shirina" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[8].status"> <input v-model="row.gramm" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[9].status"> <input v-model="row.metraj" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[10].status"> <input v-model="row.qty2" type="number" class="form-control form-control-sm"> </th>

                  <th v-if="datasource.data[11].status">
                    <lineSelect
                        :options="ErpcolorList.rows" :row_index="rowIndex"
                        @select="selectColor"
                        :selected="row.color_name"
                        :label="$t('menu_color')"
                    />
                  </th>
                  <th v-if="datasource.data[12].status"><lineSelect
                        :options="colorVariant.rows" :row_index="rowIndex"
                        @select="selectColor_variant"
                        :selected="row.color_variant_name"
                        :label="$t('Color_option')"
                      />
                  </th>
                  <th v-if="datasource.data[13].status"><lineSelect
                        :options="guscolor.rows" :row_index="rowIndex"
                        @select="selectguscolor"
                        :selected="row.gus_color_name"
                        :label="$t('menu_color_density')"
                      />
                  </th>
                  <th v-if="datasource.data[14].status"><lineSelect
                        :options="suroviy_vid_list" :row_index="rowIndex"
                        @select="selectsuroviy_vid"
                        :selected="row.suroviy_vid_name"
                        :label="$t('suroviy_vid')"
                      />
                  </th>

                  <th v-if="datasource.data[15].status"> <input v-model="row.note" type="text" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[16].status"><lineSelect
                        :options="processGetList.rows" :row_index="rowIndex"
                        @select="selectmain_proccess"
                        :selected="row.main_proccess_name"
                        :label="$t('Process')"
                      />
                  </th>

                  <th v-if="datasource.data[17].status"><lineSelect
                        :options="extra_work_list" :row_index="rowIndex"
                        @select="select_extra_work"
                        :selected="row.dop_work_name"
                        :label="$t('extra_work')"
                      />
                  </th>
                  <th v-if="datasource.data[18].status">
                   <input v-model="row.brack" type="number" class="form-control form-control-sm"> 

                    <!-- <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" :checked="row.brack" >
                      <label class="custom-control-label" @click="row.brack = !row.brack"></label>
                    </div> -->
                  </th>
                   <th v-if="datasource.data[19].status"><lineSelect
                        :options="sort_list" :row_index="rowIndex"
                        @select="select_sort"
                        :selected="row.sort_name"
                        :label="$t('Variety')"
                      />
                  </th>
                  <th v-if="datasource.data[20].status">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input"
                      :checked="row.ugar" >
                      <label class="custom-control-label" @click="row.ugar = !row.ugar"></label>
                    </div>
                  </th>
                  <th v-if="datasource.data[21].status"> <input v-model="row.brutto" type="number" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[22].status"> <input v-model="row.netto" type="number" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[23].status"><lineSelect
                        :options="upakovka_list" :row_index="rowIndex"
                        @select="select_upakovka"
                        :selected="row.upakovka_name"
                        :label="$t('upakovka')"
                      />
                  </th>
                </tr >
              </mdb-tbl-body>

            </mdb-tbl>
            <circle-btn style="position: absolute; bottom: -21px; left: -20px;" class="m-2 gradint" @on_click="addRow"/>
          </div>

          <hr class="mt-5"/>
          <div class="d-flex justify-content-end">
            <mdb-btn class="" color="success" m="b4"  type="submit"
              p="r4 l4 t2 b2">
            <mdb-icon type="submit" icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
          </div>

        </div>
      </form>

      <!-- <mdb-modal :show="shown"  @close="shown = false" info>
        <mdb-modal-header>
          <mdb-modal-title>{{$t('New_company')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
              <compAdd :notFull="false" @submit_success="compSubmit_success"/>
        </mdb-modal-body>
      </mdb-modal> -->
      
      <!-- <mdb-modal :show="paymentAddBtn"  @close="paymentAddBtn = false" info>
        <mdb-modal-header>
          <mdb-modal-title>{{$t('New_paymentType')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
              <compAdd :notFull="false" @submit_success="compSubmit_success"/>
        </mdb-modal-body>
      </mdb-modal> -->

      <mdb-modal  :show="paymentAddBtn"  @close="paymentAddBtn = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight: bold">{{$t('Title_paymentType')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <paymentAdd :notFull="false" @submit_success="paymentType_success"/>
        </mdb-modal-body>
      </mdb-modal>

      <mdb-modal  :show="serviceTypeAddBtn"  @close="serviceTypeAddBtn = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight: bold">{{$t('Title_serviceType')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <serviceType :notFull="false" @submit_success="serviceType_success"/>
        </mdb-modal-body>
      </mdb-modal>
      
      <mdb-modal :show="shown"  @close="shown = false" info>
        <mdb-modal-header>
          <mdb-modal-title>{{$t('New_company')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
              <compAdd :notFull="false" @submit_success="compSubmit_success"/>
        </mdb-modal-body>
      </mdb-modal>

      <div>
        <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
      <edit_col
        v-show="showcheck_form"
        :option="datasource"
        @select="update_column"
      />
      <Toast ref="message"></Toast>

      </div>


    </main>
  </div>
</template>

<script>
import compAdd from "../../components/wnd_for_add/company_add";
import paymentAdd from "../../components/wnd_for_add/payment_add";
import serviceType from "../../components/wnd_for_add/serviceType_add";
import edit_col from "../../components/editColumn";
import erpSelect from "../../components/erpSelect.vue";
import lineSelect from "../../components/lineSelect.vue";
import DatePicker from 'vue2-datepicker';
import { required,minValue } from 'vuelidate/lib/validators'

import 'vue2-datepicker/index.css';
import {mapActions, mapGetters, mapMutations} from 'vuex';
  import {
    mdbNavbar,mdbTbl, mdbTblHead, mdbTblBody,
    mdbCardTitle,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";


  export default {

    components: {
      mdbNavbar,DatePicker,
      mdbCardTitle,compAdd,
      mdbInput,mdbTbl, mdbTblHead, mdbTblBody,
      mdbIcon,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbBtn,lineSelect,
      mdbRow,edit_col,
      mdbCol,erpSelect,paymentAdd,serviceType
    },
    validations: {
      calc_type_name: {required},
      company_name : {required},
      kont_name : {required},
      dept_name : {required},
      sklad_name : {required},
      kurs_valut : {required},
      datasource : {
        rows : {
          $each : {
            qty : { minValue : minValue(1), required},
            erpProductId : {minValue : minValue(1)}
          }

        }
      }
    },
    

    data(){
      return {

        modal_info : '',
        modal_status: false,
        shown : false,
        paymentAddBtn: false,
        serviceTypeAddBtn: false,
        showfor_print : false,
        time1: new Date(Date.now()),
        loading : true,
        
        calc_type_id: null,
        calc_type_name: '',
        payment_type : { selected: 'Наличные', selectedId:1,},
        service_type : { selected: 'Реализация', selectedId:1,},
        calc_type :{ selected: ' ',selectedId:1,},
        showcheck_form: false,

        company_name : ' ', company_id : null,
        kont_name : '', kont_id : null,
        valuta :{ selected: ' ', selectedId:null,},
        kurs_valut : '',
        dept_id : null, dept_name : ' ',
        sklad_id : null, sklad_name : ' ',
        selected_row_index :-1,
        user_id : 1,
        dataItems: [],
        datasource :
        {
          rows :[],
          columns: ['Продукт', 'Кол-во', 'Остаток', 'Ед. изм.','Цена', 'Фейн','Пус','Ширина','Граммаж','Метрадж','Кол-во2','Цвет','Вариант цвета','Густота цвета', 'Суровый вид','Примечание','Основной процесс','Доп. работа','Дефект','Сорт','Угар','Брутто','Нетто','Упаковка'],
          col : [],
          data : [
          ],
          filtered_data:[
            {
              length : 250
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            },
            {
              length : 150
            }
          ]
        }
      }
    },
    async mounted (){
        // await this.update_column(false);
        for(let i=0; i<=23; i++){
          var a = {
            status: true,
          }
          this.datasource.data.push(a);
        }
        await this.fetchKontragets({ hostname: this.$store.state.hostname});
        await this.fetchCurrency();

        if(this.CurrencyList.length > 0)
        {
          console.log('hello')
          this.valuta.selectedId = this.CurrencyList[0].id;
          this.valuta.selected = this.CurrencyList[0].name;
          this.kurs_valut = this.CurrencyList[0].forbuy;
        }

        if(this.get_filial_list.length > 0){
          // <--- Get main_company first --->
          this.company_name = this.get_filial_list[0].name;
          this.company_id = this.get_filial_list[0].id;
          // <--- Get main_company first --->

          // <--- Get Otdel first --->
          await this.fetchDepartments();
          this.get_deparment_id_comp(this.company_id )
          this.dept_name = this.getDepartId[0].name;
          this.dept_id = this.getDepartId[0].id;
          // <--- Get Otdel first --->

          // <--- Get sklad first --->
          await this.fetch_sklad_list_id(this.getDepartId[0].id);
          this.sklad_name = this.get_sklad[0].name;
          this.sklad_id = this.get_sklad[0].id;
          // <--- Get sklad first --->


        }
        // await this.fetch_companylist();
        // if(this.allcompanys.length > 0)
        // {
        //   this.company_name = this.allcompanys[0].name;
        //   this.company_id = this.allcompanys[0].id;
        //   await this.fetch_dept_list_id(this.company_id);
        //     if(this.dept_list.length > 0)
        //     {
        //       this.dept_name = this.dept_list[0].name;
        //       this.dept_id = this.dept_list[0].id;

        //       await this.fetch_sklad_list_id(this.dept_id);
        //       if(this.sklad_list.length > 0)
        //       {
        //         this.sklad_name = this.sklad_list[0].name;
        //         this.sklad_id = this.sklad_list[0].id;
        //       }
        //     }
        // }
        await this.fetchpaymentTypeAll();   
        if(this.payment_type_list.rows.length > 0){
          this.payment_type.selected = this.payment_type_list.rows[0].name
          this.payment_type.selectedId = this.payment_type_list.rows[0].id
        }

        await this.fetch_service_type_list();
         if(this.service_type_list.length > 0){
          this.service_type.selected = this.service_type_list[0].name
          this.service_type.selectedId = this.service_type_list[0].id
        }
        await this.fetchproductAll();

        this.fetchDepartments();
        this.fetch_calc_type_list();
        this.fetchErpColor();
        this.fetchColorVariant()
        this.fetchColorGus();
        this.fetch_suroviy_vid_list();
        this.fetch_extra_work_list();
        this.fetchprocessAll();
        this.fetch_upakovka_list();
        this.fetch_sort_list();
        await this.fetch_invoice_type_list();

        this.loading = false;
     },
    computed: mapGetters(['get_filial_list','get_postavchik_list','getDepartId','get_sklad',
      'payment_type_list','service_type_list','calc_type_list','productList',
      'ErpcolorList','colorVariant','guscolor', 'suroviy_vid_list','processGetList','extra_work_list',
      'upakovka_list','sort_list','CurrencyList','invoice_type_list']),
    methods: {
      ...mapActions(['fetch_companylist','fetchKontragets','fetch_invoice_type_list','fetchDepartments','fetch_sklad_list_id',
      'fetchpaymentTypeAll','fetch_service_type_list','fetch_calc_type_list','fetchproductAll',
      'fetchErpColor', 'fetchColorVariant', 'fetchColorGus','fetch_suroviy_vid_list','fetchprocessAll',
      'fetch_extra_work_list','fetch_upakovka_list', 'fetch_sort_list', 'fetchCurrency']),
      ...mapMutations(['get_deparment_id_comp']),
      
      // --->  Add Rows Product  <---
      addRow() {
        console.log('dddasd')
        
       // console.log("test : "  + this.datasource.rows[0].product.name);
            this.datasource.rows.push({
            erpProductId : null,
            product_name : '',
            qty : null,
            // ostatka : 0,
            ed_izm : '',
            price : 0,
            fein : '',
            pus : '', 
            shirina : '',
            gramm : '',
            metraj : '',
            qty2 : '',
            erpColorId : null,
            color_name : '',
            erpColorVariantId : null,
            calc_type_id: null,
            calc_type_name: '',
            color_variant_name : '',
            erpColorGustotaId : null,
            gus_color_name : '',
            erpSuroviyVidId : null,
            suroviy_vid_name : '',
            note : '',
            erpProccessId : null,
            main_proccess_name : '',
            erpExtraWorkId : null,
            dop_work_name : '',
            brack : 0,
            erpSortId : null,
            sort_name : '',
            ugar : false,
            brutto : 0,
            netto : 0,
            erpUpakopkaId : null,
            upakovka_name : '',
          })
          
            //appData.updated()
        },
      // --->  Add Rows Product  <---



      // --->  Add Component function  <---
        paymentType_success()
      {
          this.paymentAddBtn = false
          this.$refs.message.success('Added_successfully')

      },
       serviceType_success()
      {
          this.$refs.message.success('Added_successfully')
          this.serviceTypeAddBtn = false
      },
      compSubmit_success()
      {
          this.shown = false
          this.fetchKontragets({ hostname: this.$store.state.hostname})
      },
      // --->  Add Component function  <---



      // --->  Header Select  <---
      selectservice_type(option)
      {
        console.log(option.id)
        this.service_type.selected = option.name;
        this.service_type.selectedId = option.id;
        // console.log("son " + son);
      },
      selectpayment_type(option)
      {
        this.payment_type.selected = option.name;
        console.log(option.id)
        this.payment_type.selectedId = option.id;
      },
      selectcalc_type(option)
      {
        console.log(option.id)
        this.calc_type.selected = option.name;  
        this.calc_type.selectedId = option.id;
      },
      selectcompany(option)
      {
        console.log(option.id)
        // console.log('sdfsdfsdfsdfsdfsdfsdf')
        this.company_name = option.name;
        this.company_id = option.id;
        this.fetchDepartments();
        this.get_deparment_id_comp(option.id)
        // console.log('ds')
        // console.log(option)
        this.dept_id = null;
        this.dept_name = '';

        // this.fetch_sklad_list_id(this.dept_id);
        this.sklad_id = null;
        this.sklad_name = '';
      },
      async selectdept(option)
      {
        console.log(option.id)
        console.log(option)
        this.dept_name = option.name;
        this.dept_id = option.id;
        this.fetch_sklad_list_id(option.id);

        this.sklad_id = null;
        this.sklad_name = '';
      },
      selectkontragent(option)
      {
        console.log(option.id)
        this.kont_name = option.name;
        this.kont_id = option.id;
      },
      selectvaluta(option)
      {
        console.log(option.id)
        this.valuta.selected = option.name;
        this.valuta.selectedId = option.id;
        this.kurs_valut = option.forbuy;
      },
      
      selectsklad(option)
      {
        console.log(option.id)
        this.sklad_name = option.name;
        this.sklad_id = option.id;
      },
      // --->  Header Select  <---
      selectCalcType(option){
        console.log(option)
        this.calc_type_name = option.name;
        this.calc_type_id = option.id;

      },


      // --->  Items Select  <---
      selectproduct(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].ed_izm = option.data.measure;
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].erpProductId = option.data.id;
        // this.datasource.rows[option.row].ed_izm = option.data.ed_izm;
      },
      selectColor(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].color_name = option.data.name;
        this.datasource.rows[option.row].erpColorId = option.data.id;
      },
      selectColor_variant(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].color_variant_name = option.data.name;
        this.datasource.rows[option.row].erpColorVariantId = option.data.id;
      },

      select_extra_work(option)
       {
        console.log(option.data.id)
        this.datasource.rows[option.row].dop_work_name = option.data.name;
        this.datasource.rows[option.row].erpExtraWorkId = option.data.id;
      },
      select_upakovka(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].upakovka_name = option.data.name;
        this.datasource.rows[option.row].erpUpakopkaId = option.data.id;
      },
      select_sort(option)
       {
        console.log(option.data.id)
        this.datasource.rows[option.row].sort_name = option.data.name;
        this.datasource.rows[option.row].erpSortId = option.data.id;
      },
      
      selectguscolor(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].gus_color_name = option.data.name;
        this.datasource.rows[option.row].erpColorGustotaId = option.data.id;
      },
      selectsuroviy_vid(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].suroviy_vid_name = option.data.name;
        this.datasource.rows[option.row].erpSuroviyVidId = option.data.id;
      },
      selectmain_proccess(option)
      {
        console.log(option.data.id)
        this.datasource.rows[option.row].main_proccess_name = option.data.name;
        this.datasource.rows[option.row].erpProccessId = option.data.id;
      },
      // --->  Items Select  <---

      
     async submit()
      {
        this.dataItems = [];
        for(let i=0;i<this.datasource.rows.length; i++){
          var p = {
            erpProductId : null,
            qty : null,
            realCount: null,
            erpInvoiceTypeId: null,
            // ostatka : 0,
            // ed_izm : '',
            price : 0,
            fein : '',
            pus : '', 
            shirina : '',
            gramm : '',
            metraj : '',
            qty2 : '',
            erpColorId : null,
            erpColorVariantId : null,
            erpColorGustotaId : null,
            erpSuroviyVidId : null,
            note : '',
            erpProccessId : null,
            erpExtraWorkId : null,
            brack : 0,
            erpSortId : null,
            ugar : false,
            brutto : 0,
            netto : 0,
            erpUpakopkaId : 0,
          }
          p.erpProductId = this.datasource.rows[i].erpProductId;
          p.qty = this.datasource.rows[i].qty;
          p.erpInvoiceTypeId = this.invoice_type_list.id;
          p.realCount = this.datasource.rows[i].qty;
          p.price = this.datasource.rows[i].price;
          p.fein = this.datasource.rows[i].fein;
          p.pus = this.datasource.rows[i].pus;
          p.shirina = this.datasource.rows[i].shirina;
          p.gramm = this.datasource.rows[i].gramm;
          p.metraj = this.datasource.rows[i].metraj;
          p.qty2 = this.datasource.rows[i].qty2;
          p.brack = this.datasource.rows[i].brack;
          p.erpColorId = this.datasource.rows[i].erpColorId;
          p.erpColorVariantId = this.datasource.rows[i].erpColorVariantId;
          p.erpColorGustotaId = this.datasource.rows[i].erpColorGustotaId;
          p.erpSuroviyVidId = this.datasource.rows[i].erpSuroviyVidId;
          p.note = this.datasource.rows[i].note;
          p.erpProccessId = this.datasource.rows[i].erpProccessId;
          p.erpExtraWorkId = this.datasource.rows[i].erpExtraWorkId;
          p.erpSortId = this.datasource.rows[i].erpSortId;
          p.ugar = this.datasource.rows[i].ugar;
          p.brutto = this.datasource.rows[i].brutto;
          p.netto = this.datasource.rows[i].netto;
          p.erpUpakopkaId = this.datasource.rows[i].erpUpakopkaId;
          this.dataItems.push(p);


        }
        console.log(this.dataItems)
        // console.log(this.datasource.rows.reduce((a, b) => +a + +b.qty, 0))
        if(this.$v.$invalid || this.dept_id == null || this.kont_id == null || this.sklad_id == null || this.company_id == null)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "dateTime" : this.time1,
            "createdDateTime" : this.time1,
            "erpCalcTypeId": this.calc_type_id,
            "erpInvoiceTypeId": this.invoice_type_list.id,
            "count" : this.datasource.rows.reduce((a, b) => +a + +b.qty, 0),
            "erpServiceTypeId" : this.service_type.selectedId,
            "erpPaymentTypeId" : this.payment_type.selectedId,
            // "erpCalcTypeId" : this.calc_type.selectedId,
            "invcompanyId" : this.kont_id,
            "mainCompanyId" : this.company_id,
            "departmentId" : this.dept_id,
            "mainDepartmentId" : this.dept_id,
            "mainWarehouseId" : this.sklad_id,
            "erpCurrencyId" : this.valuta.selectedId,
            "currencyValue" : this.kurs_valut,
            "invoiceItems" : this.dataItems,
            })
          };
          console.log(requestOptions.body)

           const response = await fetch(this.$store.state.hostname + "/ErpInvoices/addBuyInvoice", requestOptions);
           const data = await response.json();
           console.log(data)
           if(data)
            {
              // this.alert_text = localizeFilter('Added_successfully');
              this.$refs.message.success('Added_successfully')
              this.$store.state.alert = true;
              this.$router.push("/buy");
            }
            else{
              console.log(data);
              this.modal_info = data.detail + "    (" + data.routine + ")" ;
              this.modal_status = true;
            }
      },

      async update_column(option)
      {
        // this.showcheck_form = option ;
        // const res = await fetch(this.$store.state.hostname + '/invoice_buy_add_column/' + this.user_id);
        // const data = await res.json();
        // this.datasource.col = data;
        // this.datasource.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
        // this.datasource.data = data[0].columns;
        // this.datasource.filtered_data = data[0].columns.filter(obj => {return obj.status === true});
        //console.log(this.datasource.data );
        console.log('update_column')
        console.log(option)
      }

    },
   

  }
</script>

<style scoped>
main {
  background-color: #fff;
}
::-webkit-scrollbar {
  height: 9px;              /* height of horizontal scrollbar ← You're missing this */
  width: 4.5px;   
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(152, 152, 152);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(71, 71, 71);
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.timepiker{
  position: relative;
  width: 100%;
  margin-top:32px;
  cursor: pointer;
}

 .fixed-column {
    overflow-x: scroll;
    margin-left: 100px;
    padding-bottom: 200px;
  }

  .fixed-column th, .fixed-column td {
    white-space: nowrap;
  }

  .fixed-column tr th:first-child {
    position: absolute;
    width: 50px;
    top: auto;
    margin-left: -50px;
    padding-top: -10px;
    margin-top: 0;
  }
  .fixed-column tr td:first-child{
    position: absolute;
    width: 50px;
    top: 41px;
    margin-left: -50px;
    margin-top: 0;
  }
  .delIcon{
    color: #fff;
    /* background: rgb(255, 90, 90); */
    padding: 6.5px;
    border-radius: 4px;
    }
  .delIcon{
    color: red;
  }
  .bgColorBack{
    background : rgb(251, 251, 251);
  }
   .gradint{
    background: #8E2DE2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
