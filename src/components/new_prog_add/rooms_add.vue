<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class="addxizmat px-2 pb-2">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Название комната" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
                {{$t('name_invalid_text')}}
              </small>
            <mdb-input label="Номер комната" class="mt-3" v-model="num_room" outline/>
            <RegSelect
              label="Отдель"
              @select="depart_func"
              :options="allDepartments.rows"
              :selected="depart_name"
             />
          </div>
          <div class="col-12">
             <small v-if="$v.depart_name.$dirty && depart_id == null" class="invalid-text pt-4" >
                {{$t('select_item')}}
              </small>
          </div>
          <div class="col-12">
            <mdb-input label="Кол-во мест" type="number" class="mt-4" v-model="qty" outline/>
            <small class="invalid-text"  v-if="$v.qty.$dirty && !$v.qty.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <hosSelect
              label="Тип комната" @btn_add="room_type = true"
              @select="room_type_func"
              :options="room_type_list"
              :selected="roomType_name"
             /> -->
          </div>
          
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">Добавить</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>
   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
    <!-- <ModalType  :title="$t('Add_room_type')" :show="room_type" headerbackColor="info" titlecolor="white" closeColor='white' @close="room_type = false" width="600px">
        <template v-slot:body>
          <roomType @close="show = false"/>
        </template>
      </ModalType> -->
</div>
</template>
<script>
  import { mdbBtn, mdbInput,  } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
import RegSelect from '../../components/RegSelect.vue'
// import hosSelect from '../../components/hosSelect.vue'
// import ModalType from '../../components/modal'
// import roomType from "../../components/hospital/roomType"
  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput,RegSelect, 
    
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        loading: false,
        name: '',
        num_room: '',        
        id: 0,
        qty: '',
        depart_name: '',
        depart_id: null,
        roomType_name: '',
        room_type: false,
        roomType_id: 0,
        room_type_list: [{
          name: 'Xodimlar xonasi',
          id: 1
        },
        {
          name: 'Majlislar',
          id: 2
        }]
        
      }
    },
    validations: {
      name: {required},
      qty: {required},
      depart_name : {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['allDepartments']),
  async mounted(){
    this.fetchDepartments()
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetchDepartments','fetch_rooms']),
      update(){
        this.id = this.options.id;
        this.name = this.options.name;
        this.qty = this.options.bedsCount;
        this.depart_name = this.options.department.name;  
        this.depart_id = this.options.department.id;  
        this.roomType_id = this.options.type;
        this.num_room = this.options.number;
      },
      depart_func(option){
        console.log(option)
        this.depart_id = option.id
        this.depart_name = option.name
      },

      room_type_func(option){
        console.log(option)
        this.roomType_id = option.id
        this.roomType_name = option.name
      },
      
      cls_wnd(){
        this.name = '';
        this.num_room = '';
        this.id = 0;
        this.qty = '';
        this.depart_name = '';
        this.depart_id = null;
        this.roomType_name = '';
        this.roomType_id = 0;
      },
      async submit(){
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Rooms/addRoom?Id=' + this.id + '&name=' + 
          this.name + '&departmentId=' + this.depart_id + '&roomNumber=' + this.num_room + '&roomType=' + this.roomType_id + '&bedsCout=' +  this.qty)
          const data = await response.json()
          this.loading = false;
        if(data.id){
          this.cls_wnd()
          this.fetch_rooms()
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