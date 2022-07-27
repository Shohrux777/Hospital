<template>
  <div class="bakteriya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">Биохимический Анализ крови</h4>
    </div>
    <div class="row mt-2">
      <div class="col-4">
        <form v-on:submit.prevent="submit">
          <div class="d-flex " style="height:40px;">
            <mdb-input :label="$t('number')"  class="m-0 ml-4 w-75" v-model="numberEnter" outline/>
            <mdb-btn  color="primary" type="submit" class=" p-0" style="font-size: 9.8px; margin: 2px 5px;"   p="r3 l3 t0 b0">{{$t('enter')}}</mdb-btn>
          </div>
        </form>
      </div>
      <div class="col-4">
        <lineSelect
          class="mt-1 ml-3"
          :options="filteredList" 
          :searchshow="true"
          @select="selectPatient"
          :selected="patient_name"
          :label="$t('patient list')"
      />
      <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4 pl-4" >
        {{$t('select_item')}}
      </small>
      </div>
      <div class="col-4">
        <mdb-input :label="$t('doctor_name')" class="m-0" v-model="doctor_name" outline/>
        <small v-if="$v.doctor_name.$dirty && !$v.doctor_name.required" class="invalid-text  pl-5" style="position:absolute; bottom:-10px; left:-20px;"> 
          {{$t('select_item')}}
        </small>
      </div>
    </div>
   <loader v-if="loading"/>
    <div v-else class="mx-1 row">
      <div class="col-6">
        <div class="pos_relative">
          <mdb-input :label="('АЛТ (АЛТ)')"  v-model="alt" outline/>
          <small class="pos_absolute">М: 42 Ед/л
                  Ж: 32 Ед/л</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('АСТ(АСТ)')"  v-model="act" outline/>
          <small class="pos_absolute">М: 37 Ед/л
                    Ж: 31 Ед/л</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Общий билирубин (ТВ)')"  v-model="tb" outline/>
          <small class="pos_absolute">18.8 мкмоль/л</small>

        </div>
        <div class="pos_relative">
          <mdb-input :label="('Прямой билирубин (DВ)')"  v-model="db" outline/>
          <small class="pos_absolute">5,13 мкмоль/л</small>

        </div>
        <div class="pos_relative">
          <mdb-input :label="('Общий белок (TP)')"  v-model="tp" outline/>
          <small class="pos_absolute">Взрослые 66-87 г/л</small>

        </div>
        <div class="pos_relative">
          <mdb-input :label="('Глюкоза (GLU)')"  v-model="glu" outline/>
          <small class="pos_absolute">3,5-6.4 ммоль/л</small>

        </div>
        <div class="pos_relative">
          <mdb-input :label="('Креатинин (KREA)')"  v-model="krea" outline/>
          <small class="pos_absolute">М: 50 лет 74-110 мкмолъ/л
                      >50 лет 72-127 мкмолъ/л
                      Ж : 58-96 мкмолъ/л</small>

        </div>
        
        
        
        
        
        
        

      </div>
      <div class="col-6">
        <div class="pos_relative">
          <mdb-input :label="('Мочевина (BUN)')"  v-model="bun" outline/>
          <small class="pos_absolute">1.7-8.3 ммоль/л</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Холестерин (ТС)')"  v-model="tc" outline/>
          <small class="pos_absolute">5,2 ммоль/л
                    100%</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Холестерин липопротеины (HDL-C)')"  v-model="hdl_c" outline/>
          <small class="pos_absolute">≥ 1.55 ммоль/л
                    29.8%</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Холестерин липопротеины (LDL-C)')"  v-model="ldl_c" outline/>
          <small class="pos_absolute">2.59 ммоль/л 49.8%</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Кальций (Са)')"  v-model="ca" outline/>
          <small class="pos_absolute">2.02-2.60 ммоль/л</small>
        </div>
        <div class="pos_relative">
          <mdb-input :label="('Alpha - AMYLASE')"  v-model="amylase" outline/>
          <small class="pos_absolute">30-90 U/L</small>
        </div>
        
        
        




      </div>
    </div>
    <div class="text-right mx-4 py-2 border-top">
      <mdb-btn color="primary" class="m-0 p-0"   p="r4 l4 t2 b2" @click="send" style="font-size:10px;">{{$t('Send')}}</mdb-btn>  
    </div>
    <Toast ref="message"></Toast>
    <AlertError ref="msg"></AlertError>
   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
  </div>
