<template>
  <div class="bakteriya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">Анализ мазка</h4>
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
        <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text mt-0 pl-4" >
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
      <div class="col-4" >
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты (Вагина)')"  v-model="leykositi_vagina" outline/>
          <small v-if="$v.leykositi_vagina.$dirty  && !$v.leykositi_vagina.required" class="invalid-text mt-0 pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>

        </div>
        <div style="position:relative;">
          <mdb-input :label="('Плоский эпителий (Вагина)')"  v-model="ploskiy_epiteliy_vagina" outline/>
          <small v-if="$v.ploskiy_epiteliy_vagina.$dirty   && !$v.ploskiy_epiteliy_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гонококки (Вагина)')"  v-model="gonokokki_vagina" outline/>
          <small v-if="$v.gonokokki_vagina.$dirty && !$v.gonokokki_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Трихомонады (Вагина)')"  v-model="trixomonadi_vagina" outline/>
          <small v-if="$v.trixomonadi_vagina.$dirty && !$v.trixomonadi_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Ключевые клетки  (Вагина)')"  v-model="kluchoviy_kletki_vagina" outline/>
          <small v-if="$v.kluchoviy_kletki_vagina.$dirty  && !$v.kluchoviy_kletki_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Дрожжи  (Вагина)')"  v-model="drojji_vagina" outline/>
          <small v-if="$v.drojji_vagina.$dirty  && !$v.drojji_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Микрофлора  (Вагина)')"  v-model="mikroflora_vagina" outline/>
          <small v-if="$v.mikroflora_vagina.$dirty  && !$v.mikroflora_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Слизь  (Вагина)')"  v-model="sliz_vagina" outline/>
          <small v-if="$v.sliz_vagina.$dirty  && !$v.sliz_vagina.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        

        
      </div>
      <div class="col-4" >
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты (Сервикс)')"  v-model="leykositi_serviks" outline/>
          <small v-if="$v.leykositi_serviks.$dirty  && !$v.leykositi_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Плоский эпителий (Сервикс)')"  v-model="ploskiy_epiteliy_serviks" outline/>
          <small v-if="$v.ploskiy_epiteliy_serviks.$dirty   && !$v.ploskiy_epiteliy_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гонококки (Сервикс)')"  v-model="gonokokki_serviks" outline/>
          <small v-if="$v.gonokokki_serviks.$dirty && !$v.gonokokki_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Трихомонады (Сервикс)')"  v-model="trixomonadi_serviks" outline/>
          <small v-if="$v.trixomonadi_serviks.$dirty && !$v.trixomonadi_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Ключевые клетки  (Сервикс)')"  v-model="kluchoviy_kletki_serviks" outline/>
          <small v-if="$v.kluchoviy_kletki_serviks.$dirty  && !$v.kluchoviy_kletki_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Дрожжи  (Сервикс)')"  v-model="drojji_serviks" outline/>
          <small v-if="$v.drojji_serviks.$dirty  && !$v.drojji_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Микрофлора  (Сервикс)')"  v-model="mikroflora_serviks" outline/>
          <small v-if="$v.mikroflora_serviks.$dirty  && !$v.mikroflora_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Слизь  (Сервикс)')"  v-model="sliz_serviks" outline/>
          <small v-if="$v.sliz_serviks.$dirty  && !$v.sliz_serviks.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        

        
      </div>
      <div class="col-4" >
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты (Уретра)')"  v-model="leykositi_uretra" outline/>
          <small v-if="$v.leykositi_uretra.$dirty  && !$v.leykositi_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Плоский эпителий (Уретра)')"  v-model="ploskiy_epiteliy_uretra" outline/>
          <small v-if="$v.ploskiy_epiteliy_uretra.$dirty   && !$v.ploskiy_epiteliy_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гонококки (Уретра)')"  v-model="gonokokki_uretra" outline/>
          <small v-if="$v.gonokokki_uretra.$dirty && !$v.gonokokki_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Трихомонады (Уретра)')"  v-model="trixomonadi_uretra" outline/>
          <small v-if="$v.trixomonadi_uretra.$dirty && !$v.trixomonadi_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Ключевые клетки  (Уретра)')"  v-model="kluchoviy_kletki_uretra" outline/>
          <small v-if="$v.kluchoviy_kletki_uretra.$dirty  && !$v.kluchoviy_kletki_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Дрожжи  (Уретра)')"  v-model="drojji_uretra" outline/>
          <small v-if="$v.drojji_uretra.$dirty  && !$v.drojji_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Микрофлора  (Уретра)')"  v-model="mikroflora_uretra" outline/>
          <small v-if="$v.mikroflora_uretra.$dirty  && !$v.mikroflora_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Слизь  (Уретра)')"  v-model="sliz_uretra" outline/>
          <small v-if="$v.sliz_uretra.$dirty  && !$v.sliz_uretra.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
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
      leykositi_vagina: {required},
      ploskiy_epiteliy_vagina: {required},
      gonokokki_vagina: {required},
      trixomonadi_vagina: {required},
      kluchoviy_kletki_vagina: {required},
      drojji_vagina: {required},
      mikroflora_vagina: {required},
      sliz_vagina: {required},
      leykositi_serviks: {required},
      ploskiy_epiteliy_serviks: {required},
      gonokokki_serviks: {required},
      trixomonadi_serviks: {required},
      kluchoviy_kletki_serviks: {required},
      drojji_serviks: {required},
      mikroflora_serviks: {required},
      sliz_serviks: {required},
      leykositi_uretra: {required},
      ploskiy_epiteliy_uretra: {required},
      gonokokki_uretra: {required},
      trixomonadi_uretra: {required},
      kluchoviy_kletki_uretra: {required},
      drojji_uretra: {required},
      mikroflora_uretra: {required},
      sliz_uretra: {required},
      doctor_name : {required}

    },
  data(){
    return {
      loading : false,
      modal_info : '',
      modal_status: false,

      patient_name: '',
      patient_id: null,
      name: '',
      doctor_name: localStorage.docName,
      id: this.$route.params.id,
      numberEnter: null,


      leykositi_vagina: '',
      ploskiy_epiteliy_vagina: '',
      gonokokki_vagina: '',
      trixomonadi_vagina: '',
      kluchoviy_kletki_vagina: '',
      drojji_vagina: '',
      mikroflora_vagina: '',
      sliz_vagina: '',
      leykositi_serviks: '',
      ploskiy_epiteliy_serviks: '',
      gonokokki_serviks: '',
      trixomonadi_serviks: '',
      kluchoviy_kletki_serviks: '',
      drojji_serviks: '',
      mikroflora_serviks: '',
      sliz_serviks: '',
      leykositi_uretra: '',
      ploskiy_epiteliy_uretra: '',
      gonokokki_uretra: '',
      trixomonadi_uretra: '',
      kluchoviy_kletki_uretra: '',
      drojji_uretra: '',
      mikroflora_uretra: '',
      sliz_uretra: '',
    }
  },
  async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalMazok/' + this.id);
        const data = await res.json();
        console.log(data)
          this.leykositi_vagina= data.leykositi_vagina;
          this.ploskiy_epiteliy_vagina= data.ploskiy_epiteliy_vagina;
          this.gonokokki_vagina= data.gonokokki_vagina;
          this.trixomonadi_vagina= data.trixomonadi_vagina;
          this.kluchoviy_kletki_vagina= data.kluchoviy_kletki_vagina;
          this.drojji_vagina= data.drojji_vagina;
          this.mikroflora_vagina= data.mikroflora_vagina;
          this.sliz_vagina= data.sliz_vagina;
          this.leykositi_serviks= data.leykositi_serviks;
          this.ploskiy_epiteliy_serviks= data.ploskiy_epiteliy_serviks;
          this.gonokokki_serviks= data.gonokokki_serviks;
          this.trixomonadi_serviks= data.trixomonadi_serviks;
          this.kluchoviy_kletki_serviks= data.kluchoviy_kletki_serviks;
          this.drojji_serviks= data.drojji_serviks;
          this.mikroflora_serviks= data.mikroflora_serviks;
          this.sliz_serviks= data.sliz_serviks;
          this.leykositi_uretra= data.leykositi_uretra;
          this.ploskiy_epiteliy_uretra= data.ploskiy_epiteliy_uretra;
          this.gonokokki_uretra= data.gonokokki_uretra;
          this.trixomonadi_uretra= data.trixomonadi_uretra;
          this.kluchoviy_kletki_uretra= data.kluchoviy_kletki_uretra;
          this.drojji_uretra= data.drojji_uretra;
          this.mikroflora_uretra= data.mikroflora_uretra;
          this.sliz_uretra= data.sliz_uretra;
          this.id = data.id
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
    cls_wnd(){
      this.leykositi_vagina = '';
      this.ploskiy_epiteliy_vagina = '';
      this.gonokokki_vagina = '';
      this.trixomonadi_vagina = '';
      this.kluchoviy_kletki_vagina = '';
      this.drojji_vagina = '';
      this.mikroflora_vagina = '';
      this.sliz_vagina = '';
      this.leykositi_serviks = '';
      this.ploskiy_epiteliy_serviks = '';
      this.gonokokki_serviks = '';
      this.trixomonadi_serviks = '';
      this.kluchoviy_kletki_serviks = '';
      this.drojji_serviks = '';
      this.mikroflora_serviks = '';
      this.sliz_serviks = '';
      this.leykositi_uretra = '';
      this.ploskiy_epiteliy_uretra = '';
      this.gonokokki_uretra = '';
      this.trixomonadi_uretra = '';
      this.kluchoviy_kletki_uretra = '';
      this.drojji_uretra = '';
      this.mikroflora_uretra = '';
      this.sliz_uretra = '';
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
          "leykositi_vagina": this.leykositi_vagina,
          "ploskiy_epiteliy_vagina": this.ploskiy_epiteliy_vagina,
          "gonokokki_vagina": this.gonokokki_vagina,
          "trixomonadi_vagina": this.trixomonadi_vagina,
          "kluchoviy_kletki_vagina": this.kluchoviy_kletki_vagina,
          "drojji_vagina": this.drojji_vagina,
          "mikroflora_vagina": this.mikroflora_vagina,
          "sliz_vagina": this.sliz_vagina,
          "leykositi_serviks": this.leykositi_serviks,
          "ploskiy_epiteliy_serviks": this.ploskiy_epiteliy_serviks,
          "gonokokki_serviks": this.gonokokki_serviks,
          "trixomonadi_serviks": this.trixomonadi_serviks,
          "kluchoviy_kletki_serviks": this.kluchoviy_kletki_serviks,
          "drojji_serviks": this.drojji_serviks,
          "mikroflora_serviks": this.mikroflora_serviks,
          "sliz_serviks": this.sliz_serviks,
          "leykositi_uretra": this.leykositi_uretra,
          "ploskiy_epiteliy_uretra": this.ploskiy_epiteliy_uretra,
          "gonokokki_uretra": this.gonokokki_uretra,
          "trixomonadi_uretra": this.trixomonadi_uretra,
          "kluchoviy_kletki_uretra": this.kluchoviy_kletki_uretra,
          "drojji_uretra": this.drojji_uretra,
          "mikroflora_uretra": this.mikroflora_uretra,
          "sliz_uretra": this.sliz_uretra,

          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "mazok_print",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalMazok', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd()
          this.sendFinish();
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/mazok_print/' + data.id)
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