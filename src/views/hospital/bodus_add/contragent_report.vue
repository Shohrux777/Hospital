<template>
  <div class="bg-white">
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-4">
                <lineSelect
                  :options="get_contragent_list.rows"
                  :searchshow="true"
                  @select="selectcontragent"
                  :selected="contragent_name"
                  :label="$t('contragent')"
                />
              </div> 
            </div>
            <div class="plus">
              <mdb-btn @click="print" color="info py-2 px-4"  style="font-size:10px;" >
                {{$t('print')}}
              </mdb-btn>
              <!-- <mdb-btn type="submit" color="primary py-2 px-4"   >
                {{$t('apply')}}
              </mdb-btn> -->
            </div>
          </div>
        </form>
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('reason')}}</th>
                <th>{{$t('date')}}</th>
                <th width="100">{{$t('Summa')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.contragent.name}}</span> </td>
                <td> <span >{{row.payedUserInfo}}</span> </td>
                <td> <span >{{row.createdDateTime}}</span> </td>
                <td> <span >{{row.summa}}</span> </td>
                
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
              <tr class="header">
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('reason')}}</th>
                <th>{{$t('date')}}</th>
                <th width="100">{{$t('Summa')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list" :key="rowIndex">
                <td> <span >{{row.contragent.name}}</span> </td>
                <td> <span >{{row.payedUserInfo}}</span> </td>
                <td> <span >{{row.createdDateTime.slice(0,10)}}</span> </td>
                <td> <span >{{row.summa}}</span> </td>
                
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
  // import DatePicker from 'vue2-datepicker';
  import districtAdd from "../../../components/new_prog_add/district_add"
  import lineSelect from "../../../components/lineSelect.vue";
  import { mdbBtn,  mdbModal, mdbModalHeader,  mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import 'vue2-datepicker/index.css';
  export default {
    components: {
      
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, lineSelect, 
      districtAdd,
      VueHtml2pdf, mdbBtn
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
        bonus_contragent_list: [],
      }
    },
    mounted(){
      
        this.fetch_contragent()
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_contragent', 'get_report_qty_summ', 'get_report_by_cont_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_cont']),
      ...mapMutations(['district_row_delete']),

      async selectcontragent(option){
        this.contragent_id = option.data.id
        this.contragent_name = option.data.name
        const response = await fetch(this.$store.state.hostname + '/ContragentAdditionalPaymentBefohands/getContragentAdditionalPaymentBefohandByContragentId?contragentId='
        + this.contragent_id)
        const data = await response.json()
        this.bonus_contragent_list = data
        
      },
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
        this.fetch_report_by_data_cont(a)
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