<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/products">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2"
        >{{$t('NewProduct')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 7px;">
      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <!-- v-if="showfor_print" -->
            <mdb-col class="col-12 col-md-6 col-lg-6">
              <mdb-input v-model="x_name" size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
            <!-- <mdb-col class="col-12 col-md-6 col-lg-6">
              <mdb-input  v-model="fp_name" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>
            </mdb-col> -->
          </mdb-row>



          <!-- <mdb-row class="justify-content-md-center">
              <mdb-col col="2">
                <mdb-input v-model="kg" size="sm" label="кг" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
              <mdb-col col="2">
                <mdb-input v-model="brutto" size="sm" label="брутто" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
              <mdb-col col="2">
                <mdb-input v-model="litr" size="sm" label="литр" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
              <mdb-col col="2">
                <mdb-input v-model="metr" size="sm" label="метр" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
              <mdb-col col="2">
                <mdb-input v-model="soni" size="sm" label="кол-во" group type="text" validate error="wrong" success="right"/>
              </mdb-col>
          </mdb-row> -->

          <mdb-row>
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <erpSelect
                :options = "categoryAll" @btn_add="categoryAddBtn = true"
                @select="onS_category"
                :selected="sCategory"
                :label="$t('category')"
              />
              <small v-if="$v.sCategory.$dirty && sCategory_id == null" class="invalid-text pt-2" >
                    {{$t('select_item')}}
              </small>
            </mdb-col>
          </mdb-row>
          <mdb-row  m="t5" v-if="sCategory_id != null">
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <div class="card p-4" >
                <mdb-card-title class="text-center"><strong> {{$t('ProductFeatures')}}</strong></mdb-card-title>

                <table class="myTable">
                    <tbody>
                      <tr scope="row" v-for="(row,rowIndex) in xrToolsCategory" :key="rowIndex" >
                        <th>
                          <lineSelect
                              :options="row.characteristicsDetails" :row_index="rowIndex"
                              :searchshow="true"
                              @select="selectXr_toolJson"
                              :selected="datasource[rowIndex].name"
                              :label="row.name"
                          />
                        </th>
                      </tr>

                    </tbody>
                  </table>

              </div>
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <erpSelect
                :options = "productionGetList" :btnshow="true" @btn_add="productionTypeAddBtn = true"
                @select="onS_production"
                :selected="sProduction"
                :label="$t('Production_type')"
              />
              <small v-if="$v.sProduction.$dirty && sProduction_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            </mdb-col>
          </mdb-row>

          <mdb-row m="t5 b4" p="4" class="rgba-grey-slight" v-if="sProduction_id != null">
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6">
                <div class="card shadow p-3 ">
                  <div>
                    <erplist :list_data="Allplan_list" :title_name="$t('Planning_type')"
                      @select = "onSelectPTList"
                    />
                  </div>
                </div>
            </mdb-col>
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6"> <!-- selected list -->
              <div class="card shadow p-3 ">
                <erplist :list_data="selected_plan_list" :title_name="$t('Selected_planning_type')"
                    @select = "onSelect_selectedPTList"
                  />
              </div>
            </mdb-col>
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6"> <!-- selected list -->
             <div class="d-flex justify-content-end">
                    <mdb-btn @click="planAddBtn =! planAddBtn" color="info" m="r3 t3"
                      p="r4 l4 t2 b2">
                      <mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
                  </div>
            </mdb-col>
            

          </mdb-row>
           <mdb-row>
            <mdb-col class="col-12 col-sm-6 col-md-4 col-lg-3">
              <erpSelect
                :options = "measureGetList"  @btn_add="ed_izmAddBtn = true"
                @select="onS_edizm"
                :selected="ed_izm_data_name"
                :label="$t('ed_izm1')"
              />
              <small v-if="$v.ed_izm_data_name.$dirty && ed_izm_data_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            </mdb-col>
            <mdb-col class="col-12 col-sm-6 col-md-4 col-lg-3">
              <erpSelect
                :options = "measureGetList" @btn_add="ed_izmAddBtn = true"
                @select="onS_edizm2"
                :selected="ed_izm_data2.name"
                :label="$t('ed_izm2')"
              />
              <small v-if="$v.ed_izm_data2.$dirty && ed_izm_data2.id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            </mdb-col>
          </mdb-row>
          <mdb-row >
              <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
                <mdb-input v-model="note" type="textarea"  :label="$t('Descriptions')" icon="pencil-alt" />
              </mdb-col>
          </mdb-row>

           <mdb-row>
            <mdb-col col="4" class="col-8 col-sm-6 col-md-6 col-lg-4">
              <mdb-input v-if="showfor_print" v-model="barecode" size="sm" :label="$t('barcode')" icon="barcode" group type="number" validate error="wrong" success="right"/>
            </mdb-col>
            <mdb-col col="2">
              <!-- Default checked -->
              <!-- <div class="custom-control custom-switch pt-4 pl-5">
                <input v-model="status" type="checkbox" class="custom-control-input" id="customSwitch1" >
                <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
              </div> -->
            </mdb-col>
          </mdb-row>


          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
        </div>
      </form>
    </main>


    <!-- Central Info Modal -->
    <mdb-modal  :show="categoryAddBtn"  @close="categoryAddBtn = false"  size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title  style="font-weight: bold;">{{$t('add_category')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="text-dark">
           <category_add/>
      </mdb-modal-body>
    </mdb-modal>

    <mdb-modal  :show="productionTypeAddBtn"  @close="productionTypeAddBtn = false" size="lg" light>
      <mdb-modal-header>
        <mdb-modal-title style="font-weight: bold;">{{$t('add_productionType')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <productionType/>
      </mdb-modal-body>
    </mdb-modal>

    <mdb-modal  :show="ed_izmAddBtn"  @close="ed_izmAddBtn = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('AddIzm')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <ed_izm_add/>
      </mdb-modal-body>
    </mdb-modal>
    <mdb-modal  :show="planAddBtn"  @close="planAddBtn = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('AddIzm')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <planning_add/>
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
import erpSelect from "../../components/erpSelect";
import category_add from "../../components/wnd_for_add/category_add"
import productionType from "../../components/wnd_for_add/productionType_add"
import ed_izm_add from "../../components/wnd_for_add/ed_izm_add"
import planning_add from "../../components/wnd_for_add/planning_add"
import lineSelect from "../../components/lineSelect";
import { required } from 'vuelidate/lib/validators'
import erplist from "../../components/erplist";
import {mapActions,mapGetters, mapMutations} from 'vuex'


  import {
    mdbNavbar,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbCardTitle,
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol,

  } from "mdbvue";

  export default {
    x_name: "Product_add",
    components: {
      mdbNavbar,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbCardTitle,category_add,
      mdbInput,
      mdbIcon,
      mdbRow,
      mdbBtn,
      mdbCol, erplist, lineSelect,
      erpSelect,
      productionType,
      planning_add,
      ed_izm_add
    },
    validations: {
      x_name: { required },
      ed_izm_data_name : {required},
      ed_izm_data2: {required},
      sCategory : {required},
      sProduction : {required},
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        category_list: [],
        x_name : '',
        fp_name : '',
        barecode : null,
        status : true,
        ed_izm2 : [],
        ed_izm_data_id : null,
        ed_izm_data_name : '',
        ed_izm_data2 : { id : null, name : ''},
        note : '',
        datasource : [],
        datalist : [],
        sCategory_id : null,
        sCategory : '',
        sProduction_id : null,
        sProduction : '',
        categoryAddBtn : false,
        productionTypeAddBtn: false,
        ed_izmAddBtn: false,
        planAddBtn: false,

        showfor_print : false,
        // kg : '',
        // brutto :'',
        // litr : '',
        // metr : '',
        // soni : '',
      }
    },
    methods : {
      ...mapActions(['fetchPruductionType','fetchMeasure','fetchCategoryAll','fetchXrToolJson','fetchPlanning']),
      ...mapMutations(['onSelect_pTList','onSelect_selected_pTList','Clear_selected_plan_list']),

      onS_kontragent(data){
        this.sKontragent = data.name;
        this.sKontragent_id = data.id;
      },


      // list planing type
      onSelectPTList(data)
      {
        this.onSelect_pTList(data);
      },

      //  selected list
       onSelect_selectedPTList(data)
      {
        this.onSelect_selected_pTList(data);
      },


     async onS_category(data){
        var i; 
        this.sCategory_id = null;
        this.sCategory = data.name;
        // console.log(data)
        console.log(this.sCategory)

        await this.fetchXrToolJson(data.id);
        console.log(this.xrToolsCategory)
        var val = this.xrToolsCategory;
        this.datasource = [];
        this.datalist = [];
        for(i = 0; i < val.length; i++)
        {
          this.datasource.push({
            erpCharacteristicsDetailId : null,
            name : '',
          });
          this.datalist.push({
            erpCharacteristicsDetailId : null
          })
        }
        console.log(this.datasource);

        this.sCategory_id = data.id;
        console.log(this.sCategory_id)
      },



      selectXr_toolJson(option)
      {
        console.log(option)
         this.datalist[option.row].erpCharacteristicsDetailId = option.data.id;
         this.datasource[option.row].erpCharacteristicsDetailId = option.data.id;
         this.datasource[option.row].name = option.data.name;
         console.log(this.datalist)
      },
      onS_edizm(data){
        this.ed_izm_data_name = data.name;
        this.ed_izm_data_id = data.id;
        console.log(this.ed_izm_data_id)

        this.ed_izm_data2.name = '';
        this.ed_izm_data2.id = null;
        // this.fetch_ed_izm_list();
        // this.ed_izm2 = this.ed_izm_list;

        // for(var i = 0; i < this.ed_izm2.length; i++) {
        //   if( data.id == this.ed_izm2[i].id) {
        //       this.ed_izm2.splice(i, 1);
        //       break;
        //   }
        // }
      },
      onS_edizm2(data){
        this.ed_izm_data2.name = data.name;
        this.ed_izm_data2.id = data.id;
        console.log(this.ed_izm_data2.id)

      },

      onS_production(data){
        this.sProduction = data.name;
        this.sProduction_id = data.id;
        console.log(this.sProduction_id);
        // this.fetch_planningTypeList();
      },
      async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
      async cls_wnd()
      {
        this.name = ''
        this.fp_name = ''
        this.barecode = null
        this.status = true
        this.ed_izm2 = []
        this.ed_izm_data_id = null
        this.ed_izm_data_name = ''
        this.ed_izm_data2.id = null
        this.ed_izm_data2.name = '',
        this.note = ''
        this.datasource = []
        this.sCategory_id = null
        this.sCategory = ''
        this.sProduction_id = null
        this.sProduction = ''
        this.categoryAddBtn = false
        this.Clear_selected_plan_list()
        await this.fetchPlanning()

      },
      save_data :  async function()
      {
      console.log(this.datasource)

        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }

        // <---- get plan list start  ---->
        this.planList = [];
        for(let i=0; i<this.selected_plan_list.length; i++){
          let a = {
            "erpPlanningTypeId": this.selected_plan_list[i].id
          }
          this.planList.push(a);
        }
        console.log(this.planList)
        // <---- get plan list end  ---->


        // <---- get charactersDetals Array start ---->

        // var character = [
        //   {
        //     "characteristics": {
        //       "characteristicsDetails": [
        //       ]
        //     }
        //   }
        // ];
        // character[0].characteristics.characteristicsDetails = this.datasource
        // console.log('dsdsd')
        // console.log(character)
        // <---- get charactersDetals Array end ---->



        // var testdata = this.datasource.map(({xr_tool_name}) => xr_tool_name);
        // var product_name = '';
        // if(testdata.length > 0)
        // {
        //   for(var i = 0; i < testdata.length; i++)
        //     product_name += testdata[i] + " ";

        // }
         //console.log(product_name);

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : this.x_name,
              "fp_name" : this.fp_name,
              "erpCategoryId" : this.sCategory_id,
              "status" : this.status,
              "erpPruductionTypeId" : this.sProduction_id,
              "planningTypeProductDetails": this.planList,
              "characteristicsProductDetails": this.datalist,
              "erpUnitmeasurmentId" : this.ed_izm_data_id,
              "erpUnitmeasurment2Id" : this.ed_izm_data2.id,
              // "note" : this.note,
              // "selected_xr_id" : this.datasource.map(({xr_tool_id}) => xr_tool_id),
              // "pl_type_id" : this.selectedPTList.map(({id}) => id),

            })
          };
          const response = await fetch(this.$store.state.hostname + "/ErpProducts", requestOptions);
          const data = await response.json();
          console.log(data)
          if(data.name)
          {
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },

       async submit(){

        if(await this.save_data())
        {
           this.$router.push("/products");
        }
      }
    },
    computed:mapGetters(['productionGetList','measureGetList','categoryAll','Allplan_list','selected_plan_list','xrToolsCategory']),

    async mounted(){
      //  console.log(localStorage.name)
      await this.fetchCategoryAll();
      await this.fetchPruductionType();
      await this.fetchMeasure();
      await this.fetchPlanning();
      this.Clear_selected_plan_list()


      // if(this.ed_izm_list.length > 0)
      // {
      //   this.ed_izm_data_name = this.ed_izm_list[0].name;
      //   this.ed_izm_data_id = this.ed_izm_list[0].id;

      //   this.ed_izm2 = this.ed_izm_list;
      //   for(var i = 0; i < this.ed_izm2.length; i++) {
      //     if( 1 == this.ed_izm2[i].id) {
      //         this.ed_izm2.splice(i, 1);
      //         break;
      //     }
      //   }
      // }

    },
    // computed : mapGetters(['category_list','ed_izm_list','XrToolJson',
    //   'productionType_list','planning_type_list','selectedPTList']),

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

.myTable th, .myTable td {
  text-align: left;
  padding: 5px;

}
</style>
