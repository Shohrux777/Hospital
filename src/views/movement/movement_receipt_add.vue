<template>
  <div>
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/movement">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{'Movements_in_warehouses'|locolize}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="card p-4 ">
      <form @submit.prevent="submit">
        <div class="container">
          <div :class="{'applied': sklad_submitted}" >
            <mdb-row >
              <mdb-col col="3">
                <date-picker class="timepiker " v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>

              </mdb-col>
              <small v-if="$v.time1.$dirty && !$v.time1.required" style="padding:90px 0 0 15px" class="invalid-text" >
                    {{'invalid_time'|locolize}}
                </small>
            </mdb-row>

            <mdb-row >
              <mdb-col col="4">
                <erpSelect
                  :options="allcompanys" :btnshow="false"
                  @select="select_comp"
                  :selected="company_name"
                  :label="'Branch_of_the_Company'|locolize"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text" >
                      {{'select_item'|locolize}}
                  </small>

              </mdb-col>
              <mdb-col col="4">
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
              <mdb-col col="4">
                <erpSelect
                      :options="sklad_list" :btnshow="false"
                      @select="selectsklad"
                      :selected="sklad_name"
                      :label="'sklad'|locolize"
                    />
                    <small v-if="$v.sklad_name.$dirty && sklad_id == null" class="invalid-text" >
                    {{'select_item'|locolize}}
                    </small>
              </mdb-col>
            </mdb-row>

            <mdb-row >
              <mdb-col col="4">
                <erpSelect
                  :options="allcompanys" :btnshow="false"
                  @select="select_comp_recipient"
                  :selected="company_recipient"
                  :label="'Branch_of_recipient'|locolize"
                />
                <small v-if="$v.company_recipient.$dirty && company_recipient_id == null" class="invalid-text" >
                      {{'select_item'|locolize}}
                  </small>

              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                    :options="dept_list" :btnshow="false"
                    @select="selectdept_recipient"
                    :selected="dept_recipient"
                    :label="'Department_of_recipient'|locolize"
                  />
                  <small v-if="$v.dept_recipient.$dirty && dept_recipient_id == null" class="invalid-text" >
                    {{'select_item'|locolize}}
                  </small>
              </mdb-col>
              <mdb-col col="4">
                <erpSelect
                      :options="sklad_list" :btnshow="false"
                      @select="selectsklad_recipient"
                      :selected="sklad_recipient"
                      :label="'Warehouse_of_recipient'|locolize"
                    />
                    <small v-if="$v.sklad_recipient.$dirty && sklad_recipient_id == null" class="invalid-text" >
                    {{'select_item'|locolize}}
                    </small>
              </mdb-col>
            </mdb-row>

            <mdb-row v-if="showfor_print">
                <mdb-col col="4">
                  <erpSelect
                    :options="valuta_list" :btnshow="false"
                    @select="selectvaluta"
                    :selected="valuta.selected"
                    :label="'menu_currency'|locolize"
                  />

                </mdb-col>
                <mdb-col col="2">
                  <mdb-input v-model="kurs_valut" size="sm" :label="'kurs_valyut'|locolize" icon="dollar-sign" type="number" />
                  <small class="invalid-text"  v-if="$v.kurs_valut.$dirty && !$v.kurs_valut.required" >
                    {{'invalid_Currency'|locolize}}
                  </small>
                </mdb-col>

            </mdb-row>

            <mdb-row>
              <mdb-col col="4">
                <erpSelect
                  :options="service_type_list" :btnshow="false"
                  @select="selectservice_type"
                  :selected="service_type.selected"
                  :label="'Service_type'|locolize"
                />

              </mdb-col>
              <mdb-col col="4" >
                <mdb-input v-model="note" type="textarea" style="margin-top: 8px; margin-bottom: 0px; height: 32px;" :label="'Descriptions'|locolize" icon="pencil-alt" />
              </mdb-col>

            </mdb-row>
          </div>

            <!-- <mdb-btn slot="reference" class="mr-1" outline="primary" @click="applied"
                    darkWaves tag="a" floating far icon="paper-plane"  size="sm" >{{'apply'|locolize}}</mdb-btn> -->

            <div v-if="sklad_submitted">
              <h4 class="mt-5 mb-4">{{'Invoice_element'|locolize}}</h4>

                <div class="d-inline" >
                        <mdb-btn class="mr-1" @click="when_accepted" outline="primary" darkWaves tag="a" floating
                          icon="paper-plane"  size="sm">{{'Receive'|locolize}}</mdb-btn>
                </div>

                <div :class="{'applied': edit}">
                <div class="d_table " >

                <mdb-tbl class="fixed-column" >
                  <mdb-tbl-head>
                    <tr>
                      <td></td>
                      <!-- product -->
                      <td style="min-width:300px"> {{datasource.columns[0]|locolize}} </td>
                      <td style="min-width:80px"> {{datasource.columns[1]|locolize}} </td>
                      <td style="min-width:80px"> {{datasource.columns[2]|locolize}} </td>
                      <td style="min-width:80px"> {{datasource.columns[3]|locolize}} </td>
                      <!-- ed_izm -->
                      <td style="min-width:80px"> {{datasource.columns[4]|locolize}} </td>
                      <td style="min-width:80px"> {{datasource.columns[5]|locolize}} </td>
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
                            :label="'product'|locolize"
                        />
                        <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                        v-if="($v.datasource.rows.$each[rowIndex].item_id.$dirty && !$v.datasource.rows.$each[rowIndex].item_id.minValue)" >
                          {{'Select_product'|locolize}}
                        </small>
                      </th>

                      <th>
                        <input v-model="row.soni" type="number" min="0"  @input="onChangeCount(row.soni,rowIndex)"
                        onkeypress="return event.charCode >= 48" class="form-control form-control-sm">
                        <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                        v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                          {{'minValue'|locolize}}
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
                <circle-btn @on_click="addRow"/>
                </div>

              <hr class="mt-5"/>

            </div>
            </div>

        </div>
      </form>

      <div>
        <massage_box :hide="modal_status" :detail_info="modal_info"
         :m_text="'Failed_to_delete'|locolize" @to_hide_modal = "modal_status= false"/>
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
      </div>

    </main>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";
