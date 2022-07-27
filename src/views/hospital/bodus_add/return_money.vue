<template>
  <div class="bg-white">
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <div class="border-bottom">
          <h5 class="mx-4 pb-3 ">Возвырат деньги</h5>
        </div>
        <form @submit.prevent="submit">
          <div style="height: 100px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-100 row align-items-center">
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date" size="sm" v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date" size="sm"  v-model="End_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <RegSelect
                  class="mt-3"
                  label="Кассир"
                  @select="users_func"
                  :options="get_auth_user_limit"
                  :selected="user_name"
                  :searching="true"
                />
                <!-- <small v-if="$v.district_name.$dirty && district_id == null" class="text-danger p-0 m-0 pl-1" >
                  {{$t('select_item')}}
                </small> -->
              </div>
              <div class="col-3 pt-2 text-right">
                <mdb-btn @click="print" color="info py-2 px-4" style="font-size:10px;"  >
                  {{$t('print')}}
                </mdb-btn>
                <mdb-btn type="submit" color="primary py-2 px-4" style="font-size:10px;">
                  {{$t('search')}}
                </mdb-btn>
              </div>
              
            </div>
            
          </div>
        </form>
       <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="50">№</th>
                <th width="270">{{$t('authorizationId')}}</th>
                <th >{{$t('usersId')}}</th>
                <th >{{$t('reason')}}</th>
                <th >{{$t('registratedDate')}}</th>
                <th>{{$t('price')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.authorization.users.fio}}</span> </td>
                <td> <span >{{row.user.fio}}</span> </td>
                <td> <span >{{row.reason}}</span> </td>
                <td> <span >{{row.registratedDate.slice(0,10) + ' |' + row.registratedDate.slice(11,16)}}</span> </td>
                <td> <span >{{row.price}}</span> </td>          
              </tr>
              <tr>
                <td> <span class="text-primary">Общий</span> </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-success">{{summa}}</td>
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
                <th >{{$t('reason')}}</th>
                <th>{{$t('date')}}</th>
                <th width="100">{{$t('Summa')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list" :key="rowIndex">
                <td> <span >{{row.contragentId}}</span> </td>
                <td> <span >{{row.payedUserInfo}}</span> </td>
                <td> <span >{{row.createdDateTime}}</span> </td>
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
  import RegSelect from '../../../components/hospital/UserlineSelect.vue'
  // import DatePicker from 'vue2-datepicker';
  import districtAdd from "../../../components/new_prog_add/district_add"
  // import lineSelect from "../../../components/lineSelect.vue";
  import {  mdbInput, mdbBtn,  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      districtAdd, mdbInput, mdbBtn,
      VueHtml2pdf, RegSelect
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
        user_name: '',
        user_id: 0,
        bonus_contragent_list: [],
        summa: 0
      }
    },
    mounted(){
      console.log('date')
      this.get_get_()
        this.fetch_contragent()
        this.fetch_auth_list()
    },
    computed: mapGetters(['get_contragent_list', 'get_auth_user_limit', 'get_report_by_data_contragent', 'get_report_qty_summ', 'get_report_by_cont_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent','fetch_auth_list', 'fetch_report_by_data_cont']),
      ...mapMutations(['district_row_delete']),

      async selectcontragent(option){
        this.contragent_id = option.data.id
        this.contragent_name = option.data.name
      },
      async get_get_(){ 
        const response = await fetch(this.$store.state.hostname + '/ReturnMoneys')
        const data = await response.json()
        this.summa = 0;
        for(var i = 0; i < data.length; i++) {
          this.summa += data[i].price
        }
        this.bonus_contragent_list = data
        console.log(data)
      },
      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      users_func(options){
        console.log(options)
        this.user_name = options.data.fio
        this.user_id = options.data.Authid
      },
      async submit(){
        console.log(this.Start_time)
        console.log(this.End_time)
        var time1 = this.Start_time + 'T00:00:35.000Z'
        var time2 = this.End_time + 'T23:59:35.000Z'
        const response = await fetch(this.$store.state.hostname + '/ReturnMoneys/getReturnMoneyListBeatwenDateTimeAndKassirId?beginDate=' + time1 + 
        '&endDate=' + time2 + '&kassirId=' + this.user_id)
        const data = await response.json()
        this.summa = 0;
        for(var i = 0; i < data.length; i++) {
          this.summa += data[i].price
        }
        this.bonus_contragent_list = data
        console.log(data)
      },
    }
  }
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