<template>
  <div class="send_main_page">
    <checkOtchert v-if="show_otchert" @close="show_otchert = false"/>
    <div v-else class="send_page">
      <loader v-if="loading"/>
        <form v-on:submit.prevent="submit">
          <div class="d-flex bg-white ">
            <div class="doctor_list bg-white  px-2">
              <small v-if="$v.doc_name.$dirty && user_id == null" class="text-danger pt-4 pl-5" >
                {{$t('select_item')}}
              </small>
              <div  v-for="(doc,i) in get_doctor_list_by_casher.rows" :key="i"
                @click="show_serv(i,doc.DocAuthId,doc.doctorAuth.users.id, doc.fio, doc.doctorAuth.users.phoneNumber, doc.doctorAuth.users.image )"  
                @dblclick="show_service(doc.doctorAuth.users.id)"
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
                <div class="d-flex align-items-center justify-content-center">
                  <div @click="show_service(doc.doctorAuth.users.id)" class="bg-success add_icon ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus m-1" style="padding: 2px;" width="17" height="17" viewBox="0 0 24 24" stroke-width="2.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="Information w-100">
              <div class="PatientInfo d-flex justify-content-center text-center">
              
                <div>
                  <div class="d-flex">
                    <div>
                      <h3 class="m-0 pt-3 pl-4" style="font-weight: 550;">{{get_patient_info.patient_name}}</h3>
                      <h6 class="m-0 pt-2 pl-4 text-danger ">{{get_patient_info.reason}}</h6>
                      <small v-if="$v.patient_name.$dirty && patient_id == null" class="text-danger pt-4 pl-5" >
                        {{$t('select_item')}}
                      </small>
                    </div>
                    <div class="border-left ml-4">
                      <h4 class="m-0 pt-3 pl-4" style="font-weight: 550;">{{summaString}} <small style="font-size: 19px;" class="px-2">сум</small></h4>
                      <h6 class="m-0 pt-2 pl-4 text-danger ">{{ServiceTypesCount.length}}</h6>
                    </div>
                  </div>
                </div>
                <div style="position: absolute; bottom: 5px; right: 5px; font-size:10px;">
                    <mdb-btn style=" font-size:10px;" class="blue-gradient" @click="infopatient"  p="r4 l4 t2 b2">{{$t('info')}}</mdb-btn>  
                    <mdb-btn style=" font-size:10px;" class="blue-gradient" @click="addpatient"  p="r4 l4 t2 b2">{{$t('add')}}</mdb-btn>  
                </div>
              
              </div>
              <div class="DoctorInfo d-flex">
                <!-- <div style="width: 18%">
                  <div class="picture shadow border  picture_background zoom mt-5">
                      <img :src="img" style="height: 100%; overflow: none; " class="img-fluid " alt="">
                  </div>
                </div> -->
                <div class="info_doc px-4 m-2" style="width: 100%">
                  <div class="border-bottom ">
                    <div class="d-flex align-items-center">
                      <div class="mr-3">
                          <div class="picture shadow border rounded-circle  picture_background zoom ">
                              <img :src="img" style="height: 100%; overflow: none; " class="img-fluid rounded-circle" alt="">
                          </div>
                        </div>
                      <div>
                        <h3 class="mb-1 mt-1">{{doc_name}}</h3>
                        <p class="text-primary px-1 mb-1">{{doc_position}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="service_list">
                    <div class="row mt-3">
                      <div v-for="(servic,i) in get_user_service_list" :key="i" class="col-4">
                        <div class="d-flex align-items-center" >
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
                  <div>
                  </div>
                  <small v-if="$v.check_name.$dirty && ServiceTypesCount.length == 0" class="text-danger pt-4 pl-2" >
                    {{$t('select_item')}}
                  </small>
                </div>
              </div>
              <div class="row  px-4  addention_service w-100">
                <div v-for="(item,i) in service_bahila_list_database" :key="i" class="col-4 px-3">
                  <div style="" class="d-flex align-items-center justify-content-between">
                      <small style="font-size:13px;" class="one_line">{{item.service_name}}</small>
                      <div class="ml-2 d-flex mt-1">
                        <mdb-btn @click="RemoveServ(item)"  color="danger" class="m-0 p-0 " style="font-size: 10px;"  p="r3 l3 t1 b1">-</mdb-btn>  
                        <input type="text" class="px-1" :value="item.qty" style="width: 35px; height: 25px" >
                        <!-- <mdb-input type="text" style="width: 40px; height: 10px"  :value="service_bahila_list.length" disabled outline/> -->
                        <mdb-btn @click="AddServ(item)"  color="success" class="m-0 p-0 " style="font-size: 10px;"  p="r3 l3 t1 b1">+</mdb-btn> 
                      </div>
                  </div>
                  </div>
              </div>



              <div class="TablePatientDocIdSend m-3 mt-2">
                <table class="myTable">
                  <thead>
                    <tr class="header ">
                      <th width="50">№</th>
                      <th>{{$t('FIO')}}</th>
                      <th>{{$t('unregistrDate')}}</th>
                      <th>{{$t('bornDate')}}</th>
                      <th>{{$t('phoneNumber')}}</th>
                      <th width="100">{{$t('Action')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row,rowIndex) in get_patient_list_doc_id" :key="rowIndex">
                      <td> <small style="font-size:11.5px;">{{rowIndex+1}}</small> </td>
                      <td> <small style="font-size:11.5px;">{{row.fio}}</small> </td>
                      <td> <small style="font-size:11.5px;">{{row.registratedDate.slice(0,10)}}</small>  <small>{{row.registratedDate.slice(11,19)}}</small></td>
                      <td> <small style="font-size:11.5px;">{{row.bornDate.slice(0,10)}}</small> </td>
                      <td> <small style="font-size:11.5px;">{{row.phoneNumber}}</small> </td>
                      <td class="text-center">
                        <i class="fas fa-eye editIcon  mask waves-effect text-warning m-0 pr-2" disabled @click="getPatientIdService(row.id, row.fio)" :data-row="rowIndex"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style="position: absolute; bottom: 7px; right: 15px;">
            <mdb-btn color="warning" @click="blankaShow" style=" font-size:10px;" hidden  p="r5 l5 t2 b2">{{$t('blanka')}}</mdb-btn>  
            <mdb-btn color="warning" :disabled="user_id == null" @click="$router.push('/otcheritList/' + user_id)" style=" font-size:10px;" p="r4 l4 t2 b2">{{$t('otchrit')}}</mdb-btn>  
            <mdb-btn  color="primary" type="submit" style=" font-size:10px;"  p="r4 l4 t2 b2">{{$t('Send')}}</mdb-btn>
          </div>
        </form>
        <ModalUser :show="show" :title="$t('Choose client')" @close="show = false" width="980px">
          <template v-slot:body>
            <clientAdd  @close="show = false" />
          </template>
        </ModalUser>
        <ModalUser  :show="service_show" headerbackColor="success" closeColor="white" titlecolor="white" :title="$t('Choose service type')" @close="service_show = false" width="900px">
          <template v-slot:body>
            <div style="min-height: 300px;">
              <div class="row">
                <div class="col-4"  v-for="(item,i) in get_service_no_chosen_list" :key="i">
                  <div style="height: 55px; overflow: hidden; overflow-y: auto" @click="getService_type(item)" class="wrap_chip  border rounded d-flex my-2 px-3 text-center justify-content-center">
                    <p class="my-1">{{item.name}} ({{item.groupSer}})</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <mdb-btn  color="danger" @click="service_show = false" style="font-size:10px"  p="r4 l4 t2 b2">{{$t('close')}}</mdb-btn>  
              <mdb-btn  color="primary" style="font-size:10px"  p="r4 l4 t2 b2">{{$t('Send')}}</mdb-btn>  
            </div>
          </template>
        </ModalUser>
          <mdb-modal  :show="show_surov"  @close="show_surov = false" size="lg" light>
            <!-- <mdb-modal-header>
              <mdb-modal-title style="font-weight:  500;">{{$t('Surovnoma')}}</mdb-modal-title>
            </mdb-modal-header> -->
            <mdb-modal-body>
              <surovnomaPatient @close="show_surov = false"/>
            </mdb-modal-body>
          </mdb-modal>
          <mdb-modal  :show="show_service_patient_id"  @close="show_service_patient_id = false" size="lg" light>
            <!-- <mdb-modal-header>
              <mdb-modal-title style="font-weight:  500;">{{$t('Surovnoma')}}</mdb-modal-title>
            </mdb-modal-header> -->
            <mdb-modal-body>
              <div class="d-flex justify-content-center">
                <h4>{{patientNmaeService}}</h4>
              </div>
              <div class="px-3 row mt-2">
                <div v-for="(servic,i) in show_patientId_ServiceList" :key="i" class="col-6 border-bottom border-right">
                  <div class="" >
                    <div class="py-2 px-2 ">
                      <label style="font-weight:500;"   class="m-0">{{servic.serviceName}} ({{servic.summ}})</label>
                    </div>
                  </div>
                </div>
              </div>
            </mdb-modal-body>
          </mdb-modal>
        <Toast ref="message"></Toast>
        <AlertError ref="msg"></AlertError>
         <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
    </div>
  </div>
</template>

<script>
import checkOtchert from './checkOtchert'
import {mdbBtn,  mdbModal, mdbModalBody,} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import ModalUser from '../../components/modal.vue'
import { required } from 'vuelidate/lib/validators'
// import clients from '../../components/hospital/client_choose.vue'
import clientAdd from "../../components/new_prog_add/client_add"
import surovnomaPatient from "../../components/hospital/surovnomaPatient"


export default {
  components: {
    mdbBtn, ModalUser, clientAdd, mdbModal, surovnomaPatient, mdbModalBody, checkOtchert
  },
  validations: {
      doc_name: {required},
      check_name: {required},
      patient_name: {required},
    },
  data(){
    return{
       modal_info: '',
      modal_status: false,

      show: false,
      service_show: false,
      show_surov: false,
      patientNmaeService: '',
      show_patientId_ServiceList: [],

      show_otchert: false,

       

      img: '',
      doc_name: '',
      doc_position: '',
      active_el: -1,
      user_id: null,
      auth_id: null,
      checkedCategories: [],
      ServiceTypesCount: [],
      check_name: '',
      patient_name: '',
      patient_id: null,
      loading: false,
      service_bahila_list_database: [],
      summa: 0,
      summaString: '0',
      show_service_patient_id: false,

      genereted: '',
      check_ochret_status: false,
    }
  },
   async mounted(){
    await this.fetch_bahila_service_type_group()
     console.log(this.get_bahila_service_type_group.rows)
     this.service_bahila_list_database = this.get_bahila_service_type_group.rows.map(item => {
              return {
                  id: item.id.toString(),
                  service_id: item.serviceType.id,
                  service_name: item.serviceType.name,
                  service_price: item.serviceType.price,
                  qty: 0,
              }
            })
    
    this.fetch_get_doctor_list(localStorage.AuthId)
    this.fetch_auth_list();
    this.fetch_service_type();
  },

  watch: {
    get_patient_info(){
      this.patient_name = this.get_patient_info.patient_name
      this.patient_id = this.get_patient_info.patient_id
    }
  },
  computed: mapGetters(['auth_user_list','get_service_patientId', 'get_bahila_service_type_group', 'get_service_no_chosen_list', 'get_user_service_list', 'get_patient_info', 'get_patient_list_doc_id', 'get_doctor_list_by_casher']),
  methods:{
    ...mapActions(['fetch_auth_list','fetch_service_patientId', 'fetch_patient_client', 'fetch_bahila_service_type_group', 'fetch_service_type', 'fetch_add_service_to_user', 'fetch_users_service_list', 'fetch_get_patient_list_Doc_Id','fetch_get_doctor_list']),
    ...mapMutations(['Users_service_list','update_patient_list', 'ochred_add_check', 'ochred_add_service']),
    show_serv(i,authId, UserId, name, position, img){
      this.active_el = i
      this.auth_id = authId;
      this.user_id = UserId;
      this.img = img;
      this.doc_name = name;
      this.doc_position = position;
      this.fetch_users_service_list(UserId)
      this.fetch_get_patient_list_Doc_Id(authId)
      console.log(this.get_patient_list_doc_id)
      // this.checkedCategories = []
      // this.ServiceTypesCount = []
      console.log(localStorage.AuthId)
    },
    async show_service(userId){
      this.service_show =true;
      this.user_id = userId;
      await this.fetch_users_service_list(userId)
      this.Users_service_list()
    },
    async getPatientIdService(id, fio){
      console.log(id)
      this.patientNmaeService = fio;
      const response = await fetch(this.$store.state.hostname + "/Payments/getPatientPayedServiceByPatientIdListByDoctrAuthId?PatientId=" + id + '&doctirAuthId=' + this.auth_id);
      const data = await response.json();
      console.log(data)
      this.show_patientId_ServiceList = data;
      // console.log()
      this.show_service_patient_id = true;
    },
    async getService_type(data){
      var a = {
        user_id: null,
        service_id: null,
      };
      a.user_id = this.user_id;
      a.service_id = data.id;
      await this.fetch_add_service_to_user(a)
      this.fetch_users_service_list(this.user_id)
      this.service_show = false

    },
    addpatient(){
      this.show = true;
      this.fetch_patient_client();
      this.$root.$refs.clientAdd.rootMounted();
    },
    infopatient(){
      this.$router.push('/infoPatient')
      console.log('infoletsGo')
    },
    AddServ(data){
      console.log(data) 
      for(let i=0; i<this.get_bahila_service_type_group.rows.length; i++){
        if(this.get_bahila_service_type_group.rows[i].id == data.id){
          this.service_bahila_list_database[i].qty ++;
            var t = {
              id: '',
              name: '',
              price: null,
              authId: this.auth_id,
            }
            t.id = this.service_bahila_list_database[i].service_id.toString()
            t.name = this.service_bahila_list_database[i].service_name
            t.price = this.service_bahila_list_database[i].service_price
            this.ServiceTypesCount.push(t);
            this.summa = 0
            this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            for(let a=0; a<this.ServiceTypesCount.length; a++){
              this.summa += this.ServiceTypesCount[a].price
              this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
          return
        }
      }
    },
    RemoveServ(data){
      // console.log(data)
      for(let i=0; i<this.get_bahila_service_type_group.rows.length; i++){
        if(this.get_bahila_service_type_group.rows[i].id == data.id){
          if(this.service_bahila_list_database[i].qty != 0){
            this.service_bahila_list_database[i].qty --;

            for(let j = 0; j < this.ServiceTypesCount.length; j++){
              if(this.ServiceTypesCount[j].id == data.service_id){
                this.ServiceTypesCount.splice(j, 1);
                this.summa = 0
                this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                for(let a=0; a<this.ServiceTypesCount.length; a++){
                  this.summa += this.ServiceTypesCount[a].price
                  this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }
                return;
              }
            }

            return
          }
        }
      }
      
      
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
        this.summa = 0
        this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        for(let a=0; a<this.ServiceTypesCount.length; a++){
          this.summa += this.ServiceTypesCount[a].price
          this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
      }
      else{
        // console.log(e.target.value)
        for(let i=0; i<this.ServiceTypesCount.length; i++){
          if(e.target.value == this.ServiceTypesCount[i].id){
            this.ServiceTypesCount.splice(i, 1);
            this.summa = 0
            this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            for(let a=0; a<this.ServiceTypesCount.length; a++){
              this.summa += this.ServiceTypesCount[a].price
              this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            
            }
            return
          }
        }
      }
      console.log(this.ServiceTypesCount);
      
    },
    blankaShow(){
      this.show_surov = true;
      localStorage.Summa = this.summa;
    },
    async submit(){
      console.log('this.get_patient_info')
      console.log(this.summa)
      console.log(this.ServiceTypesCount)
      this.ochred_add_service(this.ServiceTypesCount)
      this.patient_name = this.get_patient_info.patient_name
      this.patient_id = this.get_patient_info.patient_id
      if(this.ServiceTypesCount.length > 0){
        this.check_name = this.ServiceTypesCount[0].name
      }
      else{
        this.check_name = '';
      }
      if( this.$v.$invalid || this.user_id == null )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return;
        }
      await this.check_ochred(this.get_patient_info.patient_id, this.user_id, this.auth_id)

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
        a.contragentId = this.get_patient_info.contragent_id;
        a.serviceName =  this.ServiceTypesCount[i].name;
        a.patientsId =  this.get_patient_info.patient_id;
        a.summ = this.ServiceTypesCount[i].price;
        a.name = this.get_patient_info.reason;
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
      if(data[0].id){
        if(this.check_ochret_status == true){
          await this.ochred(this.get_patient_info.patient_id, this.user_id, this.auth_id)
        }
        this.$refs.message.success('Added_successfully')
        this.ServiceTypesCount = [];
        this.checkedCategories = [];
        this.summa = 0;
        this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        this.balni
        this.update_patient_list();
        this.fetch_get_patient_list_Doc_Id(this.auth_id)
        this.service_bahila_list_database = []
        this.service_bahila_list_database = this.get_bahila_service_type_group.rows.map(item => {
              return {
                  id: item.id,
                  service_id: item.serviceType.id,
                  service_name: item.serviceType.name,
                  service_price: item.serviceType.price,
                  qty: 0,
              }
            })
        // this.auth_id = null;
        // this.active_el = -1;
        // this.user_id = null;
        // this.doc_name = '';
        // this.doc_position = '';
      }
      else{
        this.$refs.msg.error('Error_successfully')
      }
      
    },
    async ochred(patient_id,doc_id, auth_id){
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "patientsId" : patient_id,
          "ochred_name_aout_genereted": this.genereted,
          "id" : 0,
          "usersId": doc_id,
          "authorizationId": auth_id
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds", requestOptions);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data, 'jsonini oldim')
          let import_data = {
            doc_name : data.users.fio,
            client_name: data.patients.fio,
            born_date: data.patients.bornDate.slice(0,10),
            phone_number: data.patients.phoneNumber,
            number: data.ochred_name_aout_genereted
          }
          this.ochred_add_check(import_data)

          this.show_otchert = true;
          // this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },
    async fetchGenereted(){
      let newdate = new Date().toISOString().slice(0,10);
      console.log(newdate)
      let b_date  = newdate + 'T00:00:35.000Z';
      let e_date  = newdate + 'T23:59:35.000Z';
      console.log(b_date)
      console.log(e_date)
      console.log(this.user_id)
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/getPaginationByDoktorIdAndDatesOxirgisiniOlish?user_id=" + this.user_id + '&b_date=' + b_date + '&e_date='+ e_date);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data ,  'sadasd data open')
          if(data.items_list.length == 0){
            this.genereted = '1'
          }
          else{
            let test = parseInt(data.items_list[0].ochred_name_aout_genereted) + 1;
            this.genereted = test.toString();
            console.log(this.genereted)
          }
          // this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },
    async check_ochred(patient_id,doc_id, auth_id){
      this.check_ochret_status = false;
      console.log(auth_id)
      let newdate = new Date().toISOString().slice(0,10);
      console.log(newdate)
      let b_date  = newdate + 'T00:00:35.000Z';
      let e_date  = newdate + 'T23:59:35.000Z';
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/getPaginationByDoktorIdAndPatientIdDates?page=0&size=100&user_id=" + doc_id + '&patient_id=' + patient_id + '&b_date=' + b_date + '&e_date=' + e_date);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data, 'jsonini ckeck ochret oldim')
          if(data.items_list.length == 0){
            console.log('add_new')
            await this.fetchGenereted();
            this.check_ochret_status = true;
          }
          else{
            let import_data = {
              doc_name : data.items_list[0].users.FIO,
              client_name: data.items_list[0].patients.FIO,
              born_date: data.items_list[0].patients.BornDate.slice(0,10),
              phone_number: data.items_list[0].patients.PhoneNumber,
              number: data.items_list[0].ochred_name_aout_genereted
            }
            this.ochred_add_check(import_data)

            this.show_otchert = true;
            // this.$refs.message.success('Added_successfully')
          }
          
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },
    

  },
 

}
</script>

<style lang="scss"> 
.send_page{
  height: calc(100vh - 50px);
  overflow: hidden;
}
.doctor_list{
  width: 28%;
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: auto;
  border-right: 1px solid rgb(78, 0, 63);
}
.Information{ 
  width: 72%;
}
.Information .PatientInfo {
  min-height: 100px;
  position: relative;
  // border-bottom: 1px solid rgb(155, 155, 155);
  box-shadow: 0 2px 8px rgb(187, 187, 187);
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
  background-image: url('../../assets/doc_icon.jpg');
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
  background-image: url('../../assets/doc_list_icon.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.addention_service{
  width: 100%;
  height: 60px;
  overflow: hidden;
  overflow-y: scroll;
}
.DoctorInfo{
    .picture{
      width: 50px;
      height: 50px;
      margin: 5px;
      border-radius: 5px;
      // box-shadow: 2px 2px 2px rgb(224, 224, 224), -1px -1px 3px rgb(224, 224, 224);
      background-color: #fff;
    }
    .info_doc{
      margin: 20px;
    }
  }
  .service_list{
    height: 260px;
    overflow: hidden;
    overflow-y: auto;
  }
  .TablePatientDocIdSend{
    height: calc(100vh - 620px);
    overflow: hidden;
    overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}

.editIcon{
  color:#01b348;
  font-size: 13px;

}
.editIcon:hover{
color: #000;
}

.delIcon:hover{
color: #000;
}
.delIcon{color: rgb(251, 70, 70);
  font-size: 13px;
}
.one_line{
  text-overflow: ellipsis; 
  overflow: hidden; 
  white-space: nowrap;
}

</style>