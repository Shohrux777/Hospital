<template>
  <div class="licya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">Общий Анализ крови</h4>
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
      <div class="col-6" >
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты(WBC)')"  v-model="leykositi" outline/>
          <small v-if="$v.leykositi.$dirty  && !$v.leykositi.required" class="invalid-text mt-0 pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">4.00 до 10.0</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Лимфоциты(LYMPH)')"  v-model="neytrofili" outline/>
          <small v-if="$v.neytrofili.$dirty   && !$v.neytrofili.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,8 до 4,0</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Моноциты(MID)')"  v-model="limfotsi" outline/>
          <small v-if="$v.limfotsi.$dirty && !$v.limfotsi.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,1 до 1,5</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гранулоциты(GRAN)')"  v-model="monofisitsi" outline/>
          <small v-if="$v.monofisitsi.$dirty && !$v.monofisitsi.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"> 2,0 до 7,0 </small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Лимфоциты(LYMPH)%')"  v-model="eozinofili" outline/>
          <small v-if="$v.eozinofili.$dirty  && !$v.eozinofili.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">20.00-40.00</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Моноциты(MID)%')"  v-model="bazofili" outline/>
          <small v-if="$v.bazofili.$dirty  && !$v.bazofili.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">3-15</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гранулоциты(GRAN)%')"  v-model="neytrofili_2" outline/>
          <small v-if="$v.neytrofili_2.$dirty  && !$v.neytrofili_2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">от 50% до 70% </small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эритроциты(RBC)')"  v-model="limfotsi_2" outline/>
          <small v-if="$v.limfotsi_2.$dirty  && !$v.limfotsi_2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">М: 4.0-5.0 Ж: 3.9 - 4.7</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гемоглобен(HGB)')"  v-model="monofisitsi_2" outline/>
          <small v-if="$v.monofisitsi_2.$dirty  && !$v.monofisitsi_2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">М: 120-150 Ж: 110-140</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Гематокрит(HCТ)')"  v-model="eozinofili_2" outline/>
          <small v-if="$v.eozinofili_2.$dirty   && !$v.eozinofili_2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">35-43</small>
        </div>

        
      </div>
      <div class="col-6" >
        <div style="position:relative;">
          <mdb-input :label="('Средний обьем эритроцитов(MCV)')"  v-model="bazofili_2" outline/>
          <small v-if="$v.bazofili_2.$dirty && !$v.bazofili_2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">80-100</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Среднее содержание Гемоглобина в эритроците(MCH)')"  v-model="eritrositi" outline/>
          <small v-if="$v.eritrositi.$dirty && !$v.eritrositi.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"> 23-31</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Средняя концентрация Гемоглобина в эритроците(MCHC)')"  v-model="gemoglabin" outline/>
          <small v-if="$v.gemoglabin.$dirty  && !$v.gemoglabin.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">310-360</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Индекс распределение эритроцитов(RDW-CV)')"  v-model="gemotokrit" outline/>
          <small v-if="$v.gemotokrit.$dirty  && !$v.gemotokrit.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">11.5-15.0</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Индекс распределение эритроцитов(RDW-SD)')"  v-model="sr_obyom_er" outline/>
          <small v-if="$v.sr_obyom_er.$dirty  && !$v.sr_obyom_er.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">35.0-56.0</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Тромбоциты(PLT)')"  v-model="sr_sod_gem_er" outline/>
          <small v-if="$v.sr_sod_gem_er.$dirty  && !$v.sr_sod_gem_er.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">150-400</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Средний обьем тромбоцитов(MPV)')"  v-model="sr_kons_gem_er" outline/>
          <small v-if="$v.sr_kons_gem_er.$dirty  && !$v.sr_kons_gem_er.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">7.4-10.4</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Индекс распределения (PDW)')"  v-model="shir_ras_er_gem" outline/>
          <small v-if="$v.shir_ras_er_gem.$dirty   && !$v.shir_ras_er_gem.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">от 10 до 20</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Тромбокрит(PCT)')"  v-model="shir_ras_er_po_obyom" outline/>
          <small v-if="$v.shir_ras_er_po_obyom.$dirty && !$v.shir_ras_er_po_obyom.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0.15-0.40</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('СОЭ (ESR)')"  v-model="trobositi" outline/>
          <small v-if="$v.trobositi.$dirty && !$v.trobositi.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">М:2-10; Ж:3-15</small>
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
      monofisitsi: {required},
      neytrofili: {required},
      limfotsi: {required},
      leykositi: {required},
      eozinofili: {required},
      bazofili: {required},
      neytrofili_2: {required},
      limfotsi_2: {required},
      monofisitsi_2: {required},
      eozinofili_2: {required},
      bazofili_2: {required},
      eritrositi: {required},
      gemoglabin: {required},
      gemotokrit: {required},
      sr_obyom_er: {required},
      sr_sod_gem_er: {required},
      sr_kons_gem_er: {required},
      shir_ras_er_gem: {required},
      shir_ras_er_po_obyom: {required},
      trobositi: {required},
      
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
      id: this.$route.params.id,
      doctor_name: localStorage.docName,

      numberEnter: null,


      leykositi: '',
      neytrofili: '',
      limfotsi: '',
      monofisitsi: '',
      eozinofili: '',
      bazofili: '',
      neytrofili_2: '',
      limfotsi_2: '',
      monofisitsi_2: '',
      eozinofili_2: '',
      bazofili_2: '',
      eritrositi: '',
      gemoglabin: '',
      gemotokrit: '',
      sr_obyom_er: '',
      sr_sod_gem_er: '',
      sr_kons_gem_er: '',
      shir_ras_er_gem: '',
      shir_ras_er_po_obyom: '',
      trobositi: '',
      sredniy_obyom_trombositov: '',
      shir_rasm_tromb_po_obyom: '',
      trombokrit: '',
      aly: '',
      lic: '',
      aly_2: '',
      lic_2: '',
      skorst_osedaniy_eritrositov: '',
      qon_ivish_begin_date_time: '',
      qon_ivish_end_date_time: '',
    }
  },
  async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalUmQonTaxlili/' + this.id);
        const data = await res.json();
        console.log(data)
          this.leykositi= data.leykositi
          this.neytrofili= data.neytrofili
          this.limfotsi= data.limfotsi
          this.monofisitsi= data.monofisitsi
          this.monofisitsi_2= data.monofisitsi_2
          this.eozinofili= data.eozinofili
          this.bazofili= data.bazofili
          this.neytrofili_2= data.neytrofili_2
          this.limfotsi_2= data.limfotsi_2
          this.eozinofili_2= data.eozinofili_2
          this.bazofili_2= data.bazofili_2
          this.eritrositi= data.eritrositi
          this.gemoglabin= data.gemoglabin
          this.gemotokrit= data.gemotokrit
          this.sr_obyom_er= data.sr_obyom_er
          this.sr_sod_gem_er= data.sr_sod_gem_er
          this.sr_kons_gem_er= data.sr_kons_gem_er
          this.shir_ras_er_gem= data.shir_ras_er_gem
          this.shir_ras_er_po_obyom= data.shir_ras_er_po_obyom
          this.trobositi= data.trobositi
          this.sredniy_obyom_trombositov= data.sredniy_obyom_trombositov
          this.shir_rasm_tromb_po_obyom= data.shir_rasm_tromb_po_obyom
          this.trombokrit= data.trombokrit
          this.aly= data.aly
          this.lic= data.lic
          this.aly_2= data.aly_2
          this.lic_2= data.lic_2
          this.skorst_osedaniy_eritrositov= data.skorst_osedaniy_eritrositov
          this.qon_ivish_begin_date_time= data.qon_ivish_begin_date_time
          this.qon_ivish_end_date_time= data.qon_ivish_end_date_time
          this.id = data.id
          this.patient_id =   data.patientsId;
          this.patient_name = data.patient_name;
          this.doctor_name =  data.doctor_name;
          
          this.um_item_1 = data.um_item_1;
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
      this.leykositi = '';
      this.neytrofili = '';
      this.limfotsi = '';
      this.monofisitsi = '';
      this.eozinofili = '';
      this.bazofili = '';
      this.neytrofili_2 = '';
      this.limfotsi_2 = '';
      this.monofisitsi_2 = '';
      this.eozinofili_2 = '';
      this.bazofili_2 = '';
      this.eritrositi = '';
      this.gemoglabin = '';
      this.gemotokrit = '';
      this.sr_obyom_er = '';
      this.sr_sod_gem_er = '';
      this.sr_kons_gem_er = '';
      this.shir_ras_er_gem = '';
      this.shir_ras_er_po_obyom = '';
      this.trobositi = '';
      this.sredniy_obyom_trombositov = '';
      this.shir_rasm_tromb_po_obyom = '';
      this.trombokrit = '';
      this.aly = '';
      this.lic = '';
      this.aly_2 = '';
      this.lic_2 = '';
      this.skorst_osedaniy_eritrositov = '';
      this.qon_ivish_begin_date_time = '';
      this.qon_ivish_end_date_time = '';
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
          "leykositi": this.leykositi,
          "neytrofili": this.neytrofili,
          "limfotsi": this.limfotsi,
          "monofisitsi": this.monofisitsi,
          "monofisitsi_2": this.monofisitsi_2,
          "eozinofili": this.eozinofili,
          "bazofili": this.bazofili,
          "neytrofili_2": this.neytrofili_2,
          "limfotsi_2": this.limfotsi_2,
          "eozinofili_2": this.eozinofili_2,
          "bazofili_2": this.bazofili_2,
          "eritrositi": this.eritrositi,
          "gemoglabin": this.gemoglabin,
          "gemotokrit": this.gemotokrit,
          "sr_obyom_er": this.sr_obyom_er,
          "sr_sod_gem_er": this.sr_sod_gem_er,
          "sr_kons_gem_er": this.sr_kons_gem_er,
          "shir_ras_er_gem": this.shir_ras_er_gem,
          "shir_ras_er_po_obyom": this.shir_ras_er_po_obyom,
          "trobositi": this.trobositi,
          "sredniy_obyom_trombositov": this.sredniy_obyom_trombositov,
          "shir_rasm_tromb_po_obyom": this.shir_rasm_tromb_po_obyom,
          "trombokrit": this.trombokrit,
          "aly": this.aly,
          "lic": this.lic,
          "aly_2": this.aly_2,
          "lic_2": this.lic_2,
          "skorst_osedaniy_eritrositov": this.skorst_osedaniy_eritrositov,
          "qon_ivish_begin_date_time": this.qon_ivish_begin_date_time,
          "qon_ivish_end_date_time": this.qon_ivish_end_date_time,

          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "umum_qon_print2",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalUmQonTaxlili', requestOptions)
        const data = await response.json()
        if(data.id){
          console.log(data)
          this.cls_wnd();
          this.sendFinish();
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/umum_qon_print2/' + data.id)

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