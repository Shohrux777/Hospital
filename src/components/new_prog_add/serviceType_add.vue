<template>
     
<div>
    <loader v-if="loading"/>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Наименование услуги" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <mdb-input label="Цена" class="mt-3" v-model="price" type="number" outline/>
            <small class="invalid-text"  v-if="$v.price.$dirty && !$v.price.required" >
              {{$t('enter_price')}}
            </small>

            <erpSelect
                :options = "get_service_group_list"  @btn_add="addGroup = true"
                @select="select_service_Group"
                :selected="group_name"
                :label="$t('service_group')"
                class="mt-2"
              />
              <small v-if="$v.group_name.$dirty && group_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            <div class="row">
              <div class="custom-control custom-switch col-4 pl-5 text-center">
                  <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
                  <label class="custom-control-label " for="customSwitch1">{{$t('persentage')}}</label>
              </div>
              <div class="col-8">
                <mdb-input :label="$t('contragent_percint')" class="m-0 p-0" v-show="status" v-model="persint" type="number" outline/>
              </div>
            </div>
            <mdb-input :label="$t('contragent_price')" class="mt-3" v-show="!status" v-model="contragent_price" type="number" outline/>
            <div class="custom-control custom-switch ml-2">
                <input v-model="unpaidToContragent" type="checkbox" class="custom-control-input " id="customSwitch2" checked>
                <label class="custom-control-label " for="customSwitch2">{{$t('paidtoContragent')}}</label>
            </div>
          </div>
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">{{$t('add')}}</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  <!-- <mdb-modal  :show="addGroup"  @close="addGroup = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('service_group')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <serviceGroup/>
      </mdb-modal-body>
    </mdb-modal>   -->

    <ModalGroup  :title="$t('service_group')" closeColor="#fff" titlecolor="white" headerbackColor="info"
        :show="addGroup" @close="addGroup = false" width="510px">
        <template v-slot:body>
          <serviceGroup  @close="addGroup = false"/>
        </template>
      </ModalGroup>



    
  
</div>
</template>

<script>
  import { mdbBtn, mdbInput  } from 'mdbvue';
import ModalGroup from '../modal'
  import serviceGroup from "../../components/hospital/serviceGroup"
import erpSelect from "../../components/erpSelect";
import { required } from 'vuelidate/lib/validators'
  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn, erpSelect,
      mdbInput,ModalGroup,
      serviceGroup
    },
     validations: {
      name: {required},
      price: {required},
      group_name: {required}
    },
    data(){
      return{
        name: '',
        price: '',   
        adress: '',     
        id: 0,
        group_id: null,
        group_name: 'null',
        status: false,
        unpaidToContragent: true,
        addGroup: false,
        contragent_price: 0,
        persint: 0,
        loading: false,
      }
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['get_service_group_list']),
  async mounted(){
    await this.options;
    await this.fetch_service_group();
    if(Object.keys(this.options).length != 0){
      this.id = this.options.id
      this.name = this.options.name
      this.price = this.options.price
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_service_type','fetch_service_group']),
      cls_wnd(){
        this.name = '';
        this.price = '';
        this.id = 0;
        this.group_id = null;
        this.group_name = '';
      },
      select_service_Group(option){
        this.group_name = option.name;
        this.group_id = option.id;
      },
      async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
           const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
              "id": this.id,
              "name" : this.name,
              "price": this.price,
              "calculateWithPersentage": this.status,
              "persantage": this.persint,
              "hospitalServiceTypeGroupId": this.group_id,
              "contragentPrice": this.contragent_price,
              "paymentable": this.unpaidToContragent
            })
          };
          this.loading = true;
           const response = await fetch(this.$store.state.hostname + "/ServiceTypes", requestOptions);
            const data = await response.json();
            this.loading = false;
            console.log(data)
          if(data.id){
            this.cls_wnd();
            this.fetch_service_type();
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.$refs.message.success('Added_successfully')
          }
        

      },
    }
    

}
</script>

<style scoped>

</style>