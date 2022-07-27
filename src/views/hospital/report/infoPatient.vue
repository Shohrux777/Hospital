<template>
  <div class="fullInfoPatient">
    <loader v-if="loading"/>
    <div class="p-4">
      <div class="mb-5 pt-2 px-4 pb-4 " style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-100  row align-items-center justify-content-center">
              <div class="col-5 search_item">
                <div class="search_title">
                  <mdb-icon style="font-size:15px" class="mr-2" icon="search" />
                  {{$t('Search patient')}}
                </div>
                <lineSelect
                  class="mt-1 ml-3"
                  :options="get_patient_client_list" 
                  :searchshow="true"
                  @select="selectPatient"
                  :selected="patient_name"
                  :label="$t('patient list')"
              />
           
              </div>
            </div>
            
          </div>
        </form>

        <div class="row" v-if="patientInfo.fio">
          <div class="col-6  mt-4 patient_anketa">
            <div class="card px-3 py-3 patient_info">
              <p class="text_content_border">{{$t('cash')}} <span class="text-success">{{moneyInfo.cash}} сум</span></p>
                  <p class="text_content_border">{{$t('card')}} <span class="text-info">{{moneyInfo.card}} сум</span></p>
                  <p class="text_content_border">{{$t('debit')}} <span class="text-danger">{{moneyInfo.debit}} сум</span></p>

                  <p class="text_content_border">{{$t('payed')}} <span>{{moneyInfo.payed}} сум</span></p>                  
                  <p class="text_content_border">{{$t('unpayed')}} <span>{{moneyInfo.nopayed}} сум</span></p>
                  <p class="text_content_border">Скидка <span>0%</span></p>
                  
                  <p class="text_content_border">{{$t('menu_general')}} <span>{{moneyInfo.payed + moneyInfo.nopayed+ moneyInfo.debit}} сум</span></p>
            </div>
          </div>
          <div class="col-6 mt-4 ">
            <div class="card  px-3 py-2">
              <div class=" patient_anketa">
                <div class="patient_img">
                  <img  v-if="patientInfo.polType==1" src="../../../assets/avatar4.jpg" class="img-fluid" alt="">
                  <img v-else src="../../../assets/woman1.png" class="img-fluid" alt="">

                </div>
                <div class="patient_info " >
                  <p class="text_content_border">{{$t('fio')}} <span>{{patientInfo.fio}}</span></p>
                  <p class="text_content_border">{{$t('phone')}} <span>{{patientInfo.phoneNumber}}</span></p>
                  <p class="text_content_border">{{$t('passportSerialNumber')}} <span>{{patientInfo.passportSerialNumber}}</span></p>
                  <p class="text_content_border" v-if="patientInfo.polType==1">{{$t('pol')}} <span>Мужчина</span></p>
                  <p class="text_content_border" v-else>{{$t('pol')}} <span>Женщина</span></p>
                  <p class="text_content_border">{{$t('bornDate')}} <span>{{patientInfo.bornDate.slice(0,10)}}</span></p>
                  <p class="text_content_border">{{$t('district')}} <span>{{patientInfo.districts.name}}</span></p>
                  <p class="text_content_border">{{$t('address')}} <span>{{patientInfo.address}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-4" v-for="(item,i) in doctorPaymentInfo" :key="i">
            <div class="card px-3 py-2">
              <div class="d-flex justify-content-between border_dashed">
                <h6 class="pb-3 pt-2 m-0 text-primary">{{item.doctor}}</h6>
                <h6 class="pb-3 pt-2 m-0 text-primary">{{item.doctorPhone}}</h6>
              </div>
              <table class="myTableFullInfo">
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

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row,rowIndex) in item.item" :key="rowIndex">
                    <td> <span >{{rowIndex+1}}</span> </td>
                    <td> <span >{{row.patients.FIO}}</span> </td>
                    <td> <span >{{row.contragent.Name}}</span> </td>
                    <td> <span >{{row.ServiceName}}</span> </td>
                    <td> <span >{{row.Summ}}</span> </td>
                    <td> <span :class="{'text-danger': row.PaymentInCash == 0, 'text-success': row.PaymentInCash != 0}">{{row.PaymentInCash}}</span> </td>
                    <td> <span :class="{'text-danger': row.PaymentInCard == 0, 'text-success': row.PaymentInCard != 0}">{{row.PaymentInCard}}</span> </td>
                    <td> <p class="m-0">{{row.RegistratedDate.slice(0,10)}}</p> <p class="m-0">{{row.RegistratedDate.slice(11,19)}}</p> </td>

                    <td>
                      <mdb-badge v-show="row.FinishPayment === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</mdb-badge>
                      <mdb-badge v-show="row.FinishPayment === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                    </td>
                    <td>
                      <mdb-badge v-show="row.Finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</mdb-badge>
                      <mdb-badge v-show="row.Finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</mdb-badge>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
       <div class="col-12 mt-4" v-for="(item,i) in doctorPaymentInfo" :key="i">
          <div class="card px-3 py-2">
            <div class="d-flex justify-content-between border_dashed">
              <h6 class="pb-3 pt-2 m-0 text-primary">{{item.doctor}}</h6>
              <h6 class="pb-3 pt-2 m-0 text-primary">{{item.doctorPhone}}</h6>
            </div>
            <table class="myTableFullInfo">
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

                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,rowIndex) in item.item" :key="rowIndex">
                  <td> <span >{{rowIndex+1}}</span> </td>
                  <td> <span >{{row.patients.FIO}}</span> </td>
                  <td> <span >{{row.contragent.Name}}</span> </td>
                  <td> <span >{{row.ServiceName}}</span> </td>
                  <td> <span >{{row.Summ}}</span> </td>
                  <td> <span :class="{'text-danger': row.PaymentInCash == 0, 'text-success': row.PaymentInCash != 0}">{{row.PaymentInCash}}</span> </td>
                  <td> <span :class="{'text-danger': row.PaymentInCard == 0, 'text-success': row.PaymentInCard != 0}">{{row.PaymentInCard}}</span> </td>
                  <td> <p class="m-0">{{row.RegistratedDate.slice(0,10)}}</p> <p class="m-0">{{row.RegistratedDate.slice(11,19)}}</p> </td>

                  <td>
                    <mdb-badge v-show="row.FinishPayment === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</mdb-badge>
                    <mdb-badge v-show="row.FinishPayment === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                  </td>
                  <td>
                    <mdb-badge v-show="row.Finish === true" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</mdb-badge>
                    <mdb-badge v-show="row.Finish === false" style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</mdb-badge>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </vue-html2pdf>

    
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  import lineSelect from "../../../components/hospital/cashUserSelectForAnalysis.vue";
  // import DatePicker from 'vue2-datepicker';
  // import districtAdd from "../../../components/new_prog_add/district_add"
  import {  mdbBadge,  mdbIcon } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbIcon,
      mdbBadge,
      VueHtml2pdf, lineSelect
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
        patient_name: '',
        patient_id: null,
        get_payment_list: [],
        index: null,
        service_id: null,
        day: '',
        qty: 0,
        summ: 0,
        card: 0,
        cash: 0,


        patientInfo: {},
        moneyInfo: {
          cash:0,
          card: 0,
          debit: 0,
          payed:0,
          nopayed:0,
          summ:0,
        },
        doctorPaymentInfo: [
          
        ]
      }
    },
    async mounted(){
      if(localStorage.Type == 0){
        this.admin = true;
      }
      this.fetch_patient_client();
        this.fetch_service_group()
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash', 'get_service_group_list', 'get_patient_client_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time', 'fetch_service_group', 'fetch_patient_client']),
      ...mapMutations(['district_row_delete']),

      
      print(){
        this.$refs.listlar.generatePdf()
      },
     


      async selectPatient(option){
        this.loading = true;
        console.log(option)
        this.patientInfo = option.data
        this.patient_name = option.data.fio
        this.patient_id = option.data.id

        this.moneyInfo = {
          cash:0,
          card: 0,
          debit: 0,
          payed:0,
          nopayed:0,
          summ:0,
        }

        try{
          const response = await fetch(this.$store.state.hostname + "/HospitalPatientDolg/getPaginationByPatientId?page=0&size=100&patient_id=" +  this.patient_id);
          const data = await response.json();
          console.log('debit')
            console.log(data)
          if(data.items_list[0].qty)
          {
            
            // this.alert_text = localizeFilter('Successfully_removed');
            // this.$refs.message.success('Added_successfully')
            this.moneyInfo.debit = data.items_list[0].real_qty;
          }
          else{
            this.moneyInfo.debit = 0
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
        }
        catch{
          this.moneyInfo.debit = 0
          console.log("Ошибка долг");
        }

        const response = await fetch(this.$store.state.hostname + "/Payments/getPaginationByPatientId?page=0&size=400&patient_id=" + option.data.id);
        const data = await response.json();
        console.log('payment')
        var test = data
        console.log(test.items_list)

        this.get_payment_list = data.items_list;

        this.moneyInfo.summ = 0;
        this.moneyInfo.cash = 0;
        this.moneyInfo.card = 0;
        for(let i = 0; i < this.get_payment_list.length; i++) {
          this.moneyInfo.summ += this.get_payment_list[i].Summ
          this.moneyInfo.card += this.get_payment_list[i].PaymentInCard
          this.moneyInfo.cash += this.get_payment_list[i].PaymentInCash
          if(this.get_payment_list[i].FinishPayment == false){
            this.moneyInfo.nopayed += this.get_payment_list[i].Summ
          }
          else{
            this.moneyInfo.payed += (this.get_payment_list[i].PaymentInCard + this.get_payment_list[i].PaymentInCash);
          }
          // this.summa += this.get_report_by_data[i].summa;
        }
        console.log(this.moneyInfo)

        this.doctorPaymentInfo = []
        for(let i=0; i<this.get_payment_list.length; i++){
          let newItem = {
            doctor: '',
            doctorId: null,
            doctorPhone: '',
            item: []
          }
          this.doctorPaymentInfo.push(newItem);
          this.doctorPaymentInfo[i].doctor = this.get_payment_list[i].authorization.users.FIO;
          this.doctorPaymentInfo[i].doctorId = this.get_payment_list[i].authorization.users.Id;
          this.doctorPaymentInfo[i].doctorPhone = this.get_payment_list[i].authorization.users.PhoneNumber;
          this.doctorPaymentInfo[i].item.push(this.get_payment_list[i]);

          for(let j=i+1; j<this.get_payment_list.length; j++){
            if(this.get_payment_list[i].AuthorizationId == this.get_payment_list[j].AuthorizationId){
              this.doctorPaymentInfo[i].item.push(this.get_payment_list[j]);
              this.get_payment_list.splice(j,1)
              j--;
            }
          }
        }

        this.loading = false;
        console.log(this.doctorPaymentInfo)
      },




     
      
     

    },
  };
</script>

<style lang="scss">
.fullInfoPatient{
  min-height: 100vh;
  background: rgb(248, 248, 248);
}
.search_item{
  position: relative;
}
.search_title{
  position: absolute;
  top: -25px;
  left: 35px;
  color:orange
}

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
  .myTableFullInfo {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableFullInfo th{
  font-weight: 600;
  font-size:11px;
}
.myTableFullInfo td{
  font-size:11.5px;
}
.myTableFullInfo th, .myTableFullInfo td {
  text-align: left;
  padding: 8px;
}

.myTableFullInfo tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
}

.myTableFullInfo tr.header, .myTableFullInfo tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}



.patient_anketa{
  display: flex;
  width: 100%;
  align-items: center;
  

  .patient_img{
    width: 200px;
  }
  .patient_info{
    width: 100%;
    padding: 10px 15px 10px 25px;

    .text_content_border{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #ddd;
      color:rgb(117, 117, 117);
      font-style: italic;
      font-size: 13px;
      span{
        font-weight: bold;
        color:rgb(44, 33, 83)
      }
    }
  }
}
.border_dashed{
  border-bottom: 1px dashed #ddd;
}
</style>