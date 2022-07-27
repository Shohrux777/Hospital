<template>
  <div class="bg-white">
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-100 row align-items-center">
              <div class="col-3 pt-3">
                <lineSelect
                  :options="auth_user_list"
                  :searchshow="true"
                  @select="selectcontragent"
                  :selected="contragent_name"
                  :label="$t('contragent')"
                />
              </div> 
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date"  v-model="End_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <div class="plus d-flex justify-content-end  mt-2">
                <mdb-btn @click="print" color="info py-2 px-4"  style="font-size:10px;" >
                  {{$t('print')}}
                </mdb-btn>
                <mdb-btn type="submit" color="primary py-2 px-4"  style="font-size:10px;" >
                  {{$t('apply')}}
                </mdb-btn>
              </div>
              </div>
              
            </div>
            
          </div>
            
        </form>
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th>{{$t('service_name')}}</th>
                <th >{{$t('cash')}}</th>
                <th >{{$t('card')}}</th>
                <th >{{$t('debit')}}</th>
                <th >{{$t('summ')}}</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in otchotList" :key="rowIndex" >
                <td >{{rowIndex+1}}</td>
                <td> <span >{{row.pos_name}}</span> </td>
                <td> <span >{{row.cash}}</span> </td>
                <td> <span >{{row.card}}</span> </td>
                <td> <span >{{row.dolg_summ}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>

                <td> <span class="text-danger">{{cash}}</span> </td>
                <td class="text-primary">{{card}}</td>
                <td class="text-primary">{{dolg}}</td>
                <td> <span >All: {{summa}}</span> </td>
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
                <th width="60">№</th>
                <th>{{$t('service_name')}}</th>
                <th >{{$t('cash')}}</th>
                <th >{{$t('card')}}</th>
                <th >{{$t('debit')}}</th>
                <th >{{$t('summ')}}</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in otchotList" :key="rowIndex" >
                <td >{{rowIndex+1}}</td>
                <td> <span >{{row.pos_name}}</span> </td>
                <td> <span >{{row.cash}}</span> </td>
                <td> <span >{{row.card}}</span> </td>
                <td> <span >{{row.dolg_summ}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>

                <td> <span class="text-danger">{{cash}}</span> </td>
                <td class="text-primary">{{card}}</td>
                <td class="text-primary">{{dolg}}</td>
                <td> <span >All: {{summa}}</span> </td>
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
  import lineSelect from "../../../components/lineSelectAuth.vue";
  import { mdbBtn, mdbInput,  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, lineSelect,
      districtAdd, mdbInput,
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
        group_name: '',
        group_id: null,
        bonus_contragent_list_by_group: [],
        summa: 0,
        card: 0,
        cash: 0,
        dolg: 0,
        otchotList: [],
      }
    },
    async mounted(){
      await this.fetch_auth_list()
      console.log(this.auth_user_list)
        // this.fetch_contragent()
        // this.fetch_service_group()
    },
    computed: mapGetters(['auth_user_list', 'get_contragent_list', 'get_report_by_data_contragent', 'get_service_group_list', 'get_report_qty_summ', 'get_report_by_cont_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_cont', 'fetch_service_group', 'fetch_auth_list']),
      ...mapMutations(['district_row_delete']),

      async selectcontragent(option){
        console.log(option)
        this.contragent_id = option.data.id
        this.contragent_name = option.data.users.fio
      },
      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      select_service_Group(option){
        this.group_name = option.name;
        this.group_id = option.id;
        this.bonus_contragent_list_by_group = [];
        this.summa = 0;
        this.cash = 0;
        this.card = 0;
        for(let i = 0; i < this.get_report_by_data_contragent.rows.length; i++) {
          if(this.get_report_by_data_contragent.rows[i].service_Group == this.group_name){
            this.bonus_contragent_list_by_group.push(this.get_report_by_data_contragent.rows[i])
            this.summa += this.get_report_by_data_contragent.rows[i].service_price;
            this.cash += this.get_report_by_data_contragent.rows[i].paymentInCash;
            this.card += this.get_report_by_data_contragent.rows[i].paymentInCard;
          }
        }
      },
      async submit(){
        // const time1 = this.Start_time.toISOString();
        // const time2 = this.End_time.toISOString();
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: new Date(),
          contId: 0
        }
        a.time1 = this.Start_time + 'T00:00:00.000Z';
        a.time2 = this.End_time + 'T23:59:59.000Z';
        a.contId = this.contragent_id;

        
        this.loading =true;
        console.log(a)
          const response = await fetch(this.$store.state.hostname + "/Payments/getRealServiceListMoneyByDoctors?beginDate=" + a.time1 + 
          '&endDate=' + a.time2 + '&doctor_auth_id=' + this.contragent_id);
          const data = await response.json();
          this.loading = false;
          console.log('wewqeqwe')
          console.log(data)
          this.otchotList = data;
          this.summa = 0;
          this.cash = 0;
          this.dolg = 0;
          this.card = 0;
          if(data[0].pos_name)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Added_successfully')
            for(let i=0; i<data.length; i++){
              this.cash += data[i].cash
              this.card += data[i].card
              this.dolg += data[i].dolg_summ
              this.summa += data[i].summ
            }
            
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }







        
        // if(this.group_name == ''){
        //   this.bonus_contragent_list_by_group = [];
        //   this.bonus_contragent_list_by_group = this.get_report_by_data_contragent.rows
        //   this.summa = 0;
        //   this.cash = 0;
        //   this.card = 0;
        //   this.summa = this.get_report_by_data_contragent.rows.reduce((total, item) => {
        //         return total + item.service_price
        //     }, 0)
        //     this.cash = this.get_report_by_data_contragent.rows.reduce((total, item) => {
        //         return total + item.paymentInCash
        //     }, 0)
        //     this.card = this.get_report_by_data_contragent.rows.reduce((total, item) => {
        //         return total + item.paymentInCard
        //     }, 0)
        // }
        // else{
        //   this.bonus_contragent_list_by_group = [];
        //   this.summa = 0;
        //   this.cash = 0;
        //   this.card = 0;
        //   for(let i = 0; i < this.get_report_by_data_contragent.rows.length; i++) {
        //     if(this.get_report_by_data_contragent.rows[i].service_Group == this.group_name){
        //       this.bonus_contragent_list_by_group.push(this.get_report_by_data_contragent.rows[i])
        //       this.summa += this.get_report_by_data_contragent.rows[i].service_price;
        //       this.cash += this.get_report_by_data_contragent.rows[i].paymentInCash;
        //       this.card += this.get_report_by_data_contragent.rows[i].paymentInCard;
        //     }
        //   }
        //   console.log(this.get_report_by_data_contragent.rows)
        // }
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