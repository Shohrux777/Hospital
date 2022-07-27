<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">Счет-Фактура Продажи</p>

      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <router-link to="/order_add/0">
          <mdb-btn color="success" m="r3"
          p="r4 l4 t2 b2"
          :action="true">
          <mdb-icon icon="plus" class="mr-2"/>Добавить</mdb-btn>
          </router-link>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card p-5">
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
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn,
} from "mdbvue";

export default {

  components: {
    mdbNavbar,
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
      };
    },
    methods:
    {
      for_edit(edit_data)
      {
        this.$router.push("/order_add/" + edit_data.id);
      },
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/invoice_sale_column/' + this.user_id);
        const data = await res.json();
         this.m_buy.col = data;
        // console.log(data);
        this.m_buy.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      }
    },
    async mounted(){

      {//  table
        const res = await fetch(this.$store.state.hostname + '/sale');
        const res_data = await res.json();
        await this.update_column();

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
