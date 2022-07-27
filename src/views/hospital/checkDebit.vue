<template >
  <div class="bg-white" style="width: 400px;">
    <div class="checker border" >
     <div class="header_title text-center mb-2 px-4">
        <a class="title_size">ЧП "GIJDUVON DIAGNOSTIKA MASKANI" GIJDUVON DIAGNOSTIKA MASKANI Алпомиш кучаси</a>
     </div>
     <div class="d-flex justify-content-between px-2">
        <span class="check_size">Ro'y. olingan sana</span>
        <span class="check_size">{{pay_debit.date}}</span>
     </div>
     <div class="d-flex justify-content-between px-2">
        <span class="check_size">INN</span>
        <span class="check_size">303043030</span>
     </div>
     <div class="d-flex justify-content-between px-2 pb-2 border-bottom">
        <span class="check_size">CH KKM</span>
        <span class="check_size">N500W495220</span>
     </div>
     <div class="d-flex justify-content-between px-2 pt-2">
        <span class="check_size">Kassir</span>
        <span class="check_size">{{casher}}</span>
     </div>
     <div class="d-flex justify-content-between px-2">
        <span class="check_size">Bemor</span>
        <span class="check_size">{{pay_debit.patient}}</span>
     </div>
     <div class="d-flex justify-content-between px-2">
        <span class="check_size">Smena</span>
        <span class="check_size">№205</span>
     </div>
     <div class="d-flex justify-content-between px-2 pb-2 border-bottom">
        <span class="check_size">Chek turi</span>
        <span class="check_size">Savdo</span>
     </div>

     
     <div class="d-flex justify-content-between px-2 pt-2">
        <span class="check_size">Hammasi(К оплате)</span>
        <span class="summ_size">{{pay_debit.debit }}</span>
     </div>
     <div class="d-flex justify-content-between px-2">
        <span class="check_size">To'landi(Оплачено)</span>
        <span class="check_size">{{pay_debit.pay}}</span>
     </div>
     <div v-if="!pay_debit.card" class="d-flex justify-content-between border-bottom px-2">
        <span class="check_size">Naqd(Наличи)</span>
        <span class="check_size">{{pay_debit.pay}}</span>
     </div>
     <div v-else class="d-flex justify-content-between px-2 pb-2 border-bottom">
        <span class="check_size">Karta(Пластик)</span>
        <span class="check_size">{{pay_debit.pay}}</span>
     </div>
     <div  class="d-flex justify-content-between px-2 pt-2">
        <span class="check_size">Chek raqami:</span>
        <span class="summ_size">№ {{numberOrder}}</span>
     </div>
     <div  class="d-flex justify-content-between px-2 pt-1">
        <span class="check_size">UID:</span>
        <span class="check_size">1089192671631164981063</span>
     </div>
     <div  class="d-flex justify-content-between px-2 pt-1">
        <span class="check_size">ФМ:</span>
        <span class="check_size">UZ201020093236</span>
     </div>
     <div  class="d-flex justify-content-between px-2 pt-1">
        <span class="check_size">ФП:</span>
        <span class="check_size">004432870054</span>
     </div>
     
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      time: new Date(),
      casher: localStorage.docName,
      cash: null,
      allSumm: 0,
      numberOrder: 1,
      checklist: [],
    }
  },
  async mounted(){
    this.time = this.time.toISOString().slice(0, 10);
    this.casher = localStorage.docName;
     
  },
  created() {
    this.$root.$refs.checkDebit = this;
  },
  methods: {
    async printed(){
      await window.print()
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
    ...mapGetters(['get_check_print_list', 'get_check_sum', 'debit_sum', 'pay_debit']),
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
.checker {

  .title_size{
    font-size: 18.5px;
  }
  .check_size{
    font-size: 18px;
  }
  .summ_size{
    font-size: 22px;
  }
}
</style>