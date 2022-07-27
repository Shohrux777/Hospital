<template >
  <div style="width: 270px; background:#fff; paymentCheckPrint" id="printForm">
    <div class="img" style="text-align:center;">
      <img id="image" width="100%" alt="">
    </div>
    <div   >
     <div  style="text-align:center; margin-bottom: 12px; padding: 0 10px"  >
        <a  style="font-weight: bold; font-size: 16px;" class="paymentCheckPrint">G'ULOMJON NEYRO SERVICE</a>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">STIR</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">302145331</span>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Sana</span>
        <p style="text-align:right;" class="paymentCheckPrint"><span style="font-size: 15.5px;" class="paymentCheckPrint">{{time}} <span style="margin-left:3px;">{{minut}}</span></span></p>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Savdo cheki</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">{{checkInfo.checkId}}</span>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px; border-bottom: 0.5px solid #000000; padding-bottom: 5px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">CH KKM</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">N500W495220</span>
     </div>
     <div style="display:flex; justify-content:space-between; padding: 0 0px; padding-top: 7px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Kassir:</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">{{casher}}</span>
     </div>
     <div style="display:flex; justify-content:space-between; padding: 0 0px;  border-bottom: 0.5px solid #000000; padding-bottom: 5px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Bemor:</span>
        <span  style="font-size: 17.5px; text-align:right;" class="paymentCheckPrint"><span>{{patientFio}}</span></span>
     </div>

     <div  style="padding: 7px 0; border-bottom: 0.5px solid #000000;">
       <div  style="display:flex; justify-content: space-between; padding: 0 0px;" v-for="(item, i) in get_check_print_list" :key="i">
          <span style="font-size: 18px;" class="paymentCheckPrint">{{i+1}}. {{item.serviceName}} (x{{item.qty}})</span>
          <span style="font-size: 17px;" class="paymentCheckPrint"> ={{item.summ*item.qty}}</span>
       </div>
     </div>
     
     <div  style="display:flex; justify-content: space-between; padding: 5px 0px 0 0px; ">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Hammasi(К оплате)</span>
        <span style="font-size: 17px;"   class="paymentCheckPrint">{{get_check_sum }}</span>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">To'landi(Оплачено)</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">{{parseInt(checkInfo.cash) + parseInt(checkInfo.card)}}</span>
     </div>
     <div  style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Naqd(Наличи)</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">{{checkInfo.cash}}</span>
     </div>
     <div style="display:flex; justify-content: space-between; padding: 0 0px 7px 0px;  border-bottom: 0.5px solid #000000;" >
        <span style="font-size: 15.5px;" class="paymentCheckPrint">Karta(Пластик)</span>
        <span style="font-size: 15.5px;" class="paymentCheckPrint">{{checkInfo.card}}</span>
     </div>

     <div style="display:flex; justify-content: space-between; padding: 0 0px;">
        <span  style="font-size:12px" class="paymentCheckPrint">QQS</span>
        <span  style="font-size:12px" class="paymentCheckPrint">0</span>
     </div>
     
     
     
    </div>
  </div>
</template>

<script>
//import Printjs from "print-js";
import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return {
      time: new Date(),
      casher: localStorage.docName,
      cash: null,
      allSumm: 0,
      numberOrder: 1,
      checklist: [],
      minut: '',
    }
  },
  async mounted(){
    this.minut = this.time.toISOString().slice(11, 19);
    this.time = this.time.toISOString().slice(0, 10);
    // this.casher = localStorage.docName;
     
  },
  created() {
    this.$root.$refs.check = this;
  },
  methods: {
    ...mapActions(['fetch_unpayed_patient']),
    async printed(){
      // await this.fetch_unpayed_patient();
       window.print()
      // Printjs({
      //  printable: "printForm", //Id to print content 
      //  type: "html",
      //  targetStyles: ['*'],
        // ignoreElements:['no-print','bc','gb']
      //});
      console.log('end')

      this.$router.back()
    }
  },

  
  props: {
    options:{
        type: Array,
        default(){
          return []
        }
      },
  },
  watch: {
    options(){
      this.allSumm = 0;
      this.allSumm = this.options.reduce((total, item) => {
          return total + item.summ
      }, 0)
    },
    // get_check_print_list(){
    //   this.checklist = [];
    //   var list = [];
    //   list = this.get_check_print_list
    //   console.log('list')
    //   console.log(list)
    //   for(let i=0; i<list.length; i++){
    //     var check = {  
    //       ServicePayId: null,
    //       serviceName: "",
    //       summ: 0,
    //       qty: 1,
    //     }
    //     check.ServicePayId = list[i].ServicePayId;
    //     check.serviceName = list[i].serviceName;
    //     check.summ = list[i].summ;

    //     for(let j=i+1; j<list.length; j++){
    //       if(list[i].ServicePayId == list[j].ServicePayId){
    //         check.qty += 1;
    //         list.splice(j, 1);
    //       }
    //     }
    //     this.checklist.push(check);
    //   }
    //   console.log('checklist')
    //   console.log(this.checklist)
    //   console.log(this.get_check_print_list)

    // }
  },
  computed: {
    ...mapGetters(['get_check_print_list', 'get_check_sum', 'debit_sum', 'checkInfo']),
    summa(){
      return this.$store.state.cashPay_card
    },
    patientFio(){
      return this.$store.state.patient_name_for_cash
    }
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
span, th, td, a, p{
 font-weight: bold;
 font-family: 'Ubuntu';
}

</style>