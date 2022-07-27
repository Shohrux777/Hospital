<template>
  <div>
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/movement">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Movements_in_warehouses')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main style="border: 0.1px solid white; border-radius: 7px;" class="shadow">
      <form @submit.prevent="submit">
        <div class="container-fluid ">
          <div :class="{'applied': sklad_submitted}" class="container-fluid mt-3  shadow bgColorBack p-4" style=" border-radius: 7px;">

            <mdb-row >
              <mdb-col col="4">
                <erpSelect
                  :options="get_filial_list" :btnshow="false"
                  @select="select_comp"
                  :selected="company_name"
                  :label="$t('Branch_of_the_Company')"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text" >
                      {{$t('select_item')}}
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

            <mdb-row >
              <mdb-col col="4">
                <erpSelect
                  :options="comp_data2" :btnshow="false"
                  @select="select_comp_recipient"
                  :selected="company_recipient"
                  :label="$t('Branch_of_recipient')"
                />
                <small v-if="$v.company_recipient.$dirty && company_recipient_id == null" class="invalid-text" >
                      {{$t('select_item')}}
                  </small>

              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                    :options="dept_data2" :btnshow="false"
                    @select="selectdept_recipient"
                    :selected="dept_recipient"
                    :label="$t('Department_of_recipient')"
                  />
                  <small v-if="$v.dept_recipient.$dirty && dept_recipient_id == null" class="invalid-text" >
                    {{$t('select_item')}}
                  </small>
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                      :options="sklad_data2" :btnshow="false"
                      @select="selectsklad_recipient"
                      :selected="sklad_recipient"
                      :label="$t('Warehouse_of_recipient')"
                    />
                    <small v-if="$v.sklad_recipient.$dirty && sklad_recipient_id == null" class="invalid-text" >
                    {{$t('select_item')}}
                    </small>
              </mdb-col>
            </mdb-row>

            <mdb-row v-if="showfor_print">
                <mdb-col col="4">
                  <erpSelect
                    :options="CurrencyList" :btnshow="false"
                    @select="selectvaluta"
                    :selected="valuta.selected"
                    :label="$t('menu_currency')"
                  />

                </mdb-col>
                <mdb-col col="2">
                  <mdb-input v-model="kurs_valut" size="sm" :label="$t('kurs_valyut')" icon="dollar-sign" type="number" />
                  <small class="invalid-text"  v-if="$v.kurs_valut.$dirty && !$v.kurs_valut.required" >
                    {{$t('invalid_Currency')}}
                  </small>
                </mdb-col>

            </mdb-row>

            <mdb-row>
              <mdb-col col="4">
                <erpSelect
                  :options="service_type_list" :btnshow="false"
                  @select="selectservice_type"
                  :selected="service_type.selected"
                  :label="$t('Service_type')"
                />

              </mdb-col>
              <mdb-col col="4" >
                <mdb-input v-model="note" type="textarea" style="margin-top: 8px; margin-bottom: 0px; height: 32px;" :label="$t('Descriptions')" icon="pencil-alt" />
              </mdb-col>

              <mdb-col col="4" >
                <date-picker class="timepiker" style="margin-top: 20px;" v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>

              </mdb-col>
              <small v-if="$v.time1.$dirty && !$v.time1.required" style="padding:90px 0 0 15px" class="invalid-text" >
                    {{$t('invalid_time')}}
                </small>

            </mdb-row>
          </div>

            <mdb-btn slot="reference" class="mr-1 ml-1 mt-4 px-4 " outline="primary" @click="applied"
                    darkWaves tag="a" floating far icon="paper-plane"  size="sm" >{{$t('apply')}}</mdb-btn>

            <div v-if="sklad_submitted">
              <h4 class=" mb-4 mt-5">{{$t('Invoice_element')}}</h4>

                <div class="d-inline" >
                  <mdb-btn  class="mr-1" @click="submit" outline="success" darkWaves tag="a" floating
                          icon="check"  size="sm">{{$t(save_btn)}}</mdb-btn>

                  <mdb-btn class="mr-1" outline="primary" darkWaves tag="a" floating @click="send_data"
                          icon="paper-plane"  size="sm">{{$t('Send')}}</mdb-btn>
                </div>
                <div :class="{'applied': edit}">
                <div class="d_table " >

                <mdb-tbl class="fixed-column" >
                  <mdb-tbl-head>
                    <tr>
                      <td></td>
                      <!-- product -->
                      <td style="min-width:300px"> {{$t(datasource.columns[0])}} </td>
                      <td style="min-width:80px"> {{$t(datasource.columns[1])}} </td>
                      <td style="min-width:80px"> {{$t(datasource.columns[2])}} </td>
                      <td style="min-width:80px"> {{$t(datasource.columns[3])}} </td>
                      <!-- ed_izm -->
                      <td style="min-width:80px"> {{$t(datasource.columns[4])}} </td>
                      <td style="min-width:80px"> {{$t(datasource.columns[5])}} </td>
                    </tr>
                  </mdb-tbl-head>
                  <mdb-tbl-body>
                    <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                      <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="datasource.rows.splice( parseInt(rowIndex), 1)"></i></th>
                      <th>
                        <lineSelect
                            :options="product_fromsklad" :row_index="rowIndex"
                            :searchshow="true"
                            @select="selectproduct"
                            :selected="row.product_name"
                            :label="$t('product')"
                        />
                        <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                        v-if="($v.datasource.rows.$each[rowIndex].item_id.$dirty && !$v.datasource.rows.$each[rowIndex].item_id.minValue)" >
                          {{$t('Select_product')}}
                        </small>
                      </th>

                      <th>
                        <input v-model="row.soni" type="number" min="0"  @input="onChangeCount(row.soni,rowIndex)"
                        onkeypress="return event.charCode >= 48" class="form-control form-control-sm">
                        <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                        v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                          {{$t('minValue')}}
                        </small>

                      </th>
                      <th> <input v-model="row.ostatka" type="text" class="form-control form-control-sm" disabled> </th>
                      <th> <input v-model="row.ed_izm" type="text" class="form-control form-control-sm" disabled> </th>
                      <th> <input v-model="row.price" type="text" class="form-control form-control-sm" disabled> </th>
                      <th> <input v-model="row.summa" type="text" class="form-control form-control-sm" disabled> </th>


                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>

                <!-- <div class="cyrcle_btn ml-5 z-depth-1-half "  v-on:click="addRow" v-mdb-waves="{ duration : 'long' , fixed : true}" >
                    <i class="fas fa-plus white-text d-flex justify-content-center " style="padding-top:11px"></i>
                </div> -->
                <circle-btn  class="gradint mt-5  " @on_click="addRow"/>
                </div>

              <!-- <mdb-btn class="float-right" type="submit" color="success" m="r3"
                p="r4 l4 t2 b2">
                <mdb-icon icon="check" class="mr-2"/>{{'save'|locolize}}</mdb-btn> -->
            </div>
            </div>
              <hr class="mt-5 mb-4 gradint"/>

        </div>
      </form>

      <div>
        <massage_box :hide="modal_status" :detail_info="modal_info"
         :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
      </div>
      <Toast ref="message"></Toast>

    </main>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";
