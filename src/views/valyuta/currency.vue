<template>
<div>
   <!--Navbar-->
      <!-- <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
        <router-link to="/products">
          <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
        </router-link>
        <mdb-card-title class="font-weight-bold pt-2"
          >{{$t('Currency')}}</mdb-card-title>
      </mdb-navbar> -->
      <!--/.Navbar-->
      
  <div class="currency card p-4 m-4 shadow ">
    <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">Валюты</h5>
          </div>
          
        </div>
    <loader v-if="loading"/>
       <div v-else class="d_table">
          <table class="myTable">
                    <thead>
                    <tr class="header">
                        <th   v-for="column in menu_kurs" :key="column">{{column}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,rowIndex) in CurrencyList" :key="rowIndex">
                        <td>{{rowIndex+1}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.nominal}}</td>
                        <td>{{row.forbuy}}</td>
                        <td>{{row.forsale}}</td>
                        <td>{{row.currentDateTime.slice(0,10)}}</td>
                        <td :class="{'colorDateClass': Colordate}">{{row.currentDateTime.slice(11,19)}}</td>
                        <td>
                          <div class="" v-show="row.difference > 0">
                            <mdb-badge  style="padding: 2.1px 8px; font-size:10.5px;" pill color="success">
                              {{row.difference}}
                              <i class="fa fa-long-arrow-alt-up text-white" style="font-size:10px; margin-left:2px;"></i>
                            </mdb-badge>
                          </div>
                          <div class="" v-show="row.difference < 0">
                            <mdb-badge  pill color="danger" style="padding: 2.1px 8px; font-size:10.5px;" >
                              {{row.difference}}
                             <i class="fa fa-long-arrow-alt-down ml-1 text-white" style="font-size:10px; margin-left:2px;"></i>
                            </mdb-badge>
                          </div>
                        </td>
                    </tr>
  
                    </tbody>
          </table>
          <!-- <i class="material-icons" v-on:click="addRow">add_circle</i> -->
      </div>
      <div class="update m-0 p-0 mt-2">
        <button class="btn btn-primary py-2 mt-3" style="font-size:10px;" @click="update">Update</button>
      </div>
      <Toast ref="message"></Toast>
      
  </div>
  <div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
    :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
  </div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { mdbBadge, } from 'mdbvue';
// import axios from 'axios'
export default {
  data () {
    return {
      loading : false,
      menu_kurs:['Id', 'Наименование Валюты', 'Номинал','Банк Покупка','Банк Продажа','Дата','Время','Разница'],
      currency : [],
      currentList: [],
      modal_info : '',
      modal_status: false,
      Colordate: false,
      time1: new Date(Date.now()),
    }
  },
  components:{
    mdbBadge,  },
  async mounted () {
    //  this.update()
    await this.fetchCurrency()
    this.loading = false
  },
  computed:mapGetters(['CurrencyList']),
  methods: {
    ...mapActions(['fetchCurrency']),

    async update(){
      this.loading = true;
      const res = await fetch('https://cbu.uz/common/json/');
      const posts = await res.json();
      this.currency = posts.slice(0, 4);
      
      console.log(this.currency)
      this.currentList = [];
      for(let i=0; i< this.currency.length; i++){
          // a = this.currency[i].Date;
          const requestOptions = {
          method: "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "name" : this.currency[i].Ccy,
            "nominal" : this.currency[i].Nominal,
            "forbuy" : this.currency[i].Rate,
            "forsale" : this.currency[i].Rate,
            "currentDateTime" : this.time1,
            "difference" : this.currency[i].Diff
          })
        };
        const response = await fetch(this.$store.state.hostname + "/ErpCurrencies", requestOptions);
        const data = await response.json();
        
        console.log(data)
        console.log(data.res)
        this.currentList = data;
      }
      
      if(this.currentList.name)
      {
        this.Colordate = true;
        await this.fetchCurrency()
        this.$refs.message.info('updateCurrencySuccess')
        this.loading = false
        setInterval(() => {
          this.Colordate = false;
        }, 5000);
        return true;
      }
      else{
        this.modal_info = this.currentList.detail + "    (" + this.currentList.routine + ")";
        this.modal_status = true;
        return false;
      }
      

    }
  }
}
</script>

<style  >
.d_table{
  position: relative;
}

.myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  /* // border: 1px solid #ddd; */
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12.5px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 12px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  /* // background-color: #f1f1f1; */
}

.editIcon{
  color:#01b348;

}
.editIcon:hover{
color: #000;
}

.delIcon:hover{
color: #000;
}
.delIcon{color: red;}
.update{
  text-align:right;
  margin-top: 50px;
}
/* .active{
  background: cyan;
} */
.colorDateClass{
  color:rgb(0, 7, 145);
  font-weight: 550;
  /* animation: example 5s ease;  */
  /* animation-duration: 5s; */
}
/* @keyframes example {
  0%   {opacity: 0;}
  25%  {opacity: 1;}
  50%  {opacity: 0;}
  100% {opacity: 1;
  color: black;
  font-weight: 450;
  }
} */

</style>
