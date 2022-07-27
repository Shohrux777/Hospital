<template>
  <div class="bakteriya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">Общий Анализ мочи</h4>
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
          <mdb-input :label="('Количество')"  v-model="kolichestva" outline/>
          <small v-if="$v.kolichestva.$dirty  && !$v.kolichestva.required" class="invalid-text mt-0 pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute"></small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Цвет')"  v-model="svet" outline/>
          <small v-if="$v.svet.$dirty   && !$v.svet.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">До солом. Желтого</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Прозрачность')"  v-model="prozrachnost" outline/>
          <small v-if="$v.prozrachnost.$dirty && !$v.prozrachnost.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Прозрачная</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты')"  v-model="leykositi" outline/>
          <small v-if="$v.leykositi.$dirty && !$v.leykositi.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">До 10</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Нитриты')"  v-model="nitriti" outline/>
          <small v-if="$v.nitriti.$dirty  && !$v.nitriti.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,05-0,1</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Уробилиноген')"  v-model="urobilinogen" outline/>
          <small v-if="$v.urobilinogen.$dirty  && !$v.urobilinogen.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">3,5-17</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Белок')"  v-model="belot" outline/>
          <small v-if="$v.belot.$dirty  && !$v.belot.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">7.5-20</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Кислотность')"  v-model="kislotnost" outline/>
          <small v-if="$v.kislotnost.$dirty  && !$v.kislotnost.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">5-9</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Кровь')"  v-model="krov" outline/>
          <small v-if="$v.krov.$dirty  && !$v.krov.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательно</small>
        </div>

        
      </div>
      <div class="col-4" >
        
        <div style="position:relative;">
          <mdb-input :label="('Удельный вес')"  v-model="udalleniy_ves" outline/>
          <small v-if="$v.udalleniy_ves.$dirty   && !$v.udalleniy_ves.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">1,000-1,030</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Ацетон')"  v-model="aseton" outline/>
          <small v-if="$v.aseton.$dirty && !$v.aseton.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,25-0,5</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Билирубин')"  v-model="bilirubin" outline/>
          <small v-if="$v.bilirubin.$dirty && !$v.bilirubin.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,4-0,8</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Глюкоза')"  v-model="glyukoza" outline/>
          <small v-if="$v.glyukoza.$dirty  && !$v.glyukoza.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">2,5-5</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Аскорбиновая кислота')"  v-model="askorbinnaya_kislota" outline/>
          <small v-if="$v.askorbinnaya_kislota.$dirty  && !$v.askorbinnaya_kislota.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,28- 0,56</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эпителий плоский ')"  v-model="epitoliy_ploskiy" outline/>
          <small v-if="$v.epitoliy_ploskiy.$dirty  && !$v.epitoliy_ploskiy.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">1-15</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эпителий почечный')"  v-model="epitoliy_pochechniy" outline/>
          <small v-if="$v.epitoliy_pochechniy.$dirty  && !$v.epitoliy_pochechniy.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Единичные</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эпителий промежуточный')"  v-model="epiteliy_promujechotniy" outline/>
          <small v-if="$v.epiteliy_promujechotniy.$dirty  && !$v.epiteliy_promujechotniy.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательно</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Лейкоциты ')"  v-model="leykositi2" outline/>
          <small v-if="$v.leykositi2.$dirty   && !$v.leykositi2.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">1-5</small>
        </div>

        
      </div>
      <div class="col-4" >
        
        <div style="position:relative;">
          <mdb-input :label="('Эритроциты не измененные')"  v-model="eritoriseti_ne_izminenne" outline/>
          <small v-if="$v.eritoriseti_ne_izminenne.$dirty && !$v.eritoriseti_ne_izminenne.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0-1</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Эритроциты измененные')"  v-model="eritoriseti_izminenne" outline/>
          <small v-if="$v.eritoriseti_izminenne.$dirty && !$v.eritoriseti_izminenne.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Цилиндры гиалиновые')"  v-model="silindri_geolinoviy" outline/>
          <small v-if="$v.silindri_geolinoviy.$dirty  && !$v.silindri_geolinoviy.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Цилиндры зернистые ')"  v-model="silindri_zernosti" outline/>
          <small v-if="$v.silindri_zernosti.$dirty  && !$v.silindri_zernosti.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Цилиндры восковидные ')"  v-model="silindri_voskovidniy" outline/>
          <small v-if="$v.silindri_voskovidniy.$dirty  && !$v.silindri_voskovidniy.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Слизь ')"  v-model="sliz" outline/>
          <small v-if="$v.sliz.$dirty  && !$v.sliz.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Бактерии  ')"  v-model="bakteri" outline/>
          <small v-if="$v.bakteri.$dirty  && !$v.bakteri.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Соли')"  v-model="soli" outline/>
          <small v-if="$v.soli.$dirty  && !$v.soli.required" class="invalid-text  pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">Отрицательный</small>
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
      kolichestva: {required},
      svet: {required},
      prozrachnost: {required},
      leykositi: {required},
      nitriti: {required},
      urobilinogen: {required},
      belot: {required},
      kislotnost: {required},
      krov: {required},
      udalleniy_ves: {required},
      aseton: {required},
      bilirubin: {required},
      glyukoza: {required},
      askorbinnaya_kislota: {required},
      epitoliy_ploskiy: {required},
      epitoliy_pochechniy: {required},
      epiteliy_promujechotniy: {required},
      leykositi2: {required},
      eritoriseti_ne_izminenne: {required},
      eritoriseti_izminenne: {required},
      silindri_geolinoviy: {required},
      silindri_zernosti: {required},
      silindri_voskovidniy: {required},
      sliz: {required},
      bakteri: {required},
      soli: {required},
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

      kolichestva: '',
      svet: '',
      prozrachnost: '',
      leykositi: '',
      nitriti: '',
      urobilinogen: '',
      belot: '',
      kislotnost: '',
      krov: '',
      udalleniy_ves: '',
      aseton: '',
      bilirubin: '',
      glyukoza: '',
      askorbinnaya_kislota: '',
      epitoliy_ploskiy: '',
      epitoliy_pochechniy: '',
      epiteliy_promujechotniy: '',
      leykositi2: '',
      eritoriseti_ne_izminenne: '',
      eritoriseti_izminenne: '',
      silindri_geolinoviy: '',
      silindri_zernosti: '',
      silindri_voskovidniy: '',
      sliz: '',
      bakteri: '',
      soli: '',

      numberEnter: null,

    }
  },
  async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalPeshob/' + this.id);
        const data = await res.json();
        console.log(data)
          this.kolichestva= data.kolichestva;
          this.svet= data.svet;
          this.prozrachnost= data.prozrachnost;
          this.leykositi= data.leykositi;
          this.nitriti= data.nitriti;
          this.urobilinogen= data.urobilinogen;
          this.belot= data.belot;
          this.kislotnost= data.kislotnost;
          this.udalleniy_ves= data.udalleniy_ves;
          this.aseton= data.aseton;
          this.krov= data.krov;
          this.bilirubin= data.bilirubin;
          this.glyukoza= data.glyukoza;
          this.askorbinnaya_kislota= data.askorbinnaya_kislota;
          this.epitoliy_ploskiy= data.epitoliy_ploskiy;
          this.epitoliy_pochechniy= data.epitoliy_pochechniy;
          this.epiteliy_promujechotniy= data.epiteliy_promujechotniy;
          this.leykositi2= data.leykositi2;
          this.eritoriseti_ne_izminenne= data.eritoriseti_ne_izminenne;
          this.eritoriseti_izminenne= data.eritoriseti_izminenne;
          this.silindri_geolinoviy= data.silindri_geolinoviy;
          this.silindri_zernosti= data.silindri_zernosti;
          this.silindri_voskovidniy= data.silindri_voskovidniy;
          this.sliz= data.sliz;
          this.bakteri= data.bakteri;
          this.soli= data.soli;
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
      this.kolichestva = '';
      this.svet = '';
      this.prozrachnost = '';
      this.leykositi = '';
      this.nitriti = '';
      this.urobilinogen = '';
      this.belot = '';
      this.kislotnost = '';
      this.krov = '';
      this.udalleniy_ves = '';
      this.aseton = '';
      this.bilirubin = '';
      this.glyukoza = '';
      this.askorbinnaya_kislota = '';
      this.epitoliy_ploskiy = '';
      this.epitoliy_pochechniy = '';
      this.epiteliy_promujechotniy = '';
      this.leykositi2 = '';
      this.eritoriseti_ne_izminenne = '';
      this.eritoriseti_izminenne = '';
      this.silindri_geolinoviy = '';
      this.silindri_zernosti = '';
      this.silindri_voskovidniy = '';
      this.sliz = '';
      this.bakteri = '';
      this.soli = '';
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
          "kolichestva": this.kolichestva,
          "svet": this.svet,
          "prozrachnost": this.prozrachnost,
          "leykositi": this.leykositi,
          "nitriti": this.nitriti,
          "urobilinogen": this.urobilinogen,
          "belot": this.belot,
          "kislotnost": this.kislotnost,
          "udalleniy_ves": this.udalleniy_ves,
          "aseton": this.aseton,
          "krov": this.krov,
          "bilirubin": this.bilirubin,
          "glyukoza": this.glyukoza,
          "askorbinnaya_kislota": this.askorbinnaya_kislota,
          "epitoliy_ploskiy": this.epitoliy_ploskiy,
          "epitoliy_pochechniy": this.epitoliy_pochechniy,
          "epiteliy_promujechotniy": this.epiteliy_promujechotniy,
          "leykositi2": this.leykositi2,
          "eritoriseti_ne_izminenne": this.eritoriseti_ne_izminenne,
          "eritoriseti_izminenne": this.eritoriseti_izminenne,
          "silindri_geolinoviy": this.silindri_geolinoviy,
          "silindri_zernosti": this.silindri_zernosti,
          "silindri_voskovidniy": this.silindri_voskovidniy,
          "sliz": this.sliz,
          "bakteri": this.bakteri,
          "soli": this.soli,

          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "peshob_print",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": localStorage.docName
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalPeshob', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd();
          this.sendFinish();
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/peshob_print/' + data.id)
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