<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/color">
        <a class="ml-2 mr-2 p-3" :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('New_color')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 6px;">

      <form @submit.prevent="submit">
        <div class="container">

          <div :class="{'applied': color_applied}">
            <mdb-row>
            <mdb-col col="6">
              <mdb-input v-model="d_name" size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text"  v-if="$v.d_name.$dirty && !$v.d_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>

            </mdb-row>
            <mdb-row >
              <mdb-col col="6">
                <erpSelect
                  :options="allcompanys"
                  @select="selectOption"
                  :selected="selected"
                  :label="$t('company_name')"
                />
                <small v-if="$v.selected.$dirty && selectedId == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-col col="6">
                <div id="color-picker-wrapper" v-bind:style="{ backgroundColor: color}">
                  <input type="color" v-model="color">
                </div>
                <p class="ml-5">{{color}}</p>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-col col="6">
                <erpSelect
                  :options="colorGroupList.rows" :btnshow="false"
                  @select="selectColorGr"
                  :selected="color_gr.selected"
                  :label="$t('color_group')"
                />
                <small v-if="$v.color_gr.selected.$dirty && color_gr.selectedId == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-col col="6">
                <mdb-input v-model="pantone_code" size="sm" :label="$t('pantone_code')"
                icon="code" group type="text" validate error="wrong" success="right"/>
              </mdb-col>

            </mdb-row>
            <mdb-row >
              <mdb-col col="6">
                <mdb-input v-model="paint_code" size="sm" :label="$t('dieing_code')" icon="code" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
              <mdb-col col="2">
                <!-- Default checked -->
                <!-- <div class="custom-control custom-switch pt-4 pl-5">
                    <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
                    <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
                </div> -->
              </mdb-col>


            </mdb-row>
          </div>

          <mdb-btn slot="reference" class="mr-1 mt-3" outline="primary" @click="applied"
                    darkWaves tag="a" floating far icon="paper-plane"  size="sm" >{{$t('add and apply')}}</mdb-btn>

            <div v-if="color_applied" >
              <h4 class="mt-5">{{$t('Color_option')}}</h4>
              <div class="d_table mt-4" style="position: relative;">
              <mdb-tbl class="fixed-column  x_overflow" >
                <mdb-tbl-head>
                  <tr>
                    <td  ></td>
                    <!-- product -->
                    <td style="min-width:70px"> {{$t(datasource.columns[0])}} </td>
                    <td style="min-width:160px"> {{$t(datasource.columns[1])}} </td>
                    <td style="min-width:140px"> {{$t(datasource.columns[2])}} </td>
                    <td style="min-width:160px"> {{$t(datasource.columns[3])}} </td>
                    <td style="min-width:140px"> {{$t(datasource.columns[4])}} </td>
                    <td style="min-width:140px"> {{$t(datasource.columns[5])}} </td>
                    <td style="min-width:50px"> {{$t(datasource.columns[6])}} </td>
                    <td style="min-width:140px"> {{$t(datasource.columns[7])}} </td>
                    <td style="min-width:140px"> {{$t(datasource.columns[8])}} </td>
                    <td style="min-width:120px"> {{$t(datasource.columns[9])}} </td>
                    <!-- ed_izm
                    <td style="min-width:80px"> {{datasource.columns[4]|locolize}} </td> -->
                  </tr>
                </mdb-tbl-head>
                <mdb-tbl-body >
                  <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                    <th >
                      <mdb-btn-toolbar class="">
                        <mdb-btn-group >
                          <mdb-btn class=" m-0 ml-1 p-1" :disabled="row.save_color == 'success'" :color="row.save_color"  size="sm"  icon="save" style="font-size:16px"
                          @click="save_colorV(rowIndex)" />
                          <mdb-btn class="m-0 ml-1 p-1"  size="sm" color="success" icon="edit" style="font-size:16px"
                          @click="edit_colorV(rowIndex)"/>
                          <mdb-btn class="m-0 ml-1 p-1"  size="sm" color="danger" icon="trash-alt" style="font-size:16px"
                          @click="delete_colorV(rowIndex)"/>
                        </mdb-btn-group>
                      </mdb-btn-toolbar>

                    </th>
                    <th><mdb-btn class="m-0" size="sm" color="primary" @click="open_recipe(rowIndex)">
                      {{$t('Open')}} </mdb-btn>
                    </th>

                    <th> <input v-model="row.colorVariantName" type="text" class="form-control form-control-sm" disabled> </th>
                    <th :class="{'applied': row.colorV_applied}">
                      <!-- :label="'gus_color'|locolize" -->
                      <lineSelect
                          :options="guscolor.rows" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_guscolor"
                          :selected="row.gus_color_name"
                          label=""
                      />
                    </th>
                    <th :class="{'applied': row.colorV_applied}">
                      <!--  :label="'product'|locolize" -->
                      <lineSelect
                          :options="product_test_list" :row_index="rowIndex"
                          :searchshow="true"
                          @select="selectproduct"
                          :selected="row.product_name"
                          label=""
                      />
                      <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                      v-if="($v.datasource.rows.$each[rowIndex].product_id.$dirty && !$v.datasource.rows.$each[rowIndex].product_id.required)" >
                        {{$t('Select_product')}}
                      </small>
                    </th >
                    <th :class="{'applied': row.colorV_applied}">
                      <!-- :label="'Process'|locolize" -->
                      <lineSelect
                          :options="processAll" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_proccess_list"
                          :selected="row.proccess_name"
                          label=""
                      />
                    </th>

                    <th :class="{'applied': row.colorV_applied}">
                      <!-- :label="'Color_option_type'|locolize" -->
                      <lineSelect
                          :options="colorVariantType.rows" :row_index="rowIndex"
                          :searchshow="true"
                          @select="select_color_option_type_list"
                          :selected="row.color_option_type"
                          label=""
                      />
                      <small class="invalid-text" style="padding-top:26px;  position:relative; margin:0"
                      v-if="($v.datasource.rows.$each[rowIndex].color_option_type_id.$dirty && !$v.datasource.rows.$each[rowIndex].color_option_type_id.required)" >
                        {{$t('Select_product')}}
                      </small>
                    </th>
                    <th :class="{'applied': row.colorV_applied}">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input"
                        :checked="row.status" >
                        <label class="custom-control-label" @click="row.status = !row.status"></label>
                      </div>
                    </th>
                    <th :class="{'applied': row.colorV_applied}"> <input v-model="row.note" type="text" class="form-control form-control-sm"> </th>
                    <th :class="{'applied': row.colorV_applied}">
                      <date-picker class="timepiker " v-model="row.time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
                    </th>
                    <th><mdb-btn class="m-0 w-100" size="sm" color="primary">{{$t('Create_RTP')}}</mdb-btn></th>

                  </tr>
                </mdb-tbl-body>
              </mdb-tbl>

              <!-- <div class="cyrcle_btn ml-5 z-depth-1-half "  v-on:click="addRow" v-mdb-waves="{ duration : 'long' , fixed : true}" >
                  <i class="fas fa-plus white-text d-flex justify-content-center " style="padding-top:11px"></i>
              </div> -->
              <circle-btn style="position: absolute; bottom: -25px; left: -55px;" class="m-2 gradint"  @on_click="addRow"/>
            </div>

            <hr class="mt-5"/>
            <mdb-btn  @click="submit_continue" color="primary" m="r3"
              p="r4 l4 t2 b2">{{$t('Add_and_continue')}}
            </mdb-btn>
            <mdb-btn color="success" m="r3" type="submit"
              p="r4 l4 t2 b2">
              <mdb-icon icon="check" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </div>
        </div>
      </form>
    </main>

    <!-- Central Info Modal -->
    <mdb-modal  :show="add_recipe"  @close="add_recipe = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('Color_option')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <color_variant
           :datasource = data_recipe
            />
      </mdb-modal-body>
    </mdb-modal>

    <div>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
    </div>
    <Toast ref="message"></Toast>

  </div>