import DatePicker from 'vue2-datepicker';
import lineSelect from "../../components/lineSelect.vue";
import {mapActions, mapGetters} from "vuex";
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
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        showfor_print : false,

        created_user : 1,
        changed_user : 1,
        id : this.$route.params.id,

        service_type : { selected: 'Реализация', selectedId:1,},
        time1: new Date(Date.now()),
        company_recipient : ' ', company_recipient_id : null,
        dept_recipient_id : null, dept_recipient : ' ',
        sklad_recipient_id : null, sklad_recipient : ' ',
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
     methods : {
      ...mapActions(['fetch_companylist','fetch_dept_list_id','fetch_sklad_list_id','fetch_valuta_list',
      'fetch_product_fromsklad','fetch_service_type_list']),

      when_accepted()
      {
          // this.alert_text = localizeFilter('Added_successfully');
          // this.alert_success = true;
          this.$router.push("/movement_receipt");
      },

      select_comp(option){
        this.company_name = option.name
        this.company_id = option.id

        this.fetch_dept_list_id(this.company_id);
        this.dept_id = null;
        this.dept_name = '';

        this.fetch_sklad_list_id(this.dept_id);
        this.sklad_id = null;
        this.sklad_name = '';
      },

      selectdept(option)
      {
        this.dept_name = option.name;
        this.dept_id = option.id;
        this.fetch_sklad_list_id(this.dept_id);

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

      select_comp_recipient(option){
        this.company_recipient = option.name
        this.company_recipient_id = option.id

        this.fetch_dept_list_id(this.company_recipient_id);
        this.dept_recipient_id = null;
        this.dept_recipient = '';

        this.fetch_sklad_list_id(this.dept_recipient_id);
        this.sklad_recipient_id = null;
        this.sklad_recipient = '';
      },
      selectdept_recipient(option)
      {
        this.dept_recipient = option.name;
        this.dept_recipient_id = option.id;
        this.fetch_sklad_list_id(this.dept_recipient_id);

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

        if(this.$v.$invalid )
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
            "time1" : this.time1.toLocaleString("es-CL"),
            "count" : this.datasource.rows.reduce((a, b) => +a + +b.soni, 0),
            "summa" : this.datasource.rows.reduce((a, b) => +a + +b.summa, 0),
            "service_type_id" : this.service_type.selectedId,
            "company_recipient_id" : this.company_recipient_id,
            "dept_recipient_id" : this.dept_recipient_id,
            "sklad_recipient_id" : this.sklad_recipient_id,
            "company_id" : this.company_id,
            "dept_id" : this.dept_id,
            "sklad_id" : this.sklad_id,
            "valuta_id" : this.valuta.selectedId,
            "kurs_valut" : this.kurs_valut,
            "created_user" : this.created_user,
            "changed_user" : this.changed_user,
            "items" : this.datasource.rows,
            })
          };

           const response = await fetch(this.$store.state.hostname + "/movement", requestOptions);
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
      await this.fetch_companylist();
        if(this.allcompanys.length > 0)
        {
          this.company_name = this.allcompanys[0].name;
          this.company_id = this.allcompanys[0].id;

          this.company_recipient = this.allcompanys[0].name;
          this.company_recipient_id = this.allcompanys[0].id;

          await this.fetch_dept_list_id(this.company_id);
            if(this.dept_list.length > 0)
            {
              this.dept_name = this.dept_list[0].name;
              this.dept_id = this.dept_list[0].id;

              await this.fetch_sklad_list_id(this.dept_id);
              if(this.sklad_list.length > 0)
              {
                this.sklad_name = this.sklad_list[0].name;
                this.sklad_id = this.sklad_list[0].id;
              }
            }
        }

        await this.fetch_valuta_list();
        if(this.valuta_list.length > 0)
        {
          this.valuta.selectedId = this.valuta_list[0].id;
          this.valuta.selected = this.valuta_list[0].name;
          this.kurs_valut = this.valuta_list[0].forbuy;
        }
        this.fetch_product_fromsklad();
        this.fetch_service_type_list();

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
    computed:mapGetters(['allcompanys','dept_list','sklad_list','valuta_list',
    'product_fromsklad','service_type_list']),
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
</style>

