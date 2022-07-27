<template>
     
<div>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input :label="$t('name')" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <mdb-input label="Серия номер" class="mt-3" v-model="seria_nomer" outline/>
            <mdb-input label="Мин" type="number"  class="mt-3" v-model="min" outline/>
            <small class="invalid-text"  v-if="$v.min.$dirty && !$v.min.required" >
              {{$t('name_invalid_text')}}
            </small>
            <mdb-input label="Мах" type="number"  class="mt-3" v-model="max" outline/>
            <small class="invalid-text"  v-if="$v.max.$dirty && !$v.max.required" >
              {{$t('name_invalid_text')}}
            </small>
          </div>
          
          <div class="text-right container border-top mt-2" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:15px;">{{$t('add')}}</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>

  <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>

  
</div>
</template>

<script>
  import { mdbBtn, mdbInput   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput
    },
     validations: {
      name: {required},
      min: {required},
      max: {required},
    },
    data(){
      return{
        modal_info: '',
        modal_status: false,

        name: '',
        seria_nomer: ' ',  
        note: '', 
        min: null,     
        max: null,     
        id: 0,
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
  async mounted(){
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.id = this.options.id
      this.name = this.options.name
      this.seria_nomer = this.options.serialNumber
      this.min = this.options.min
      this.max = this.options.max
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_sensor']),
      cls_wnd(){
        this.name = '';
        this.id = 0;
        this.seria_nomer = '';
        this.min = null;
        this.max = null;
      },
      async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
          const response = await fetch(this.$store.state.hostname + '/Datchiks/addDatchik?Id=' + this.id + '&name=' + this.name 
          + '&serialNumber=' + this.seria_nomer  + '&note=' + this.note + 
          '&min=' + this.min + '&max=' + this.max);
          const data = await response.json()
          console.log(data)
          if(data.id){
            this.cls_wnd();
            this.fetch_sensor();
            this.$refs.message.success('Added_successfully')
          }
          else{ 
            this.$refs.msg.error('Error_successfully')

            // this.modal_info = data.detail + "    (" + data.routine + ")";
            // this.modal_status = true;
            return false;
          }
        

      },
    }
    

}
</script>

<style scoped>

</style>