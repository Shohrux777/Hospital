<template>
  <div class="bg-white">
    <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-4">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 40px;"> 
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
               />
              </div>
            </div>
            <div class="plus">
              <mdb-btn @click="print" color="info py-2 px-4" style="font-size:10px;"  >
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
                <th  width="55" class="text-left">№</th>  
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('contNumber')}}</th>
                <th  >{{$t('regionName')}}</th>
                <th >{{$t('serviceGroupName')}}</th>
                <th>{{$t('serviceTypeName')}}</th>
                <th>{{$t('date')}}</th>
                <th width="120">{{$t('cont_sum')}}</th>
                <th v-show="admin" width="70">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list_by_group" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.contragentName}}</span> </td>
                <td> <span >{{row.contragentPhoneNumber}}</span> </td>
                <td> <span >{{row.regionName}}</span> </td>
                <td> <span >{{row.serviceGroupName}}</span> </td>
                <td> <span >{{row.serviceTypeName}}</span> </td>
                <td> <span >{{row.createdDate.slice(0,10)}}</span> </td>
                <td> <span >{{row.summa}}</span> </td>
                <td v-show="admin" class="text-center">
                    <i  class="fas fa-trash delIcon mask waves-effect m-0 pl-2" v-on:click="deleteRow(rowIndex, row)" :data-row="rowIndex"></i>
                </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span >{{summa}}</span> </td>
                
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
                <th >{{$t('contragentPhoneNumber')}}</th>
                <th >{{$t('serviceGroupName')}}</th>
                <th>{{$t('serviceTypeName')}}</th>
                <th width="120">{{$t('cont_sum')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list_by_group" :key="rowIndex">
                <td> <span >{{row.contragentName}}</span> </td>
                <td> <span >{{row.contragentPhoneNumber}}</span> </td>
                <td> <span >{{row.serviceGroupName}}</span> </td>
                <td> <span >{{row.serviceTypeName}}</span> </td>
                <td> <span >{{row.summa}}</span> </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span >{{summa}}</span> </td>
                
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
  import { mdbBtn, mdbIcon, mdbInput,  mdbModal, mdbModalHeader,  mdbModalBody, mdbModalFooter  } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalBody, mdbInput,
       RegSelect, mdbModalFooter, mdbIcon,
      VueHtml2pdf
    },
    data(){
      return{
        show: false,
        loading: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: 0,
        Start_time: null,
        End_time: null,
        admin: false,
        group_name: '',
        group_id: null,
        bonus_contragent_list_by_group: [],
        summa: 0,
        index: null,
        service_id: null,
      }
    },
    async mounted(){
      if(localStorage.Type == 0){
        this.admin = true;
      }
      console.log('date')

        // await this.fetch_report_by_data(a)
        await this.fetch_contragent()
        this.fetch_service_group()
        // console.log(this.get_report_by_data)
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data', 'get_report_by_time_card_cash', 'get_service_group_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data', 'fetch_service_group']),
      ...mapMutations(['dibet_delite_cont']),

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
        for(let i = 0; i < this.get_report_by_data.length; i++) {
          if(this.get_report_by_data[i].serviceGroupName == option.name){
            this.bonus_contragent_list_by_group.push(this.get_report_by_data[i])
            this.summa += this.get_report_by_data[i].summa;
          }
        }
      },
      async promiseService(){
        const requestOptions = {
            method : "delete",
          };
          this.loading =true;
          const response = await fetch(this.$store.state.hostname + "/HospitalContragentDebitPaymentReports/" + this.service_id, requestOptions);
          const data = await response.json();
          this.loading = false;

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            this.show = false;
            this.bonus_contragent_list_by_group.splice(this.index, 1);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
      deleteRow(index, data){
        console.log(data)
        this.index = index
        this.service_id = data.id
        this.show = true;
      },

      async submit(){
        let a = {
          time1: "2021-09-01T09:15:28.886Z",
          time2: new Date(),
        }
        a.time1 = this.Start_time + 'T00:00:35.000Z';
        a.time2 = this.End_time + 'T23:59:59.000Z';
        this.loading = true;
        await this.fetch_report_by_data(a);
        if(this.group_name == ''){
          this.bonus_contragent_list_by_group = this.get_report_by_data
          this.summa = 0;
          this.summa = this.get_report_by_data.reduce((total, item) => {
                return total + item.summa
            }, 0)
          this.loading = false;
        }
        else{
          this.bonus_contragent_list_by_group = [];
          this.summa = 0;
          for(let i = 0; i < this.get_report_by_data.length; i++) {
            if(this.get_report_by_data[i].serviceGroupName == this.group_name){
              this.bonus_contragent_list_by_group.push(this.get_report_by_data[i])
              this.summa += this.get_report_by_data[i].summa;
            }
          }
          this.loading = false;
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