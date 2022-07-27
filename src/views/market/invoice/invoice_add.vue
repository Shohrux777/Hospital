<template>
  <div class="m-4">
    <!--Navbar-->
    <!-- <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/movement">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Movements_in_warehouses')}}</mdb-card-title>
    </mdb-navbar> -->
    <!--/.Navbar-->
    <main style="border: 0.1px solid white; border-radius: 7px;" class="shadow">
      <form @submit.prevent="submit">
        <div class="container-fluid ">
          <div :class="{'applied': sklad_submitted}" class="container-fluid mt-3  shadow bgColorBack p-4" style=" border-radius: 7px;">

            <mdb-row >
              <mdb-col col="4">
                <mdb-input v-model="invoice_name" size="sm" :label="$t('Invoice_name')"  type="text" />
                <small class="invalid-text"  v-if="$v.invoice_name.$dirty && !$v.invoice_name.required" >
                    {{$t('name_invalid_text')}}
                  </small>
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                  :options="get_filial_list" :btnshow="false"
                  @select="select_comp"
                  :selected="company_name"
                  :label="$t('Company')"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text" >
                      {{$t('select_item')}}
                  </small>

              </mdb-col>
              <mdb-col col="4">
                <agentSelect
                    :options="get_agent_list.rows" :btnshow="false"
                    @select="select_agent"
                    :selected="agent_name"
                    :label="$t('Agent')"
                  />
                  <small v-if="$v.agent_name.$dirty && agent_id == null" class="invalid-text" >
                    {{$t('select_item')}}
                  </small>
              </mdb-col>
            </mdb-row>

          

            <!-- <mdb-row v-if="showfor_print">
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
            </mdb-row> -->

            <mdb-row>
              
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

                
                <div :class="{'applied': edit}">
                <div class="d_table " >

                <mdb-tbl class="fixed-column" >
                  <mdb-tbl-head>
                    <tr>
                      <td></td>
                      <!-- product -->
                      <td style="min-width:300px"> {{$t(datasource.columns[0])}} </td>
                      <td style="min-width:100px"> {{$t(datasource.columns[1])}} </td>
                      <td style="min-width:100px"> {{$t(datasource.columns[2])}} </td>
                      <td style="min-width:100px"> {{$t(datasource.columns[3])}} </td>
                      <td style="min-width:100px"> {{$t(datasource.columns[4])}} </td>
                      <!-- ed_izm -->
                    </tr>
                  </mdb-tbl-head>
                  <mdb-tbl-body>
                    <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                      <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="datasource.rows.splice( parseInt(rowIndex), 1)"></i></th>
                      <th>
                        <lineSelect
                            :options="get_m_product_list.rows" :row_index="rowIndex"
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
                         class="form-control form-control-sm">
                        <!-- <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                        v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                          {{$t('minValue')}}
                        </small> -->

                      </th>
                      <th> <input v-model="row.soni" type="text" class="form-control form-control-sm"> </th>
                      <th> <input v-model="row.price" @input="onChangeCount(row.soni,rowIndex)" type="text" class="form-control form-control-sm"> </th>
                      <th> <input v-model="row.summ" type="text" class="form-control form-control-sm" disabled>  </th>
                      
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
                <hr class="mt-4 mb-3 gradint"/>
                <div class="text-right pb-3" >
                  <mdb-btn  class="mr-2 py-2 px-3" type="submit" color="success"   style="font-size:10px;" 
                          icon="check"  size="md">{{$t(save_btn)}}</mdb-btn>

                  <!-- <mdb-btn class="mr-1" outline="primary" darkWaves tag="a" floating @click="send_data"
                          icon="paper-plane"  size="sm">{{$t('Send')}}</mdb-btn> -->
                </div>
            </div>
            </div>
          <hr v-if="!sklad_submitted" class="mt-4 mb-4 gradint"/>
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
import erpSelect from "../../../components/erpSelect.vue";
import agentSelect from "../../../components/agentSelect.vue";
import DatePicker from 'vue2-datepicker';
import lineSelect from "../../../components/lineSelect.vue";
import {mapActions, mapGetters,mapMutations} from "vuex";
import { required,minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';
import {
        mdbRow, mdbBtn,mdbInput, mdbCol,
     mdbTbl, mdbTblHead, mdbTblBody,
  } from "mdbvue";
import 'vue2-datepicker/index.css';
export default {
  components : {
      
      
      mdbTbl, mdbTblHead, mdbTblBody,
      mdbRow,mdbInput,
      mdbBtn,DatePicker,
      mdbCol,erpSelect,lineSelect,agentSelect
  },
  validations: {
      company_name : {required},
      agent_name : {required},
      invoice_name: {required},
      time1 : {required}, 

      datasource : {
        rows : {
          $each : {
            //soni : { minValue : minValue(1), required},
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

        invoice_name: '',

        save_btn : 'save',

        created_user : 1,
        changed_user : 1,
        id : this.$route.params.id,
        invoiceItems: [],
        time1: new Date(Date.now()),
        note : '',
        company_name : ' ', company_id : null,
        agent_id : null, agent_name : ' ',

        selected_row_index : -1,
        sklad_submitted : false,
        edit : false,
        datasource :
        {
          rows :[],
          // real_time
          columns: ['product','soni','realQty','price','summ'],
        }
      }
    },
    computed:mapGetters(['allcompanys','get_agent_list','sklad_list','CurrencyList','getDepartId','get_sklad',
    'product_fromsklad','get_m_product_list', 'get_filial_list']),
     methods : {
      ...mapActions(['fetchKontragets','fetch_m_agent','fetch_dept_list_id','fetch_sklad_list_id','fetchCurrency',
      'fetch_product_fromsklad','fetch_m_product']),
      ...mapMutations(['get_deparment_id_comp']),


     async select_comp(option){
        this.company_name = option.name;
        this.company_id = option.id;
    },
      select_agent(option){
        this.agent_name = option.fullName;
        this.agent_id = option.id;
      },
      selectproduct(option)
      {
        console.log(option)
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].main_item_id = option.data.id;
        this.datasource.rows[option.row].product_id = option.data.id;
        // this.datasource.rows[option.row].summ = this.datasource.rows[option.row].soni * this.datasource.rows[option.row].price;
      },
      onChangeCount(data,index)
      {
        this.datasource.rows[index].summ = data* this.datasource.rows[index].price;
      },

      applied()
      {
        if(this.edit) return;
        this.datasource.rows = [];
        if( this.$v.$invalid || this.agent_id == null  || this.company_id == null)
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
            realQty : null,
            price : null,
            summ: 0,
          })

            //appData.updated()
        },

      async submit()
      {
        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return;
        }
        this.edit =  !this.edit;
        this.invoiceItems = [];
        console.log(this.datasource.rows)
        for(var i = 0; i < this.datasource.rows.length; i++){
          var a = {
            marketProductId: null,
            qty: null,
            realQty: 0,
            unitprice: null,
            exiparedDateTimeBegin: "2021-08-26T03:30:10.364Z",
            exiparedDateTimeEnd: "2021-08-26T03:30:10.364Z",
          }
          a.marketProductId = this.datasource.rows[i].product_id;
          a.qty = this.datasource.rows[i].soni
          a.realQty = this.datasource.rows[i].soni
          a.unitprice = this.datasource.rows[i].price
          this.invoiceItems.push(a);
        }
        console.log('this.invoiceItems')
        console.log(this.invoiceItems)
         const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "createdDateTime": this.time1,
              "updateDateTime": this.time1,
              "companyId" : this.company_id,
              "marketAgentId" : this.agent_id,
              "authorizationId" : localStorage.AuthId,
              "invoceNumber" : '1',
              "note" : this.note,
              "marketInvoiceItems" : this.invoiceItems,
              // "time1" : this.time1.toLocaleString("es-CL"),
              // "count" : this.datasource.rows.reduce((a, b) => +a + +b.soni, 0),
              // "summa" : this.datasource.rows.reduce((a, b) => +a + +b.summa, 0),
             // "createdUserId" : 3,        //auth dan olish ke rak
             // "changed_user" : this.changed_user,
            })
          };
            // console.log(requestOptions.body)
           const response = await fetch(this.$store.state.hostname + "/MarketInvoices", requestOptions);
           const data = await response.json();
           if(data.id)
            {
              console.log(data)
              // this.$refs.message.success('Added_successfully')
              this.$store.state.alert = true;
              this.$router.push("/medicineMin");
            }
            else{

              this.modal_info = data.detail + "    (" + data.routine + ")" ;
              this.modal_status = true;

            }

      },
    },

   async mounted(){
      var uuid = require('uuid');
      this.invoice_name = uuid.v1();
      await  this.fetchKontragets({ hostname: this.$store.state.hostname});
      console.log(this.get_filial_list)
      this.company_name = this.get_filial_list[0].name;
      this.company_id =  this.get_filial_list[0].id;
      await this.fetch_m_product();
      await this.fetch_m_agent();
      if(this.get_agent_list.rows.length != 0){
        this.agent_name = this.get_agent_list.rows[0].fullName;
        this.agent_id = this.get_agent_list.rows[0].id;
      }
        

        // await this.fetchCurrency();
        // if(this.CurrencyList.length > 0)
        // {
        //   this.valuta.selectedId = this.CurrencyList[0].id;
        //   this.valuta.selected = this.CurrencyList[0].name;
        //   this.kurs_valut = this.CurrencyList[0].forbuy;
        // }
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
          this.agent_id = data[0].main_agent_id
          this.agent_name = data[0].main_dept
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

