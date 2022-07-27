<template>
  <div class="cashbox bg-white">
    <div class="cash-header  pt-2">
      <div class="cash-pay row m-0">
        <div class="col-6 m-0 p-0">
          <div class="row">
            <div class="col-6" @click="updatePatients">
              <h4 class="text-primary mt-3 ml-4 pb-1 border-bottom">{{patient_name}}</h4>
              <lineSelect
                  class="mt-1 ml-3"
                  :options="get_unpay_patient_list" 
                  :searchshow="true"
                  @select="selectPatient"
                  :selected="patient_name"
                  :label="$t('patient list')"
              />
            </div>
            <div class="col-6 d-flex align-items-center">
              <h3 class="text-danger mt-2 ml-4">Сумма: <span class="ml-2 text-dark">{{summaString}}</span></h3>
            </div>
          </div>
        </div>
        <div class="col-6 m-0 ">
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
               <div>
                 <div class="d-flex">
                    <div style="width: 170px;" class="text-right">
                      <p class="pt-2 mr-2 font-weight-bold"><span class="text-dark">{{summaString}}</span> Сум</p>
                    </div>
                    <mdb-btn style="min-width: 180px;" @click="payCash" color="success" class=" mr-2"  p="r4 l4 t2 b2">{{$t('cash')}}</mdb-btn> 
                 </div> 
                  <div class="d-flex">
                    <div style="width: 170px;" class="text-right">
                      <p class="pt-2 mr-2 font-weight-bold"><span class="text-dark">{{summaString}}</span> Сум</p>
                    </div>
                    <mdb-btn  style="min-width: 180px;" @click="payCard" color="primary" class="mr-2"  p="r4 l4 t2 b2">{{$t('card')}}</mdb-btn>  
                  </div>
                  
                  <div class="d-flex">
                    <!-- <p  class="pt-2 font-weight-bold">Сум</p> -->
                    <div style="width: 170px;" class="text-right"></div>
                    <mdb-btn  style="min-width: 180px;" @click="returnMoney"  color="warning" class="mr-2"  p="r4 l4 t2 b2">{{$t('returnMoney')}}</mdb-btn>  
                  </div>
                  
                  
               </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cash_time row  m-0 p-0 mt-2">
        <div class="col-3 w-100 m-0 p-0 pl-3" style="position: relative;">
          <span style="position:absolute; top:-18px; left:24px; font-size:17px; color:#4285F4;">Калькулятор</span>
          <input type="text" v-model="enterSumma" v-on:keyup.13 = "payed" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" @keyup="funcCurrency($event.target.value)" ref="enterSumma"  class="form-control form-control-md border mt-2" style="border:none; outline:none;font-weight:bold; font-size:18px;" >
          <div class="text-right pt-2">
            <p class="m-0 p-0 zdachi text-danger" style="font-size:18px;">{{zdachiString}}</p>
          </div>
        </div>
        <div class="col-4">
          
        </div>
        <div class="col-5 text-right">
            <!-- <mdb-btn   color="info" class="ml-2 mt-4"  p="r4 l4 t2 b2">{{$t('Cancel')}}</mdb-btn>   -->
            <div>
              <mdb-btn   color="info" @click="infocash"  class="ml-1 " style="width: 180px;"  p="r5 l5 t2 b2">Инфо</mdb-btn>  
              <mdb-btn   color="danger" @click="returnPatient"  class="ml-1 " style="width: 180px;"  p="r5 l5 t2 b2">Возврат</mdb-btn>  
            </div>
            <div>
              <mdb-btn  style="min-width: 180px;" @click="debit_pay"  color="success" class="ml-1 "  p="t2 b2">{{$t('pay_debit')}}</mdb-btn>
              <mdb-btn  style="min-width: 180px;" @click="debit"  color="mdb-color" class="ml-1 "  p="r5 l5 t2 b2">{{$t('debit')}}</mdb-btn>
            </div>
            
        </div>
      </div>
      <div class="cash-table ">
        <div class="TablePatientDocId  p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th>{{$t('serviceName')}}</th>
                <th>{{$t('summ')}}</th>
                <th>{{$t('payedDate')}}</th>
                <th width="150">{{$t('paid')}}</th>
                <th width="150">{{$t('payed')}}</th>
                <th width="80">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_service_pay_list" :key="rowIndex">
                <td> <span >{{row.serviceName}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
                <td> <span >{{row.payedDate.slice(0,10)}}</span> </td>
                <td>
                  <mdb-badge v-show="row.finishPayment === true" style="padding: 2px 8px;" pill color="success">{{$t("payed")}}</mdb-badge>
                  <mdb-badge v-show="row.finishPayment === false" style="padding: 2px 8px;" pill color="danger">{{$t('unpayed')}}</mdb-badge>
                </td>
                <td>
                  <mdb-btn @click="payOneDevice(row.id, row.summ, row.serviceName)"  color="success" class="m-0 p-0" style="font-size: 8px;"  p="r3 l3 t1 b1">{{$t('pay')}}</mdb-btn>  
                </td>
                <td class="text-center">
                  <!-- <i class="fas fa-pen editIcon mask waves-effect t m-0 pr-2" disabled  :data-row="rowIndex"></i> -->
                  <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" disabled @click="delService(row, rowIndex)" :data-row="rowIndex"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <mdb-modal :show="confirm" @close="confirm = false" size="sm" class="text-center" success>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="check" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn color="success" @click="promise">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="confirm = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
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
    <ModalUser  :show="service_show" headerbackColor="success" closeColor="white" titlecolor="white" 
    :title="$t('Service pay')" @close="service_show = false" width="500px">
        <template v-slot:body>
          <cashpay :option="service_list" @close="payed_close" />
        </template>
      </ModalUser>
      <ModalUser  :show="return_show" headerbackColor="success" closeColor="white" titlecolor="white" 
        :title="$t('returnMoney')" @close="return_show = false" width="500px">
        <template v-slot:body>
          <returnMoney :option="service_list" @close="payed_close" />
        </template>
      </ModalUser>
      <ModalUser  :show="debit_show" headerbackColor="success" closeColor="white" titlecolor="white" 
        :title="$t('debit')" @close="debit_show = false" width="500px">
        <template v-slot:body>
          <debit :option="summa" :summa="summaString" :patient="patient_id" @close="debit_close" />
        </template>
      </ModalUser>
    <Toast ref="message"></Toast>
    
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import {mdbBtn,  mdbBadge,  mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbIcon} from 'mdbvue'
import ModalUser from '../../components/modal.vue'
import lineSelect from "../../components/hospital/cashUserSelect.vue";
import cashpay from "./cashpaydevice.vue";
import debit from "./debit.vue";
import returnMoney from "./returnMoney.vue";
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
export default {
  components: {
    lineSelect, mdbBtn, mdbBadge, ModalUser, cashpay,
     mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbIcon, returnMoney, debit
  },
  data(){
    return{
      enterSumma: null,
      zdachi:0,
      zdachiString:'0',
      currency: '',
      summaString: '0',


      patient_name: '',
      patient_id: null,
      time1: null,
      card_code: '',
      service_show: false,
      service_list: {},
      confirm: false,
      cash: false,
      show: false,
      service_id: null,
      index: null,
      return_show: false,
      debit_show: false,
      
      summ: 0,
      CashMoney: null,
      CardMoney: null,
      ServiceSumma: 0,
      ServicName: '',
      ServicePayId: null,
      serviceList_check: [],

      auth_qty: 0,
      patient_id_for_ochred: null,
      user_id_for_ochred: null,
    }
  },
  computed: mapGetters(['get_unpay_patient_list', 'get_service_pay_list', 'summa']),
  mounted(){
    this.fetch_unpayed_patient();
    console.log(this.get_service_pay_list)
  },
  methods: {
    ...mapActions(['fetch_unpayed_patient', 'fetch_service_pay_list']),
    ...mapMutations(['update_patient_name', 'Update_check_data', 'updateDebit', 'UpdatecheckInfo']),
    debit(){
      this.Update_check_data(this.get_service_pay_list);
      this.debit_show = true;
      console.log('dasdas')
    },
    updatePatients(){
      this.fetch_unpayed_patient();
    },
    debit_pay(){
      this.$router.push('/pay_debit')
    },
    
    async selectPatient(option){
      console.log(option);
      this.update_patient_name(option.data.fio)
      this.patient_name = option.data.fio;
      this.patient_id = option.data.id;
      this.patient_id_for_ochred = option.data.id;
      await this.fetch_service_pay_list(option.data.id);
      this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      this.$nextTick(function () {
        this.$refs.enterSumma.focus();
        this.enterSumma = '';
      })
      console.log(this.get_service_pay_list)
    },
    funcCurrency(n){
      console.log(n)
       this.enterSumma = n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
       var temp = ''
       for(let i=0; i<this.enterSumma.length; i++){
        if(this.enterSumma[i] != ' '){
          temp += this.enterSumma[i];
        }
       }

        this.currency = parseInt(temp);
        this.zdachi = parseFloat(this.summa)-this.currency;
        this.zdachiString = this.zdachi.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },

    returnMoney(){
      this.return_show = true;
    },
    returnPatient(){
      this.$router.push('/apply_admin');
    },
    async payed_close(){
      this.service_show = false
      this.fetch_service_pay_list(this.patient_id);
      await this.$router.push('/check')
      this.$root.$refs.check.printed()
    },
    async debit_close(){
      this.debit_show = false
      await this.fetch_service_pay_list(this.patient_id);
      await this.$router.push('/check')
      this.$root.$refs.check.printed()
    },
    async promise(){
      this.confirm = false;
      if(this.cash === true){
        this.Update_check_data(this.get_service_pay_list);
        const respon = await fetch(this.$store.state.hostname + '/Payments/payPaymentsAllCardOrCash?PatientId=' + this.patient_id + '&Card=false')
        const data = await respon.json()
        this.$store.state.cashPay_card = true;
        console.log('shuni izlayabmzn');
        console.log(data);
        if(data[0].id){
          this.UpdatecheckInfo({check:data[0].patientsId, cash: this.summa, card: 0})
          var sumdebit = 0;
          this.updateDebit(sumdebit)
          this.$refs.message.success('Added_successfully')
          await this.fetch_service_pay_list(this.patient_id);
          await this.fetch_unpayed_patient();
          await this.$router.push('/check')
          this.$root.$refs.check.printed()
        }
        else{
          this.$refs.message.error('Summa xato kiritilgan')
        }
      }
      else{
        const respon = await fetch(this.$store.state.hostname + '/Payments/payPaymentsAllCardOrCash?PatientId=' + this.patient_id + '&Card=true')
        const data = await respon.json()
        this.Update_check_data(this.get_service_pay_list);
        this.$store.state.cashPay_card = false;
        console.log(data);
        if(data[0].id){
          this.UpdatecheckInfo({check:data[0].patientsId, cash: 0, card: this.summa})
          var sumdebits = 0;
          this.updateDebit(sumdebits)
          this.$refs.message.success('Added_successfully')
          await this.fetch_service_pay_list(this.patient_id);
          await this.fetch_unpayed_patient();
          await this.$router.push('/check')
          this.$root.$refs.check.printed()

        }
        else{
          this.$refs.message.error('Summa xato kiritilgan')
        }
      }
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
            this.$refs.message.error('Successfully_removed')
            this.show = false;
            if(this.auth_qty == 1){
              await this.fetchNextOchred();
            }
            this.fetch_service_pay_list(this.patient_id);
            this.fetch_unpayed_patient();
          }
    },
    async delService(data, index){
      console.log(data)
      this.index = index
      this.service_id = data.id
      this.show = true;
      this.patient_id_for_ochred = data.patientsId;

      this.auth_qty = 0;
      for(let i=0; i<this.get_service_pay_list.length; i++){
        if(data.authorizationId == this.get_service_pay_list[i].authorizationId){
          this.auth_qty ++;
        }
      }
      console.log(this.auth_qty)
      if(this.auth_qty == 1){
        await this.fetchAuthForUserId(data.authorizationId);
      }

    },
    async fetchAuthForUserId(id){
      try{
        const response = await fetch(this.$store.state.hostname + "/Authorization/" + id);
        const data = await response.json();
        console.log(data)
        if(response.status ==200 || response.status ==201){
          this.user_id_for_ochred = data.usersId;
        }
      }
      catch{
        console.log('error')
      }
      
    },
    async fetchNextOchred(){
      let newdate = new Date().toISOString().slice(0,10);
      console.log(newdate)
      let b_date  = newdate + 'T00:00:35.000Z';
      let e_date  = newdate + 'T23:59:35.000Z';
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/acceptGetPaginationByDoktorIdAndPatientIdDates?page=0&size=100&user_id=" + this.user_id_for_ochred + '&patient_id=' + this.patient_id_for_ochred + '&b_date=' + b_date + '&e_date=' + e_date);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data, 'jsonini ckeck ochret oldim')
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },
    infocash(){
      this.$router.push('/dailyForPayment')
    },
    async payCash(){
      this.confirm = true;
      this.cash = true;
      
    },
      async payCard(){
        this.confirm = true;
        this.cash = false;
      },
    //   printCheck () {
    //   const prtHtml = document.getElementById('print').innerHTML
    //   let stylesHtml = ''
    //   for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    //     stylesHtml += node.outerHTML
    //   }
    //   const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=800,toolbar=0,scrollbars=0,status=0')
    //   WinPrint.document.write(`<!DOCTYPE html>
    //       <html>
    //         <head>
    //           ${stylesHtml}
    //         </head>
    //         <body>
    //           <div >
    //             ${prtHtml}
    //           </div>
    //         </body>
    //       </html>`)
    //   WinPrint.document.close()
    //   WinPrint.focus()
    //   WinPrint.print()
    //   setTimeout(function () {
    //     WinPrint.close()
    //   }, 100)
    // },

    payOneDevice(id, summ, serviceName){
      this.service_show = true;
      console.log(id, summ, serviceName)
      var a = {
        serviceName: '',
        summ: 0,
        ServicePayId: null,
      }
      a.serviceName = serviceName;
      a.summ = summ;
      a.ServicePayId = id;
      this.serviceList_check = [];
      this.serviceList_check.push(a);
      this.service_list = a;
      console.log(this.service_list)
      this.ServiceSumma = summ;
      this.ServicName = serviceName;
      this.ServicePayId = id
    },
  }


}
</script>

<style lang="scss">
@font-face{
  font-family: "Ubuntu";
  src: url("../../font/Ubuntu/Ubuntu-Bold.ttf")
}

.paymentCheckPrint{
  font-weight: bold;
  font-family: 'Ubuntu';
}
.TablePatientDocId{
    height: 400px;
    overflow: hidden;
    overflow-y: auto;
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

.editIcon{
  color:#01b348;
  font-size: 13px;

}
.editIcon:hover{
color: #000;
}

.delIcon:hover{
color: #000;
}
.delIcon{color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>