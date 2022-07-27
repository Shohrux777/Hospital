<template>
  <div >
    <div style="position: sticky; top: 0; position: -webkit-sticky;">
      <mdb-navbar style="background-color:#1565c0;" sticky="true" top="0" dark >
        <mdb-navbar-brand style="width: 17%;" class="text-center">
          <span  @click="home">
            Marketing
          </span>
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
          <mdb-navbar-nav>
            <!-- <mdb-nav-item class="px-2 " href="/users"  active>Регистрация</mdb-nav-item>
            <mdb-nav-item class="px-2" >Клиенты</mdb-nav-item>
            <mdb-nav-item class="px-2" >Хисобот</mdb-nav-item>
            <mdb-nav-item class="px-2" >Касса</mdb-nav-item> -->
            <!-- <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle tag="a" navLink style="background-color:#1565c0;" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item>Action</mdb-dropdown-item>
                <mdb-dropdown-item>Another action</mdb-dropdown-item>
                <mdb-dropdown-item>Something else here</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown> -->
          </mdb-navbar-nav>
          <form>
            <div class="mr-3"  @click="close = !close" style="position: relative; cursor: pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              <mdb-badge pill color="danger" style="font-size: 10px; position: absolute; top: -7px; left: 15px;">{{product_qty}}</mdb-badge>
            </div>
          </form>
        </mdb-navbar-toggler>
      </mdb-navbar>
    </div>
    <div v-if="close" class="d-flex justify-content-end shopping_card">
      <transition name="slide-fade">
        <div class="shop_item shop_main px-1">
          <div class="title d-flex justify-content-between align-items-center py-3 ml-2 border-bottom">
            <div class="d-flex align-items-center" @click="show = !show, close= !close">
              <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-shopping-cart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.3" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              <span style="font-size: 18px;" class="ml-2">Корзина</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" @click="close = !close" class="icon icon-tabler icon-tabler-x mb-1 mr-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.8" stroke="#6f32be" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div class="sell_shop py-3 text-right border-bottom ">
            <mdb-btn color="success mr-2" style="padding: 9px 30px;">Купить</mdb-btn>
            <mdb-btn @click="delAll" color="danger mr-2" style="padding: 9px 30px;">Все удалить</mdb-btn>
          </div>
          <h5 class="mt-3 pb-2 pl-2" >Всего товаров: {{product_qty}}</h5>
          <div class="product">
            <div v-for="(item,index) in zakaz_product_list" :key="index" class="product_item border-bottom d-flex align-items-center">
              <div class="qty">
                <div @click="upAdd(index)">
                  <mdb-icon  icon="caret-up" color="primary" style="font-size: 20px; position: absolute; top: -18px; left: 15px;"/>
                </div>
                <span>{{item.qty}}</span>
                <div @click="downMinus(index, item.qty)">
                  <mdb-icon icon="caret-down"  :class="{rang: item.qty==1, prima: item.qty!=1}" style="font-size: 20px; position: absolute; top: 18px; left: 15px;"/>
                </div>
              </div>
              <div class="image">
                 <img src="https://web.lebazar.uz/resources/product/2020/6/15/small_1594756545142_MG_5618-1.jpg" alt="" class="img-fluid">
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
          <div class="d-flex justify-content-center" @click="submit">
            <mdb-btn color="success mr-2 w-100"  style="padding: 9px 20px; font-family: 'Roboto' sans-serif;">Продолжить:  {{product_summ}} сумов </mdb-btn>
          </div>

          <div>
            <massage_box :hide="modal_status" :detail_info="modal_info"
            :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
          </div>
        
          <Toast ref="message"></Toast>
        </div>
      </transition>
    </div>
    <mdb-modal  :show="show"  @close="show = false" size="lg" light>
      <mdb-modal-header>
        <mdb-modal-title style="font-weight:  500;">{{$t('Корзина')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <korzinka />
      </mdb-modal-body>
    </mdb-modal>
  </div>
</template>
<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav,  mdbBadge, mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody    } from 'mdbvue';
  import {mapGetters, mapMutations} from 'vuex'
  import korzinka from '../components/market_add/korzinka.vue'
  export default {
    name: 'NavbarPage',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      korzinka,
      mdbBadge,
      mdbBtn,mdbIcon   
    },
    data(){
      return{
        modal_status: false,
        modal_info: '',
        show: false,

        close: false,
        qty: 4,
        orderProductList: [],
        time: new Date(Date.now())
      }
    },
    computed: {
      ...mapGetters(['zakaz_product_list', 'product_qty', 'product_summ']),
    },
    
    methods: {
      ...mapMutations(['up_add_product', 'down_minus_product','del_product_item', 'del_all_product']),
      home(){
        console.log('dsd')
        this.$router.push('/users')
      },  
      async submit(){
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
            "authorizationId": 0,
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
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },
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
      }
    }
  }
</script>
<style scoped>
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
.shopping_card{
  position: fixed;
  top:0; left:0; 
  width: 100%;
  height: 100vh;
  z-index:111;
  background-color: rgba(2, 2, 2,0.75);
}
.shopping_card .shop_item{
  width: 380px;
  height: 100vh;
  background: #fff;
}
.product{
  height: 520px;
  overflow: hidden;
  overflow-y: scroll;
}
.product_item{
  min-height: 75px;
  background: #fff;
}
.product_item .qty {
  width: 11%;
  /* background: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: white; */
  position: relative;
}
.product_item .image{
  width: 14%;
  background: blue;
}
.product_item .product_name{
  width: 67%;
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
  width: 8%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* background: blue; */
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.rang{
  color: rgb(194, 194, 194);
}
.prima{
  color: rgb(104, 104, 251);
}
</style>