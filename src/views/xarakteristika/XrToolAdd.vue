<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/xr_tool">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Add_feature_details')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 6px;">
      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <mdb-input v-model="xrt_name" size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text"  v-if="$v.xrt_name.$dirty && !$v.xrt_name.required" >
               {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <mdb-input v-model="fp_name" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row>

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <erpSelect
                :options="AllXr_list"
                @select="selectOption"
                @btn_add="shown = true"
                :selected="xr_name"
                :label="$t('xarakteristika')"
              />
              <small v-if="$v.xr_name.$dirty && xr_id == null" class="invalid-text" >
                  {{$t('select_item')}}
              </small>

            </mdb-col>
          </mdb-row>

          <!-- Default checked -->
          <!-- <div class="custom-control custom-switch pt-4 pl-5">
              <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
          </div> -->

          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
             p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>

          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
        </div>
      </form>

      <mdb-modal :show="shown"  @close="shown = false" info>
        <!-- @shown="handleShown" -->
        <mdb-modal-header>
          <mdb-modal-title>{{$t('Add_characteristic')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <xrAdd :notFull="false" @submit_success="xrSubmit_success"/>
        </mdb-modal-body>
      </mdb-modal>

       <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
    </main>
      <Toast ref="message"></Toast>

  </div>
</template>


<script>
import xrAdd from "../../components/wnd_for_add/xr_add"
import erpSelect from "../../components/erpSelect.vue";
import {mapActions,mapMutations, mapGetters} from 'vuex';
import { required } from 'vuelidate/lib/validators'
  import {
    mdbNavbar,
    mdbCardTitle,
    mdbInput, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

  export default {

    components: {
      mdbNavbar, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbCardTitle,xrAdd,
      mdbInput,
      mdbIcon,
      mdbBtn,
      mdbRow,
      erpSelect,
      mdbCol
    },
    data(){
      return{
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        shown: false,

        id : this.$route.params.id,
        xrt_name : '',
        fp_name : '',
        status : true,
        xr_name: ' ',
        xr_id:null

      }
    },
     validations: {
      xrt_name: {required},
      xr_name : {required}
    },
    async created()
    {
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/ErpCharacteristicsDetails/' + this.id);
          const data = await res.json();
          console.log(data);  
          this.xrt_name = data.name;
          this.fp_name = data.nameForPrint;
          this.xr_name = data.name;
          this.xr_id = data.erpCharacteristicsId;
      }

    },
    methods: {
      ...mapActions(['fetchCharacter']),
      ...mapMutations(['addXr_tool']),
      selectOption(option){
        this.xr_name = option.name
        this.xr_id = option.id
      },
      xrSubmit_success()
      {
        this.shown = false
        this.fetchCharacter()
      },
      cls_wnd()
      {
        this.xrt_name = '';
        this.xr_id = null;
        this.xr_name = '';
        this.fp_name = '';
      },
      save_data :  async function()
      {
        if(this.$v.$invalid || this.xr_id == null)
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }
        const requestOptions = {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : this.xrt_name,
              "erpCharacteristicsId" : this.xr_id,
              "status" : this.status,
              "nameForPrint" : this.fp_name,
              "id" : this.id
            })

          };
          const response = await fetch(this.$store.state.hostname + "/ErpCharacteristicsDetails", requestOptions);
          const data = await response.json();
          console.log(data);
          if(data.name)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.$refs.message.success('Added_successfully')
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
            this.$router.push("/xr_tool");
        }
      },
      async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
    },
    mounted (){
        this.fetchCharacter();
     },
    computed: mapGetters(['AllXr_list']),

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
</style>
