<template>
     
<div>
   <loader v-if="loading"/>

    <form v-on:submit.prevent="submit" >
      <div class="d-flex">
        <div class="userEnter px-3 pb-2">
          <div class="row">
            <div class="col-12">
              <mdb-input label="Имя"  v-model="name"  @input="search_func" outline/>
              <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
                {{$t('name_invalid_text')}}
              </small>
              <div style="position: relative;">
                <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                  Дата рождения
                </small>
                  <mdb-input type="date"  v-model="time1" outline/>
                  <small class="invalid-text"  v-if="$v.time1.$dirty && !$v.time1.required" >
                    {{$t('name_invalid_text')}}
                  </small>
              </div>
              <div style="position:relative;">
                <input style="width:100%;  height:38px; border:none; outline:none; padding: 0 12px;" class="mt-0 mb-4 border rounded " @input="changeInput" v-model="tel" placeholder="(--) --- ----" outline/>
                <small style="position: absolute; top:-10px; left:8px; color:#5B5B5B;" class="bg-white px-1">{{$t('phoneNumber')}}</small>
              </div>
              
            </div>
            <div class="custom-control custom-checkbox px-5 ">
                <input type="checkbox" v-model="men" @click="menFunc" class="custom-control-input" id="defaultUnchecked">
                <label class="custom-control-label" for="defaultUnchecked">Мужской</label>
            </div>
            <div class="custom-control custom-checkbox px-5 ">
                <input type="checkbox" v-model="girl" @click="girlFunc"  class="custom-control-input" id="defaultUnchecked2">
                <label class="custom-control-label" for="defaultUnchecked2">Женский</label>
            </div>

            <div class="col-12">
              <mdb-input label="Паспорт"  v-model="passport" outline/>

              <RegSelect
                label="Район"
                @select="district_func"
                :options="get_district_list.rows"
                :selected="district_name"
               />

            </div>
            <div class="col-12">
               <small v-if="$v.district_name.$dirty && district_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>

            <div class="col-12 mt-4">
              <lineSelect
                    :options="get_contragent_list.rows" 
                    :searchshow="true"
                    @select="contragent_func"
                    :selected="contragent_name"
                    :label="$t('contragent')"
                />
                <div class="col-12">
                  <small v-if="$v.contragent_name.$dirty && contragent_id == null" style="margin-left: -16px;" class="invalid-text pt-4" >
                      {{$t('select_item')}}
                    </small>
                </div>
            </div>
           
            
        
          </div>
        </div>
        <div class="userPicture">
          <!-- <div class="user_img">
            <img src="" id="prewImage"  width= "213" height= "249" alt="">
            <div class="input-group mt-2" style="margin-left: 0px;">
              <div class="input-group-prepend">
                <span class="input-group-text" hidden id="inputGroupFileAddon01">Upload</span>
              </div>
              <div class="custom-file">
                <input type="file"  class="custom-file-input"  id="inputGroupFile01" v-on:change="previewFile" aria-describedby="inputGroupFileAddon01">
                <label class="custom-file-label"  for="inputGroupFile01">Choose file</label>
              </div>
            </div>

          </div>  -->
          <div class="user_illSendPatient py-1 border-bottom  px-3" >
            <div  v-for="(item,i) in get_patient_client_list" :key="i" class="item px-3" 
              @click="getBemorId(i,item)" :class="{ activeUser : active_bemor == i }">
              <div>
                <div class="d-flex">
                  <div class=" user_photo">
                    <img src="../../assets/patientAvatar.png" style="height: 45px; overflow: none; " class="img-fluid" alt="">
                  </div>
                  <div class="px-3">
                    <p class="m-0 p-0" >{{item.fio}}</p>
                    <p class="m-0 rang" style="font-size:10px;">Год: <span class="px-2">{{item.bornDate.slice(0,4)}}</span> 
                     Тел: <span class="px-2">{{item.phoneNumber}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="row container">
        <div class="col-12 pt-0 m-0">
          <mdb-input :label="$t('reason_patient')" style="margin-top: 15px;" v-model="reason"    outline/>
           <mdb-input label="Адрес" style="margin-top: -7px;"  v-model="adress" outline/>
          <!--<mdb-input label="Место (учебы) работы" style="margin-top: -5px;" v-model="workAdress" outline/> -->
        </div>
          <!-- <div class="col-12">
            <div style="position: relative; margin-top: -19px;"> 
              <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                {{$t('unregistrDate')}}
              </small>
              <mdb-input type="date"  v-model="unregistrDate" outline/>
              <small class="invalid-text"  v-if="$v.unregistrDate.$dirty && !$v.unregistrDate.required" >
                {{$t('name_invalid_text')}}
              </small>
            </div>
          </div> -->
        
      </div>
      <div class="row">
        <div class="col-6">
          <!-- <MDBInput size=""  label="Дата выписки" v-model="unform" class="mt-3"/> -->
          <!-- <MDBInput size=""  label="Диспансеризация" class="mt-3" v-model="TreatmentPlaces" /> -->
          <!-- <MDBInput size=""  label="Мед обследование" class="mt-3" v-model="TreatmentPlaces" /> -->
        </div>
        <div class="col-6">
          <!-- <MDBInput size=""  label="Данное заведение" class="mt-3" v-model="TreatmentPlacesCurrentPlaces" />
          <MDBInput size=""  label="Другие заведения" class="mt-3" v-model="OtherPlaces" /> -->
        </div>
      </div>
       
       <div v-show="!next" class="text-right container border-top mt-3" >
          <mdb-btn color="success px-4 py-2 mr-3" type="submit" style="margin-top:15px; font-size:10px;">Добавить</mdb-btn>
        </div>
        <div v-show="next" class="text-right container border-top mt-3" >
          <mdb-btn color="primary px-4 py-2 mr-3" @click="nextpage" style="margin-top:15px; font-size:10px;">Продолжить</mdb-btn>
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
import lineSelect from "../lineSelect.vue";
import RegSelect from '../../components/RegSelect.vue'
  import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  components: {
      mdbBtn,
      mdbInput,RegSelect, lineSelect
    },
    data(){
      return{
        
        patient_info: {
          reason: '',
          contragent_id: null,
          contragent_name: '',
          contragent_tel: '',
          number_into_id: null,
          patient_type_id: null,
          patient_id: null,
          patient_name: '',
          patient_tel: ''
        },

        modal_info : '',
        modal_status: false,
        loading: false,
        id: 0,
        name: '',   
        time1: null,  
        tel: '',
        men: true,
        girl: false,
        picture: '',
        district_name: '',
        district_id: null,
        passport: '',
        pol: 1,
        workAdress: '',
        adress: '',
        unregistrDate: null, 
        contragent_name: '',
        contragent_id: null,
        reason: '',
        searchPatient: false,
        active_bemor: -1,
        next: false,
        bemorId: null
        
      }
    },
    validations: {
      name: {required},
      time1: {required},
      unregistrDate: {required},
      district_name: {required},
      contragent_name: {required},
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['allDepartments','get_district_list', 'get_patient_client_list', 'get_contragent_list']),
  async mounted(){
    var a = new Date();
    this.time1 = a.toISOString().slice(0,10);
    // this.loading = true;
    this.fetch_district()
    await this.fetch_contragent()
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
    
  },
  created() {
    this.$root.$refs.clientAdd = this;
  },
    methods: {
      ...mapActions(['fetch_district', 'fetch_client', 'fetch_patient_client', 'fetch_contragent', 'fetch_search_patient', 'fetch_patient_list_last']),
      ...mapMutations(['choose_patient_client']),
      changeInput(){
        var x = this.tel.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.tel = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      },
      async rootMounted(){
        if(this.name == ''){
          this.next = false;
          this.active_bemor = -1;
        }
        await this.fetch_district()
        if(this.get_district_list.rows.length != 0){
          console.log(this.get_district_list.rows)
          this.district_name = this.get_district_list.rows[0].name;
          this.district_id = this.get_district_list.rows[0].id;
        }
      },
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
      search_func(){
        if(this.name == ''){
          this.next = false;
          this.active = false;
          this.active_bemor = -1;
          // console.log('hiy')
          this.fetch_patient_client();
        }
        else{
          this.fetch_search_patient(this.name);
          console.log(this.get_patient_client_list)
        }

      },
      getBemorId(i, item){
        this.active_bemor = i;
        this.next = true;
        console.log(item);
        this.name = item.fio;
        this.bemorId = item.id
        var temp = ''
        for(let i=4;i<item.phoneNumber.length; i++){
          temp += item.phoneNumber[i]
        }
        var y = temp.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.tel = !y[2] ? y[1] : '(' + y[1] + ') ' + y[2] + (y[3] ? '-' + y[3] : '');

        // this.tel = item.phoneNumber;
        this.time1 = item.bornDate.slice(0,10);
        this.passport = item.passportSerialNumber;
        //  this.district_id = item.districts.id
        // this.district_name = item.districts.name
      },
      //  patient_info: {
      //     reason: '',
      //     contragent_id: null,
      //     contragent_name: '',
      //     contragent_tel: '',
      //     number_into_id: null,
      //     patient_type_id: null,
      //     patient_id: null,
      //     patient_name: '',
      //     patient_tel: ''
      //   },
      async nextpage(){
        console.log('next')
        var a = new Date();
        this.unregistrDate = a.toISOString().slice(0,10);
        
        console.log(this.unregistrDate)
        // console.log(new Date().toLocaleDateString())
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }

        try{
          var phoneNum = '';
          for(let i=0; i<this.tel.length; i++){
            console.log(this.tel[i])
            if(this.tel[i] == '-' || this.tel[i] == '(' || this.tel[i] == ')' || this.tel[i] == ' '){
              console.log('--')
            }else{
              phoneNum += this.tel[i];
            }
          }
          this.tel = phoneNum
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
              "fio": this.name,
              "passportSerialNumber": this.passport,
              "phoneNumber": '+998' + this.tel,
              "bornDate": this.time1 + "T12:37:44.069Z",
              "polType": this.pol,
              "districtsId": this.district_id,
              "id": this.bemorId,
            })
          };
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + '/Patients', requestOptions)
          const data = await response.json()
          if(data.id){
            this.loading = false;
            this.$refs.message.success('Added_successfully')
          }
          else{
            // this.$refs.msg.error('Error_successfully')
            this.loading = false;
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
        }
        catch{
          this.loading = false;
          this.modal_info = "Server no connect";
          this.modal_status = true;
        }
        
        this.loading = true;
        this.patient_info.reason = this.reason;
        this.patient_info.patient_tel = this.tel;
        this.patient_info.patient_born = this.time1;
        this.patient_info.patient_id = this.bemorId
        this.patient_info.patient_name = this.name
        this.cls_wnd()
        this.choose_patient_client(this.patient_info)
        this.loading = false;
        this.$emit('close')
      },
       contragent_func(option){
        console.log('contragent')
        console.log(option)
        this.contragent_name = option.data.name;
        this.contragent_id = option.data.id;
        this.patient_info.contragent_name = option.data.name;
        this.patient_info.contragent_tel = option.data.phoneNumber;
        this.patient_info.contragent_id = option.data.id;
      },

      update(){
        this.name = this.options.fio;     
        this.tel = this.options.phoneNumber;
        // this.district_name = this.options.district_name;
        // this.district_id = this.options.districtsId;
        this.id = this.options.id;
        this.passport = this.options.passportSerialNumber
        this.adress = this.options.address
        this.time1 = this.options.bornDate.slice(0,10)
        this.unregistrDate = this.options.unregistratedDate.slice(0,10)
        this.workAdress =  this.options.workAddress
        if(this.options.polType == 1){
          this.men = true;
          this.girl = false;
        }else{
          this.men = false;
          this.girl = true;
        }
      },

      district_func(option){
        // console.log(option)
        this.district_id = option.id
        this.district_name = option.name
      },
      
      cls_wnd(){
        this.name = '';     
        this.tel = '';
        this.passport = '';
        this.district_name = '';
        this.district_id = null;
        this.adress = '';
        this.workAdress = '';
        this.pol = 1;
        this.time1 = null;
        var a = new Date();
        this.unregistrDate = a.toISOString().slice(0,10);
        this.time1 = a.toISOString().slice(0,10);
      },
      async submit(){
        var phone = '';
        for(let i=0; i<this.tel.length; i++){
          console.log(this.tel[i])
          if(this.tel[i] == '-' || this.tel[i] == '(' || this.tel[i] == ')' || this.tel[i] == ' '){
            console.log('--')
          }else{
            phone += this.tel[i];
          }
        }
        this.tel = phone
        var a = new Date();
        this.unregistrDate = a.toISOString().slice(0,10);
        
        console.log(this.unregistrDate)
        // console.log(new Date().toLocaleDateString())
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        this.patient_info.reason = this.reason;
        this.patient_info.patient_tel = '+998' + this.tel;
        this.patient_info.patient_born = this.time1;
        console.log(this.tel)
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Patients/addPatients?Id=' + this.id + '&FIO=' + 
          this.name + '&PassportSerialNumber=' + this.passport + '&PhoneNumber=+998' + this.tel + '&PolType=' + this.pol + 
          '&DistrictsId=' + this.district_id + '&Address=' + this.adress  + '&WorkAddress=' + this.workAdress + 
          '&UnregistratedDate=' + this.unregistrDate + '&BornDate=' + this.time1 + '&TreatmentPlaces=' + ' ' + 
          '&TreatmentPlacesCurrentPlaces=' + ' ' + '&TreatmentPlacesOtherPlaces=' + ' ')
        const data = await response.json()
          this.loading = false;
        if(data.id){
          this.patient_info.patient_id = data.id
          this.patient_info.patient_name = data.fio
          this.cls_wnd()
          await this.fetch_client()
          this.choose_patient_client(this.patient_info)
          this.fetch_patient_list_last()
          this.$emit('close')
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
          // console.log('dsd')
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

<style scoped lang="scss">
.userPicture .user_img{
  width: 215px;
  height: 250px;
  border: 1px solid rgb(164, 164, 164);
  border-radius: 3px;
  // background-image: url('../../assets/patientAvatar.png');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  }
.userEnter{
  width: 55%;
}
.userPicture{
  width: 45%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.timepiker{
  position: relative;
  width: 100%;
  margin-top:32px;
  cursor: pointer;
}
.user_illSendPatient{
   overflow: hidden;
  overflow-y: scroll;
  height: 41vh;
  width: 100%;
  // background-color: rgba(32, 32, 32,0.75);
  .item{
      .user_photo{
        background-color: #fff;
          border-radius: 50%;
          width: 45px;
          height: 45px;
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
  
}
.activeUser{
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(224, 224, 224);
  background-color: rgb(179, 230, 255);
  transform: translate(6px, 0px);
  transition: all 0.1s ease-in-out;
}
</style>