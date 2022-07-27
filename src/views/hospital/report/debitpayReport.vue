<template>
  <div class="bg-white">
    <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
               <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date"  v-model="End_time" outline/>
                </div>
              </div>
              
            </div>
            <div class="plus">
              <mdb-btn @click="print" color="info py-2 px-4"  style="font-size:10px;" >
                {{$t('print')}}
              </mdb-btn>
              <mdb-btn type="submit" color="primary py-2 px-4" style="font-size:10px;"  >
                {{$t('apply')}}
              </mdb-btn>
            </div>
          </div>
        </form>
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th  width="40" class="text-left">№</th>
                <th width="200">{{$t('patient_name')}}</th>
                <th>{{$t('phoneNumber')}}</th>
                <th>{{$t('bornDate')}}</th>
                <th>{{$t('summ')}}</th>
                <th >{{$t('date')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.patient_name}}</span> </td>
                <td> <span >{{row.patients.PhoneNumber}}</span> </td>
                <td> <span >{{row.patients.BornDate}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
                <td> <span >{{row.created_date_time}}</span> </td>
                
              </tr>
              <tr >
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

     <vue-html2pdf ref='listlar'
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1600"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
      >
      <div slot="pdf-content">
       <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th  width="40" class="text-left">№</th>
                <th width="200">{{$t('patient_name')}}</th>
                <th>{{$t('summ')}}</th>
                <th >{{$t('date')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.patient_name}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
                <td> <span >{{row.created_date_time}}</span> </td>
                
              </tr>
              <tr >
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </vue-html2pdf>

    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <districtAdd/>
      </div>
    </div> -->
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal> -->
      
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  // import DatePicker from 'vue2-datepicker';
  // import RegSelect from '../../../components/RegSelect.vue'
  // import districtAdd from "../../../components/new_prog_add/district_add"
  import { mdbBtn, mdbInput  } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
     
       mdbInput,
      VueHtml2pdf, 
    },
    data(){
      return{
        show: false,
        admin:false,
        snipper: true,
        loading:false,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: 0,
        Start_time: null,
        End_time: null,
        group_name: '',
        group_id: null,
        get_payment_list: [],
        index: null,
        service_id: null,
        day: '',
        qty: 0,
        summ: 0,
        card: 0,
        cash: 0
      }
    },
    async mounted(){
      if(localStorage.Type == 0){
        this.admin = true;
      }
      {
        let time1 = new Date();
        this.Start_time = time1.toISOString().slice(0,10); 
        this.End_time = time1.toISOString().slice(0,10);
        let a = this.Start_time + 'T00:00:35.000Z' ;
        let b = this.End_time + 'T23:59:59.000Z';
        
        const resp = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/getPaginationPatientDolgPaymentsListByBeatweenDateTime?page=0&size=10000&begin_date_time=' + a + 
        '&end_date_time=' + b)
        const dataStr = await resp.json();
        console.log(dataStr)
        this.get_payment_list = dataStr.items_list

        this.loading = false;
      }

        this.fetch_service_group()
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash', 'get_service_group_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time', 'fetch_service_group']),
      ...mapMutations(['district_row_delete']),

      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      showed(id){
        this.$router.push('/debitdetiels/' +id)
      },
      deleteRow(data, index){
        console.log(data)
        this.index = index
        this.service_id = data.id
        this.show = true;
      },
      
      
      async submit(){
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: new Date(),
          contId: 0
        }
        a.time1 = this.Start_time + 'T00:00:35.000Z';
        a.time2 = this.End_time + 'T23:59:59.000Z';
        this.loading = true;
        const resp = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/getPaginationPatientDolgPaymentsListByBeatweenDateTime?page=0&size=10000&begin_date_time=' + a.time1 + 
        '&end_date_time=' + a.time2)
        const dataStr = await resp.json();
        console.log(dataStr)
        this.get_payment_list = dataStr.items_list
        this.loading = false;
        
        
        
      },

    },
  };
</script>

<style lang="scss">


.add{
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
  top:0;
  width:85%;
}

.addxizmat{
  width: 470px;
  // height: 120px;
  background: #fff;
  position: relative;
  z-index: 5000;
}
.showing{
  display: none;
}
.timePicer{
  position: relative;
  margin-top: -10px;
  .timeLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 1px 3px;
    z-index: 1;
    left: 6px;
    top: -1px;
  }
  .dayLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 0px 3px;
    z-index: 1;
    left: 6px;
    top: -8px;
  }
}
.TablePatientDocId{
    // height: 400px;
    // overflow: hidden;
    // overflow-y: auto;
    // border: 1px solid #ddd;
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
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>