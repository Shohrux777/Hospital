<template>
  <div style="font-family: Avenir, sans-serif">
    <form @submit.prevent="submit">
      <div class="row pt-3 px-1">
        <div class="col-3 ">
            <lineSelect
            class="ml-0"
            style="margin-top: 10px;"
            :options="get_client_list.rows" 
            :searchshow="true"
            @select="selectPatient"
            :selected="patient_name"
            :label="$t('patient list')"
          />
        </div>
        <div class="col-3 ">
          <mdb-input label="Title" class="m-0 p-0" v-model="titleHos" size="sm"/>
        </div>
        <div class="col-3 ">
          <mdb-input label="Doctor" class="m-0 p-0" v-model="doc_name" size="sm"/>
        </div>
        <div class="col-3 text-right">
          <mdb-btn @click="print" class=" px-3 py-2">Print</mdb-btn>
          <mdb-btn type="submit" class=" px-3 py-2">Search</mdb-btn>
        </div>
      </div>
    </form>
    
        
    <vue-document-editor :content.sync="content" />
  </div>
</template>

<script>
import VueDocumentEditor from 'vue-document-editor'
import {mdbInput, mdbBtn  } from 'mdbvue';
import {mapActions, mapGetters} from 'vuex'
import lineSelect from "../../../components/hospital/cashUserSelect.vue";

export default {
  components: { VueDocumentEditor, lineSelect, mdbInput, mdbBtn },
  data () {
    return { 
      content: [],
      patient_name: '',
      patient_id: null,
      titleHos: '',
      doc_name: '',
    } 
  },
  mounted () {
    this.fetch_client()
  },
  computed: mapGetters(['get_client_list']),
  methods:{
    ...mapActions(['fetch_client']),
    selectPatient(option){
      console.log(option)
      this.patient_name = option.data.fio
      this.patient_id = option.data.id
    },
    async submit(){
      const response = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors/getPatientRecipeByDoctorAndPatientId?patientid=' + this.patient_id + 
      '&doctorId=' +  localStorage.docId)
      const data = await response.json()
      console.log(data)
      if(data[0].id){
        this.content = [];
        for(let i = 0; i < data.length; i++){
          this.content.push(data[i].patinetRecipeStr)
          this.titleHos = data[i].patientRecipeTitle
          this.doc_name = data[i].users.fio
          console.log(this.content)
        }
      }
    },
    print(){
      window.print()
    }
  }
}
</script>