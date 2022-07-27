<template>
  <div class="bg-white">
     <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 100px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-100 row align-items-center">
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
                <RegSelect
                  label="Регион"
                  @select="district_func"
                  :options="get_district_list.rows"
                  :selected="district_name"
                />
                <small v-if="$v.district_name.$dirty && district_id == null" class="text-danger p-0 m-0 pl-1" >
                  {{$t('select_item')}}
                </small>
              </div>
              <div class="col-3 pt-2 text-right">
                <mdb-btn @click="print" color="info py-2 px-4"   >
                  {{$t('print')}}
                </mdb-btn>
                <mdb-btn type="submit" color="primary py-2 px-4"   >
                  {{$t('apply')}}
                </mdb-btn>
              </div>
              <!-- <div class="col-3">
                <RegSelect
                  label="Service"
                  @select="serviceGroupSelect"
                  :options="get_service_group_list"
                  :selected="service_name"
                />
              </div> -->
              <!-- <div class="col-4 pt-2 px-4 border-bottom">
                <span class="ml-2" v-for="(name, i) in service_group" :key="i">{{name}}</span>
              </div> -->
              
            </div>
            
          </div>
        </form>
        <div class="TablePatientDocId p-5">
          <table class="myTableUZI bordered">
            <thead>
              <tr class="header ">
                <th  width="55" class="text-left">№</th>  
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('phone')}}</th>
                <th >{{$t('regionName')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('UZI')}}</th>
                <th>{{$t('LAB')}}</th>
                <th width="120">{{$t('summa')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in contragentbyRegionList" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.fio}}</span> </td>
                <td> <span >{{row.phone}}</span> </td>
                <td> <span >{{row.regionName}}</span> </td>
                <td> <span >{{row.datereg.slice(0,10)}}</span> </td>
                <td> <span >{{row.mrt}}</span> </td>
                <td> <span >{{row.mskt}}</span> </td>
                <td> <span >{{row.sum}}</span> </td>
              </tr>
              <tr>
                <td>Общий</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{mrt}}</td>
                <td>{{mskt}}</td>
                <td>{{summa}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right">
          <mdb-btn  color="success" :disabled="admin" @click="added" class="py-2 px-4">
            {{$t('apply')}}
          </mdb-btn>
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
          <table class="myTableUZI border">
            <thead>
              <tr class="header ">
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('phone')}}</th>
                <th >{{$t('regionName')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('UZI')}}</th>
                <th>{{$t('LAB')}}</th>
                <th width="100">{{$t('summa')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in contragentbyRegionList" :key="rowIndex">
                <td> <span >{{row.fio}}</span> </td>
                <td> <span >{{row.phone}}</span> </td>
                <td> <span >{{row.regionName}}</span> </td>
                <td> <span >{{row.datereg.slice(0,10)}}</span> </td>
                <td> <span >{{row.mrt}}</span> </td>
                <td> <span >{{row.mskt}}</span> </td>
                <td> <span >{{row.sum}}</span> </td>
              </tr>
              <tr>
                <td>Общий</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{mrt}}</td>
                <td>{{mskt}}</td>
                <td>{{summa}}</td>
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
import { required } from 'vuelidate/lib/validators'
  import RegSelect from '../../../components/RegSelect.vue'
  // import districtAdd from "../../../components/new_prog_add/district_add"
  import { mdbBtn, mdbInput   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn, mdbInput,
      VueHtml2pdf, RegSelect
    },
    validations: {
      district_name: {required}
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
        service_name: '',
        service_group: [],
        district_name: '',
        district_id: null,
        loading: false,
        contragentbyRegionList: [],
        admin: true,
        summa: 0,
        mrt: 0,
        mskt: 0,
      }
    },
    mounted(){
      console.log('date')
       if(localStorage.Type == 0 || localStorage.Type == 4){
        this.admin = false;
      }
      this.fetch_district()
        this.fetch_contragent()
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data', 'get_report_by_time_card_cash', 'get_service_group_list', 'get_district_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data', 'fetch_service_group', 'fetch_district']),
      ...mapMutations(['district_row_delete']),
      district_func(option){
        this.district_name = option.name;
        this.district_id = option.id;
        console.log(option)
      },
      async added(){
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(this.contragentbyRegionList)
          };
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + '/HospitalTelegramBotManagers/getSendMessageToSelectedContragentsUziAndLabaratoriya', requestOptions)
          const data = await response.json()
          console.log(data)
          this.loading = false;
          if(data.activeStatus){
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.$refs.message.error('Network ne connect')
          }
          
      },
      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      async submit(){
        if( this.$v.$invalid || this.district_id == null )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return;
        }
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "beginDate" : this.Start_time + 'T00:00:35.000Z',
            "endDate" : this.End_time + 'T23:59:59.000Z',
            "districtId" : this.district_id,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalContragentDebitPaymentReports/getContragentCustomReportForMoneyUziAndLabaratoriya', requestOptions)
        const data = await response.json()
        // this.contragentbyRegionList = data; 
        var MrtList = data;
        this.contragentbyRegionList = [];
        for (let i = 0; i < MrtList.length; i++){
          var listMrt = {
            contragentId: null,
            datereg: null,
            fio: "",
            phone: '',
            regionName: '',
            mrt: 0,
            mskt: 0,
            sum: 0,
          }
          listMrt.contragentId = MrtList[i].contragentId;
          listMrt.datereg = MrtList[i].datereg;
          listMrt.fio = MrtList[i].fio;
          listMrt.phone = MrtList[i].phone;
          listMrt.regionName = MrtList[i].regionName;
          listMrt.mrt = MrtList[i].mrt;
          listMrt.mskt = MrtList[i].mskt;
          listMrt.sum = MrtList[i].sum;
          // console.log(listMrt)
          for (let j = i + 1; j < MrtList.length; j++) {
            if (MrtList[i].contragentId == MrtList[j].contragentId) {
              listMrt.mrt += MrtList[j].mrt
              listMrt.mskt += MrtList[j].mskt
              listMrt.sum += MrtList[j].sum
              MrtList.splice(j, 1);
              j--;
            }
          }
          this.contragentbyRegionList.push(listMrt);
        }


        // console.log('eto bizning uzgaruvchi')
        // console.log(data)
        this.summa = 0;
        this.mrt = 0;
        this.mskt = 0;
        // this.contragentbyRegionList = data; 
        this.contragentbyRegionList.forEach((item)=>{
          this.summa += item.sum
          this.mrt += item.mrt
          this.mskt += item.mskt
        })
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
  .myTableUZI {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableUZI th{
  font-weight: 600;
  font-size:12px;
}
.myTableUZI td{
  font-size:13px;
}
.myTableUZI th, .myTableUZI td {
  text-align: left;
  padding: 3px;
}

.myTableUZI tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTableUZI tr.header, .myTableUZI tr:hover {
  // background-color: #f1f1f1;
}
</style>