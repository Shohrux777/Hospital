<template>
  <div class="medicineMin m-4 shadow">
    <div  class="bg-white p-2  mb-3 " style="border-radius:5px; position:relative;">
       <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center px-2 ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('Invoice table')}}</h5>
          </div>
          <div class="plus">
            <router-link to="/invoice_add/0">
              <mdb-btn tag="a" color="info py-2 px-4"   style="background-color: rgb(85, 172, 238); font-size:10px;">
                <mdb-icon  icon="plus" class="mr-2"></mdb-icon>{{$t('add')}}
              </mdb-btn>
            </router-link>
          </div>
        </div>
        <loader v-if="loading"/>
        <div v-else class="TablePatientDocId py-4 px-4">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th >{{$t('product_name')}}</th>
                <th >{{$t('price')}}</th>
                <th >{{$t('qty')}}</th>
                <th width="130">{{$t('Min')}}</th>
                <th width="120">{{$t('save')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in database" :key="rowIndex">
                <td>{{rowIndex+1}}</td>
                <td> <span >{{row.product.name}}</span> </td> 
                <td> <span >{{row.product.price}}</span> </td>
                <td> <span >{{row.qty}}</span> </td>
                <td> <div class="px-0">
                  <input style="height:23px; width:90%; border:1px solid #ddd font-size:11px;" class="m-0 p-0 px-2" v-model="row.minValue"  outline/>
                </div></td>
                <td> <span ><mdb-btn @click="addDrag(row, rowIndex)" class="px-3 py-1 m-0" style="font-size:10px;" color="success">{{$t('add')}}</mdb-btn></span> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { mdbBtn, mdbIcon} from 'mdbvue'
export default {
  data(){return{
    database: [],
    loading: false
  }},
  components:{
     mdbBtn, mdbIcon
  },
  computed: mapGetters(['get_drag_min_product_real_qty']),
  async mounted(){
    this.loading = true;
   await this.fetch_product_real_qty();
   this.database = this.get_drag_min_product_real_qty
    this.loading =false;
  },
  methods: {  
    ...mapActions(['fetch_product_real_qty']),
    async addDrag(option, i){
      console.log(option);
      const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "qty" : this.database[i].qty, 
            "realQty" : this.database[i].realQty,
            "marketProductId" : this.database[i].marketProductId,
            "minValue" : parseInt(this.database[i].minValue),
            "id" : this.database[i].id,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/MarketProductRealQties', requestOptions)
        const data = await response.json()
        console.log(data)
        this.loading = false;
        this.$refs.message.success('Added_successfully')
    }
  }
}
</script>

<style lang="scss">

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
</style>