<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">{{'menu_leftovers'|locolize}}</p>
      <mdb-navbar-toggler>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3" >
    <div v-if="filter">
        <filters :db_data = "db_data" :sklad_bool="true" :category_bool="true"
        :product_bool="true" :color_bool="true"
        @apply="filter_apply"
        />
      </div>
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="m_sklad"
        @update_column="update_column"
        @clicked_filter="filter=!filter"
      />
    </div>
  </div>
 </div>
</template>


<script>
import erpTable from "../../components/erpTable"
import filters from "../../components/small/filters"
import {
  mdbNavbar,
  mdbNavbarToggler

} from "mdbvue";

export default {
  components: {
    mdbNavbar,filters,
    mdbNavbarToggler,
    erpTable
  },
   data() {
      return {
        loading : true,
        filter : false,
        m_sklad :{ rows: [], columns: [], col : [] },
        user_id : 1,
        filter_data : '',

        db_data : {
          sCategory : "ct.id",
          company : "",
          dept : "",
          sklad : "sk.id",
          color : "i.color_id",
          product : "i.product_id",
        }
      };
    },
    methods:
    {
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/leftovers_column/' + this.user_id);
        const data = await res.json();
         this.m_sklad.col = data;
        // console.log(data);
        this.m_sklad.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
       async filter_apply(filter_data)
        {

          this.loading = true;
          this.filter_data = filter_data;
          const res = await fetch(this.$store.state.hostname + '/leftovers?filter=' + this.filter_data);
          const res_data = await res.json();
          this.m_sklad.rows = res_data;
          this.loading = false;
        },
    },

    async mounted(){

      {//  table
        const res = await fetch(this.$store.state.hostname + '/leftovers?filter=');
        const res_data = await res.json();
        await this.update_column();

        this.m_sklad.rows = res_data;
        this.loading = false;
      // end table
      }
    }
};
</script>



<style scoped>
</style>
