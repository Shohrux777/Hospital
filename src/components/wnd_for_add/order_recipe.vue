<template>
  <div>
    <form @submit.prevent="submit">
             <!-- Info -->
             <div>
                <mdb-row>
                  <mdb-col col="5">
                     <erpSelect
                        :options="sklad_list" :btnshow="false"
                        @select="select_sklad"
                        :selected="sklad"
                        :label="'sklad'|locolize"
                      />
                  </mdb-col>
                  <mdb-col col="3">
                    <!-- Default checked -->
                    <div class="custom-control custom-switch pt-4 pl-5">
                        <input v-model="all_company" type="checkbox" class="custom-control-input " id="customSwitch1" >
                        <label class="custom-control-label " for="customSwitch1">{{'All_companies'|locolize}}</label>
                    </div>
                  </mdb-col>
                </mdb-row>

             </div>
             <div class="d_table mt-4">
              <mdb-tbl class="fixed-column x_overflow" >
                <mdb-tbl-head>
                  <tr>
                    <td></td>
                    <!-- product -->
                    <td style="min-width:180px"> {{recipe.columns[0]|locolize}} </td>
                    <td style="min-width:240px"> {{recipe.columns[1]|locolize}} </td>
                    <td style="min-width:80px">  {{recipe.columns[2]|locolize}} </td>
                    <td style="min-width:100px"> {{recipe.columns[3]|locolize}} </td>
                    <td style="min-width:100px"> {{recipe.columns[4]|locolize}} </td>
                    <td style="min-width:100px"> {{recipe.columns[5]|locolize}} </td>
                    <td style="min-width:180px"> {{recipe.columns[6]|locolize}} </td>
                  </tr>
                </mdb-tbl-head>
                <mdb-tbl-body>
                  <tr  scope="row" v-for="(row,rowIndex) in recipe.rows" :key="rowIndex" :width="row.size">
                    <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="recipe.rows.splice( parseInt(rowIndex), 1)"></i>
                    </th>
                    <th>
                      <lineSelect
                          :options="kontragent_list" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_kontragent_list"
                          :selected="row.kontragent"
                          label=""
                      />

                    </th>
                    <th>
                      <lineSelect
                          :options="product_fromsklad" :row_index="rowIndex"
                          :searchshow="true"
                          @select="selectproduct_recipe"
                          :selected="row.product_name"
                          label=""
                      />

                    </th>
                    <th> <input v-model="row.ed_izm" class="form-control form-control-sm" disabled></th>

                     <th> <input v-model="row.soni" type = "number" step="0.00001" class="form-control form-control-sm" >

                      <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                        v-if="($v.recipe.rows.$each[rowIndex].soni.$dirty && !$v.recipe.rows.$each[rowIndex].soni.minValue) ||
                        ($v.recipe.rows.$each[rowIndex].soni.$dirty && !$v.recipe.rows.$each[rowIndex].soni.required)" >
                          {{'minValue'|locolize}}
                      </small>
                     </th>
                     <th> <input v-model="row.ostatka" class="form-control form-control-sm" disabled></th>
                     <th> <input v-model="row.partiya_id" class="form-control form-control-sm" disabled></th>
                     <th> <input v-model="row.time1" class="form-control form-control-sm" disabled></th>


                  </tr>
                </mdb-tbl-body>
              </mdb-tbl>

              <circle-btn class="m-2" @on_click="addRow_recipe"/>
             </div>

              <hr class="mt-5"/>

              <mdb-btn color="success" m="r3" type="submit"
                p="r4 l4 t2 b2">
                <mdb-icon icon="check" class="mr-2"/>{{'add'|locolize}}</mdb-btn>

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

  </div>
</template>

<script>
import lineSelect from "../../components/lineSelect";
import erpSelect from "../../components/erpSelect.vue"
import { required, minValue } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex';

  import {
    mdbTbl, mdbTblHead, mdbTblBody,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

  export default {

    components: {
      lineSelect,
      mdbTbl, mdbTblHead, mdbTblBody,
      mdbIcon,
      mdbBtn,erpSelect,
      mdbRow,
      mdbCol

    },
    props:{
       datasource:{
        type: Object,
        default(){
          return {}
        }
      }

    },

    data(){
      return {
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,

        sklad_id : null,
        sklad : '',
        all_company : false,

        recipe :
        {
          rows :[],
          // real_time
          columns: [ 'company_name','product','ed_izm1','soni','ostatka','partiya_id','Data'],
        },
      }

    },
    validations: {
      recipe : {
        rows : {
          $each : {
             soni : { minValue : minValue(0.00000001), required},
             //product_id : {minValue : minValue(0.00000001)}
          }

        }
      }
    },

     mounted (){
        this.fetch_kontragentlist();
        this.fetch_product_fromsklad();
        this.fetch_sklad_list();
     },
    computed: mapGetters(['kontragent_list','product_fromsklad','sklad_list']),
    methods: {
      ...mapActions(['fetch_kontragentlist',
      'fetch_sklad_list','fetch_product_fromsklad']),
       select_kontragent_list(option)
      {
         this.recipe.rows[option.row].kontragent = option.data.name;
         this.recipe.rows[option.row].kontragent_id = option.data.id;
      },
      select_sklad(option)
      {
         this.sklad = option.name;
         this.sklad_id = option.id;
      },
      selectproduct_recipe(option)
      {
         this.recipe.rows[option.row].product_name = option.data.name_without_date;
         this.recipe.rows[option.row].product_id = option.data.id;
         // console.log(option.data)

         this.recipe.rows[option.row].ed_izm = option.data.ed_izm;
         this.recipe.rows[option.row].ostatka = option.data.ostatka;
         this.recipe.rows[option.row].time1 = option.data.date;
      },

      addRow_recipe() {
      // console.log( this.datasource.rows);
            this.recipe.rows.push({
            product_id : null,
            product_name : '',
            kontragent_id : null,
            kontragent : '',
            ostatka : '',
            ed_izm : null,
            soni : null,
            partiya_id : null,
            time1 : null,
          })

        },
      save_data :  async function()
      {

        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.alert_danger = true;
          return false;
        }
        console.log(this.recipe.rows);

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({

            "color_variant_id" : this.comp_id,
            "created_user" : 1,
            "items" : this.recipe.rows
            })
          };
          const response = await fetch(this.$store.state.hostname + "/color_variant_recipe", requestOptions);
          const data = await response.json();
          if(data.res)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.alert_success = true;
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },

     async submit()
      {
          if(await this.save_data())
          {
            this.$emit('submit_success');

          }
      }
    },


  }
</script>



<style scoped>

/* for select */
input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
.x_overflow
{
  overflow-x: scroll;
  padding-bottom: 200px;
}
</style>

