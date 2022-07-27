<template>
  <div>
    <div class="text-center">
      <h3 class="text-primary">{{summa}}</h3>
      <mdb-input v-model="CashMoney" :label="$t('cash')" size="md" outline type="number" />
      <div class="custom-control custom-checkbox text-left ml-2 mb-3">
          <input type="checkbox" v-model="card"   class="custom-control-input" id="defaultUnchecked2">
          <label class="custom-control-label" for="defaultUnchecked2">CARD</label>
      </div>
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
      card: false,
      database: [],
    }
  },
  methods: {
    ...mapMutations([ 'Update_check_data', 'UpdatePay_debit']),
    async payDivece(){
        if( this.CashMoney == null){
            this.CashMoney = 0;
          }
        if(this.card == false){
          this.$store.state.cashPay_card = true;
        }
        else{
          this.$store.state.cashPay_card = false;
        }
        var a = [];
        a.push(this.option);
        // this.Update_check_data(a)
        const respon = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/payDolgByIdAndSumm?hospital_patient_dolg_id=' + this.patient + 
        '&dolg_summ=' + this.CashMoney + '&auth_id=' + localStorage.AuthId + '&card_status=' + this.card)
        const data = await respon.json()
        console.log('data')
        console.log(data)
        
        if(data.id){
          this.$emit('close');
          this.UpdatePay_debit({debit: this.option, pay: this.CashMoney, card: this.card, patient: this.patientName})
          this.CardMoney = null;
          this.CashMoney = null;
          this.ServicePayId = null;
          this.bbTulash = true;
        }
        else{
          this.$refs.message.error('Summa xato kiritilgan')
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
    },
    patientName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>