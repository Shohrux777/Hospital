<template>
  <div>
    <div class="text-center">
      <h2 class="text-primary">{{summa}}</h2>
      <mdb-input v-model="CashMoney" :label="$t('cash')" size="md" outline type="number" />
      <mdb-input v-model="CardMoney" :label="$t('card')" size="md" outline type="number" />
      <mdb-input v-model="DebitMoney" :label="$t('debit')" size="md" outline type="number" />
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
import {mapMutations, mapActions} from 'vuex'
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
      DebitMoney: null,
    }
  },
  methods: {
    ...mapMutations([ 'Update_check_data', 'updateDebit', 'UpdatecheckInfo']),
    ...mapActions(['fetch_unpayed_patient']),
    async payDivece(){
        if( this.CashMoney == null){
            this.CashMoney = 0;
          }
        if( this.CardMoney == null){
          this.CardMoney = 0;
        }
        if( this.DebitMoney == null){
            this.DebitMoney = 0;
          }
        if(this.CardMoney == 0){
          this.$store.state.cashPay_card = true;
        }
        else{
          this.$store.state.cashPay_card = false;
        }
        var checkSum = 0;
        checkSum = parseInt(this.CashMoney) + parseInt(this.CardMoney) + parseInt(this.DebitMoney);
        console.log(checkSum)
        console.log(this.option)
        if(checkSum != this.option || checkSum == 0){
          this.$refs.message.error('deffirent_sum')
        }
        else{
          const respon = await fetch(this.$store.state.hostname + '/Payments/payPaymentsAllCardAndCashAndDolg?PatientId=' + this.patient + '&card_summ=' + this.CardMoney + '&cash_sum=' + this.CashMoney + '&dolg_sum=' + this.DebitMoney)
          const data = await respon.json()
          console.log('shuni kur')
          console.log(data)
          
          if(data[0].id){
            this.UpdatecheckInfo({check:data[0].patientsId, cash: this.CashMoney, card: this.CardMoney})
            this.updateDebit(this.DebitMoney)
            this.CardMoney = 0;
            this.CashMoney = 0;
            this.ServicePayId = 0;
            await this.fetch_unpayed_patient();
            this.$emit('close');
          }
          else{
            this.$refs.message.error('deffirent_sum')
          }
        }
        
    },
    
    
  },
  props:{
    option: {
      type: Number,
      default: 0
    },
    patient: {
      type: Number,
      default: null
    },
    summa: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>