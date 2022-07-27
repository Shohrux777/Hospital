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
              <div class="col-4">
                <RegSelect
                :label="$t('service_group')"
                @select="select_service_Group"
                :options = "get_service_group_list" 
                :selected="group_name"
                class="mb-3"
               />
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
                <th>{{$t('contragent_name')}}</th>
                <th>{{$t('service_name')}}</th>
                <th >{{$t('service_price')}}</th>
                <th >{{$t('paymentInCash')}}</th>
                <th >{{$t('paymentInCard')}}</th>
                <th >{{$t('regisdate')}}</th>
                <th >{{$t('payed')}}</th>
                <th >{{$t('finish')}}</th>
                <th v-show="admin" width="70">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.patient_name}}</span> </td>
                <td> <span >{{row.contragent_name}}</span> </td>
                <td> <span >{{row.service_name}}</span> </td>
                <td> <span >{{row.service_price}}</span> </td>
                <td> <span :class="{'text-danger': row.paymentInCash == 0, 'text-success': row.paymentInCash != 0}">{{row.paymentInCash}}</span> </td>
                <td> <span :class="{'text-danger': row.paymentInCard == 0, 'text-success': row.paymentInCard != 0}">{{row.paymentInCard}}</span> </td>
                <td> <span >{{row.regisdate}}</span> </td>

                <td>
                  <mdb-badge v-show="row.payed === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</mdb-badge>
                  <mdb-badge v-show="row.payed === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                </td>
                <td>
                  <mdb-badge v-show="row.finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</mdb-badge>
                  <mdb-badge v-show="row.finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</mdb-badge>
                </td>
                <td v-show="admin" class="text-center">
                    <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" v-on:click="deleteRow(row,rowIndex)" :data-row="rowIndex"></i>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary">{{qty}}</span></td>
                <td> <span class="text-danger">{{summ}}</span> </td>
                <td> <span class="text-danger">{{cash}}</span> </td>
                <td> <span class="text-danger">{{card}}</span> </td>
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
                <th >{{$t('patient_name')}}</th>
                <th >{{$t('contragent_name')}}</th>
                <th>{{$t('service_name')}}</th>
                <th width="100">{{$t('service_price')}}</th>
                <th width="120">{{$t('paymentInCash')}}</th>
                <th width="120">{{$t('paymentInCard')}}</th>
                <th width="100">{{$t('payed')}}</th>
                <th width="150">{{$t('finish')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{row.patient_name}}</span></td>
                <td> <span >{{row.contragent_name}}</span></td>
                <td> <span >{{row.service_name}}</span></td>
                <td> <span >{{row.service_price}}</span></td>
                <td> <span >{{row.paymentInCash}}</span></td>
                <td> <span >{{row.paymentInCard}}</span></td>
                <td>
                  <span v-show="row.payed === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</span>
                  <span v-show="row.payed === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</span>
                </td>
                <td>
                  <span v-show="row.finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</span>
                  <span v-show="row.finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</span>
                </td>
              </tr>
              <tr>
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary">{{qty}}</span></td>
                <td> <span class="text-danger">{{summ}}</span> </td>
                <td> <span class="text-danger">{{cash}}</span> </td>
                <td> <span class="text-danger">{{card}}</span> </td>
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
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal> -->
      <mdb-modal :show="show" @close="show = false" size="sm" class="text-center" danger>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn outline="danger" @click="promiseService">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="show = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  // import DatePicker from 'vue2-datepicker';
  import RegSelect from '../../../components/RegSelect.vue'
  // import districtAdd from "../../../components/new_prog_add/district_add"
  import { mdbBtn, mdbInput, mdbIcon,  mdbModal, mdbModalHeader, mdbBadge,  mdbModalBody,mdbModalFooter   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbIcon, mdbModalBody, mdbModalFooter,
      mdbBadge, mdbInput,
      VueHtml2pdf, RegSelect
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
        let c = {
          time1: '',
          time2: '',
          contId: 0
        }
        c.time1 = a;
        c.time2 = b;
        this.loading = true;
        await this.fetch_report_by_data_time(c)
        this.get_payment_list = this.get_report_by_data_time.rows
        this.qty = this.get_report_by_time_card_cash.qty
        this.summ = this.get_report_by_time_card_cash.summ;
        this.card = this.get_report_by_time_card_cash.card
        this.cash = this.get_report_by_time_card_cash.cash
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
      deleteRow(data, index){
        console.log(data)
        this.index = index
        this.service_id = data.id
        this.show = true;
      },
      async promiseService(){
        const requestOptions = {
              method : "delete",
            };
            const response = await fetch(this.$store.state.hostname + "/Payments/" + this.service_id, requestOptions);
            const data = await response.json();
            console.log(data)
            if(data.id)
            {
              this.$refs.message.success('Successfully_removed')
              this.get_payment_list.splice(this.index, 1);
              this.show = false;
            }
      },
      select_service_Group(option){
        this.group_name = option.name;
        this.group_id = option.id;
        this.summ = 0;
        this.qty = 0;
        this.cash = 0;
        this.card = 0;
        this.get_payment_list = []
        for(let i = 0; i < this.get_report_by_data_time.rows.length; i++) {
          if(this.get_report_by_data_time.rows[i].serviceGroup == this.group_name){
            this.get_payment_list.push(this.get_report_by_data_time.rows[i])
            this.summ += this.get_report_by_data_time.rows[i].service_price
            this.card += this.get_report_by_data_time.rows[i].paymentInCard
            this.cash += this.get_report_by_data_time.rows[i].paymentInCash
            // this.summa += this.get_report_by_data[i].summa;
          }
        }
            this.qty = this.get_payment_list.length
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
        await this.fetch_report_by_data_time(a);
        this.get_payment_list = [];
        if(this.group_name == ''){
          this.get_payment_list = this.get_report_by_data_time.rows
          this.qty = this.get_report_by_time_card_cash.qty
          this.summ = this.get_report_by_time_card_cash.summ;
          this.card = this.get_report_by_time_card_cash.card
          this.cash = this.get_report_by_time_card_cash.cash
          this.loading = false;
        }
        else{
          this.get_payment_list = []
          for(let i = 0; i < this.get_report_by_data_time.rows.length; i++) {
            if(this.get_report_by_data_time.rows[i].serviceGroup == this.group_name){
              this.get_payment_list.push(this.get_report_by_data_time.rows[i])
              this.summ += this.get_report_by_data_time.rows[i].service_price
              this.card += this.get_report_by_data_time.rows[i].paymentInCard
              this.cash += this.get_report_by_data_time.rows[i].paymentInCash
              this.loading = false;
              // this.summa += this.get_report_by_data[i].summa;
            }
          }
              this.qty = this.get_payment_list.length
        }
        console.log(this.get_payment_list)
        
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