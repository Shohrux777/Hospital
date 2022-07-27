<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/simple_prod">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{'Add_simple_production'|locolize}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="card p-4 ">
      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row>
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

          <mdb-row>
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
                  :options="product_list" :btnshow="false"
                  @select="selectFinalProduct"
                  :selected="final_product"
                  :label="'product'|locolize"
                />

              </mdb-col>
              <mdb-col col="2">
                <mdb-input v-model="product_count" @input="onChangePCount" size="sm" :label="'count'|locolize"  type="number"
                 onkeypress="return event.charCode >= 48"/>

              </mdb-col>

          </mdb-row>

           <mdb-row >
            <mdb-col col="3">
              <erpSelect
                  :options="color_list" :btnshow="false"
                  @select="selectColor"
                  :selected="color_name"
                  :label="'menu_color'|locolize"
              />

               <small v-if="$v.color_name.$dirty && color_id == null" class="invalid-text" >
                    {{'select_item'|locolize}}
               </small>

            </mdb-col>
            <!-- <mdb-col col="3">
              <erpSelect
                  :options="dept_list" :btnshow="false"
                  @select="selectdept"
                  :selected="dept_name"
                  :label="'dept'|locolize"
                />
                <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text" >
                  {{'select_item'|locolize}}
                </small>
            </mdb-col> -->
            <mdb-col col="3">
              <mdb-input v-model="note" type="textarea" style="margin-top: 8px; margin-bottom: 0px; height: 32px;" :label="'Descriptions'|locolize" icon="pencil-alt" />
            </mdb-col>
          </mdb-row>

            <h4 class="mt-5">{{'Recipes'|locolize}}</h4>
            <div class="d_table mt-4">
            <mdb-tbl class="fixed-column" >
              <mdb-tbl-head>
                <tr>
                  <td></td>
                  <!-- product -->
                  <td style="min-width:300px"> {{datasource.columns[0]|locolize}} </td>
                  <td style="min-width:80px"> {{datasource.columns[1]|locolize}} </td>
                  <td style="min-width:80px"> {{datasource.columns[2]|locolize}} </td>
                  <td style="min-width:80px"> {{datasource.columns[3]|locolize}} </td>
                  <!-- ed_izm
                  <td style="min-width:80px"> {{datasource.columns[4]|locolize}} </td> -->
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
                    v-if="($v.datasource.rows.$each[rowIndex].product_id.$dirty && !$v.datasource.rows.$each[rowIndex].product_id.minValue)" >
                      {{'Select_product'|locolize}}
                    </small>
                  </th>
                  <th>
                    <input v-model="row.precentage" type="number" min="0"
                    onkeypress="return event.charCode >= 48" class="form-control form-control-sm"
                    @input="onChangePresentage(row.precentage,rowIndex)">
                  </th>
                  <th>
                    <input v-model="row.soni" type="number" step="any"
                    onkeypress="return event.charCode >= 48" class="form-control form-control-sm">
                    <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                    v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                    ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                       {{'minValue'|locolize}}
                    </small>

                  </th>
                  <th> <input v-model="row.ostatka" type="text" class="form-control form-control-sm" disabled> </th>
                  <!-- <th> <input v-model="row.note" type="text" class="form-control form-control-sm"> </th> -->
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>

            <!-- <div class="cyrcle_btn ml-5 z-depth-1-half "  v-on:click="addRow" v-mdb-waves="{ duration : 'long' , fixed : true}" >
                <i class="fas fa-plus white-text d-flex justify-content-center " style="padding-top:11px"></i>
            </div> -->
            <circle-btn @on_click="addRow"/>
            </div>

          <hr class="mt-5"/>
          <mdb-btn class="float-right" type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{'save'|locolize}}</mdb-btn>
        </div>
      </form>

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
      </div>

    </main>

  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";
import DatePicker from 'vue2-datepicker';
import lineSelect from "../../components/lineSelect.vue";
import {mapActions, mapGetters} from "vuex";
import { required, minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';
import {
    mdbNavbar, mdbCardTitle, mdbIcon, mdbRow, mdbBtn,mdbInput, mdbCol,
    mdbTbl, mdbTblHead, mdbTblBody,
} from "mdbvue";
import 'vue2-datepicker/index.css';
  export default {
    name: "category_add",
    components: {
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
      color_name : {required},
      sklad_name : {required},
      kurs_valut : {required},
      time1 : {required},
      datasource : {
        rows : {
          $each : {
            soni : { minValue : minValue(0.00000001), required},
            product_id : {minValue : minValue(0.00000001)}
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
        modal_status : false,

        color_name : '',
        color_id : null,
        note : '',
        final_product_id : null, final_product : '',
        product_count : 1,
        time1: new Date(Date.now()),
        company_name : ' ', company_id : null,
        dept_id : null, dept_name : ' ',
        sklad_id : null, sklad_name : ' ',

        valuta : { selected: ' ', selectedId : null,},
        kurs_valut : '',

        selected_row_index : -1,
        datasource :
        {
          rows : [],
          // real_time
          columns: ['product','Percentage','soni','ostatka','note'],
        }
      }
    },
    methods : {
      ...mapActions(['fetch_companylist','fetch_color_list', 'fetch_dept_list_id','fetch_sklad_list_id','fetch_valuta_list',
      'fetch_product_list','fetch_product_fromsklad']),

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
       selectvaluta(option)
      {
        this.valuta.selected = option.name;
        this.valuta.selectedId = option.id;
        this.kurs_valut = option.forbuy;
      },
      selectFinalProduct(option)
      {
        this.final_product = option.name;
        this.final_product_id = option.id;
      },
      selectproduct(option)
      {
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].product_id = option.data.product_id;
        this.datasource.rows[option.row].main_item_id = option.data.id;
        this.datasource.rows[option.row].ostatka = option.data.ostatka;
        //this.datasource.rows[option.row].ed_izm = option.data.ed_izm;
      },

      selectColor(option)
      {
        this.color_name = option.name;
        this.color_id = option.id;
      },

      onChangePresentage(data,index)
      {
        this.datasource.rows[index].soni = data* this.product_count /100;

      },
      onChangePCount()
      {
        this.datasource.rows.forEach(elem => {
          elem.soni = elem.precentage*this.product_count/100;
        })
      },
      addRow() {
       // console.log("test : "  + this.datasource.rows[0].product.name);
            this.datasource.rows.push({
            product_id : null,
            main_item_id : 0,
            product_name : '',
            soni : null,
            precentage : null,
            ostatka : '',
            // note : '',

          })
            //appData.updated()
        },

      async submit()
      {
        if(this.$v.$invalid || this.dept_id == null || this.sklad_id == null || this.company_id == null)
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
            "count" : this.product_count,
            "final_product_id" : this.final_product_id,
            "summa" : 0,
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

           const response = await fetch(this.$store.state.hostname + "/simple_prod", requestOptions);
           const data = await response.json();
           if(data.res)
            {
              // this.alert_text = localizeFilter('Added_successfully');
              this.alert_success = true;
              this.$router.push("/simple_prod");
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

                 var cmd = ' and sk.id=' + this.sklad_list[0].id;
                 await this.fetch_product_fromsklad(cmd);
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
        this.fetch_product_list();
        this.fetch_color_list();
    },
    computed:mapGetters(['allcompanys','dept_list','sklad_list','valuta_list',
    'product_list','color_list','product_fromsklad']),
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