</template>

<script>
import erpSelect from "../../components/erpSelect.vue";
import color_variant from "../../components/wnd_for_add/color_variant"
import lineSelect from "../../components/lineSelect.vue";
// import localizeFilter from '../../filters/localize.filter';
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
  import {
    mdbNavbar,mdbTbl, mdbTblHead, mdbTblBody,
    mdbCardTitle,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbInput,mdbBtnGroup,mdbBtnToolbar ,
    mdbIcon,
    mdbRow,mdbCol,
    mdbBtn,

  } from "mdbvue";

  export default {

    components: {
      mdbNavbar,
      erpSelect,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbCardTitle,color_variant,
      mdbInput,mdbBtnGroup,mdbBtnToolbar ,
      mdbIcon,mdbTbl, mdbTblHead, mdbTblBody,
      mdbBtn,lineSelect,DatePicker,
      mdbRow,mdbCol,

    },
     validations: {
      d_name: { required },
      selected : { required },

      color_gr :
      {
         selected : { required },
      },
      datasource : {
        rows : {
          $each : {
            //  soni : { minValue : minValue(0.00000001), required},
             product_id : {required},
             color_option_type_id : {required}
          }

        }
      }

    },

    data(){
      return {
        modal_info : '',
        modal_status : false,
        add_recipe : false,
        id : this.$route.params.id,
        id_for_name : '',
        product_test_list: [
          {
            name: "Product Erp",
            id: 1
          },
          {
            name: "Erp Sarp",
            id: 2
          }

        ],


        d_name: '',
        status : true,
        selected: '',
        selectedId : null,
        color_gr :
        {
          selected: '',
          selectedId : null,
          code : ''
        },
        pantone_code: '',
        paint_code : '',
        color: '#ff0000',
        color_applied : false,
        colorV_no : 1,
        datasource :
        {
          rows :[],
          // real_time
          columns: ['Open', 'InputName','gus_color', 'product', 'Process', 'Color_option_type','status', 'note','date','Create_RTP' ],
        },

        data_recipe : {
              color : '',
              time1 : '',
              gus_color : '',
              product : '',
              color_variant : '',
              color_variant_id : null,
              color_proccess : '',
              color_variant_type : ''
        },
      }
    },

    async created()
    {
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/ErpColors/' + this.id);
          const data = await res.json();
          console.log(data);
          this.d_name = data._name;
          this.selected = data.kontragent;
          this.selectedId = data.kontragent_id;

          this.color_gr.selected = data.color_group;
          this.color_gr.selectedId = data.color_grid;
          this.pantone_code = data.pantone_code;
          this.paint_code = data.dieing_code;
          this.color = data.color_code;
          this.color_applied = true;

          if(this.id < 10)
              this.id_for_name = '00' + this.id;
          else if(this.id > 9 && this.id < 1000)
              this.id_for_name = '0' + this.id;
          else
              this.id_for_name = this.id;

          const res_cv = await fetch(this.$store.state.hostname + '/color_variant/' + this.id);
          const data_Cv = await res_cv.json();
          if(data_Cv.length > 0)
          {
            this.colorV_no = data_Cv[0].color_no;
          }

          for(var i = 0; i < data_Cv.length; i++)
          {
             this.datasource.rows.push({
                id : data_Cv[i].id,
                product_id : data_Cv[i].product_id,
                product_name : data_Cv[i].product,
                colorVariantName : data_Cv[i].color_variant,
                gus_color_name : data_Cv[i].guscolor,
                gus_color_id : data_Cv[i].guscolor_id,
                proccess_name : data_Cv[i].proccess,
                proccess_id : data_Cv[i].proccess_id,
                color_option_type : data_Cv[i].color_variant_type,
                color_option_type_id : data_Cv[i].color_variant_type_id,
                status : data_Cv[i].status,
                time1: new Date(data_Cv[i].date),
                note : data_Cv[i].note,
                cotton : 'C',
                colorV_applied : true,
                save_color : 'success'
              })
          }
      }
    },

    async mounted (){
        await this.fetchKontragets({ hostname: this.$store.state.hostname});
        await this.fetchColorGroup();
        // this.fetch_product_list();
        await this.fetchColorGus();
        await this.fetchprocessAll();
        await this.fetchColorVariantType();
     },
    computed: mapGetters(['allcompanys','colorGroupList','product_list','guscolor','processAll',
    'colorVariantType']),
    methods: {
      ...mapActions(['fetchKontragets','fetchColorGroup','fetch_product_list','fetchColorGus',
      'fetchprocessAll','fetchColorVariantType','fetchColorVariant']),
      selectOption(option){
        this.selected = option.name
        this.selectedId = option.id
        console.log('company')
        console.log(option.id)
      },
      selectColorGr(option)
      {
        // console.log(option)
        this.color_gr.selected = option.name;
        this.color_gr.selectedId = option.id;
        this.color_gr.code = option.code;
        console.log('colorGroup')
        console.log(option.id)

      },

      select_color_option_type_list(option)
      {
        this.datasource.rows[option.row].color_option_type = option.data.name;
        this.datasource.rows[option.row].color_option_type_id = option.data.id;
        this.datasource.rows[option.row].cotton = option.data.gCode;
        console.log('colorVariantType')
        console.log(option.data.id)

        //console.log(option.data);
      },
      select_guscolor(option)
      {
        this.datasource.rows[option.row].gus_color_name = option.data.name;
        this.datasource.rows[option.row].gus_color_id = option.data.id;
        console.log('gusColor')
        console.log(option.data.id)
      },
      selectproduct(option)
      {
        console.log(option)
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].product_id = option.data.id;
        console.log('product')
        console.log(option.data.id)
      },

      select_proccess_list(option)
      {
        this.datasource.rows[option.row].proccess_name = option.data.name;
        this.datasource.rows[option.row].proccess_id = option.data.id;
        console.log('proccess')
        console.log(option.data.id)
        //console.log(option.data )
      },
      async submit_continue()
      {
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.$refs.message.warning('please_fill')

          return;
        }
        if(await this.checkNetwork()){
          await this.addRowsnoSave()
          this.cls_wnd();
          this.datasource.rows = [];
          this.id = this.$route.params.id;
          this.color_applied = false;
        }
        
      },
      async addRowsnoSave(){
        for(let i=0; i<this.datasource.rows.length; i++){
          if(this.datasource.rows[i].color_variant_id == 0){
            if(await this.save_colorV(i)){
              this.datasource.rows.splice( parseInt(i), 1)
            }
            // await this.save_colorV(i);
          }
        }
      },

      async save_colorV(index)
      {
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.$refs.message.warning('please_fill')
          return;
        }
        // console.log( this.datasource.rows[index].time1.toLocaleString("es-CL"))

        var result_name = '';
        result_name += this.selectedId + '-' +  this.datasource.rows[index].cotton +  this.color_gr.code
        + this.id_for_name + '.' + this.colorV_no;

        // console.log( )


        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                "id":  this.datasource.rows[index].color_variant_id,
                "name" : result_name,
                "colorGustotaId" : this.datasource.rows[index].gus_color_id,
                "erpProductId" : this.datasource.rows[index].product_id,
                "erpProccessId" : this.datasource.rows[index].proccess_id,
                "dateTime" : this.datasource.rows[index].time1,
                "note" : this.datasource.rows[index].note,
                "colorId" : this.id,
                "updateDateTime" : this.datasource.rows[index].time1,
                "createdDateTime" : this.datasource.rows[index].time1,
                "activeStatus" : this.datasource.rows[index].status,
              // "parent_variant_id" : null,
                "parentColorVariantId" : null,
                "color_no" : this.colorV_no,
                "rpt_sequence" : 0,
                "erpColorVariantTypeId" : this.datasource.rows[index].color_option_type_id
            })
          };

          const response = await fetch(this.$store.state.hostname + "/ErpColorVariants", requestOptions);
          const data = await response.json();
          console.log(data);

          if(data.id)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.$refs.message.success('Added_successfully')
            this.datasource.rows[index].color_variant_id = data.id
            this.datasource.rows[index].colorVariantName = result_name
            this.datasource.rows[index].colorV_applied = true   
            this.datasource.rows[index].save_color = 'success'
            ++this.colorV_no;
            this.fetchColorVariant();
            return;
          }
          else{
            this.modal_info = data.errors + "    (" + data.status + ")";
            this.modal_status = true;
            return;
          }

        //console.log(result_name)
      },
      async delete_colorV(index)
      {
        if(this.datasource.rows[index].color_variant_id == 0){
          console.log('i use')
          this.datasource.rows.splice( parseInt(index), 1)
          this.$refs.message.error('Successfully_removed')
        }
        else{

          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ErpColorVariants/" + this.datasource.rows[index].color_variant_id, requestOptions);
          const data = await response.json();
          console.log(data);

          if(data.id)
          {
            
            this.$refs.message.error('Successfully_removed')
            this.datasource.rows.splice( parseInt(index), 1)
            console.log('removed basa')
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

        }
      },
      edit_colorV(index)
      {
        this.datasource.rows[index].colorV_applied = false
        this.datasource.rows[index].save_color = 'warning'        
        console.log(index)
      },

     async applied()
      {
        this.datasource.rows = [];
        if(this.id == 0 )
        {
          await this.save_data();
          //console.log(this.id)
        }
        else{
          this.color_applied = !this.color_applied;
        }

      },
      cls_wnd()
      {
        this.d_name = ''
        this.status = true
        this.selected = ''
        this.selectedId = null
        this.color_gr.selected = ''
        this.color_gr.selectedId = null
        this.pantone_code = ''
        this.paint_code = ''
        this.color = '#ff0000'
      },


      addRow() {
      // console.log( this.datasource.rows);
            this.datasource.rows.push({
            id : 0,
            product_id : null,
            product_name : '',
            colorVariantName : '',
            color_variant_id : 0,
            gus_color_name : '',
            gus_color_id : null,
            proccess_name : '',
            proccess_id : null,
            color_option_type : '',
            color_option_type_id : null,
            status : true,
            time1: new Date(Date.now()),
            note : '',
            cotton : '',
            colorV_applied : false,
            save_color : 'warning'
          })
        },

        open_recipe(index)
        {
          //if(this.datasource.rows[index].colorV_applied)
            this.add_recipe = true;

            this.data_recipe.color = this.d_name,
            this.data_recipe.time1 = this.datasource.rows[index].time1,
            this.data_recipe.gus_color = this.datasource.rows[index].gus_color_name,
            this.data_recipe.product = this.datasource.rows[index].product_name,
            this.data_recipe.color_variant = this.datasource.rows[index].colorVariantName,
            this.data_recipe.color_variant_id = this.datasource.rows[index].color_variant_id,
            this.data_recipe.color_proccess = this.datasource.rows[index].proccess_name,
            this.data_recipe.color_variant_type = this.datasource.rows[index].color_option_type

            // console.log(this.data_recipe);
        },

      save_data :  async function()
      {
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.$refs.message.warning('please_fill');
          return false;
        }
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : this.d_name,
              "companyId" : this.selectedId,
              "colorCode" : this.color,
              "erpColorGroupId" : this.color_gr.selectedId,
              "pantoneCode" : this.pantone_code,
              "dieingCode" : this.paint_code,
              "activeStatus" : this.status,
            // "code" : 0
            })
          };

          const response = await fetch(this.$store.state.hostname + "/ErpColors", requestOptions);
          const data = await response.json();
          console.log(data);


          if(data)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.$refs.message.success('Added_successfully');
            this.id = data.id;
            this.color_applied = !this.color_applied;

            if(this.id < 10)
              this.id_for_name = '00' + this.id;
            else if(this.id > 9 && this.id < 1000)
              this.id_for_name = '0' + this.id;
            else
              this.id_for_name = this.id;

            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },
      async checkNetwork(){
        const response = await fetch(this.$store.state.hostname + "/ErpColorVariants");
        const data = await response.json();
        console.log('hiy company id data list')
        console.log(data.id);
        if(data){
          return true;
        }
        else{
          console.log('Network ne connection')
          false;
        }
      },
     async submit()
      {
        if(await this.checkNetwork())
        {
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text =localizeFilter('please_fill');
          this.$refs.message.warning('please_fill')
          return;
        }
          console.log('use')
          await this.addRowsnoSave()
          this.$store.state.alert = true;

           this.$router.push("/color");
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

/* for select */
input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}

input[type="color"] {
	opacity: 0;
	display: block;
	width: 24px;
	height: 24px;
	border: none;
}
#color-picker-wrapper {
	float: left;
}

.applied{
  pointer-events: none;
  background:#fcfcfc;
}
/* .timepiker{
  position: relative;
  width: 100%;
  margin-top:32px;
  cursor: pointer;
} */

.x_overflow
{
  overflow-x: scroll;
  padding-bottom: 180px;
}

 .fixed-column {
    margin-left: 70px;
    margin-right: -20px;

  }

  .fixed-column th, .fixed-column td {
    white-space: nowrap;
  }

  .fixed-column tr th:first-child{
    position: absolute;
    width: 120px;
    top: auto;
    padding-left: 0;
    margin-left: -110px;
    margin-top: 0px;
  }
  .fixed-column tr td:first-child{
    position: absolute;
    width: 120px;
    top: auto;
    padding-top:10px;
    padding-left: 0;
    margin-left: -110px;
    margin-top: 0px;
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
