<template>
  <div class="simple_send_to_doctor">
    <div class="row">
      <div class="col-6 "> 
        <div class="px-2 mt-2" style="position: relative;">
          <lineSelect
            :options="get_contragent_list.rows" 
            :searchshow="true"
            @select="contragent_func"
            :selected="contragent_name"
            :label="$t('contragent')"
            
          />
          <small v-if="$v.contragent_name.$dirty && contragent_id == null"  class="invalid-text" style="margin-top:-4px; margin-left:5px;" >
              {{$t('select_item')}}
            </small>
        </div>
          
        <!-- <div class="col-12">
          
        </div> -->
      </div>
      <div class="col-6 text-center border-bottom py-2">
        <h4 class="text-primary pr-3 m-0">{{patient.name}}</h4>
      </div>
    </div>
    <loader v-if="loading"/>
    <div v-else class="row allSize">
      <div class="col-6 border-right doctor_list_simple">
        <div class="doctor_list bg-white  pl-2">
          <!-- <small v-if="$v.doc_name.$dirty && user_id == null" class="text-danger pt-4 pl-5" >
            {{$t('select_item')}}
          </small> -->
          <div  v-for="(doc,i) in get_doctor_list_by_casher.rows" :key="i"
            @click="show_serv(i,doc.DocAuthId,doc.doctorAuth.users.id, doc.fio, )"  
            class="item px-3" :class="{ 'activeUser' : active_el == i }"
          >
            <div class="d-flex align-items-center">
              <div class="user_photo user_photo_back" >
                <img :src="doc.doctorAuth.users.image"  style=" overflow: none; " class="img-fluid" alt="">
              </div>
              <div class="px-3 doctor_fullname">
                <p class="m-0 p-0" style="font-size:15px;">{{doc.fio}}</p>
                <p class="m-0 rang" style="font-size:10px;">{{doc.doctorAuth.users.phoneNumber}}</p>
              </div>    
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 pr-0 ">
        <div class="service_type_simple">
          <div class="row mt-2">
            <div v-for="(servic,i) in get_user_service_list" :key="i" class="col-12">
              <div class="d-flex align-items-center">
                <div>
                  <input type="checkbox" style="width: 17px; height: 17px;" :value="servic.serviceType.id" v-model="checkedCategories[servic.serviceType.id]" :id="servic.serviceType.name" @click="check_service($event, servic.serviceType.name, servic.serviceType.price)" />
                </div>
                <div class="pb-2 px-2">
                  <label style="font-weight:500; font-size:13.5px"  :for="servic.serviceType.name" class="m-0">{{servic.serviceType.name}} ({{servic.serviceType.hospitalServiceTypeGroupId}})</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send_button text-right">
          <mdb-btn  color="primary" @click="send_doctor_from_doc" style="font-size:10px"  p="r4 l4 t2 b2">{{$t('Send')}}</mdb-btn>  
        </div>
      </div>
    </div>
    <Toast ref="message"></Toast>
    <AlertError ref="msg"></AlertError>
   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
  </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import lineSelect from "../../../components/lineSelect.vue";
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
export default {
components:{
  mdbBtn, lineSelect
},
validations: {
  contragent_name: {required},
},
data() {
  return {
    modal_info : '',
    modal_status: false,
    loading: false,
    active_el: -1,
    auth_id: null,
    user_id: null,
    doc_name: '',

    checkedCategories: [],  
    ServiceTypesCount: [],

    contragent_name: '',
    contragent_id: null,
  }
},
async mounted() {
  await this.fetch_get_doctor_list(localStorage.AuthId)
  await this.fetch_contragent()
  this.contragent_name = localStorage.cont_name;
  this.contragent_id = localStorage.cont_id;
  console.log(this.contragent_id)
},
props:{
  patient: {
    type: Object,
    default() {
      return {}
    }
  },
  patientId: {
    type: Number,
    default: null,
  }
},
computed: mapGetters(['get_doctor_list_by_casher', 'get_user_service_list', 'get_contragent_list']),
methods: {
  ...mapActions(['fetch_get_doctor_list', 'fetch_users_service_list', 'fetch_contragent']),
  contragent_func(option){
  console.log(this.patient)
    this.contragent_name = option.data.name;
    this.contragent_id = option.data.id;
    localStorage.cont_name = option.data.name;
    localStorage.cont_id = option.data.id;

  },
  show_serv(i,authId, UserId, name){
    this.active_el = i
    this.auth_id = authId;
    this.user_id = UserId;
    this.doc_name = name;
    this.fetch_users_service_list(UserId)
    // this.fetch_get_patient_list_Doc_Id(authId)
    console.log(this.get_patient_list_doc_id)
    console.log(this.get_user_service_list)
  },
  check_service: function(e, serv_name, narx) {
      this.serviceCheck = false;
      if (e.target.checked) {
        console.log(e.target.value)
        console.log(serv_name)
        let s = {
          id: e.target.value,
          name: serv_name,
          price: narx,
          authId: this.auth_id,
        }
        this.ServiceTypesCount.push(s);
        // this.summa = 0
        // this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        // for(let a=0; a<this.ServiceTypesCount.length; a++){
        //   this.summa += this.ServiceTypesCount[a].price
        //   this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        // }
      }
      else{
        // console.log(e.target.value)
        for(let i=0; i<this.ServiceTypesCount.length; i++){
          if(e.target.value == this.ServiceTypesCount[i].id){
            this.ServiceTypesCount.splice(i, 1);
            // this.summa = 0
            // this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            // for(let a=0; a<this.ServiceTypesCount.length; a++){
            //   this.summa += this.ServiceTypesCount[a].price
            //   this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            
            // }
            return
          }
        }
      }
      console.log(this.ServiceTypesCount);
      
    },

  async send_doctor_from_doc(){
  console.log(this.contragent_id)

    if(this.$v.$invalid || this.contragent_id == null)
    {
      this.$v.$touch();
      this.$refs.message.warning('please_fill')
      return false;
    }
    console.log(this.ServiceTypesCount)

    var jsonData = []
    for(let i=0; i<this.ServiceTypesCount.length; i++){
      var a = {
        serviceTypeId: null,
        contragentId: null,
        serviceName: '',
        patientsId: null,
        summ: 0,
        name: '',
        authorizationId: null,
        creatorAuthId: null
      }
      a.serviceTypeId = this.ServiceTypesCount[i].id;
      a.contragentId = this.contragent_id;
      a.serviceName =  this.ServiceTypesCount[i].name;
      a.patientsId =  this.patient.patient_id;
      a.summ = this.ServiceTypesCount[i].price;
      a.name = '';
      a.authorizationId = this.ServiceTypesCount[i].authId;  // this.auth_id
      a.creatorAuthId = localStorage.AuthId;
      jsonData.push(a);
    }
    console.log(jsonData)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(jsonData)
    };
    console.log(requestOptions)
    this.loading = true;
    const response = await fetch(this.$store.state.hostname + "/Payments/addPayments", requestOptions);
    const data = await response.json();
    this.loading = false;
    console.log(data)
  }
},
}
</script>

