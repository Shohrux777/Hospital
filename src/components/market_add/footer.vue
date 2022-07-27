<template>
  <!-- Footer -->
  <div class="font-small  footer_PT  py-2 text-white">
    <mdb-container class="text-left m-0" fluid>
      <mdb-row>
        <mdb-col sm="6">
          <div class="d-flex align-items-center">
            <div class="icon ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" class="icon icon-tabler icon-tabler-shopping-cart" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.1" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            </div>
            <div class="order_info ml-3 mt-1">
              <span style="font-size:13.5px; font-family: 'Montserrat', sans-serif; " class="mb-2">Колечиство товаров: {{product_qty}}</span>
              <p style="font-size:13.5px; font-family: 'Montserrat', sans-serif;  " class="m-0 p-0">Общий сумма вебранных товаров: {{product_summ}} сум</p>
            </div>
          </div>
        </mdb-col>
        <mdb-col sm="6" class="pl-5 border-left">
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <span style="font-size:13.5px; font-family: 'Montserrat', sans-serif; " class="mb-1 mt-1">Лимит : 820000 сум </span>
              <span  style="font-size:11px;">Объект: 1/ЗИДО</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span style="font-size:13.5px; font-family: 'Montserrat', sans-serif; " class="">Остатик лимита: 120000 сум </span>
              <span style="font-size:11px;">Код: 486486 Ст: 168</span>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
     <ModalKorzinka  title="Korzinka" :show="show" @close="show = false" width="920px">
        <template v-slot:body>
          <korzinka @close="show = false" />
        </template>
      </ModalKorzinka>
  </div>
  <!-- Footer -->
</template>

<script>
  import ModalKorzinka from '../modal'
  import korzinka from '../market_add/korzinka'
  import {  mdbContainer, mdbRow, mdbCol } from 'mdbvue';
  import {mapGetters} from 'vuex'
  export default {

    components: {
      ModalKorzinka,korzinka,
      mdbContainer,
      mdbRow,
      mdbCol
    },
    data(){
      return{
        show: false,
       }
    },
    computed: mapGetters(['product_qty', 'product_summ'])
  }
</script>

<style lang="scss">
  .footer_PT{
    position: sticky;
    width: 100%;
    bottom: 0;
    background-color: rgb(35, 32, 32);
    // height: 5vh;
    margin: 0;
  }
</style>