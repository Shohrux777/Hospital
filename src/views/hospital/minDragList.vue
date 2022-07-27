<template>
  <div class="medicineMin  ">
     <loader v-if="loading"/>
    <div class="bg-white " style="border-radius:5px; position:relative;">
       <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('Last_info_medicine')}}</h5>
          </div>
        </div>
        <div class="TablePatientDocId MyTableList  py-4 px-4">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th >{{$t('product_name')}}</th>
                <th >{{$t('price')}}</th>
                <th >{{$t('qty')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_min_drag_list_for_admin" :key="rowIndex">
                <td> <span >{{row.product.name}}</span> </td> 
                <td> <span >{{row.product.price}}</span> </td>
                <td> <span >{{row.qty}}</span> </td>
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
export default {
  data(){return{
    loading: false
  }},
  computed: mapGetters(['get_min_drag_list_for_admin']),
  async mounted(){
   await this.fetch_min_drag_list();
  },
  methods: {  
    ...mapActions(['fetch_min_drag_list']),
  }
}
</script>

<style lang="scss">
.MyTableList{
  max-height: 400px;
  overflow: hidden;
  overflow-y: auto;
}
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