</template>

<script>
import {mdbBtn, mdbInput} from "mdbvue";
import {mapActions, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
import lineSelect from "../../components/hospital/cashUserSelectForAnalysis.vue";
export default {
  components: {
    mdbBtn,mdbInput,lineSelect
  },
  validations: {
      patient_name : {required},
      doctor_name : {required}

    },
  data(){
    return {
      loading : false,
      modal_info : '',
      modal_status: false,

      numberEnter: null,
      patient_name: '',
      patient_id: null,
      name: '',
      doctor_name: localStorage.docName,
      id: this.$route.params.id,

      alt: '',
      act: '',
      tb: '',
      db: '',
      tp: '',
      glu: '',
      krea: '',
      bun: '',
      tc: '',
      hdl_c: '',
      ldl_c: '',
      ca: '',
      amylase: '',
    }
  },
  async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalBioximyaKrov/' + this.id);
        const data = await res.json();
        console.log(data)
          this.alt =  data.alt;
          this.act =  data.act;
          this.tb =  data.tb;
          this.db =  data.db;
          this.tp =  data.tp;
          this.glu =  data.glu;
          this.krea =  data.krea;
          this.bun =  data.bun;
          this.tc =  data.tc;
          this.hdl_c =  data.hdl_c;
          this.ldl_c =  data.ldl_c;
          this.ca =  data.ca;
          this.amylase =  data.amylase;
          this.id =  data.id;
          this.patient_id =   data.patientsId;
          this.patient_name = data.patient_name
          this.doctor_name =  data.doctor_name;
      }

    },
  computed:{
    ...mapGetters(['get_patient_client_list']),
    filteredList: function(){
      if(this.search)
      {
        return this.get_patient_client_list.filter((item)=>{
          return this.search.toLowerCase().split(' ').every(v => item.fio.toLowerCase().includes(v))
        })
      }else
      {
        return this.get_patient_client_list;
      }
      }
  },
  mounted(){
    this.fetch_patient_client();
  },
  methods:{
    ...mapActions(['fetch_patient_client']),
    selectPatient(option){
      console.log(option)
      this.patient_name = option.data.fio;
      this.patient_id = option.data.id;
    },
    async submit(){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalMarkSeviceTyesWithNumber/getFullInfoById?id=' + this.numberEnter)
        const data = await response.json()
        console.log('data')
        console.log(data)
        if(data.id){
          this.patient_name = data.patients.fio;
          this.patient_id = data.patients.id;
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
    },
    async sendFinish(){
      if(this.numberEnter){
        try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalMarkSeviceTyesWithNumber/getCheckedStatusAnaliz?id=' + this.numberEnter)
        const data = await response.json()
        console.log('data')
        console.log(data)
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
      }
    },
    cls_wnd(){
      this.alt = '';
      this.act = '';
      this.tb = '';
      this.db = '';
      this.tp = '';
      this.glu = '';
      this.krea = '';
      this.bun = '';
      this.tc = '';
      this.hdl_c = '';
      this.ldl_c = '';
      this.ca = '';
      this.amylase = '';
    },
    async send(){
      try{
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
          "alt": this.alt,
          "act": this.act,
          "tb": this.tb,
          "db": this.db,
          "tp": this.tp,
          "glu": this.glu,
          "krea": this.krea,
          "bun": this.bun,
          "tc": this.tc,
          "hdl_c": this.hdl_c,
          "ldl_c": this.ldl_c,
          "ca": this.ca,
          "amylase": this.amylase,
          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "biox_print",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalBioximyaKrov', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd()
          this.sendFinish()
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/biox_print/' + data.id)
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
      
    }
  }
}
</script>

<style>
.pos_relative{
  position: relative;
}
.pos_absolute{
  position: absolute;
  top:37px;
  left:5px;
  color:rgb(45, 25, 170);
}
</style>