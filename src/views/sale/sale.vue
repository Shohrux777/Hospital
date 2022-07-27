<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">Счет-Фактура Продажи</p>

      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <router-link to="/sale_add/0">
          <mdb-btn color="success" m="r3"
          p="r4 l4 t2 b2"
          :action="true">
          <mdb-icon icon="plus" class="mr-2"/>Добавить</mdb-btn>
          </router-link>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card p-5" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="m_buy"
        @for_edit="for_edit"
        @update_column="update_column"
      />
    </div>
  </div>
 </div>
</template>

<script>
import erpTable from "../../components/erpTable"
import {
  mdbNavbar,
  // mdbNavbarBrand,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn,
} from "mdbvue";

export default {
  name: "AdminTemplate",
  components: {
    mdbNavbar,
    // mdbNavbarBrand,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbIcon,
    mdbBtn,erpTable

  },
   data() {
      return {
        loading : true,
        m_buy :{
          rows: [],
          columns: [],
          col : []
        },
        user_id : 1,
        invType : [],
      };
    },
    methods:
    {
      for_edit(edit_data)
      {
        this.$router.push("/sale_add/" + edit_data.id);
      },
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/ErpColumnConfigs/getColumnListByAuthIdAndTableName?AuthId='
        + this.user_id + '&tableName=order');
        const data = await res.json();
        this.m_buy.col = data;
        
        console.log(this.m_buy.col);
        
        
        this.m_buy.columns = JSON.parse(data.columnListJson).filter(obj => {return obj.status === true}).map(({name}) => name);
      }
    },
    async mounted(){
      {//  table
       
        const res2 = await fetch(this.$store.state.hostname + '/ErpInvoiceTypes/getSaleInvoiceType');
        this.invType = await res2.json();
        
        const res = await fetch(this.$store.state.hostname + '/ErpInvoices/getInvoiceByInvoiceTypeId?InvoiceTypeId=' + this.invType.id);
        const res_data = await res.json();
         
        await this.update_column();
        
        console.log('inv type = ' + this.invType.id)
        this.m_buy.rows = res_data;
        this.loading = false;
      // end table
      }
    },

};
</script>




<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"); */
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}


@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
