<template>
  <div>
     <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6">
              <mdb-input v-model="x_name"  size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text pt-2" style="margin-left: 30px;"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6">
              <mdb-input  v-if="showfor_print" v-model="fp_name" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row>

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6">

              <erpSelect
                :options="productGetList" @btn_add="productAddBtn = true"
                @select="selectOption"
                :selected="selected"
                :label="$t('product_type')"
              />
                <small v-if="$v.selected.$dirty && selectedId == null" class="invalid-text pt-2"  >
                    {{$t('select_item')}}
                </small>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col  v-if="showfor_print" class="col-12 col-sm-12 col-md-6 col-lg-6">
              <erpSelect
                :options="tip_izm" :btnshow="false"
                @select="select_izm"
                :selected="selected_izm"
                :label="$t('measurment_type_dyeing')"
              />
            </mdb-col>
          </mdb-row>
          <div class="back_color">
            <mdb-row m="t5 b4" p="4" >
              <mdb-col class="col-12 col-sm-12 col-md-12 col-lg-6 ">
                <div class="card shadow p-3 ">
                    <erplist :list_data="AllXr_list" :title_name="$t('xarakteristika')"
                      @select = "onSelectXrList"
                    />
                </div>
                
              </mdb-col>
              <mdb-col class="col-12 col-sm-12 col-md-12 col-lg-6">
                <div class="card shadow p-3 ">
                  <erplist :list_data="selected_xr_list" :title_name="$t('Selected_characteristic')"
                    @select = "onSelectXrList2"
                  />
                </div>
                    <small v-if="$v.selected.$dirty && selected_xr_list.length < 1" class="invalid-text ml-5" >
                        {{$t('select_item')}}
                    </small>
              </mdb-col>
            </mdb-row>
          </div>

          <!-- Default checked -->
          <!-- <div class="custom-control custom-switch pl-5">
              <input v-model="status"  type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
          </div> -->
          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2"> {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="info" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
        </div>
      </form>

      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
      <mdb-modal  :show="productAddBtn"  @close="productAddBtn = false" size="lg" light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight: bold">{{$t('add_productType')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <productType_add/>
        </mdb-modal-body>
      </mdb-modal>
      <Toast ref="message"></Toast>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";
import erplist from "../../components/erplist";
import productType_add from "../../components/wnd_for_add/productType_add"
import {mapActions, mapMutations} from "vuex";
import { required } from 'vuelidate/lib/validators'
  import {
     mdbInput, mdbIcon, mdbRow, mdbBtn,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbCol
  } from "mdbvue";


  export default {
    name: "category_add",
    components: {

      mdbInput,
      mdbIcon,
      mdbRow,
      mdbBtn,
      mdbCol,erplist,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      productType_add,
      erpSelect,
    },
    validations: {
      x_name: {
        required
      },
      selected : {required},
      //comp_name : {required}
    },
    data(){
      return{
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        productAddBtn: false,
        xrList: [],

        x_name : '',
        fp_name : '',
        status : true,
        selected: '',
        selected_izm: '',
        selectedId:null,
        selectedId_izm:null,
        tip_izm : [
          {
            name: 'gr_kg',
            id : 1,
          },
          {
            name : 'gr_l',
            id :2,
          }],

          showfor_print : false,
      }
    },
    methods : {
      ...mapActions(['fetchPruductType','fetchCharacter']),
      ...mapMutations(['onSelect_xrList','onSelect_selected_xr_list', 'Clear_selected_xr_list']),
      selectOption(option){
        this.selected = option.name
        this.selectedId = option.id
        console.log(option.id)
        console.log(option.name)
      },
      select_izm(option)
      {
        this.selected_izm = option.name;
        this.selectedId_izm = option.id;
        

      },
      onSelectXrList(_data)
      {
        // console.log("test : " + _data);
        this.onSelect_xrList(_data);
      },
      onSelectXrList2(list)
      {
         //console.log(this.allXrList.map(({id}) => id))
        this.onSelect_selected_xr_list(list)
      },
      cls_wnd()
      {
        this.x_name = ''
        this.fp_name = ''
        this.selected = ''
        this.selected_izm = ''
        this.selectedId = null
        this.selectedId_izm = null
        this.Clear_selected_xr_list()
      },
       async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
       save_data :  async function()
      {
         if(this.$v.$invalid || !this.selected_xr_list.length)
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }
        this.xrList = [];
        for(let i=0; i<this.selected_xr_list.length; i++){
          let a = {
            "erpCharacteristicsId": this.selected_xr_list[i].id
          }
          this.xrList.push(a);
        }
        console.log(this.xrList)
        const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
              "name" : this.x_name,
              "erpProductTypeId" : this.selectedId,
              "categoryDetailList" : this.xrList,
              "status" : this.status,
            })
          };

          const response = await fetch(this.$store.state.hostname + "/ErpCategories", requestOptions);
          const data = await response.json();
          console.log(data)
          if(data.name)
          {
            this.$refs.message.success('Added_successfully')
            this.fetchCharacter();
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
    mounted(){
      this.fetchPruductType();
      this.fetchCharacter();
    },
    computed:{
      selected_xr_list(){
        return this.$store.getters.selected_xr_list
      },
      productGetList(){
        return this.$store.getters.productGetList
      },
      AllXr_list(){
        return this.$store.getters.AllXr_list
      }}

  }
</script>
<style scoped>
.back_color{
  background: rgb(241, 241, 241);
}
</style>


