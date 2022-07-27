<template>
  <div>
    <div class="text-center">
      <h3 class="text-primary">{{option.serviceName}}: {{option.summ}}</h3>
      <mdb-input v-model="CashMoney" :label="$t('cash')" size="md" outline type="number" />
      <mdb-input v-model="CardMoney" :label="$t('card')" size="md" outline type="number" />
    </div>
    <div class="text-right">
      <div @click="payDivece()">
        <mdb-btn color="success"  p="r4 l4 t2 b2" style="font-size:10px;">{{$t('pay')}} </mdb-btn>  
      </div>
    </div>
    <Toast ref="message"></Toast>
    <!-- <div id="print" v-show="false"> 
      <PrintCompanent />
    </div> -->
  </div>
</template>

<script>
import {mdbBtn, mdbInput} from 'mdbvue'
import {mapMutations} from 'vuex'
// import PrintCompanent from './check'

export default {
  components: {
    mdbBtn,mdbInput
  },
  data(){
    return{
      CashMoney: null,
      CardMoney: null,
      database: [],
    }
  },
  methods: {
    ...mapMutations([ 'Update_check_data', 'updateDebit', 'UpdatecheckInfo']),
    async payDivece(){
        if( this.CashMoney == null){
            this.CashMoney = 0;
          }
        if( this.CardMoney == null){
          this.CardMoney = 0;
        }
        if(this.CardMoney == 0){
          this.$store.state.cashPay_card = true;
        }
        else{
          this.$store.state.cashPay_card = false;
        }
        var a = [];
        a.push(this.option);
        this.Update_check_data(a)
        const respon = await fetch(this.$store.state.hostname + '/Payments/payPaymentOneDividedAsCashAndCardFullPaymentOnly?paymentId=' + this.option.ServicePayId + 
        '&cashSumm=' + this.CashMoney + '&cardSumm=' + this.CardMoney)
        const data = await respon.json()
        console.log('nima bor ekan')
        console.log(data)
        
        if(data.finishPayment == true){
          this.UpdatecheckInfo({check:data.patientsId, cash: this.CashMoney, card: this.CardMoney})
          var sumdebits = 0;
          this.updateDebit(sumdebits)
          this.$emit('close');
          this.CardMoney = null;
          this.CashMoney = null;
          this.ServicePayId = null;
          this.bbTulash = true;
        }
        else{
          this.$refs.message.error('deffirent_sum')
        }
    },
    
    
  },
  props:{
    option: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style>

</style>