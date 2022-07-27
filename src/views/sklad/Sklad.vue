<template>
 <div >
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <p class="navbar_brand ml-4">{{$t('menu_warehouse')}}</p>
      <mdb-navbar-toggler>

        <mdb-navbar-nav right>
          <router-link to="/sklad_add/0">
            <mdb-btn color="info" m="r3" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>

      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3">
    <loader v-if="loading"/>
    <div v-else>
      <erpTable :datasource="min_sklad" @for_delete="for_delete" @for_edit="for_edit"
        @update_column="update_column"/>
    </div>
  </div>

  <div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
    :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
    
      <Toast ref="message"></Toast>

  </div>

 </div>
</template>


<script>
import erpTable from "../../components/erpTable"
import {mapActions,mapGetters,mapMutations} from "vuex"

import {
  mdbNavbar,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn
} from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

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
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,

        loading : true,
        m_sklad : {
          rows: [],
          columns: [],
          col:[]
        },
        user_id : 1,
      };
    },
    computed : mapGetters(['min_sklad']),
    methods:
    {
      ...mapMutations(['sklad_row_delete']),
      ...mapActions(['fetchSklads']),
      for_edit(edit_data)
      {
        this.$router.push("/sklad_add/" + edit_data.id);
      },

      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ErpWarehouses/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data.id)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Successfully_removed')
            this.sklad_row_delete(index)
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

      },
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/sklad_column/' + this.user_id);
        const data = await res.json();
         this.m_sklad.col = data;
        // console.log(data);
        this.m_sklad.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
      async update_rows()
      {
          const res = await fetch(this.$store.state.hostname + '/sklad');
          const res_data = await res.json();
          this.m_sklad.rows = res_data;
      },
    },

    async mounted(){
      {
      //  table

        await this.fetchSklads()
        this.loading = false;
        if(this.$store.state.alert == true){
          this.$refs.message.success('Added_successfully')
          this.$store.state.alert = false
        }


      // end table
      }
    }
};
</script>


<style scoped>

</style>
