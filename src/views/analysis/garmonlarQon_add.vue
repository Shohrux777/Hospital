<template>
  <div class="bakteriya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">Кондаги гормонларни текшириш</h4>
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
      <div class="col-6" >
        <div style="position:relative;">
          <mdb-input :label="('Тиретроп гормон /ТТГ/')"  v-model="ttg" outline/>
          <small v-if="$v.ttg.$dirty  && !$v.ttg.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,4-4,0 mlU/l</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('ДЕАС (Дегидроепиандростерон)')"  v-model="deac" outline/>
          <small v-if="$v.deac.$dirty   && !$v.deac.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Женшины
                    18-30 лет :  0.29 – 7.81 мкг/мл</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Трийодтиронин общий /Т3')"  v-model="obshiy_t3" outline/>
          <small v-if="$v.obshiy_t3.$dirty && !$v.obshiy_t3.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Трийодтиронин свободный /Т3/ ')"  v-model="svabodniy_t3" outline/>
          <small v-if="$v.svabodniy_t3.$dirty && !$v.svabodniy_t3.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Тироксин /Т4/ ')"  v-model="t_4" outline/>
          <small v-if="$v.t_4.$dirty && !$v.t_4.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">4,7-12,4 mkg/dl</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Тироксин /Т4 свободного/')"  v-model="t_4_svabodno" outline/>
          <small v-if="$v.t_4_svabodno.$dirty && !$v.t_4_svabodno.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">10 – 25 пмол/л</small>
        </div>
        
      </div>
      <div class="col-6">
        <div style="position:relative;">
          <mdb-input :label="('Тестостерон')"  v-model="testosteron" outline/>
          <small v-if="$v.testosteron.$dirty  && !$v.testosteron.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины  9.0 -38 нмоль/л
                    Женщины  0 - 4.6 нмоль/л</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эстрадиол')"  v-model="estradiol" outline/>
          <small v-if="$v.estradiol.$dirty  && !$v.estradiol.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины  0.029-0.3 нмоль/л / Женщины:фолликулярная0.05-0.7нмоль/л</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Пролактин ')"  v-model="prolaktin" outline/>
          <small v-if="$v.prolaktin.$dirty  && !$v.prolaktin.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины:  60-560 МЕ/л
                      Женщины: фолликулярная 60-600 МЕ/л</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('ФСГ')"  v-model="fcg" outline/>
          <small v-if="$v.fcg.$dirty  && !$v.fcg.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины:  0,8-25 МЕ/л
                    Женщины : фолликулярная 3,0-12 МЕ/л</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('ЛГ')"  v-model="lg" outline/>
          <small v-if="$v.lg.$dirty  && !$v.lg.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины:  1,5-9,0 МЕд/л
                    Женщины : фолликулярная 2,0-9,5 МЕд/л</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Прогестерон')"  v-model="progesteron" outline/>
          <small v-if="$v.progesteron.$dirty  && !$v.progesteron.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Мужчины:  0 – 4.0 нмоль/л   12-17 лет: 0.3-4.3   Женщины : 12-17 лет: 0.3-41  нмоль/л    </small>
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
      deac : {required},
      ttg : {required},
      t_4 : {required},
      t_4_svabodno : {required},
      obshiy_t3: {required},
      svabodniy_t3: {required},
      testosteron : {required},
      estradiol : {required},
      prolaktin : {required},
      fcg: {required},
      lg: {required},
      progesteron: {required},
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

      ttg: '',
      deac: '',
      obshiy_t3: '',
      svabodniy_t3: '',
      t_4: '',
      t_4_svabodno: '',
      testosteron: '',
      estradiol: '',
      prolaktin: '',
      fcg: '',
      lg: '',
      progesteron: '',

      numberEnter: null,
    }
  },
  async created()
    {
      console.log(this.id)
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalQondagiGarmonlar/' + this.id);
        const data = await res.json();
        console.log(data)
          this.deac= data.deac, 
          this.ttg= data.ttg,
          this.obshiy_t3 = data.obshiy_t3
          this.svabodniy_t3 = data.svabodniy_t3
          this.t_4= data.t_4,
          this.t_4_svabodno= data.t_4_svabodno,
          this.testosteron= data.testosteron,
          this.estradiol= data.estradiol,
          this.prolaktin= data.prolaktin,
          this.fcg = data.fcg,
          this.lg = data.lg,
          this.progesteron = data.progesteron,
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
      this.ttg = '';
      this.deac = '';
      this.t_4= '';
      this.t_4_svabodno= '';
      this.testosteron= '';
      this.estradiol= '';
      this.prolaktin= '';
      this.fcg = '';
      this.lg = '';
      this.progesteron = '';
      this.obshiy_t3 = '';
      this.svabodniy_t3 = '';
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
          "deac": this.deac,
          "ttg": this.ttg,
          "t_4": this.t_4,
          "obshiy_t3": this.obshiy_t3,
          "svabodniy_t3": this.svabodniy_t3,
          "t_4_svabodno": this.t_4_svabodno,
          "testosteron": this.testosteron,
          "estradiol": this.estradiol,
          "prolaktin": this.prolaktin,
          "fcg" : this.fcg,
          "lg" : this.lg,
          "progesteron" : this.progesteron,

          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "garmonlarQon_print",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalQondagiGarmonlar', requestOptions)
        const data = await response.json()
        console.log(data)
        if(data.id){
          this.cls_wnd()
          this.sendFinish()
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/garmonlarQon_print/' + data.id)
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