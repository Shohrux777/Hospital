<template>
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class="addxizmat px-2 pb-2">
        <div class="row">
          <div class="col-12">
           
              <Roomselect
                :label="$t('bronRoom')"
                @select="rooms_func"
                :options="bron_room_list.rows"
                :selected="room_name"
               />
            </div>
            <div class="col-12 ">
               <small v-if="$v.room_name.$dirty && room_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>

            <div class="col-12">
           
              <Bedselect
                :label="$t('bronBeds')"
                @select="beds_func"
                :options="bron_beds_list.rows"
                :selected="beds_name"
               />
            </div>
            <div class="col-12 ">
               <small v-if="$v.beds_name.$dirty && beds_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>

          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:28px; font-size:10px">Добавить</mdb-btn>
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
  import { mdbBtn} from 'mdbvue';
  import { required } from 'vuelidate/lib/validators'
  import Roomselect from '../../components/Roomselect'
  import Bedselect from '../../components/Bedselect'
  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      Roomselect,
      Bedselect
      
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        loading: false,
        room_name: '',
        beds_name: '',
        beds_id: null,
        room_id: null,
        id: 0,

      }
    },
    validations: {
       room_name: {required},
       beds_name: {required}

    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['bron_room_list','bron_beds_list']),
async mounted(){

    await this.fetch_bron_room();
    await this.fetch_bron_beds();
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_bron_rb','fetch_bron_room','fetch_bron_beds']),
      update(){
        console.log('da salom')
        console.log(this.options)
        this.id = this.options.id;
        this.room_name = this.options.room_name;
        this.beds_name = this.options.beds_name;
        this.beds_id = this.options.id;
        this.room_id = this.options.id;
 
      },

      rooms_func(option){
        console.log(option)
        this.room_id = option.id
        this.room_name = option.room_name
      },
      beds_func(option){
        console.log(option)
        this.beds_id = option.id
        this.beds_name = option.beds_name
      },

      
      cls_wnd(){
        this.room_name = '';
        this.beds_name = '';
        this.id = 0;

      },
      async submit(){
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
          "hospitalBronRoomsid" : this.room_id,
          "hospitalBronRoomBedsid" : this.beds_id,
          "id" : this.id,
          })
        };
        console.log(requestOptions.body)
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalBronRoomAddBeds', requestOptions)
        const data = await response.json()
        this.loading = false;
        if(data.id){
          this.cls_wnd()
          this.fetch_bron_rb()
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