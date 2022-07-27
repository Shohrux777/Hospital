<template>
  <div>
    <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12"  v-bind:class="{ 'col-md-8 col-lg-6': notFull }">
              <mdb-input v-model="d_name" size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text"  v-if="$v.d_name.$dirty && !$v.d_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>

          </mdb-row>
          <mdb-row >
            <mdb-col class="col-12 col-sm-12 " v-bind:class="{ 'col-md-8 col-lg-6': notFull }">
              <erpSelect
                :options="allcompanys" :btnshow="false"
                @select="selectOption"
                :selected="comp_name"
                :label="$t('company_name')"

              />
              <small v-if="$v.comp_name.$dirty && comp_id == null" class="invalid-text" >
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
          <mdb-btn color="success" m="r3" type="submit"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('add')}}</mdb-btn>
        </div>
      </form>

      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
      
      <Toast ref="message"></Toast>

  </div>
</template>

<script>
import erpSelect from "../../components/erpSelect.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex';

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
      erpSelect,
      mdbInput,
      mdbIcon,
      mdbBtn,
      mdbRow,
      mdbCol

    },
    props :
    {
      notFull :{
        type : Boolean,
        default : true
      },
    },

    data(){
      return {
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,

        id : this.$route.params.id,
        d_name: '',
        status : true,
        comp_name: '',
        comp_id:null
      }
      // ! for select

    },

    validations: {
      d_name: {
        required
      },
      comp_name : {required}
    },
     async created()
    {

      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/Departments/' + this.id);
          const data = await res.json();

          this.d_name = data.name;
          this.comp_id = data.companyId;
          // this.comp_name = data.company.name;
      }
    },

    methods: {
      ...mapActions(['fetchKontragets']),
      //...mapMutations(['addDept']),
      async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
      cls_wnd()
      {
        this.comp_name = '';
        this.comp_id = null;
        this.d_name = '';
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
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "name" : this.d_name,
            "companyId" : this.comp_id,
            // "active_status" : this.status,
            "id" : this.id,
            // "code" : 0
            })
          };
          const response = await fetch(this.$store.state.hostname + '/Departments', requestOptions)
          const data = await response.json()
          console.log(data)
          if(data)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            // this.alert_success = true;
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },
      selectOption(option){
        this.comp_name = option.name
        this.comp_id = option.id
      },
     async submit()
      {
          if(await this.save_data())
          {
            this.$emit('submit_success');

          }
      }
    },
    async mounted (){
        await this.fetchKontragets({ hostname: this.$store.state.hostname});
     },

    computed: mapGetters(['allcompanys']),

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

