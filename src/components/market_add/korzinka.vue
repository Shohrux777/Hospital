<template>
  <div>
    <div class="product text-dark">
      <div v-for="(item,index) in zakaz_product_list" :key="index" class="product_item border-bottom d-flex align-items-center">
        <div class="qty">
          <div class="d-flex">
            <div @click="upAdd(index)">
              <mdb-icon  icon="caret-up" color="primary" style="font-size: 20px; position: absolute; top: -18px; left: 19px;"/>
            </div>
            <span>{{item.qty}}</span>
            <div @click="downMinus(index, item.qty)">
              <mdb-icon icon="caret-down"  :class="{rang: item.qty==1, prima: item.qty!=1}" style="font-size: 20px; position: absolute; top: 18px; left: 19px;"/>
            </div>
          </div>
        </div>
        <div class="image my-2">
            <img :src="item.img" alt="" class="img-fluid responsive">
        </div>
        <div class="product_name ml-2">
          <h6 >{{item.name}} </h6>
          <span>{{item.price*item.qty}} ({{item.price}}сум. за 1 шт)</span>
        </div>
        <div class="product_del" @click="deleteItem(index)">
          <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;"
            class="icon icon-tabler icon-tabler-shopping-cart-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l7.999 .571m5.43 4.43l-.429 2.999h-13" />
            <path d="M17 3l4 4" />
            <path d="M21 3l-4 4" />
          </svg>
        </div>
      </div>
    </div>
    <div class="summa  mt-2  rounded border-bottom text-center" style="padding: 10px 0;">
      <h5 class="m-0 text-dark">Итого выбрано товаров на сумма:  <span class="ml-1" style="font-weight:550;">{{product_summ}} сум</span></h5>
    </div>
    <div class="d-flex justify-content-center mt-3 mb-3">
      <span class="ml-4 text-dark"><i class="fas fa-circle mr-1 text-danger"></i> Лимит : 40000</span>
      <span class="ml-4 text-dark"><i class="fas fa-circle mr-1 text-primary"></i> Выбрано товаров: {{product_summ}}  </span>
      <span class="ml-4 text-dark"><i class="fas fa-circle mr-1 text-success"></i> Остаток лимита: 90000  </span>
    </div>
    <div class="row mt-1">
      <div class="col-3"><mdb-btn class="py-1 " color="success" style="min-height:43px;" >перейти в меню </mdb-btn></div>
      <div class="col-3" @click="send_order"><mdb-btn class="py-1 " color="primary" style="min-height:43px;" >подтвердить заказ </mdb-btn></div>
      <div class="col-3"><mdb-btn class="py-1 " color="warning" style="min-height:43px;" >Внести пожелания </mdb-btn></div>
      <div class="col-3" @click="close"><mdb-btn class="py-1" style="min-height:43px;" color="danger">Отменить заказ </mdb-btn></div>
    </div>
    <mdb-modal  :show="show"  @close="show = false" size="md" light>
        <!-- <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Check')}}</mdb-modal-title>
        </mdb-modal-header> -->
        <mdb-modal-body>
          <checkComponent/>
        </mdb-modal-body>
      </mdb-modal>
  <Toast ref="message"></Toast>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import checkComponent from './receipt'
  import {mdbIcon, mdbBtn, mdbModal,  mdbModalBody, } from 'mdbvue'
export default {
  components: {
    mdbIcon, mdbBtn, mdbModal,  mdbModalBody,checkComponent
  },
  data(){
    return{
      show: false,
    }
  },
  computed: {
      ...mapGetters(['zakaz_product_list', 'product_qty', 'product_summ']),
    },
    methods: {
      ...mapMutations(['up_add_product', 'down_minus_product','del_product_item', 'del_all_product']),
      upAdd(i){
        console.log(i)
        this.up_add_product(i);
      },
      downMinus(i, qty){
        if(qty != 1){
          this.down_minus_product(i)
        }
      },
      deleteItem(i){
        this.del_product_item(i)
      },
      delAll(){
        this.del_all_product();
      },
      close(){
        this.$emit('close');
      },
      async send_order(){
        console.log(localStorage.AuthId)
        this.orderProductList = [];
        for(let j=0; j<this.zakaz_product_list.length; j++){
          var b = {
            marketProductId: 0,
            activeStatus: true,
            qty: 0,
            realQty: 0,
            summ: 0,
            discountSumm: 0,
            productName: '',
            productCode: '',
            productUnitMeasurmentName: '',
            productPrice: 0,
          }
          b.marketProductId = this.zakaz_product_list[j].id;
          b.qty = this.zakaz_product_list[j].qty;
          b.realQty = this.zakaz_product_list[j].qty;
          b.summ = this.zakaz_product_list[j].qty*this.zakaz_product_list[j].price;
          b.productName = this.zakaz_product_list[j].name;
          b.productCode = this.zakaz_product_list[j].code;
          b.productUnitMeasurmentName = 'kg';
          b.productPrice = this.zakaz_product_list[j].price;

          this.orderProductList.push(b);
        }
        console.log(this.orderProductList)


        const requestOptions = {
          method: "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "acceptedStatus": false,
            "rejectedStatus": false,
            // "createdDateTime": this.time.toLocaleString("es-CL"),
            // "updateDateTime": this.time.toLocaleString("es-CL"),
            // "acceptedDateTime": this.time.toLocaleString("es-CL"),
            "authorizationId": localStorage.AuthId,
            "userFullName": "Shohrux",
            "orderNumber": "1202",
            "statya": "ew",
            "part": "ew",
            "codeStr": "ew",
            "orderDeliveriedStatus": false,
            "activeStatus": true,
            "marketOrderDetails": this.orderProductList

          })
        };
        console.log(requestOptions.body)
          const response = await fetch(this.$store.state.hostname + "/MarketOrders", requestOptions);
          const data = await response.json();
          console.log(data)
          if(data.id)
          {
            this.$refs.message.success('Added_successfully')
            // this.del_all_product();
            this.show = true
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      }
    }

}
</script>

<style>
::-webkit-scrollbar {
            /* height of horizontal scrollbar ← You're missing this */
  width: 4.5px;   
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(152, 152, 152);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(71, 71, 71);
}
.product{
  height: 460px;
  overflow: hidden;
  overflow-y: scroll;
}
.product_item{
  min-height: 75px;
  background: #fff;
}
.product_item .qty {
  width: 6%;
  /* background: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}
.product_item .image{
  width: 12%;
  background: blue;
}
.product_item .product_name{
  width: 77%;
  /* background: blue; */
  
}
.product_item .product_name h6{
  text-overflow: ellipsis; 
  overflow: hidden; 
  white-space: nowrap;
  padding:0;
  margin: 0;
}
.product_item .product_name span{
  text-overflow: ellipsis; 
  overflow: hidden; 
  white-space: nowrap;
  font-size: 12px;
  color: rgb(39, 39, 39);
}
.product_item .product_del{
  width: 5%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* background: blue; */
}
.rang{
  color: rgb(194, 194, 194);
}
.prima{
  color: rgb(104, 104, 251);
}
</style>