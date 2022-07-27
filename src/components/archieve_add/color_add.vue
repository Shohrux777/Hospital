<template>
     
<div>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input :label="$t('Имя цвет')" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <div id="color-picker-wrapper" v-bind:style="{ backgroundColor: color}">
              <input type="color" v-model="color">
            </div>
            <p class="ml-5 px-5">{{color}}</p>
            <small class="invalid-text"  v-if="$v.color.$dirty && !$v.color.required" >
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
      color: {required},
    },
    data(){
      return{
        modal_info: '',
        modal_status: false,

        name: '',   
        id: 0,
        color: '#ff0000',

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
      this.color = this.options.value
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_sensor']),
      cls_wnd(){
        this.name = '';
        this.id = 0;
        this.color = '#ff0000';
      },
      async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
          const response = await fetch(this.$store.state.hostname + '/Colors/addColor?Id=' +this.id + 
          '&name=' + this.name + '&value=' + this.color)
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
input[type="color"] {
	opacity: 0;
	display: block;
	width: 70px;
	height: 22px;
	border: none;
}
#color-picker-wrapper {
	float: left;
}
</style>