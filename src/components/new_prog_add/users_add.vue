<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class="d-flex">
        <div class="userEnter px-3 pb-2">
          <div class="row">
            <div class="col-12">
              <mdb-input label="Название" v-model="name" outline/>
              <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
                  {{$t('name_invalid_text')}}
                </small>
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
            <div class="col-12 mt-2">
              <RegSelect
                label="Должность"
                @select="position_func"
                :options="get_position_list.rows"
                :selected="position_name"
               />
            </div>
            <div class="col-12">
               <small v-if="$v.position_name.$dirty && position_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
            <div class="custom-control custom-checkbox px-5 mt-3">
                <input type="checkbox" v-model="men" @click="menFunc" class="custom-control-input" id="defaultUnchecked">
                <label class="custom-control-label" for="defaultUnchecked">Мужской</label>
            </div>
            <div class="custom-control custom-checkbox px-5 mt-3">
                <input type="checkbox" v-model="girl" @click="girlFunc"  class="custom-control-input" id="defaultUnchecked2">
                <label class="custom-control-label" for="defaultUnchecked2">Женский</label>
            </div>

            <div class="col-12">
              <mdb-input label="Телефон номер" class="mt-3" v-model="tel" outline/>

              <RegSelect
                label="Кабинет"
                @select="rooms_func"
                :options="get_rooms_list.rows"
                :selected="room_name"
               />
            </div>
            <div class="col-12">
               <small v-if="$v.room_name.$dirty && room_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
        
          </div>
        </div>
        <div class="userPicture ">
          <div class="user_img">
            <img src="" id="prewImage"  width= "213" height= "249" alt="">
            <div class="mt-2" style="margin-left: 0px;">
              <div class="">
                <input type="file" hidden  id="inputGroupFile01" v-on:change="previewFile" aria-describedby="inputGroupFileAddon01">
                <!-- <label class="custom-file-label"  for="inputGroupFile01">Choose file</label> -->
                <div class="text-center  mt-2 ">
                  <label for="inputGroupFile01" 
                    style="cursor: pointer; font-size:13px;" 
                    class=" py-1 mt-1 px-4 rounded  bg-primary shadow text-white">
                    Download
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-rotate mb-1" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                      <path d="M11.245 15.904a3 3 0 0 0 3.755 -2.904m-2.25 -2.905a3 3 0 0 0 -3.75 2.905" />
                      <path d="M14 13h2v2" />
                      <path d="M10 13h-2v-2" />
                    </svg>
                  </label>
                </div>
              </div>
            </div>

          </div> 

        </div>
      </div>
       <div class="text-right container border-top mt-5" >
          <mdb-btn color="success px-4 py-2 mr-3" type="submit" style="margin-top:15px; font-size:10px;">{{$t('add')}}</mdb-btn>
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
import RegSelect from '../../components/RegSelect.vue'

  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput,RegSelect
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        loading: false,
        id: 0,
        name: '',     
        tel: '',
        men: true,
        girl: false,
        picture: '',
        depart_name: '',
        depart_id: null,
        room_name: '',
        room_id: null,
        position_name: '',
        position_id: null,
        pol: 1,
        base64: '',
        
      }
    },
    validations: {
      name: {required},
      depart_name : {required},
      position_name: {required},
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
  computed: mapGetters(['allDepartments','get_position_list','get_rooms_list']),
  async mounted(){
    this.fetchDepartments()
    this.fetch_position()
    this.fetch_rooms()
    await this.options;
    if(Object.keys(this.options).length != 0){
      console.log('i am using')
      this.update();
    }else{
      this.cls_wnd();
    }
  },

    methods: {
      ...mapActions(['fetchDepartments','fetch_rooms','fetch_position', 'fetch_users']),
      menFunc(){
        this.men = true;
        this.girl = false;
        this.pol = 1;
      },
      girlFunc(){
        this.men = false;
        this.girl = true;
        this.pol = 0;
      },

      update(){
        // console.log('this.option')
        // console.log(this.option)
        this.name = this.options.fio;     
        this.tel = this.options.phone;
        this.depart_name = this.options.depart_name;
        this.depart_id =  this.options.depart_id;
        this.room_name = this.options.room_name;
        this.room_id = this.options.room_id;
        this.position_name = this.options.position_name;
        this.position_id = this.options.position_id;
        this.id = this.options.id;
        var img = document.getElementById('prewImage');
        img.src = this.options.img;
        if(this.options.polId == 1){
          this.men = true;
          this.girl = false;
        }else{
          this.men = false;
          this.girl = true;
        }
      },
      depart_func(option){
        console.log(option)
        this.depart_id = option.id
        this.depart_name = option.name
      },

      position_func(option){
        console.log(option)
        this.position_id = option.id
        this.position_name = option.name
      },

      rooms_func(option){
        console.log(option)
        this.room_id = option.id
        this.room_name = option.name
      },
      
      cls_wnd(){
        this.name = '';     
        this.tel = '';
        this.depart_name = '';
        this.depart_id = null;
        this.room_name = '';
        this.room_id = null;
        this.position_name = '';
        this.position_id = null;
        var img = document.getElementById('prewImage');
        img.src = '';
        this.base64 = '';
      },
      async submit(){
        var img = document.getElementById('prewImage');
        // console.log(img.src)
        this.base64 = img.src;
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
              "fio" : this.name,
              "phoneNumber": this.tel,
              "image": this.base64,
              "roomId": this.room_id,
              "departmenId": this.depart_id,
              "positionId": this.position_id,
              "polType": this.pol
            })
          };
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/Users", requestOptions);
          const data = await response.json();
          this.loading = false;
          console.log(data)
          if(data.id)
          {
            this.$refs.message.success('Added_successfully')
            this.$emit('close')
            this.cls_wnd()
            this.fetch_users()
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }



        // const response = await fetch(this.$store.state.hostname + '/Users/addUser?Id=' + this.id +'&fio=' + 
        // this.name + '&phoneNumber=' + this.tel + '&image=' + this.base64 + '&roomId=' + this.room_id + '&departmentId=' + 
        // this.depart_id + '&PolType=' + this.pol + '&positionId=' + this.position_id)
        // const data = await response.json()
        // if(data.id){
        //   this.cls_wnd()
        //   this.fetch_users()
        //   this.$refs.message.success('Added_successfully')
        // }
        // else{
        //   this.$refs.msg.error('Error_successfully')

        //   // this.modal_info = data.detail + "    (" + data.routine + ")";
        //   // this.modal_status = true;
        //   return false;
        // }
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
.userPicture .user_img{
  width: 215px;
  height: 250px;
  border: 1px solid rgb(164, 164, 164);
  border-radius: 3px;
  background-image: url('../../assets/patientAvatar.png');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
}
.userEnter{
  width: 65%;
}
.userPicture{
  width: 35%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
</style>