import DatePicker from 'vue2-datepicker';
import lineSelect from "../../components/lineSelect.vue";
import {mapActions, mapGetters,mapMutations} from "vuex";
import { required,minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';
import {
     mdbNavbar, mdbCardTitle, mdbIcon, mdbRow, mdbBtn,mdbInput, mdbCol,
     mdbTbl, mdbTblHead, mdbTblBody,
  } from "mdbvue";
import 'vue2-datepicker/index.css';
export default {
  components : {
      mdbNavbar,
      mdbCardTitle,
      mdbIcon,mdbTbl, mdbTblHead, mdbTblBody,
      mdbRow,mdbInput,
      mdbBtn,DatePicker,
      mdbCol,erpSelect,lineSelect,
  },
  validations: {
      company_name : {required},
      dept_name : {required},
      sklad_name : {required},

      company_recipient : {required},
      dept_recipient : {required},
      sklad_recipient : {required},

      kurs_valut : {required},
      time1 : {required},

      datasource : {
        rows : {
          $each : {
            soni : { minValue : minValue(1), required},
            item_id : {minValue : minValue(1)}
          }

        }
      }
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        showfor_print : false,

        save_btn : 'save',
        sklad_data1 : [],
        sklad_data2 : [],
        dept_data1 : [],
        dept_data2 : [],
        comp_data1 : [],
        comp_data2 : [],

        created_user : 1,
        changed_user : 1,
        id : this.$route.params.id,
        invoiceItems: [],
        service_type : { selected: ' ', selectedId:null,},
        time1: new Date(Date.now()),
        company_recipient : ' ', company_recipient_id : null,
        dept_recipient_id : null, dept_recipient : '',
        sklad_recipient_id : null, sklad_recipient : '',
        note : '',
        company_name : ' ', company_id : null,
        dept_id : null, dept_name : ' ',
        sklad_id : null, sklad_name : ' ',

        valuta :{ selected: ' ', selectedId:null,},
        kurs_valut : '',

        selected_row_index : -1,
        sklad_submitted : false,
        edit : false,
        datasource :
        {
          rows :[],
          // real_time
          columns: ['product','soni','ostatka','ed_izm1','price','summa'],
        }
      }
    },
    computed:mapGetters(['allcompanys','dept_list','sklad_list','CurrencyList','getDepartId','get_sklad',
    'product_fromsklad','service_type_list', 'get_filial_list']),
     methods : {
      ...mapActions(['fetchKontragets','fetchDepartments','fetch_dept_list_id','fetch_sklad_list_id','fetchCurrency',
      'fetch_product_fromsklad','fetch_service_type_list']),
      ...mapMutations(['get_deparment_id_comp']),


     async select_comp(option){
        this.company_name = option.name;
        this.company_id = option.id;
        this.fetchDepartments();
        this.get_deparment_id_comp(option.id)

        this.dept_id = null;
        this.dept_name = '';

      //  await this.fetch_sklad_list_id(this.dept_id);
      //   this.sklad_data1 = this.sklad_list;
        this.sklad_id = null;
        this.sklad_name = '';
      },
      async selectdept(option)
      {
        this.dept_name = option.name;
        this.dept_id = option.id;
        this.fetch_sklad_list_id(option.id);

        this.sklad_id = null;
        this.sklad_name = '';
      },
      selectsklad(option)
      {
        this.sklad_name = option.name;
        this.sklad_id = option.id;
        var cmd = ' and sk.id=' + option.id;
        this.fetch_product_fromsklad(cmd);
      },

      async select_comp_recipient(option){
        this.company_recipient = option.name
        this.company_recipient_id = option.id

        this.fetchDepartments();
        this.get_deparment_id_comp(option.id)
        this.dept_data2 = this.getDepartId;
        this.dept_recipient_id = null;
        this.dept_recipient = '';

        // await this.fetch_sklad_list_id(this.dept_recipient_id);
        //  this.sklad_data2 = this.sklad_list;
        this.sklad_recipient_id = null;
        this.sklad_recipient = '';
      },
      async selectdept_recipient(option)
      {
        this.dept_recipient = option.name;
        this.dept_recipient_id = option.id;
        await this.fetch_sklad_list_id(option.id);
        this.sklad_data2 = this.get_sklad;

        this.sklad_recipient_id = null;
        this.sklad_recipient = '';
      },
      selectsklad_recipient(option)
      {
        this.sklad_recipient = option.name;
        this.sklad_recipient_id = option.id;
      },

       selectvaluta(option)
      {
        this.valuta.selected = option.name;
        this.valuta.selectedId = option.id;
        this.kurs_valut = option.forbuy;
      },
      selectservice_type(option)
      {
        this.service_type.selected = option.name;
        this.service_type.selectedId = option.id;
        // console.log("son " + son);
      },
      selectproduct(option)
      {
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].main_item_id = option.data.id;
        this.datasource.rows[option.row].product_id = option.data.product_id;

        this.datasource.rows[option.row].ed_izm = option.data.ed_izm;
        this.datasource.rows[option.row].ostatka = option.data.ostatka;
        this.datasource.rows[option.row].price = option.data.price;

        this.datasource.rows[option.row].summa = this.datasource.rows[option.row].soni * this.datasource.rows[option.row].price;
      },
      onChangeCount(data,index)
      {
        this.datasource.rows[index].summa = data* this.datasource.rows[index].price;
      },

      applied()
      {
        if(this.edit) return;
        this.datasource.rows = [];
        if( this.$v.$invalid || this.dept_id == null  || this.sklad_id == null || this.company_id == null)
        {
          this.$v.$touch();
          // this.alert_text = localizeFilter('please_fill');
          // this.alert_danger = true;
          this.$refs.message.warning('please_fill')
          return;
        }
        this.sklad_submitted = !this.sklad_submitted ;
      },

      addRow() {
       // console.log("test : "  + this.datasource.rows[0].product.name);
            this.datasource.rows.push({
            main_item_id : 0,
            product_id : null,
            product_name : '',
            soni : null,
            ostatka : 0,
            ed_izm : null,
            price : null,
            summa : null
          })

            //appData.updated()
        },

      async submit()
      {

        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          // this.alert_text = localizeFilter('please_fill');
          // this.alert_danger = true;
          return;
        }

          this.edit =  !this.edit;

          if(this.edit){
            this.save_btn = ('Edit');
            console.log('dsdsd')
          }
          else{
            this.save_btn = ('save');
            console.log('dsdsd')
          }



      },

      async send_data()
      {

        if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          // this.alert_text = localizeFilter('please_fill');
          // this.alert_danger = true;
          return;
        }
        this.invoiceItems = [];
        for(var i = 0; i < this.datasource.rows.length; i++){
          var a = {
            erpProductId: null,
            qty: null,
            ostatka: 0,
            price: null,
            summ: null,
          }
          a.erpProductId = this.datasource.rows[i].product_id;
          a.qty = this.datasource.rows[i].soni
          a.price = this.datasource.rows[i].price
          a.summ = this.datasource.rows[i].summa
          this.invoiceItems.push(a);
        }
        console.log(this.service_type.selectedId)
         const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "dateTime": this.time1,
            "createdDateTime": this.time1,
            // "time1" : this.time1.toLocaleString("es-CL"),
            "count" : this.datasource.rows.reduce((a, b) => +a + +b.soni, 0),
            "summa" : this.datasource.rows.reduce((a, b) => +a + +b.summa, 0),
            "erpServiceTypeId" : this.service_type.selectedId,

            "invcompanyId" : this.company_recipient_id,
            "departmentId" : this.dept_recipient_id,
            "erpWarehouseId" : this.sklad_recipient_id,

            "mainCompanyId" : this.company_id,
            "mainDepartmentId" : this.dept_id,
            "mainWarehouseId" : this.sklad_id,

            "erpCurrencyId" : this.valuta.selectedId,
            "currencyValue" : this.kurs_valut,
            "acceptedUser" : false,
            
            "createdUserId" : 3,        //auth dan olish kerak
            // "changed_user" : this.changed_user,
            "items" : this.datasource.rows,
            })
          };
            // console.log(requestOptions.body)
           const response = await fetch(this.$store.state.hostname + "/ErpInvoices/addProductionInternalInvoice", requestOptions);
           const data = await response.json();
           if(data.res)
            {
              // this.alert_text = localizeFilter('Added_successfully');
              this.alert_success = true;
              this.$router.push("/movement");
            }
            else{

              this.modal_info = data.detail + "    (" + data.routine + ")" ;
              this.modal_status = true;

            }
      }
    },

   async mounted(){
      await  this.fetchKontragets({ hostname: this.$store.state.hostname});
        await this.fetch_service_type_list();
        if(this.service_type_list.length > 0){
          this.service_type.selected = this.service_type_list[0].name
          this.service_type.selectedId = this.service_type_list[0].id
        }

        this.fetchDepartments();
        if(this.get_filial_list.length > 0)
        {
          this.comp_data1 = this.get_filial_list;
          this.company_name = this.get_filial_list[0].name;
          this.company_id = this.get_filial_list[0].id;
          

          this.company_recipient = this.get_filial_list[0].name;
          this.company_recipient_id = this.get_filial_list[0].id;
          this.comp_data2 = this.get_filial_list;


          await this.fetchDepartments();
          this.get_deparment_id_comp(this.company_id)
            if(this.getDepartId.length > 0)
            {
              this.dept_name = this.getDepartId[0].name;
              this.dept_id = this.getDepartId[0].id;
              this.dept_data1 = this.getDepartId;
              this.dept_data2 = this.getDepartId;

              await this.fetch_sklad_list_id(this.dept_id);
              if(this.get_sklad.length > 0)
              {
                this.sklad_data1 = this.get_sklad;
                this.sklad_name = this.get_sklad[0].name;
                this.sklad_id = this.get_sklad[0].id;
              }
            }
        }

        await this.fetchCurrency();
        if(this.CurrencyList.length > 0)
        {
          this.valuta.selectedId = this.CurrencyList[0].id;
          this.valuta.selected = this.CurrencyList[0].name;
          this.kurs_valut = this.CurrencyList[0].forbuy;
        }
        // this.fetch_product_fromsklad();

    },

    async created()
    {
      if(this.id > 0)
      {
         this.edit = true
          const res = await fetch(this.$store.state.hostname + '/movement/' + this.id);
          const data = await res.json();

          this.time1 = new Date(data[0].date);

          this.company_recipient = data[0].filial
          this.company_recipient_id = data[0].filial_id
          this.dept_recipient_id = data[0].department_id
          this.dept_recipient = data[0].dept
          this.sklad_recipient_id = data[0].sklad_id
          this.sklad_recipient = data[0].sklad

          this.company_name = data[0].main_company
          this.company_id = data[0].main_company_id
          this.dept_id = data[0].main_dept_id
          this.dept_name = data[0].main_dept
          this.sklad_id = data[0].main_sklad_id
          this.sklad_name = data[0].main_sklad
          this.sklad_submitted = true;

           const res2 = await fetch(this.$store.state.hostname + '/items/' + this.id);
           const data2 = await res2.json();

            //console.log(data2);

           for(var i = 0; i<data2.length; i++)
           {
              this.datasource.rows.push({
                main_item_id : data2[i].main_item_id,
                product_id : data2[i].product_id,
                product_name : data2[i].product,
                soni : data2[i].soni,
                ostatka : data2[i].ostatka,
                ed_izm : data2[i].get_edizm,
                price : data2[i].price,
                summa : data2[i].price*data2[i].soni
              })
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

@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}

.applied{
  pointer-events: none;
  background:#fcfcfc;
}

.timepiker{
  position: relative;
  width: 100%;
  margin-top:32px;
  cursor: pointer;
}

.fixed-column {
    /* overflow-y: auto; */

    margin-left: 100px;
  }

  .fixed-column th, .fixed-column td {
    white-space: nowrap;
  }

  .fixed-column tr th:first-child, .fixed-column tr td:first-child {
    position: absolute;
    width: 50px;
    top: auto;
    margin-left: -50px;
    margin-top: 0;
  }
  .delIcon:hover{
    color: #000;
    }
  .delIcon{
    color: red;
  }
  .gradint{
    background: #8E2DE2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

