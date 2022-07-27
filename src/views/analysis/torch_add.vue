<template>
  <div class="bakteriya bg-white" style="min-height: 100vh;">
    <div class="header text-center border-bottom py-2">
      <h4 class="text-primary">ТОРЧ инфекцияси</h4>
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
          <mdb-input :label="('Хламидии IgG')"  v-model="xlomidin" outline/>
          <small v-if="$v.xlomidin.$dirty  && !$v.xlomidin.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,354</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Токсоплазма IgG')"  v-model="toksoplazma" outline/>
          <small v-if="$v.toksoplazma.$dirty   && !$v.toksoplazma.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,254</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Ц.М.В IgG')"  v-model="smb" outline/>
          <small v-if="$v.smb.$dirty && !$v.smb.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,357</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('В.П.Г IgG')"  v-model="vpg" outline/>
          <small v-if="$v.vpg.$dirty && !$v.vpg.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,212</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Mycoplasma IgG ')"  v-model="musorplazma" outline/>
          <small v-if="$v.musorplazma.$dirty  && !$v.musorplazma.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,209</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Рубелла IgG')"  v-model="rubbella" outline/>
          <small v-if="$v.rubbella.$dirty  && !$v.rubbella.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,218</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Уреаплазма')"  v-model="ureaplazma" outline/>
          <small v-if="$v.ureaplazma.$dirty  && !$v.ureaplazma.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small>
          <small class="pos_absolute">0,284</small>
        </div>
        <div style="position:relative;">
          <mdb-input :label="('Брутцелла LgG')"  v-model="brutsella" outline/>
          <!-- <small v-if="$v.brutsella.$dirty  && !$v.brutsella.required" class="invalid-text pl-4" style="position:absolute; bottom:-18px; left:-15px;"> 
            {{$t('select_item')}}
          </small> -->
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
      toksoplazma : {required},
      xlomidin : {required},
      smb : {required},
      vpg : {required},
      musorplazma : {required},
      rubbella : {required},
      ureaplazma : {required},
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
      brutsella: '',


      xlomidin: '',
      toksoplazma: '',
      smb: '',
      vpg: '',
      musorplazma: '',
      rubbella: '',
      ureaplazma: '',
    }
  },
  async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/HospitalTorch/' + this.id);
        const data = await res.json();
        console.log(data)
          this.toksoplazma= data.toksoplazma;
          this.xlomidin= data.xlomidin;
          this.smb= data.smb;
          this.vpg= data.vpg;
          this.musorplazma= data.musorplazma;
          this.rubbella= data.rubbella;
          this.ureaplazma= data.ureaplazma;
          this.id = data.id
          this.patient_id =   data.patientsId;
          this.patient_name = data.patient_name;
          this.doctor_name =  data.doctor_name;
          this.brutsella = data.creator_doctor_name
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
      this.xlomidin = '';
      this.toksoplazma = '';
      this.smb= '';
      this.vpg= '';
      this.musorplazma= '';
      this.rubbella= '';
      this.ureaplazma= '';
      this.brutsella = '';
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
          "toksoplazma": this.toksoplazma,
          "xlomidin": this.xlomidin,
          "smb": this.smb,
          "vpg": this.vpg,
          "musorplazma": this.musorplazma,
          "rubbella": this.rubbella,
          "ureaplazma": this.ureaplazma,

          "id": this.id,
          "patientsId":  this.patient_id,
          "device_name": "torch_print",
          "doctor_name": this.doctor_name,
          "creator_doctor_name": this.brutsella,
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalTorch', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd();
          this.sendFinish();
          this.loading = false;
          this.$refs.message.success('Added_successfully')
          this.$router.push('/torch_print/' + data.id)
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