<template>
  <div class="doctor_page">
   <loader v-if="loading"/>
    <div class="patient_list border-right">
      <div class="text-center">
        <h4 class="m-0 text-primary py-2">Пациенты </h4>
      </div>
     <div class="px-2">
        <mdb-input class="mt-0 mb-4" v-model="search"  :label="$t('Search patient')" ariaDescribedBy="button-addon2">
          <mdb-btn color="info" size="sm" @click="update" group slot="append" style="font-size:10px;" id="button-addon2">{{$t('Search')}}</mdb-btn>
        </mdb-input>
     </div>
     <div>
       <div class="user_ill py-1 border-bottom  px-1">
          <div  v-for="(item,i) in filteredList" :key="i" class="item px-3" 
            @click="getBemorId(i,item)" :class="{ activeUser : selectPatient.active_bemor == i }">
            <div>
              <div class="d-flex">
                <div class=" user_photo">
                  <img src="../../assets/patientAvatar.png" style="height: 45px; overflow: none; " class="img-fluid" alt="">
                </div>
                <div class="px-3">
                  <p class="m-0 p-0" >{{item.fio}}</p>
                  <p class="m-0 rang" style="font-size:10px;">{{$t('bemor')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>
    </div>


    <div class="analiz_list border-right">
      <div class="text-center">
        <h4 class="m-0 py-2 text-primary">Диагностика</h4>
      </div>
      <div class=" border-top mt-4 diagnostikapage">
        <div class="w-100" v-if="selectPatient.patient_id">
          <!-- :class="{'active_link': link.view}" -->
          <div 
          active-class="active_link"
          @click ="enterLink"
          class="text-dark d-flex pl-2 px-3 border-bottom menuitem justify-content-between" style="font-size:12.6px; padding: 8px 0; "
          >
          <span>Бланка</span>
          </div>
        </div>
        
        <loader_small v-if="loadRecipe"/>
        <div v-else class="w-100" v-for="item in shablonLists" :key="item.id+item.doctorId">
          <!-- :class="{'active_link': link.view}" -->
          <div
          active-class="active_link"
          @click ="update_downShablon(item)"
          class="text-dark d-flex pl-2 px-3 border-bottom menuitem justify-content-between" style="font-size:12.6px; padding: 8px 0; "
          >
          <span>{{item.patientRecipeTitle}}</span>
          </div>
        </div>
        <loader_small v-if="loadAnaliz"/>
        <div v-else class="w-100" v-for="(link,index) in get_analiz_list" :key="index">
          <!-- :class="{'active_link': link.view}" -->
          <div
          :class="{ active_link : active_el == index }" 
          active-class="active_link"
          @click ="update_down(index, link)"
          class="text-dark d-flex pl-2 px-3 border-bottom menuitem justify-content-between" style="font-size:12.6px; padding: 8px 0; "
          >
          <span>{{link.analiz_name}}</span>
          </div>
        </div>
        
      </div>
    </div>



    <div class="patient_info">
      <div class="text-center mt-2 ">
        <h4 class=" text-primary">Личные данные</h4>
      </div>
      <div class="d-flex patientAllInfo" >
        <div class="doctor_kiritish px-4" style="width: 100%;">
              <mdb-input :label="$t('fio')" disabled="disabled" v-model="selectPatient.name" outline/>
              <mdb-input :label="$t('bornDate')" disabled="disabled" class="mt-3" v-model="selectPatient.bornDate" outline/>
              <div class="d-flex">
                <div class="custom-control custom-checkbox px-5 mt-0 ">
                    <input type="checkbox" v-model="selectPatient.men" disabled="disabled" class="custom-control-input m-0 p-0" id="defaultUnchecked">
                    <label class="custom-control-label" for="defaultUnchecked">Мужской</label>
                </div>
                <div class="custom-control custom-checkbox px-5 ">
                    <input type="checkbox" v-model="selectPatient.girl" disabled="disabled"  class="custom-control-input" id="defaultUnchecked2">
                    <label class="custom-control-label" for="defaultUnchecked2">Женский</label>
                </div>
              </div>
              <mdb-input :label="$t('phone')" disabled="disabled" class="mt-3" v-model="selectPatient.phoneNum" outline/>
              <mdb-input :label="$t('reason')"  disabled="disabled" class="mt-3 " v-model="reason" outline/>

        </div>
        <div class="doctor_image d-flex justify-content-center" style="width: 450px" >
          <div class="picture border picture_background_patient" style="margin-top: 25px;">
              <img src="" style="height: 100%; overflow: none; " class="img-fluid" alt="">
          </div>
        </div>
      </div>
      <div class="NumberItemMark d-flex px-3 mt-3" v-if="laborantType">
        <div class="w-50 d-flex " style="height:40px;">
          <mdb-input :label="$t('number')"  class="m-0 " v-model="markEnterNum" outline/>
          <mdb-btn  color="primary" class=" p-0" style="font-size: 9.8px; margin: 2px 5px;  "  p="r3 l3 t0 b0">{{$t('enter')}}</mdb-btn>

        </div>
        <div class="w-50 d-flex justify-content-end" style="height:40px;">
          <mdb-input :label="$t('getnumber')"  class="m-0 " v-model="idGetNum" outline/>
        </div>
      </div>
      <div class="doctor_table_list mt-2">
        <div class=" border-bottom px-2" :class="{'tableForDoctorPatientSer': !laborantType, 'TablePatientDocId': laborantType}">
              <table class="myTable bg-white" >
                <thead style="position:sticky; top: 0px; z-index:11111;" class="bg-white">
                  <tr class="header ">
                    <th>{{$t('serviceName')}}</th>
                    <th>{{$t('summ')}}</th>
                    <th>{{$t('payedDate')}}</th>
                    <th width="125">{{$t('paid')}}</th>
                    <th width="120">{{$t('payed')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row,rowIndex) in ServiceListForSelect" :key="rowIndex" @click="SelectGetQon( rowIndex)"  :class="{'selectActivService' : row.typeof == true}">
                    <td> <span >{{row.serviceName}}</span> </td>
                    <td> <span >{{row.summ}}</span> </td>
                    <td> <span >{{row.payedDate.slice(0,10)}}</span> </td>
                    <td>
                      <mdb-badge v-show="row.finishPayment === true" style="padding: 2px 8px;" pill color="success">{{$t('payed')}}</mdb-badge>
                      <mdb-badge v-show="row.finishPayment === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                    </td>
                    <td>
                      <mdb-btn @click="finish(row.id,rowIndex)" :disabled="!row.finishPayment" :hidden="finishId"  color="primary" class="m-0 p-0" style="font-size: 8px;"  p="r3 l3 t1 b1">{{$t('check_out')}}</mdb-btn>  
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-right d-flex justify-content-end mr-3">
              <mdb-btn @click="allCheck()"  v-if="laborantType"  color="info" class="m-0 p-0 mt-2 mr-4" style="font-size: 9.8px;"  p="r5 l5 t2 b2">{{$t('all_check')}}</mdb-btn>
              <mdb-btn @click="getBlood()"  v-if="laborantType"  color="danger" class="m-0 p-0 mt-2 mr-4" style="font-size: 9.8px;"  p="r5 l5 t2 b2">{{$t('get_blood')}}</mdb-btn>
              <mdb-btn @click="next_ochred_btn()" :disabled="selectPatient.patient_id == 0"   color="info" class="m-0 p-0 mt-2 mr-2" style="font-size: 9.8px;"  p="r5 l5 t2 b2">{{$t('next_ochred')}}</mdb-btn>
              <!-- <mdb-btn @click="all_finish()" :disabled="!selectPatient.finishPermission"   color="primary" class="m-0 p-0 mt-2" style="font-size: 9.8px;"  p="r5 l5 t2 b2">{{$t('all_checked')}}</mdb-btn> -->
            </div>  

      </div>
    </div>
    <div v-if="selectPatient.patient_id" class="d-flex justify-content-center align-items-center  shadow" :class="{'InfoIcoFixedOpen': showSending, 'InfoIcoFixed': !showSending}"  @click="showSending = !showSending">
      <mdb-icon icon="share-square" far class="text-white ml-1" style="font-size: 22px;" />
    </div>
    <div :class="{'infoLab': showSending, 'infoLabNo': !showSending}">
      <!-- <div class="d-flex justify-content-center align-items-center InfoIcoFixed shadow"  @click="showSending = !showSending">
        <mdb-icon icon="share-square" far class="text-white ml-1" style="font-size: 22px;" />
      </div>  -->
      <send_doctor :patient="selectPatient"/>
    </div>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import send_doctor from './send doctor/doctor_send.vue'
import loader_small from '../../components/loader_small.vue'
import {mdbBtn, mdbInput,mdbBadge, mdbIcon} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from "vuex"
export default {
  components: {
    mdbBtn,mdbInput,mdbBadge, loader_small, mdbIcon, send_doctor
  },
  data(){
    return{
      loading: false,
      loadAnaliz: false,
      loadRecipe: false,
      active_bemor: -1,
      active_el: -1,
      search:'',
      patient: {},
      patient_id: null,
      men: false,
      girl: false,
      name: '',
      bornDate: '',
      address: '',
      phoneNum: '',
      reason: '',
      finishPermission: false,
      finishId: false,
      shablonPatient: [],
      SelectedList: [],
      payments_list: [],
      serviece_types: [],


      markEnterNum: null,
      idGetNum: null,

      laborantType: false,
      showSending: false


    }
  },
  computed: {
    ...mapGetters(['get_patient_auth_id','get_service_patientId', 'get_service_patientId_for_finish', 'shablonLists', 
                    'ServiceListForSelect', 'get_analiz_list', 'selectPatient']),
    filteredList: function(){
      if(this.search)
      {
        return this.get_patient_auth_id.filter((item)=>{
          return this.search.toLowerCase().split(' ').every(v => item.fio.toLowerCase().includes(v))
        })
      }else
      {
        return this.get_patient_auth_id;
      }
      }
  },
  async mounted(){
    if(localStorage.Type == 3){
        this.laborantType = true;
      }
    
    await this.fetch_authId_patient_list()
    this.uppdateServiceEmpty()
    // console.log(this.get_patient_auth_id)

  },
  methods: {
    ...mapActions(['fetch_authId_patient_list', 'fetch_service_patientId', 'fetch_service_patientId_for_finish']),
    ...mapMutations(['updatePatientInfo', 'uppdateServiceEmpty', 'UpdateshablonLists', 'UpdateServiceListForSelect', 'UpdateAnalizList',
        'AddServiceListForSelect','DelServiceListForSelect', 'ClearServiceListForSelect', 'allCheckedServiceList', 'UpdateselectPatient',]),
    async update(){
      await this.fetch_authId_patient_list()
    },
    async getlab(id){
      this.loadAnaliz = true;
      const response = await fetch(this.$store.state.hostname + '/HospitalPatientAnalizHistory/getPaginationByPatient?page=0&size=300&patient_id=' + id)
        const data = await response.json();
        console.log(data)
        this.UpdateAnalizList(data.items_list)
      this.loadAnaliz = false;
    },
    async getShablon(id){
      this.loadRecipe = true;
      const response = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors/getPatientRecipeByPatientId?patientid=' + id)
        const data = await response.json();
        console.log('fsdfsdf')
        console.log(data)
        this.UpdateshablonLists(data)
        this.loadRecipe = false;
    },
    async shablonPatientId(id){
      try{
        const resp = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors/getPatientRecipeByPatientId?patientid=' + id)
        const dataStr = await resp.json();
        console.log('dataStr')
        console.log(dataStr)
        this.shablonPatient = dataStr;
      }
      catch{
        this.$refs.message.success('not_found')
      }
    },
    SelectGetQon( index){
        this.UpdateServiceListForSelect(index)
    },
    allCheck(){
      this.allCheckedServiceList();
    },
    async getBlood(){
      this.payments_list = [];
      this.serviece_types = [];
      var bloodNum = 0
      for(let i=0; i<this.ServiceListForSelect.length; i++){
        if(this.ServiceListForSelect[i].typeof == true && this.ServiceListForSelect[i].finishPayment == true){
          console.log(this.ServiceListForSelect[i])
          this.payments_list.push(this.ServiceListForSelect[i].id)
          this.serviece_types.push(this.ServiceListForSelect[i].serviceType.id)
          bloodNum ++;
        }
      }
      if(bloodNum == 0){
        this.$refs.message.error('not_found')
      }
      else{
       
        try{
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
          "payments_list": this.payments_list,
          'serviece_types': this.serviece_types,
          "group_name": ' ',
          'note': this.selectPatient.name,
          "patientsId":  this.selectPatient.patient_id,
          "doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalMarkSeviceTyesWithNumber', requestOptions)
        const data = await response.json()
        console.log('data')
        console.log(data)
        if(data.id){
          this.idGetNum = data.id;
          this.loading = false;
          this.$refs.message.success('Added_successfully')
        }
        else{
          // this.$refs.msg.error('Error_successfully')
          this.$refs.message.error('not_found')
          this.loading = false;
          return false;
        }
      }
      catch{
        this.$refs.message.error('not_found')
        this.loading = false;
      }
      }
    },
    async getBemorId(i, item){
      this.idGetNum = null;
      // console.log(item)
      this.active_bemor = i;
      this.patient = item
      console.log(this.patient)
      

      var tempPatient = {
            active_bemor : -1,
            name: '',
            bornDate: '',
            address: '',
            patient_id: '',
            phoneNum: '',
            men: false,
            girl:false,
            finishPermission: false,
        }
        tempPatient.active_bemor = i;
        tempPatient.name = item.fio;
        tempPatient.bornDate = item.bornDate.slice(0,10);
        tempPatient.address = item.address;
        tempPatient.patient_id = item.id;
        tempPatient.phoneNum = item.phoneNumber;

        if(item.polType == 1){
        this.men = true;
        this.girl = false;
        tempPatient.men = true;
        tempPatient.girl = false;
      }
      else{
        this.men = false;
        this.girl = true;
        tempPatient.men = false;
        tempPatient.girl = true;
      }

      // console.log(localStorage.AuthId)
      this.name = item.fio;
      this.bornDate = item.bornDate.slice(0,10);
      this.address = item.address;
      this.patient_id = item.id;
      this.phoneNum = item.phoneNumber;
      this.getlab(item.id);
      this.getShablon(item.id);
      
      // this.shablonPatientId(item.id)

      
      await this.fetch_service_patientId(item.id)
      var a = 0;
      console.log('hiy')
      this.AddServiceListForSelect(this.get_service_patientId)

      this.get_service_patientId.forEach((item)=>{
        if(item.finishPayment == false){
          a++;
          return
        }
      })
      if(a==0){
        this.finishPermission = true;
        tempPatient.finishPermission = true;
      }
      else{
        this.finishPermission = false;
        tempPatient.finishPermission = false;
      }
      this.UpdateselectPatient(tempPatient);
      this.reason = this.get_service_patientId[0].name
      await this.fetch_service_patientId_for_finish(this.patient_id)
    },
    enterLink(){
      var temp = {
        id: this.patient_id,
        name: this.name,
        reason: this.reason
      }
      this.updatePatientInfo(temp);
      this.$router.push('/selectShablon')

    },
    async all_finish(){
      await this.next_ochred(this.selectPatient.patient_id, localStorage.docId)
      this.fetch_authId_patient_list()
      this.fetch_service_patientId(this.selectPatient.patient_id)
      this.finishPermission = false;
      this.active_bemor = -1;
      this.ClearServiceListForSelect();
      let emptyPatient = {
        active_bemor : -1,
        name: '',
        bornDate: '',
        address: '',
        patient_id: '',
        phoneNum: '',
        men: false,
        girl:false,
        finishPermission: false,
      }
      let emptyArray = [];
      this.UpdateAnalizList(emptyArray);
      this.UpdateselectPatient(emptyPatient);
    },
    async finish(id, index){
      this.finishId = true;
      this.loading = true;
      const respon = await fetch(this.$store.state.hostname + '/Payments/finishPayedServiceByDoctor?paymentId=' + id)
      const data = await respon.json()
      console.log('prosta finislar');
      console.log(data);
      if(data.id){
          await this.fetch_service_patientId_for_finish(this.selectPatient.patient_id)
          this.$refs.message.success('Added_successfully')
          this.DelServiceListForSelect(index)
          console.log(this.ServiceListForSelect.length)  
          if(this.ServiceListForSelect.length < 1){
            await this.fetch_authId_patient_list();
            this.all_finish();
            console.log('last finish lest');
          }
          await this.fetch_service_patientId(this.selectPatient.patient_id)
      }
      else{
          this.$refs.message.error('Error_server')
      }
      this.finishId = false;
      this.loading = false;
    },
    update_down(index, item){
      this.active_el = index;
      console.log(item)
      this.$router.push('/doctorShowlab/' + item.id)
    },
    update_downShablon(data){
      this.$router.push('/doctorShow_shablon/' + data.id)
    },
    async next_ochred_btn(){
       await this.next_ochred(this.selectPatient.patient_id, localStorage.docId)
    },
    async next_ochred(patient_id,doc_id){
      this.check_ochret_status = false;
      let newdate = new Date().toISOString().slice(0,10);
      console.log(newdate)
      let b_date  = newdate + 'T00:00:35.000Z';
      let e_date  = newdate + 'T23:59:35.000Z';
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/acceptGetPaginationByDoktorIdAndPatientIdDates?page=0&size=100&user_id=" + doc_id + '&patient_id=' + patient_id + '&b_date=' + b_date + '&e_date=' + e_date);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data, 'jsonini ckeck ochret oldim')
          
          this.$refs.message.success('Added_successfully')
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

  }
}
</script>

<style lang="scss">
.doctor_page{
  display: flex;
  flex-wrap:wrap;
  height: calc(100vh - 50px);
  overflow: hidden;
  border: 1px solid red;

  background: #fff;
  .patient_list{
    width: 24%;
    .user_ill{
      overflow: hidden;
      overflow-y: scroll;
      max-height: calc(100vh - 150px);
      width: 100%;
      // background-color: rgba(32, 32, 32,0.75);
      .item{
          .user_photo{
            background-color: #fff;
              border-radius: 50%;
              width: 45px;
              height: 45px;
              overflow: hidden;
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
      
    }
    .activeUser{
      cursor: pointer;
      box-shadow: 2px 2px 5px rgb(224, 224, 224);
      background-color: rgb(179, 230, 255);
      transform: translate(6px, 0px);
      transition: all 0.1s ease-in-out;
    }
  }
  .analiz_list{
    width: 20%;
    // border: 1px solid black;
    overflow: hidden;
    overflow-y: scroll;
    max-height: calc(100vh - 50px);
  }
  .patient_info{
    width: 56%;
    height: calc(100vh - 50px);
    overflow: hidden;
    flex-direction: column;

    .patientAllInfo{
      // height: 500px;
      border: 1px solid rgb(187, 187, 255);
    }
  }
  .picture{
    width: 200px;
    height: 240px;
    margin: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgb(224, 224, 224), -1px -1px 3px rgb(224, 224, 224);
    background-color: #fff;
  }
  .picture_background_patient{
    background-image: url('../../assets/patientAvatar.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #fff;
  }
  .doctor_table_list{
    .TablePatientDocId{
      height: calc(100vh - 520px);
      overflow: hidden;
      overflow-y: auto;
      // border: 1px solid #ddd;
    }
    .tableForDoctorPatientSer{
      height: calc(100vh - 465px);
      overflow: hidden;
      overflow-y: auto;
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
  }
  
}
.diagnostikapage{
  overflow-y: auto;
  // overflow-y: hidden;
  max-height: 85vh;
}
.selectActivService{
  background: rgb(124, 165, 255);
}
.InfoIcoFixed{
  transition: 0.5s;
  position:fixed;
  z-index: 11111;
  right:0; 
  top:145px; 
  width: 50px; 
  height:50px; 
  cursor:pointer;
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
  border-top-left-radius:5px; 
  border-bottom-left-radius:5px;
}
.InfoIcoFixedOpen{
  transition: 0.5s;
  position:fixed;
  z-index: 11111;
  right:50%; 
  top:145px; 
  width: 50px; 
  height:50px; 
  cursor:pointer;
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
  border-top-left-radius:5px; 
  border-bottom-left-radius:5px;
}
.infoLab{
  position: fixed;
  width: 50%;
  height: 100vh;
  right:0%;
  background: white;
  z-index: 1111111111;
  transition: 0.5s;
  overflow: hidden;
  overflow-y: scroll;
}
.infoLabNo{
  transition: 0.5s;
  position: fixed;
  width: 100%;
  height: 100vh;
  right:-100%;
  // transform: translateX(-100%);
  background: white;
  z-index: 1111111111;
}
</style>