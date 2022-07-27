<template>
     
<div>
    <form v-on:submit.prevent="submit" >
      <div class="d-flex">
        <div class="userEnter px-3 pb-2">
          <div class="row">
            <div class="col-12">

              <RegSelect
                :label="$t('room')"
                @select="rooms_func"
                :options="get_rooms_list.rows"
                :selected="room_name"
               />
            </div>
            <div class="col-12 ">
               <small v-if="$v.room_name.$dirty && room_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
            <div class="col-12 mt-2">
              <RegSelect
                :label="$t('sensor')"
                @select="sensor_func"
                :options="get_sensor_list.rows"
                :selected="sensor_name"
               />
            </div>
            <div class="col-12">
               <small v-if="$v.sensor_name.$dirty && sensor_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
            <div class="col-12 mt-2">
              <RegSelect
                :label="$t('color')"
                @select="color_func"
                :options="get_color_list.rows"
                :selected="color_name"
               />
            </div>
            <div class="col-12">
               <small v-if="$v.color_name.$dirty && color_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
            
        
          </div>
        </div>
      </div>
       <div class="text-right container border-top mt-4" >
          <mdb-btn color="success px-4 py-2 mr-3" type="submit" style="margin-top:15px;">{{$t('add')}}</mdb-btn>
        </div>
        
    </form>
  <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>
   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
</div>
</template>
<script>
  import { mdbBtn   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
import RegSelect from '../../components/RegSelect.vue'

  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
  RegSelect
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,

        id: 0,
        sensor_name: '',
        sensor_id: null,
        room_name: '',
        room_id: null,
        color_name: '',
        color_id: null,
        
      }
    },
    validations: {
      sensor_name : {required},
      color_name: {required},
      room_name: {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['get_sensor_list','get_color_list','get_rooms_list']),
  async mounted(){
    this.fetch_sensor()
    this.fetch_color()
    this.fetch_rooms()
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_sensor','fetch_rooms','fetch_color', 'fetch_scr_add']),

      update(){  
        this.sensor_name = this.options.sensor_name;
        this.sensor_id =  this.options.sensor_id;
        this.room_name = this.options.room_name;
        this.room_id = this.options.room_id;
        this.color_name = this.options.color_name;
        this.color_id = this.options.color_id;
        this.id = this.options.id;
      },
      sensor_func(option){
        console.log(option)
        this.sensor_id = option.id
        this.sensor_name = option.name
      },

      color_func(option){
        console.log(option)
        this.color_id = option.id
        this.color_name = option.name
      },

      rooms_func(option){
        console.log(option)
        this.room_id = option.id
        this.room_name = option.name
      },
      
      cls_wnd(){
        this.sensor_name = '';
        this.sensor_id = null;
        this.room_name = '';
        this.room_id = null;
        this.color_name = '';
        this.color_id = null;
        this.id = 0;
      },
      async submit(){
        console.log(this.pol)
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        const respone = await fetch(this.$store.state.hostname + '/DatchikItems/addDatchikItem?Id=' +this.id + '&roomId=' + this.room_id + '&colorId='
         + this.color_id + '&datchikId=' + this.sensor_id)
        const data = await respone.json()
        console.log(data)
        if(data.id){
          this.cls_wnd()
          this.fetch_scr_add()
          this.$refs.message.success('Added_successfully')
        }
        else{
          this.$refs.msg.error('Error_successfully')

          // this.modal_info = data.detail + "    (" + data.routine + ")";
          // this.modal_status = true;
          return false;
        }
      },
        previewFile(){
          console.log('dsd')
          const preview = document.getElementById('prewImage');
          const file = document.querySelector('input[type=file]').files[0];
          const reader = new FileReader();
          reader.addEventListener("load", function () {
          // convert image file to base64 string
            // this.picture =  reader.result;
            // console.log(this.picture);
            preview.src = reader.result;
            
          }, false);
          if (file) {
            reader.readAsDataURL(file);
          }
        },
    }
    

}
</script>

<style scoped>
.userEnter{
  width: 100%;
}
</style>