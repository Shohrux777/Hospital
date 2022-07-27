<template>

  <div>
    <form @submit.prevent="submit">

        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input size="sm" :label="$t('InputName')" icon="file-signature"
                group type="text" validate error="wrong" success="right"
                v-model="k_name"
              />
              <small class="invalid-text"  v-if="$v.k_name.$dirty && !$v.k_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
          </mdb-row>
          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <div class="border border-light p-3 mt-3 rounded">
                <p class="font-weight-normal" >{{$t('Company_type')}}</p>
                <mdb-row>
                  <mdb-col col="4">
                    <!-- Default checked -->
                    <div class="custom-control custom-switch pt-4 pl-5">
                        <input v-model="is_client" type="checkbox" class="custom-control-input " id="customSwitch2" unchecked>
                        <label class="custom-control-label " for="customSwitch2">{{$t('kontragent')}}</label>
                    </div>
                  </mdb-col>
                  <mdb-col col="4">
                    <!-- Default checked -->
                    <div class="custom-control custom-switch pt-4 pl-5">
                        <input v-model="is_postavshik" type="checkbox" class="custom-control-input " id="customSwitch3" checked>
                        <label class="custom-control-label " for="customSwitch3">{{$t('filial')}}</label>
                    </div>
                  </mdb-col>
                  <mdb-col col="4">
                    <!-- Default checked -->
                    <div class="custom-control custom-switch pt-4 pl-5">
                        <input v-model="is_main" type="checkbox" class="custom-control-input " id="customSwitch4" checked>
                        <label class="custom-control-label " for="customSwitch4">{{$t('Main')}}</label>
                    </div>
                  </mdb-col>
                </mdb-row>
              </div>
            </mdb-col>
          </mdb-row>

          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input v-model="k_phone" size="sm" :label="$t('phone')" icon="mobile-alt" group type="text" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row>

          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input v-model="k_address" type="textarea"  :label="$t('address')" icon="map-marker-alt" />
            </mdb-col>
          </mdb-row>

          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input v-model="k_note" type="textarea"  :label="$t('Descriptions')" icon="pencil-alt" />
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupFileAddon01">{{$t('Photo')}}</span>
                </div>
                <div class="custom-file">
                  <input  type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                  <label class="custom-file-label" for="inputGroupFile01">{{$t('Choose_file')}}</label>
                </div>
              </div>
            </mdb-col>
          </mdb-row>

          <!-- Default checked -->
          <!-- <div class="custom-control custom-switch pt-4 pl-5">
              <input v-model="k_status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
          </div> -->

          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2"> {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon  icon="check" class="mr-2"/>{{$t('add')}}</mdb-btn>

        </div>

      </form>

      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>



<script>
import { required } from 'vuelidate/lib/validators'

  import {
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

  export default {

    components: {
      mdbInput,
      mdbIcon,
      mdbBtn,
      mdbRow,
      mdbCol

    },
    validations: {
      k_name: {
        required
      }
    },
    props :
    {
      notFull :{
        type : Boolean,
        default : true
      },
    },

    data() {
      return{
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,

        k_name : '',
        is_client : true,
        is_postavshik : false,
        k_phone : '',
        k_address : '',
        k_note : '',
        k_status : true,
        is_main : false,
        id : this.$route.params.id
      }
    },
    async created()
    {
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/Companies/' + this.id);
          const data = await res.json();
         // console.log(data);
          this.k_name = data.name;
          this.is_client = data.client;
          this.is_postavshik = data.supplier;
          this.is_main = data.maincompany;
          this.k_phone = data.phoneNumber;
          this.k_address = data.address;
          this.k_note = data.note;
      }
    },
    methods:{

      async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push("/kontragent_add/0");
            this.cls_wnd();
          }else{
            this.cls_wnd();
          }
          
        }
      },
      cls_wnd()
      {
        this.k_name = '';
        this.k_phone = null;
        this.k_note = '';
        this.k_address = ''
        this.is_client = true
        this.is_postavshik = false
        this.k_status = true
        this.is_main = false
      },
      save_data :  async function()
      {
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }
        //  console.log('kup tomoni')
          // const requestOptions = {
          //   method: "POST",
          //   headers: { "Content-Type" : "application/json" },
          //   body: JSON.stringify({
          //     "name" : this.k_name,
          //     "phoneNumber" : this.k_phone,
          //     "address" : this.k_address,
          //     "note" : this.k_note,
          //     "client" : this.is_client,
          //     "maincompany" : this.is_main,
          //     "supplier" : this.is_postavshik,
          //     "activeStatus" : this.k_status,
          //     "id" : this.id,

          //   })
          // };
          const response = await fetch(this.$store.state.hostname + '/Companies/addUpdateCompany?Id=' + this.id + '&companyName='
           + this.k_name + '&phoneNumber=' + this.k_phone + '&address=' + this.k_address + '&client=' + this.is_client + '&supplier=' + this.is_postavshik + '&maincompany=' + this.is_main)
          const data = await response.json()
          console.log(data)
          // const response = await fetch(this.$store.state.hostname + "/Companies/addUpdateCompany", requestOptions);
          // const data = await response.json();
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
            this.$emit('submit_success');

          }
      }
    },
  }
</script>
