<template>
  <div class="result_lab bg-white">
    <div class="d-flex justify-content-center mb-4">
       <div style="width: 800px; position:relative;">
          <mdb-input label="Поиск" v-model="search" ref="searchPatientByResult"  @input="search_func"/>
          <div style="position:absolute; top: 70px; left:0px; right:0; z-index: 1000;" class="border shadow pt-1 " v-if="searchshow">
            <div class="bg-white " v-for="(item,i) in get_patient_list_last.rows" :key="i" >
              <div class="item searchBarcodeHover border-bottom py-1" @click="choosePatientID(item.id)">
                <div class="d-flex justify-content-between px-2">
                  <h5 class="text_font m-0 ml-1 text-primary">{{item.fio}}</h5>
                  <small style="color:red; font-size:11px;">{{item.registratedDate.slice(0,10) }} <small class="text-primary">{{item.registratedDate.slice(11,16)}}</small> </small>
                </div>
                <div class="d-flex px-2">
                  <div style="width:220px;" class="ml-1">
                    <small style=" font-size:11px;" >Тел: <span class="textdanger"> {{item.phoneNumber}}</span></small>
                  </div>
                  <div style="width:220px;">
                    <small style=" font-size:11px;" class="ml-4">Паспорт: <span class="textdanger"> {{item.passportSerialNumber}}</span></small>
                  </div>
                  <div style="width:220px;">
                    <small style=" font-size:11px;" class="ml-4">Дата рожд: <span class="textdanger"> {{item.bornDate.slice(0,10)}}</span></small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
      </div>
      
    <div>
      <div v-if="debitResultPatient[0].real_qty>0" class="container d-flex justify-content-center border-bottom">
        <h3 class="text-danger ">Долг: {{debitResultPatient[0].real_qty}}</h3>
      </div>
      
    </div>
    <loader v-if="loading" />
    <div v-else class="result_lists container">
      <div class="itemResult border p-3 mt-5 rounded bgorange" v-for="(item,i) in result_list" :key="i">
        <div class="d-flex justify-content-center border-bottom">
          <h5 style="color:#4B515D;">Дата результата: <span class=" ml-1" style="color:#FF8800;"> {{item.date_time_reg.slice(0,10)}} <span class="ml-2"></span>  {{item.date_time_reg.slice(11,19)}}</span></h5>
        </div>
        <div class="d-flex justify-content-between border-bottom">
          <h4  style="color:#4B515D;" class="m-0 py-2">Пациент: <span  style="color:#0d47a1;" class=" ml-1">{{item.patient_name}}</span></h4>
          <h5  style="color:#4B515D;" class="m-0 py-2">Врач: <span style="color:#0d47a1;" class=" ml-1">{{item.creator_doctor_name}}</span></h5>
        </div>
        <div class="d-flex justify-content-center border-bottom py-3" style="position:relative;">
          <span style="color:#757575; font-size:25px;">Анализ: <span class=" ml-1" style="color:#1b5e20;"> {{item.analiz_name}}</span></span>
          <div style="position:absolute; top:20px; right:5px;">
          <mdb-btn @click="printed(item.id)"   color="primary" :disabled="admin" class="m-0 py-2 px-3 ml-5 mt-1" style="font-size: 10px;" >Распечатать</mdb-btn>
          </div>
        </div>
        <table  class="w-100 ">
          <thead >
            <tr >
              <th class="px-2 border-bottom border-left">Тел</th>
              <th class="px-2 border-bottom border-left">Паспорт</th>
              <th class="px-2 border-bottom border-left border-right">Дата рожд</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-2 border-bottom border-left">{{item.patients.PhoneNumber}}</td>
              <td class="px-2 border-bottom border-left">{{item.patients.PassportSerialNumber}}</td>
              <td class="px-2 border-bottom border-left border-right">{{item.patients.BornDate.slice(0,10)}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <h1>Xulosalar</h1> -->
      <div class="itemResult border p-3 mt-5 rounded bggreen" v-for="(list) in shablonLists" :key="list.patient_name">
        <div class="d-flex justify-content-center border-bottom">
          <!-- <h5 style="color:#4B515D;">Дата результата: <span class=" ml-1" style="color:#FF8800;"> {{list.registratedDate.slice(0,10)}} <span class="ml-2"></span>  {{list.date_time_reg.slice(11,19)}}</span></h5> -->
        </div>
        <div class="d-flex justify-content-between border-bottom">
          <h4  style="color:#4B515D;" class="m-0 py-2">Пациент: <span  style="color:#0d47a1;" class=" ml-1">{{list.patients.fio}}</span></h4>
          <h5  style="color:#4B515D;" class="m-0 py-2">Врач: <span style="color:#0d47a1;" class=" ml-1">{{list.users.fio}}</span></h5>
        </div>
        <div class="d-flex justify-content-center border-bottom py-3" style="position:relative;">
          <span style="color:#757575; font-size:25px;">Ташхиc: <span class=" ml-1" style="color:#1b5e20;"> {{list.patientRecipeTitle}}</span></span>
          <div style="position:absolute; top:20px; right:5px;">
          <mdb-btn @click="printedTash(list.id)"  color="primary" class="m-0 py-2 px-3 ml-5 mt-1" style="font-size: 10px;" >Распечатать</mdb-btn>
          </div>
        </div>
        <table  class="w-100 ">
          <thead >
            <tr >
              <th class="px-2 border-bottom border-left">Тел</th>
              <th class="px-2 border-bottom border-left">Паспорт</th>
              <th class="px-2 border-bottom border-left border-right">Дата рожд</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-2 border-bottom border-left">{{list.patients.phoneNumber}}</td>
              <td class="px-2 border-bottom border-left">{{list.patients.passportSerialNumber}}</td>
              <td class="px-2 border-bottom border-left border-right">{{list.patients.bornDate.slice(0,10)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
  import { mdbInput, mdbBtn } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    mdbInput, mdbBtn
  },
  data() {
    return {
      search: '',
      searchshow: false,
      loading: false,
      admin: true,
    }
  },
  mounted() {
    // this.$nextTick
    this.$refs.searchPatientByResult.focus()
    if(localStorage.Type == 0 || localStorage.Type == 5){
          this.admin = false;
        }
  },
    computed: mapGetters(['get_client_list', 'get_patient_list_last', 'result_list', 'shablonLists', 'debitResultPatient']),
  methods: {
      ...mapActions(['fetch_client', 'fetch_patient_list_last', 'fetch_search_patient_name']),
      ...mapMutations(['updatePatentResults', 'UpdateshablonLists', 'Updatedebit']),
    search_func(){
        if(this.search == ''){
          // this.fetch_patient_list_last()
          this.searchshow = false;
        }
        else{
          this.fetch_search_patient_name(this.search);
          var list = [];
          this.updatePatentResults(list);
          this.UpdateshablonLists(list);
          let emptyNol = 0;
          this.Updatedebit(emptyNol);
          console.log(this.get_patient_list_last)
          this.searchshow = true;
        }

      },
      async choosePatientID(id){
        console.log(id)
        this.searchshow = false;
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + '/HospitalPatientAnalizHistory/getPaginationByPatient?page=0&size=300&patient_id=' + id)
          const data = await response.json();
          console.log(data)
          this.updatePatentResults(data.items_list);
          await this.debitPatientId(id);
          await this.shablonPatientId(id);
          
          this.loading = false;

        }
        catch{
          this.loading = false;
          this.$refs.message.success('not_found')
        }

      },
      printed(id){
        this.$router.push('/result_lab/' + id)
      },
      printedTash(id){
        this.$router.push('/result_xulosa/' + id)

      },
      async debitPatientId(id){
        try{
          this.loading = true;
          const res = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/getPaginationByPatientId?page=0&size=100&patient_id=' + id)
          const dataArr = await res.json();
          console.log('dataArr')
          console.log(dataArr)
          if(dataArr.items_list.length>0){
            this.Updatedebit(dataArr.items_list[0].real_qty);
          }
          else{
            var emptyNol = 0;
            this.Updatedebit(emptyNol);

          }
          this.loading = false;

        }
        catch{
          this.loading = false;
          this.$refs.message.success('not_found')
        }
      },
      async shablonPatientId(id){
        try{
          this.loading = true;
          
          const resp = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors/getPatientRecipeByPatientId?patientid=' + id)
          const dataStr = await resp.json();
          console.log('dataStr')
          console.log(dataStr)
          this.UpdateshablonLists(dataStr);
          this.loading = false;
          

        }
        catch{
          this.loading = false;
          this.$refs.message.success('not_found')
        }
      }
  },

}
</script>

<style>
.text_font{
  color:rgb(2, 47, 47);
}
.searchBarcodeHover:hover{
    background: rgb(233, 233, 233);
    color:rgb(84, 143, 251);
    cursor: pointer;
  }

.bgorange{
  background: rgb(254, 255, 226);
}
.bggreen{
  background: rgb(255, 235, 226);

}
</style>