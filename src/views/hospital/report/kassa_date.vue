<template>
  <div class="bg-white">
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-4">
                <div class="d-flex timePicer ">     
                  <label  class="timeLabel">{{$t('start_time')}}</label>
                  <date-picker class="timepiker " id="fordo" style="margin-top: 10px; width: 100%;" v-model="Start_time" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
                </div>
              </div>
              <div class="col-4">
                <div class="d-flex timePicer ">
                  <label class="timeLabel">{{$t('end_time')}}</label>
                  <date-picker class="timepiker " id="fordo" style="margin-top: 10px; width: 100%;" v-model="End_time" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
                </div>
              </div>
            </div>
            <div class="plus">
              <mdb-btn @click="print" color="info py-2 px-4"   >
                {{$t('print')}}
              </mdb-btn>
              <mdb-btn type="submit" color="primary py-2 px-4"   >
                {{$t('apply')}}
              </mdb-btn>
            </div>
          </div>
        </form>
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('contNumber')}}</th>
                <th width="200">{{$t('имя пациента')}}</th>
                <th >{{$t('serviceGroupName')}}</th>
                <th>{{$t('serviceTypePrice')}}</th>
                <th>{{$t('registratedDate')}}</th>
                <th>{{$t('Payed')}}</th>
                <th>{{$t('finished')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in list_kassir_main" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.contragent.name}}</span> </td>
                <td> <span >{{row.contragent.phoneNumber}}</span> </td>
                <td> <span >{{row.patients.fio}}</span> </td>
                <td> <span >{{row.serviceType.name}}</span> </td>
                <td> <span >{{row.serviceType.price}}</span> </td>
                <td> <span >{{row.registratedDate.slice(0,10)}}</span> </td>
                <!-- <td> <span >{{row.finishPayment}}</span> </td>
                <td> <span >{{row.finish}}</span> </td> -->
                <td>
                  <span v-show="row.finishPayment === true" style="padding: 2px 8px;" pill class="text-success">{{$t("payed")}}</span>
                  <span v-show="row.finishPayment === false" style="padding: 2px 8px;" pill class="text-danger">{{$t('unpayed')}}</span>
                </td>
                <td>
                  <span v-show="row.finish === true" style="padding: 2px 8px;" pill class="text-success">{{$t("проверил")}}</span>
                  <span v-show="row.finish === false" style="padding: 2px 8px;" pill class="text-danger">{{$t('непроверенный')}}</span>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                
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
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('contNumber')}}</th>
                <th width="255">{{$t('patients')}}</th>
                <th >{{$t('serviceGroupName')}}</th>
                <th>{{$t('serviceTypePrice')}}</th>
                <th>{{$t('Payed')}}</th>
                <th>{{$t('finished')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in list_kassir_main" :key="rowIndex">
                <td> <span >{{row.contragent.name}}</span> </td>
                <td> <span >{{row.contragent.phoneNumber}}</span> </td>
                <td> <span >{{row.patients.fio}}</span> </td>
                <td> <span >{{row.serviceType.name}}</span> </td>
                <td> <span >{{row.serviceType.price}}</span> </td>
                <!-- <td> <span >{{row.finishPayment}}</span> </td>
                <td> <span >{{row.finish}}</span> </td> -->
                <td>
                  <span v-show="row.finishPayment === true" style="padding: 2px 8px;" pill class="text-success">{{$t("payed")}}</span>
                  <span v-show="row.finishPayment === false" style="padding: 2px 8px;" pill class="text-danger">{{$t('unpayed')}}</span>
                </td>
                <td>
                  <span v-show="row.finish === true" style="padding: 2px 8px;" pill class="text-success">{{$t("проверил")}}</span>
                  <span v-show="row.finish === false" style="padding: 2px 8px;" pill class="text-danger">{{$t('непроверенный')}}</span>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                
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
      <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  import DatePicker from 'vue2-datepicker';
  import districtAdd from "../../../components/new_prog_add/district_add"
  import { mdbBtn,   mdbModal, mdbModalHeader,  mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, DatePicker,
      districtAdd,
      VueHtml2pdf
    },
    data(){
      return{
        show: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: 0,
        Start_time: new Date(),
        End_time: new Date(),
        admin: false,
        list_kassir_main: [],
      }
    },
    async mounted(){
      if(localStorage.Type == 0){
        this.admin = true;
      }
      // console.log(this.End_time.toISOString())
      let time2 = this.End_time.toISOString()
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: null,
        }
        a.time2 = time2
        await this.fetch_report_by_data(a)
        await this.fetch_contragent()
        // console.log(this.get_report_by_data)
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data', 'get_report_by_time_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data']),
      ...mapMutations(['dibet_delite_cont']),

      add(){
        this.show =! this.show
        this.editData = {};
      },
      get_get_(){
        
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      async deleteRow(i, del_data){
        const requestOptions = {
            method : "delete",
          };
          this.loading =true;
          const response = await fetch(this.$store.state.hostname + "/HospitalContragentDebitPaymentReports/" + del_data.id, requestOptions);
          const data = await response.json();
          this.loading = false;

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            // this.dibet_delite_cont(i);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
      async submit(){
         var time1 = this.Start_time.toISOString();
         var time2 = this.End_time.toISOString();
         console.log(time1)
         console.log(time2)
        const res = await fetch(this.$store.state.hostname + '/Payments/getPaymentsListByKasirIdAndDateTime?authId=' + localStorage.AuthId +'&beginDate=' + time1 + '&endDate=' + time2);
        const data = await res.json();
        console.log(data)
        this.list_kassir_main = data
        if(data){
          // this.cls_wnd()
          // this.get_get_()
          this.$refs.message.success('Added_successfully')
        }
        else{
          this.$refs.msg.error('Error_successfully')
          // this.modal_info = data.detail + "    (" + data.routine + ")";
          // this.modal_status = true;
          return false;
        } 
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