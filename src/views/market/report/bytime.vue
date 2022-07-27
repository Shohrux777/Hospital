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
              <div class="col-2">
                <!-- Default checked -->
                <div class="custom-control custom-switch  pl-5">
                    <input v-model="is_postavshik" type="checkbox" class="custom-control-input " id="customSwitch3" checked>
                    <label class="custom-control-label " for="customSwitch3">{{$t('filial')}}</label>
                </div>
              </div>
              <div class="col-2">
                <!-- Default checked -->
                <div class="custom-control custom-switch  pl-5">
                    <input v-model="is_main" type="checkbox" class="custom-control-input " id="customSwitch4" checked>
                    <label class="custom-control-label " for="customSwitch4">{{$t('Main')}}</label>
                </div>
              </div>
            </div>
            <div class="plus">
              <!-- <mdb-btn @click="print" color="info py-2 px-4"   >
                {{$t('print')}}
              </mdb-btn> -->
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
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('patient_name')}}</th>
                <th>{{$t('service_name')}}</th>
                <th width="100">{{$t('service_price')}}</th>
                <th width="120">{{$t('paymentInCard')}}</th>
                <th width="120">{{$t('paymentInCash')}}</th>
                <th width="100">{{$t('payed')}}</th>
                <th width="150">{{$t('finish')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_report_by_data_time.rows" :key="rowIndex">
                <td> <span >{{row.contragent_name}}</span> </td>
                <td> <span >{{row.patient_name}}</span> </td>
                <td> <span >{{row.service_name}}</span> </td>
                <td> <span >{{row.service_price}}</span> </td>
                <td> <span :class="{'text-danger': row.paymentInCard == 0, 'text-success': row.paymentInCard != 0}">{{row.paymentInCard}}</span> </td>
                <td> <span :class="{'text-danger': row.paymentInCash == 0, 'text-success': row.paymentInCash != 0}">{{row.paymentInCash}}</span> </td>
                <td>
                  <mdb-badge v-show="row.payed === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</mdb-badge>
                  <mdb-badge v-show="row.payed === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                </td>
                <td>
                  <mdb-badge v-show="row.finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</mdb-badge>
                  <mdb-badge v-show="row.finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</mdb-badge>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary">{{get_report_by_time_card_cash.qty}}</span></td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.summ}}</span> </td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.card}}</span> </td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.cash}}</span> </td>
                <td></td>
                <td></td>
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
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('patient_name')}}</th>
                <th>{{$t('service_name')}}</th>
                <th width="100">{{$t('service_price')}}</th>
                <th width="120">{{$t('paymentInCard')}}</th>
                <th width="120">{{$t('paymentInCash')}}</th>
                <th width="100">{{$t('payed')}}</th>
                <th width="150">{{$t('finish')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_report_by_data_time.rows" :key="rowIndex">
                <td> <span >{{row.contragent_name}}</span> </td>
                <td> <span >{{row.patient_name}}</span> </td>
                <td> <span >{{row.service_name}}</span> </td>
                <td> <span >{{row.service_price}}</span> </td>
                <td> <span >{{row.paymentInCard}}</span> </td>
                <td> <span >{{row.paymentInCash}}</span> </td>
                <td>
                  <span v-show="row.payed === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</span>
                  <span v-show="row.payed === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</span>
                </td>
                <td>
                  <span v-show="row.finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</span>
                  <span v-show="row.finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</span>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary">{{get_report_by_time_card_cash.qty}}</span></td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.summ}}</span> </td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.card}}</span> </td>
                <td> <span class="text-danger">{{get_report_by_time_card_cash.cash}}</span> </td>
                <td></td>
                <td></td>
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
  import districtAdd from "../../../components/new_prog_add/district_add"
  import { mdbBtn,   mdbModal, mdbModalHeader, mdbBadge, mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, DatePicker,
      districtAdd,mdbBadge,
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
      }
    },
    mounted(){
      console.log('date')
      console.log(this.End_time.toISOString())
      let time2 = this.End_time.toISOString()
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: null,
          contId: 0
        }
        a.time2 = time2
        this.fetch_report_by_data_time(a)
        this.fetch_contragent()
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time']),
      ...mapMutations(['district_row_delete']),

      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      submit(){
        const time1 = this.Start_time.toISOString();
        const time2 = this.End_time.toISOString();
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: new Date(),
          contId: 0
        }
        a.time1 = time1;
        a.time2 = time2;
        a.contId = this.contragent_id;
        this.fetch_report_by_data_time(a)
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
</style>