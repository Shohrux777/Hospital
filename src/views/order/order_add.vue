<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/sale">
        <a class="ml-2 mr-2 p-3" :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{'Sales_Invoice'|locolize}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <loader v-if="loading"/>
    <main v-else>
      <form @submit.prevent="submit">
        <div class="container-fluid" >
          <div class="container-fluid" :class="{'applied': sklad_submitted}">
            <mdb-row>

              <mdb-col col="3">
                <small class="timepiker-text" >
                  {{'Data'|locolize}}
                </small>
                <date-picker class="timepiker " v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
              </mdb-col>

              <mdb-col col="3">
                <small class="timepiker-text" >
                  {{'end_data'|locolize}}
                </small>
                <date-picker class="timepiker " v-model="time2" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
              </mdb-col>

              <mdb-col col="2">
                <mdb-input v-model="order_no"  size="sm" :label="'Order_No'|locolize"/>
              </mdb-col>

            </mdb-row>

            <!-- kontragent + company list -->
            <mdb-row>
              <mdb-col col="3">
                <erpSelect
                  :options="kontragent_list"
                  @btn_add="shown = true"
                  @select="selectkontragent"
                  :selected="kont_name"
                  :label="'Executor'|locolize"
                />
                <small v-if="$v.kont_name.$dirty && kont_id == null" class="invalid-text" >
                  {{'select_item'|locolize}}
                </small>
              </mdb-col>
              <mdb-col col="3">
                <erpSelect
                  :options="allcompanys" :btnshow="false"
                  @select="selectcompany"
                  :selected="company_name"
                  :label="'Customer'|locolize"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text" >
                  {{'select_item'}}
                </small>
              </mdb-col>
              <mdb-col col="3">
                <erpSelect
                  :options="dept_list" :btnshow="false"
                  @select="selectdept"
                  :selected="dept_name"
                  :label="'dept'|locolize"
                />
                <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text" >
                  {{'select_item'|locolize}}
                </small>
              </mdb-col>



            </mdb-row>

            <mdb-row>
              <mdb-col col="3">
                <erpSelect
                  :options="valuta_list" :btnshow="false"
                  @select="selectvaluta"
                  :selected="valuta.selected"
                  :label="'menu_currency'|locolize"
                />
              </mdb-col>

              <mdb-col col="3">
                <mdb-input v-model="kurs_valut" size="sm" :label="'kurs_valyut'|locolize" icon="dollar-sign" type="number" />
                <small class="invalid-text"  v-if="$v.kurs_valut.$dirty && !$v.kurs_valut.required" >
                  {{'invalid_Currency'|locolize}}
                </small>
              </mdb-col>
              <mdb-col col="3">
                <mdb-input v-model="note" type="textarea" style="margin-top: 8px; margin-bottom: 0px; height: 32px;" :label="'Descriptions'|locolize" icon="pencil-alt" />
              </mdb-col>

            </mdb-row>
          </div>

          <mdb-btn slot="reference" class="mr-1 " outline="primary" @click="applied"
                    darkWaves tag="a" floating far icon="paper-plane"  size="sm" >{{'apply'|locolize}}</mdb-btn>



          <div class="d_table mt-4 " v-if="sklad_submitted" style="padding-bottom:50px">
            <h4 class="mt-5 mb-4 ml-4">{{'Invoice_element'|locolize}}</h4>
            <div class="d-inline ml-5 ">
                  <!-- <mdb-btn slot="reference" class="mr-1" outline="primary"
                    darkWaves tag="a" floating  icon="filter"  size="sm" >{{'Filter'|locolize}}</mdb-btn> -->

                  <mdb-btn class="mr-1" outline="primary" darkWaves tag="a" floating @click="showcheck_form=true"
                    icon="table"  size="sm">{{'editCol_columns'|locolize}}</mdb-btn>
            </div>
            <mdb-tbl class="fixed-column"  >
              <mdb-tbl-head>
                <tr>
                  <td></td>
                   <td v-bind:style="{ 'min-width': datasource.filtered_data[Index].length + 'px' }"  v-for="(column,Index) in datasource.columns" :key="Index" >
                    <span >{{column | locolize}}</span>
                  </td>
                </tr>
              </mdb-tbl-head>

              <mdb-tbl-body>
                <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                  <th>
                  <mdb-btn-toolbar>
                        <mdb-btn-group >
                          <mdb-btn class=" m-0 ml-1 p-1" :color="row.save_color"  size="sm"  icon="save" style="font-size:16px"
                          @click="save_order(rowIndex)" />
                          <mdb-btn class="m-0 ml-1 p-1"  size="sm" color="success" icon="edit" style="font-size:16px"
                          @click="edit_order(rowIndex)"/>
                          <mdb-btn class="m-0 ml-1 p-1"  size="sm" color="danger" icon="trash-alt" style="font-size:16px"
                          @click="delete_order(rowIndex)"/>
                        </mdb-btn-group>
                  </mdb-btn-toolbar>
                </th>

                  <th v-if="datasource.data[0].status"> <input v-model="row.ostatka" type="text" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[1].status">
                    <lineSelect
                        :options="productionType_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_production_type"
                        :selected="row.production_type"
                    />
                    <!-- :label="'Production_type'|locolize" -->
                  </th>

                  <th v-if="datasource.data[2].status">
                    <lineSelect
                        :options="service_type_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="selectservice_type"
                        :selected="row.service_type"
                    />
                    <!-- :label="'Service_type'|locolize" -->
                  </th>


                  <th v-if="datasource.data[3].status">
                    <lineSelect
                        :options="product_fromsklad" :row_index="rowIndex"
                        :searchshow="true"
                        @select="selectproduct"
                        :selected="row.product_name"
                    />
                    <!--  :label="'product'|locolize" -->

                    <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                    v-if="($v.datasource.rows.$each[rowIndex].product_id.$dirty && !$v.datasource.rows.$each[rowIndex].product_id.minValue)" >
                      {{'Select_product'|locolize}}
                    </small>
                  </th>

                  <th v-if="datasource.data[4].status"> <input v-model="row.soni" type="text" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[5].status"> <input v-model="row.ed_izm" type="text" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[6].status"> <input v-model="row.price" type="text" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[7].status"> <input v-model="row.summa" type="text" class="form-control form-control-sm" disabled> </th>
                  <th v-if="datasource.data[8].status">
                    <lineSelect
                        :options="color_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_color_list"
                        :selected="row.color"
                    />
                    <!-- :label="'color'|locolize" -->
                  </th>
                   <th v-if="datasource.data[9].status">
                    <lineSelect
                        :options="guscolor_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_guscolor_list"
                        :selected="row.gus_color"
                    />
                    <!-- :label="'gus_color'|locolize" -->
                  </th>
                   <th v-if="datasource.data[10].status">
                    <lineSelect
                        :options="color_variant_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_color_variant"
                        :selected="row.color_variant"
                    />
                    <!-- :label="'color'|locolize" -->
                  </th>
                   <th v-if="datasource.data[11].status">
                    <lineSelect
                        :options="main_proccess_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_main_proccess_list"
                        :selected="row.main_proccess"
                    />
                    <!-- :label="'main_proccess'|locolize" -->
                  </th>
                   <th v-if="datasource.data[12].status">
                    <lineSelect
                        :options="extra_work_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_extra_work_list"
                        :selected="row.extra_work"
                    />
                    <!-- :label="'extra_work'|locolize" -->
                  </th>

                  <th v-if="datasource.data[13].status"> <input v-model="row.extra_work_price" type="text" class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[14].status"> <input v-model="row.trb_grm_ot" type="text" class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[15].status"> <input v-model="row.trb_grm_do" type="number" class="form-control form-control-sm"> </th>
                  <th v-if="datasource.data[16].status"> <input v-model="row.trb_shir_ot"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[17].status"> <input v-model="row.trb_shir_do"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[18].status"> <input v-model="row.note"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[19].status"> <input v-model="row.pus"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[20].status"> <input v-model="row.fein"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[21].status"> <input v-model="row.paket"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[22].status"> <input v-model="row.shirina"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[23].status"> <input v-model="row.gramm"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[24].status"> <input v-model="row.metraj"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[25].status"> <input v-model="row.artikul"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[26].status">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input"
                      :checked="row.ugar" >
                      <label class="custom-control-label" @click="row.ugar = !row.ugar"></label>
                    </div>
                  </th>
                  <th v-if="datasource.data[27].status">
                    <lineSelect
                        :options="suroviy_vid_list" :row_index="rowIndex"
                        :searchshow="true"
                        @select="select_suroviy_vid_list"
                        :selected="row.suroviy_vid"
                    />
                  </th>
                  <th v-if="datasource.data[28].status"> <input v-model="row.artikul"  class="form-control form-control-sm" > </th>
                  <th v-if="datasource.data[29].status">
                    <mdb-btn class="m-0" size="sm" color="primary" @click="open_recipe(rowIndex)">
                      {{'Open'|locolize}} </mdb-btn>
                  </th>
                </tr>
              </mdb-tbl-body>

            </mdb-tbl>

            <circle-btn @on_click="addRow"/>
            <hr class="mt-5"/>

            <mdb-btn class="float-right" type="submit" color="success" m="r3"
              p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{'save'|locolize}}</mdb-btn>

          </div>
        </div>
      </form>

      <mdb-modal :show="shown"  @close="shown = false" info>
        <mdb-modal-header>
          <mdb-modal-title>{{'New_company'|locolize}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
              <compAdd :notFull="false" @submit_success="compSubmit_success"/>
        </mdb-modal-body>
      </mdb-modal>

      <!-- other -->
      <div>
        <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="'Failed_to_add'|locolize" @to_hide_modal = "modal_status= false"/>
      <alert
        :bool="alert_success"
        @changeBool="alert_success=false"
        color="success"
        icon = "check"
        :text="alert_text"
      ></alert>

      <alert
        :bool="alert_danger"
        @changeBool="alert_danger = false"
        color="danger"
        icon = "exclamation-circle"
        :text="alert_text"
      ></alert>

      <edit_col
        v-show="showcheck_form"
        :option="datasource"
        @select="update_column"
      />
      </div>

    </main>

    <!-- Central Info Modal -->
    <mdb-modal  :show="add_recipe"  @close="add_recipe = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{'Goods_reserve'|locolize}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <orderRecipe
           :datasource = data_recipe
            />
      </mdb-modal-body>
    </mdb-modal>

  </div>
</template>

<script>
import compAdd from "../../components/wnd_for_add/company_add"
import orderRecipe from "../../components/wnd_for_add/order_recipe"
import edit_col from "../../components/editColumn";
import erpSelect from "../../components/erpSelect.vue";
import lineSelect from "../../components/lineSelect.vue";
import DatePicker from 'vue2-datepicker';
import { required,minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';

import 'vue2-datepicker/index.css';
import {mapActions, mapGetters} from 'vuex';
  import {
    mdbNavbar,mdbTbl, mdbTblHead, mdbTblBody,
    mdbCardTitle,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbInput,mdbBtnGroup,mdbBtnToolbar,
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
      mdbRow,edit_col,orderRecipe,
      mdbCol,erpSelect,mdbBtnGroup,mdbBtnToolbar,
    },
    validations: {
      company_name : {required},
      kont_name : {required},
      dept_name : {required},
      kurs_valut : {required},
      datasource : {
        rows : {
          $each : {
            soni : { minValue : minValue(1), required},
            product_id : {minValue : minValue(1)}
          }

        }
      }
    },

    data(){
      return {

        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status : false,
        shown : false,
        time1 : new Date(Date.now()),
        time2 : new Date(Date.now()),
        loading : true,
        user_id : 1,
        add_recipe : false,
        id : this.$route.params.id,

        order_no : null,
        showcheck_form: false,
        sklad_submitted : false,
        company_name : ' ', company_id : null,
        kont_name : '', kont_id : null,
        valuta : { selected: ' ', selectedId:null,},
        kurs_valut : '',
        note : '',
        dept_id : null, dept_name : ' ',

        selected_row_index :-1,
        datasource :
        {
          rows :[],
          columns: null,
          col : [],
          data : []
        },
        data_recipe : {}
      }
    },
    async created()
    {
      if(this.id > 0)
      {
        console.log('test');
      }
      else
      {
        const res = await fetch(this.$store.state.hostname + '/order_no');
        const data = await res.json();
        // console.log(data.order_no);
         if(data.order_no == null)
         {
           this.order_no = 1
         }
         else this.order_no = data.order_no;

      }
    },
    async mounted (){
        await this.update_column(false);
        this.fetch_kontragentlist();
        await this.fetch_valuta_list();
        if(this.valuta_list.length > 0)
        {
          this.valuta.selectedId = this.valuta_list[0].id;
          this.valuta.selected = this.valuta_list[0].name;
          this.kurs_valut = this.valuta_list[0].forbuy;
        }

        await this.fetch_companylist();
        if(this.allcompanys.length > 0)
        {
          this.company_name = this.allcompanys[0].name;
          this.company_id = this.allcompanys[0].id;
          await this.fetch_dept_list_id(this.company_id);
            if(this.dept_list.length > 0)
            {
              this.dept_name = this.dept_list[0].name;
              this.dept_id = this.dept_list[0].id;
            }
        }

        this.fetch_product_fromsklad();
        this.fetch_productionTypelist();
        this.fetch_service_type_list();
        this.fetch_color_list();
        this.fetch_guscolor_list();
        this.fetch_main_proccess_list();
        this.fetch_extra_work_list();
        this.fetch_suroviy_vid_list();
        this.fetch_color_variant_list();
        this.loading = false;
     },
    computed: mapGetters(['allcompanys','kontragent_list','dept_list','productionType_list',
    'service_type_list','product_fromsklad','valuta_list','color_list','guscolor_list','main_proccess_list',
    'extra_work_list','suroviy_vid_list','color_variant_list']),
    methods: {
      ...mapActions(['fetch_companylist','fetch_kontragentlist','fetch_dept_list_id','fetch_color_list',
      'fetch_service_type_list','fetch_product_fromsklad','fetch_valuta_list','fetch_productionTypelist',
      'fetch_guscolor_list','fetch_main_proccess_list','fetch_extra_work_list','fetch_suroviy_vid_list',
      'fetch_color_variant_list']),

      delete_order(index)
      {
        this.datasource.rows.splice( parseInt(index), 1)
      },
      async save_order(index)
      {
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.alert_danger = true;
          return;
        }
        console.log(index);
        // var result_name = '';
        // result_name += this.selectedId + '-' +  this.datasource.rows[index].cotton +  this.color_gr.code
        // + this.id_for_name + '.' + this.colorV_no;


        // const requestOptions = {
        //     method : "POST",
        //     headers: { "Content-Type" : "application/json" },
        //     body: JSON.stringify({
        //     "name" : result_name,
        //     "gus_color_id" : this.datasource.rows[index].gus_color_id,
        //     "product_id" : this.datasource.rows[index].product_id,
        //     "proccess_id" : this.datasource.rows[index].proccess_id,
        //     "date" : this.datasource.rows[index].time1.toLocaleString("es-CL"),
        //     "note" : this.datasource.rows[index].note,
        //     "color_id" : this.id,
        //     "updated_user" : this.datasource.rows[index].time1.toLocaleString("es-CL"),
        //     "created_user" : this.datasource.rows[index].time1.toLocaleString("es-CL"),
        //     "status" : this.datasource.rows[index].status,
        //     "parent_variant_id" : null,
        //     "color_no" : this.colorV_no,
        //     "rpt_sequence" : null,
        //     "color_option_type_id" : this.datasource.rows[index].color_option_type_id
        //     })
        //   };

        //   const response = await fetch(this.$store.state.hostname + "/color_variant", requestOptions);
        //   const data = await response.json();
        //   //console.log(data);

        //   if(data.res)
        //   {
        //     this.alert_text = localizeFilter('Added_successfully');
        //     this.alert_success = true;

        //     this.datasource.rows[index].color_variant_id = data.rows[0].id
        //     this.datasource.rows[index].colorVariantName = result_name
        //     this.datasource.rows[index].colorV_applied = true
        //     this.datasource.rows[index].save_color = 'success'
        //     ++this.colorV_no;
        //     return;
        //   }
        //   else{
        //     this.modal_info = data.detail + "    (" + data.routine + ")";
        //     this.modal_status = true;
        //     return;
        //   }

        //console.log(result_name)
      },
      edit_order(index)
      {
        // this.datasource.rows[index].colorV_applied = false
        // this.datasource.rows[index].save_color = 'warning'
        console.log(index)
      },
      open_recipe(index)
        {
            this.add_recipe = true;
             console.log(index);
        },

      selectservice_type(option)
      {
        this.datasource.rows[option.row].service_type = option.data.name;
        this.datasource.rows[option.row].service_type_id = option.data.id;
      },
      select_production_type(option)
      {
        this.datasource.rows[option.row].production_type = option.data.name;
        this.datasource.rows[option.row].production_type_id = option.data.id;
      },
      select_color_list(option)
      {
        this.datasource.rows[option.row].color = option.data.name;
        this.datasource.rows[option.row].color_id = option.data.id;
      },

      select_guscolor_list(option)
      {
        this.datasource.rows[option.row].gus_color = option.data.name;
        this.datasource.rows[option.row].gus_color_id = option.data.id;
      },
      select_extra_work_list(option)
      {
        this.datasource.rows[option.row].extra_work = option.data.name;
        this.datasource.rows[option.row].extra_work_id = option.data.id;
      },
      select_main_proccess_list(option)
      {
        this.datasource.rows[option.row].main_proccess = option.data.name;
        this.datasource.rows[option.row].main_proccess_id = option.data.id;
      },
      select_suroviy_vid_list(option)
      {
        this.datasource.rows[option.row].suroviy_vid = option.data.name;
        this.datasource.rows[option.row].suroviy_vid_id = option.data.id;
      },
      select_color_variant(option)
      {
        this.datasource.rows[option.row].color_variant = option.data.name;
        this.datasource.rows[option.row].color_variant_id = option.data.id;

        this.datasource.rows[option.row].color = option.data.color;
        this.datasource.rows[option.row].color_id = option.data.color_id;

        this.datasource.rows[option.row].gus_color = option.data.guscolor;
        this.datasource.rows[option.row].gus_color_id = option.data.guscolor_id;

      },

     async applied()
      {
        this.datasource.rows = [];

        if(this.id == 0 )
        {
          if(this.$v.$invalid || this.dept_id == null || this.kont_id == null ||  this.company_id == null)
          {
            this.$v.$touch();
            // this.alert_text = localizeFilter('please_fill');
            this.alert_danger = true;
            return;
          }

          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "kontragent_id" : this.kont_id,
            "company_id" : this.company_id,
            "dept_id" :  this.dept_id,
            "begin_date" : this.time1,
            "end_date" : this.time2,
            "kurs" : this.kurs_valut,
            "valuta_id" : this.valuta.selectedId,
            "note" : this.note,
            "zakaz_no" : this.order_no,
            "created_user" : this.user_id,
            "updated_user" : this.user_id
            })
          };


          const response = await fetch(this.$store.state.hostname + "/order", requestOptions);
          const data = await response.json();
          // console.log(data);


          if(data.res)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.alert_success = true;
            this.id = data.rows[0].id;
            this.sklad_submitted = !this.sklad_submitted ;
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
        }

        this.sklad_submitted = !this.sklad_submitted ;

      },
      addRow() {
       // console.log("test : "  + this.datasource.rows[0].product.name);
            this.datasource.rows.push({

            service_type_id : null, service_type : '',
            production_type : '', production_type_id : '',
            product_id : null,
            product_name : '',
            paket : '',
            soni : null,
            item_saved : false,

            ed_izm : '',
            price : null,
            fein : '',
            pus : '',
            shirina : '',
            gramm : '',
            metraj : '',
            artikul : '',

            color : '',color_id : null,
            color_variant : '', color_variant_id : null,
            gus_color : '',gus_color_id : null,
            suroviy_vid : '', suroviy_vid_id : null,
            note : '',
            main_proccess : '',main_proccess_id : null,
            extra_work : '', extra_work_id : null,
            extra_work_price  : '',
            ugar : false,
            summa : '',
            trb_grm_ot :'',
            trb_grm_do :'',
            trb_shir_ot : '',
            trb_shir_do : ''
          })
            //appData.updated()
        },

      compSubmit_success()
      {
          this.shown = false
          this.fetch_kontragentlist()
      },
      selectcompany(option)
      {
        this.company_name = option.name;
        this.company_id = option.id;
        this.fetch_dept_list_id(this.company_id);

        this.dept_id = null;
        this.dept_name = '';
      },

      selectproduct(option)
      {
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].main_item_id = option.data.id;
        this.datasource.rows[option.row].product_id = option.data.product_id;
        this.datasource.rows[option.row].ed_izm = option.data.ed_izm;
      },


      selectkontragent(option)
      {
        this.kont_name = option.name;
        this.kont_id = option.id;
      },
      selectvaluta(option)
      {
        this.valuta.selected = option.name;
        this.valuta.selectedId = option.id;
        this.kurs_valut = option.forbuy;
      },
      selectdept(option)
      {
        this.dept_name = option.name;
        this.dept_id = option.id;
      },

      async update_column(option)
      {
        this.showcheck_form = option;
        const res = await fetch(this.$store.state.hostname + '/order_column/' + this.user_id);
        const data = await res.json();
        this.datasource.col = data;
        this.datasource.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
        this.datasource.data = data[0].columns;
        this.datasource.filtered_data = data[0].columns.filter(obj => {return obj.status === true});
        //console.log(this.datasource.data );
      },
     async submit()
      {
        if(this.$v.$invalid || this.dept_id == null || this.kont_id == null || this.sklad_id == null || this.company_id == null)
        {
          this.$v.$touch();
          // this.alert_text = localizeFilter('please_fill');
          this.alert_danger = true;
          return false;
        }

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "time1" : this.time1.toLocaleString("es-CL"),
            "count" : this.datasource.rows.reduce((a, b) => +a + +b.soni, 0),
            "summa" : this.datasource.rows.reduce((a, b) => +a + +b.summa, 0),
            //"service_type_id" : this.service_type.selectedId,
            "payment_type_id" : this.payment_type.selectedId,
            //"calc_type_id" : this.calc_type.selectedId,
            "kont_id" : this.kont_id,
            "company_id" : this.company_id,
            "dept_id" : this.dept_id,
            "sklad_id" : this.sklad_id,
            "valuta_id" : this.valuta.selectedId,
            "kurs_valut" : this.kurs_valut,
            "created_user" : 1,
            "changed_user" : 1,
            "items" : this.datasource.rows,
            })
          };

           const response = await fetch(this.$store.state.hostname + "/sale", requestOptions);
           const data = await response.json();
           if(data.res)
            {
              // this.alert_text = localizeFilter('Added_successfully');
              this.alert_success = true;
              this.$router.push("/sale");
            }
            else{
              console.log(data);
              this.modal_info = data.detail + "    (" + data.routine + ")" ;
              this.modal_status = true;
            }
      }
    },


  }
</script>

<style scoped>
main {
  background-color: #fff;
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
.timepiker-text{
  color: gray;
  font-size: 12px;
  position: absolute;
  margin-top:10px;
}

 .fixed-column {
    overflow-x: scroll;
    margin-left: 90px;
    margin-right: 0;
    padding-bottom: 200px;
  }

  .fixed-column th, .fixed-column td {
    white-space: nowrap;
  }

  .applied{
    pointer-events: none;
    background:#fcfcfc;
  }

  .fixed-column tr th:first-child, .fixed-column tr td:first-child {
    position: absolute;
    width: 100px;
    top: auto;
    padding-left: 0;
    margin-left: -100px;
    margin-top: 0;
  }

</style>
