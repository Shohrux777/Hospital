<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">{{$t('List_of_invoices')}}</p>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>

          <router-link to="/buy_add/0">
            <mdb-btn color="success" m="r3" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>

        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
      :datasource="get_buy_list"
      @for_edit="for_edit"
      @update_column="update_column"
    />
    </div>

  </div>
    <Toast ref="message"></Toast>



 </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
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
    erpTable,mdbIcon,
    mdbBtn,

  },
   data() {
      return {
        loading : true,
        user_id : 1,
      };
    },
    computed: mapGetters(['get_buy_list']),
    methods:
    {
      ...mapActions(['fetch_buy_list']),
      for_edit(edit_data)
      {
        this.$router.push("/buy_add/" + edit_data.id);
      },
      // async update_column()
      // {
      //   const res = await fetch(this.$store.state.hostname + '/invoice_buy_column/' + this.user_id);
      //   const data = await res.json();
      //    this.m_buy.col = data;
      //   // console.log(data);
      //   this.m_buy.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      // }
    },

    async mounted(){
          if(this.$store.state.alert == true) {
                this.$refs.message.success('Added_successfully')
                this.$store.state.alert = false
              }
          await this.fetch_buy_list();
          this.loading = false;
    }
};
</script>


<style scoped>
</style>