<style lang="scss">
.simple_send_to_doctor{
  border-left: 2px solid rgb(86, 199, 255);
}
.allSize{
  width: 100%;
  height: calc(100vh - 60px);
    overflow: hidden;
    
  .doctor_list_simple{
    height: calc(100vh - 100px);
    overflow: hidden;
    overflow-y: scroll;
  }
  .service_type_simple{
    position: relative;
    height: calc(100vh - 135px);
    overflow: hidden;
    overflow-y: scroll;
  }
}
.doctor_list .item{
  .user_photo{
    background-color: #fff;
      border-radius: 50%;
      width: 45px !important;
      height: 45px !important;
      overflow: hidden;
      

    // img{
    //   border-radius: 50%;
    //   overflow: hidden;          
    // }
  }
  width:100%;
  box-shadow: 2px 2px 8px rgb(224, 224, 224), -1px -1px 2px rgb(224, 224, 224);
  height: 62px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  // background-color: #fff;
  transition: all 0.5s ease-in-out;
  .rang{
    color: rgb(66, 167, 255);
    font-weight: bold;
  }
  &:hover{
    cursor: pointer;
    box-shadow: 2px 2px 5px rgb(224, 224, 224);
    background-color: rgb(215, 242, 255);
    transform: translate(6px, 0px);
    transition: all 0.1s ease-in-out;
  }
}
.doctor_list .add_icon{
  border-radius: 50%;
  &:hover{
    box-shadow: 2px 2px 12px rgb(197, 197, 197), -1px -1px 10px rgb(224, 224, 224);
  }
}
.doctor_list .user_photo_back{
  background-image: url('../../../assets/doc_icon.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  }
.doctor_list .activeUser{
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(224, 224, 224);
  background-color: rgb(179, 230, 255);
  transform: translate(6px, 0px);
  transition: all 0.1s ease-in-out;
}
.wrap_chip{
  box-shadow: 0.5px 0.5px 1px rgb(225, 225, 225), -1px -1px 5px rgb(224, 224, 224);
  font-size: 13.5px;
  cursor: pointer;
  &:hover{
    // box-shadow: 2px 2px 10px rgb(193, 181, 251), -1px -1px 3px rgb(224, 224, 224);
    // border-bottom: 1px solid green;
    background-color: rgb(145, 231, 255);
  }
}
.picture_background{
  background-image: url('../../../assets/doc_list_icon.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>