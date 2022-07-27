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
              <mdb-btn @click="details" color="info py-2 px-4"  style="font-size:10px;"  >
                {{$t('details')}}
              </mdb-btn>
              <mdb-btn @click="print" color="info py-2 px-4"  style="font-size:10px;"  >
                {{$t('print')}}
              </mdb-btn>
              <mdb-btn type="submit" color="primary py-2 px-4"  style="font-size:10px;" >
                {{$t('apply')}}
              </mdb-btn>
            </div>
          </div>
        </form>
        <div class="TablePatientDocIds p-3">
          <table class="myTable">
            <thead>
              <!-- <tr class="header ">
                <th >{{$t('service_group')}}</th>
                <th >{{$t('user')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('cash')}}</th>
                <th >{{$t('card')}}</th>
                <th>{{$t('qty')}}</th>
                <td> <span class="text-primary">Общий</span> </td>
              </tr> -->
            </thead>
            <tbody>
              <!-- <tr v-for="(row,rowIndex) in kunlik_report_list" :key="rowIndex"  
              :class="{ 'text-danger': row.hospitalServiceTypeGroupName == 'RETURNED',
               'text-warning': row.hospitalServiceTypeGroupName == 'REJECTED',
               'text-secondary': row.hospitalServiceTypeGroupName == 'VOZVRAT' }">
                <td> 
                  <span v-if = "row.hospitalServiceTypeGroupName == 'RETURNED'" >РACXOДЫ</span> 
                  <span v-else-if = "row.hospitalServiceTypeGroupName == 'REJECTED'" >ОТКАЗ</span> 
                  <span v-else-if = "row.hospitalServiceTypeGroupName == 'VOZVRAT'" >Возвырат</span> 
                  <span v-else >{{row.hospitalServiceTypeGroupName}}</span> 
                </td>
                <td> <span >{{row.authorization.users.fio}}</span> </td>
                <td> <span >{{row.createdDateTime.slice(0,10)}}</span> </td>
                <td> <span >{{row.cashSumm}}</span> </td>
                <td> <span >{{row.cardSumm}}</span> </td>
                <td> <span >{{row.count}}</span> </td>
                <td> <span >{{row.cashSumm + row.cardSumm}}</span> </td>

               
              </tr>
              <tr >
                <td> <span class="text-success">Общий</span> </td>
                <td> <span ></span></td>
                <td> <span ></span></td>
                <td> <span  class="text-success">{{cash}}</span></td>
                <td> <span  class="text-success">{{card}}</span></td>
                <td> <span  class="text-success">{{qtys}}</span></td>
                <td> <span  class="text-success">{{cash + card}}</span></td>
              </tr> -->
              <tr >
                <td> <span class="text-success"></span>{{$t('cash')}}</td>
                <td> <span  class="text-primary">{{kunlik_report_list.cash}} сум </span></td>
              </tr>
               <tr >
                <td> <span class="text-success"></span>{{$t('card')}}</td>
                <td> <span  class="text-primary">{{kunlik_report_list.card}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>Расходы</td>
                <td> <span  class="text-primary">{{kunlik_report_list.return}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>{{$t('cash')}} + {{$t('card')}} =</td>
                <td> <span  class="text-success">{{kunlik_report_list.cash+kunlik_report_list.card}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>{{$t('cash')}} - Расходы =</td>
                <td> <span  class="text-success">{{kunlik_report_list.cash-kunlik_report_list.return}} сум </span></td>
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
         <div class="TablePatientDocIds p-3">
          <table class="myTable">
            <thead>
              <!-- <tr class="header ">
                <th >{{$t('service_group')}}</th>
                <th >{{$t('user')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('cash')}}</th>
                <th >{{$t('card')}}</th>
                <th>{{$t('qty')}}</th>
                <td> <span class="text-primary">Общий</span> </td>
              </tr> -->
            </thead>
            <tbody>
              <!-- <tr v-for="(row,rowIndex) in kunlik_report_list" :key="rowIndex"  
              :class="{ 'text-danger': row.hospitalServiceTypeGroupName == 'RETURNED',
               'text-warning': row.hospitalServiceTypeGroupName == 'REJECTED',
               'text-secondary': row.hospitalServiceTypeGroupName == 'VOZVRAT' }">
                <td> 
                  <span v-if = "row.hospitalServiceTypeGroupName == 'RETURNED'" >РACXOДЫ</span> 
                  <span v-else-if = "row.hospitalServiceTypeGroupName == 'REJECTED'" >ОТКАЗ</span> 
                  <span v-else-if = "row.hospitalServiceTypeGroupName == 'VOZVRAT'" >Возвырат</span> 
                  <span v-else >{{row.hospitalServiceTypeGroupName}}</span> 
                </td>
                <td> <span >{{row.authorization.users.fio}}</span> </td>
                <td> <span >{{row.createdDateTime.slice(0,10)}}</span> </td>
                <td> <span >{{row.cashSumm}}</span> </td>
                <td> <span >{{row.cardSumm}}</span> </td>
                <td> <span >{{row.count}}</span> </td>
                <td> <span >{{row.cashSumm + row.cardSumm}}</span> </td>

               
              </tr>
              <tr >
                <td> <span class="text-success">Общий</span> </td>
                <td> <span ></span></td>
                <td> <span ></span></td>
                <td> <span  class="text-success">{{cash}}</span></td>
                <td> <span  class="text-success">{{card}}</span></td>
                <td> <span  class="text-success">{{qtys}}</span></td>
                <td> <span  class="text-success">{{cash + card}}</span></td>
              </tr> -->
              <tr >
                <td> <span class="text-success"></span>{{$t('cash')}}</td>
                <td> <span  class="text-primary">{{kunlik_report_list.cash}} сум </span></td>
              </tr>
               <tr >
                <td> <span class="text-success"></span>{{$t('card')}}</td>
                <td> <span  class="text-primary">{{kunlik_report_list.card}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>Расходы</td>
                <td> <span  class="text-primary">{{kunlik_report_list.return}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>{{$t('cash')}} + {{$t('card')}} =</td>
                <td> <span  class="text-success">{{kunlik_report_list.cash+kunlik_report_list.card}} сум </span></td>
              </tr>
              <tr>
                <td> <span class="text-success"></span>{{$t('cash')}} - Расходы =</td>
                <td> <span  class="text-success">{{kunlik_report_list.cash-kunlik_report_list.return}} сум </span></td>
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
  import { mdbBtn, mdbInput,  mdbModal, mdbModalHeader,  mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbInput,
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
        Start_time: null,
        End_time: null,
        admin: true,
        kunlik_report_list: {
          cash: 0,
          card: 0,
          return: 0
        },
        loading: false,
        cash: 0,
        card: 0,
        qtys: 0,
        allmoney: 0,

      }
    },
    async mounted(){
       if(localStorage.Type == 0 || localStorage.Type == 4){
          this.admin = false;
          let time1 = new Date();
          this.Start_time = time1.toISOString().slice(0,10); 
          this.End_time = time1.toISOString().slice(0,10);
          let a = this.Start_time + 'T00:00:35.000Z';
          let b = this.End_time + 'T23:59:59.000Z';
          this.loading =true;
          const response = await fetch(this.$store.state.hostname + "/Payments/getRealMoneyCondition?beginDate=" + a + '&endDate=' + b);
          const data = await response.json();
          console.log(data)
          this.loading = false;

          this.kunlik_report_list.cash = data[0].naqt;
          this.kunlik_report_list.card = data[0].plastik;
          this.kunlik_report_list.return = data[0].rasxod;

          // for(let i=0; i<this.kunlik_report_list.length; i++) {
          //   if(this.kunlik_report_list[i].)
          // }
        }
        else{
        this.admin = true;
          let time1 = new Date();
          this.Start_time = time1.toISOString().slice(0,10); 
          this.End_time = time1.toISOString().slice(0,10);
          console.log(this.Start_time)
          console.log(this.End_time)
          let a = this.Start_time + 'T00:00:35.000Z';
          let b = this.End_time + 'T23:59:59.000Z';
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/Payments/getRealKassirCondition?kassirAuthId=" + localStorage.AuthId + '&beginDate=' + a + '&endDate=' + b);
          const data = await response.json();
          console.log(localStorage.AuthId)
          console.log('datare')
          console.log(data)
          this.loading = false;
          this.kunlik_report_list.cash = data[0].naqt;
          this.kunlik_report_list.card = data[0].plastik;
          this.kunlik_report_list.return = data[0].rasxod;
      }



        // await this.fetch_report_by_data(a)
        // await this.fetch_contragent()
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
      print(){
        this.$refs.listlar.generatePdf()
      },
      details(){
        this.$router.push('/dailyForPayment')
      },
      async submit(){
        if(localStorage.Type == 0 || localStorage.Type == 4){
          // this.admin = false;
          console.log(this.Start_time)
          console.log(this.End_time)
          let a = this.Start_time + 'T00:00:35.000Z';
          let b = this.End_time + 'T23:59:59.000Z';
          this.loading =true;
          const response = await fetch(this.$store.state.hostname + "/Payments/getRealMoneyCondition?beginDate=" + a + '&endDate=' + b);
          const data = await response.json();
          console.log('data')
          console.log(data)
          this.loading = false;
          this.kunlik_report_list.cash = data[0].naqt;
          this.kunlik_report_list.card = data[0].plastik;
          this.kunlik_report_list.return = data[0].rasxod;
          // for(let i=0; i<this.kunlik_report_list.length; i++) {
          //   if(this.kunlik_report_list[i].)
          // }
        }
        else{
          // let time1 = new Date();
          // this.Start_time = time1.toISOString().slice(0,10); 
          // this.End_time = time1.toISOString().slice(0,10);
          let a = this.Start_time + 'T00:00:35.000Z';
          let b = this.End_time + 'T23:59:59.000Z';
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/Payments/getRealKassirCondition?kassirAuthId=" + localStorage.AuthId + '&beginDate=' + a + '&endDate=' + b);
          const data = await response.json();
          console.log('data')
          console.log(data)
          this.loading = false;
          this.kunlik_report_list.cash = data[0].naqt;
          this.kunlik_report_list.card = data[0].plastik;
          this.kunlik_report_list.return = data[0].rasxod;
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
.TablePatientDocIds{
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