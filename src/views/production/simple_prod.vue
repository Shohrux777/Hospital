<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">{{'menu_simple_prod'|locolize}}</p>
      <mdb-navbar-toggler>

        <mdb-navbar-nav right>
          <router-link to="/simple_prod_add/0">
            <mdb-btn color="success" m="r3" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{'add'|locolize}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>

      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3">
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
    erpTable,
    mdbBtn
  },

   data() {
      return {
        loading : true,
        user_id : 1,
        m_buy :{
          rows: [],
          columns: [],
           col : []
        },
      };
    },

    methods:
    {
      for_edit(edit_data)
      {
        this.$router.push("/simple_prod_add/" + edit_data.id);
      },
      async checklist (){
        this.loading = true;
           await this.fetchCategory_column(this.user_id)
        this.loading = false;
      },
       async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/invoice_simple_prod_column/' + this.user_id);
        const data = await res.json();
         this.m_buy.col = data;
        // console.log(data);
        this.m_buy.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      }
    },
     async mounted (){
        const res = await fetch(this.$store.state.hostname + '/simple_prod');
        const res_data = await res.json();
        await this.update_column();

        this.m_buy.rows = res_data;
        this.loading = false;
     },

};
</script>


<style scoped>
</style>
