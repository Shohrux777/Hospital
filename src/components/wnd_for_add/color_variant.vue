<template>
  <div>
    <form @submit.prevent="submit">
             <!-- Info -->
             <div class="applied">
                <mdb-row>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.time1" size="sm" :label="'date'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.color" size="sm" :label="'color'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.product" size="sm" :label="'product'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.color_variant" size="sm" :label="'Color_option'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                </mdb-row>

                <mdb-row>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.gus_color" size="sm" :label="'gus_color'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.color_variant_type" size="sm" :label="'Color_option_type'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                  <mdb-col col="3">
                    <mdb-input v-model="datasource.color_proccess" size="sm" :label="'Process'|locolize"
                     group type="text" validate error="wrong" success="right"/>
                  </mdb-col>
                </mdb-row>
             </div>
             <div class="d_table mt-4">
              <mdb-tbl class="fixed-column" >
                <mdb-tbl-head>
                  <tr>
                    <td></td>
                    <!-- product -->
                    <td style="min-width:220px"> {{recipe.columns[0]|locolize}} </td>
                    <td style="min-width:100px"> {{recipe.columns[1]|locolize}} </td>
                    <td style="min-width:80px">  {{recipe.columns[2]|locolize}} </td>
                    <td style="min-width:180px"> {{recipe.columns[3]|locolize}} </td>
                  </tr>
                </mdb-tbl-head>
                <mdb-tbl-body>
                  <tr  scope="row" v-for="(row,rowIndex) in recipe.rows" :key="rowIndex" :width="row.size">
                    <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="recipe.rows.splice( parseInt(rowIndex), 1)"></i>
                    </th>
                    <th>
                      <lineSelect
                          :options="product_list" :row_index="rowIndex"
                          :searchshow="true"
                          @select="selectproduct_recipe"
                          :selected="row.product_name"
                          label=""
                      />

                    </th>
                    <th>
                      <lineSelect
                          :options="measurment_type_list" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_measurment_type_list"
                          :selected="row.measurement_type"
                          label=""
                      />
                    </th>
                     <th> <input v-model="row.soni" type = "number" step="0.00001" class="form-control form-control-sm" >

                      <small class="invalid-text" style="padding-top:26px; position:relative; margin:0"
                        v-if="($v.recipe.rows.$each[rowIndex].soni.$dirty && !$v.recipe.rows.$each[rowIndex].soni.minValue) ||
                        ($v.recipe.rows.$each[rowIndex].soni.$dirty && !$v.recipe.rows.$each[rowIndex].soni.required)" >
                          {{'minValue'|locolize}}
                      </small>
                     </th>

                    <th>
                      <lineSelect
                          :options="recipe_stage_list" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_recipe_stage_list"
                          :selected="row.recipe_stage"
                          label=""
                      />
                    </th>

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
import { required, minValue } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex';

  import {
    mdbInput,mdbTbl, mdbTblHead, mdbTblBody,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";

  export default {

    components: {
      lineSelect,
      mdbInput,mdbTbl, mdbTblHead, mdbTblBody,
      mdbIcon,
      mdbBtn,
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

         recipe :
        {
          rows :[],
          // real_time
          columns: [ 'product', 'measurment_type','soni','recipe_stage' ],
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
        this.fetch_measurment_type_list();
        this.fetch_recipe_stage_list();
        this.fetch_product_list();
     },
    computed: mapGetters(['measurment_type_list','recipe_stage_list','product_list']),
    methods: {
      ...mapActions(['fetch_measurment_type_list','fetch_recipe_stage_list','fetch_product_list']),
       select_measurment_type_list(option)
      {
         this.recipe.rows[option.row].measurement_type = option.data.name;
         this.recipe.rows[option.row].measurment_id = option.data.id;
      },
      selectproduct_recipe(option)
      {
         this.recipe.rows[option.row].product_name = option.data.name;
         this.recipe.rows[option.row].product_id = option.data.id;
        //  console.log(option.data)

         this.recipe.rows[option.row].recipe_stage = ''
         this.recipe.rows[option.row].colorvariant_recipestage_id = null
      },
      select_recipe_stage_list(option)
      {
        this.recipe.rows[option.row].recipe_stage = option.data.name;
        this.recipe.rows[option.row].colorvariant_recipestage_id = option.data.id;

        this.recipe.rows[option.row].product_name = '';
        this.recipe.rows[option.row].product_id = null;
        this.recipe.rows[option.row].measurement_type = '';
        this.recipe.rows[option.row].measurment_id = null;
        this.recipe.rows[option.row].soni = 1;

      },
      addRow_recipe() {
      // console.log( this.datasource.rows);
            this.recipe.rows.push({
            product_id : null,
            product_name : '',
            measurement_type : '',
            measurment_id : null,
            recipe_stage : '',
            colorvariant_recipestage_id : null,
            soni : null,
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

</style>

