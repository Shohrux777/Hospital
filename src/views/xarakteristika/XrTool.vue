<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)"  light position="top" scrolling>
      <p class="navbar_brand ml-4">{{$t('menu_xr_tool_full')}}</p>
      <mdb-navbar-toggler>

        <mdb-navbar-nav right>
          <router-link to="/xr_tool_add/0">
            <mdb-btn color="info" m="r3" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>

      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="allXr_tool"
        @for_delete="for_delete"
        @for_edit="for_edit"
        @update_column="checklist"
      />
    </div>
  </div>



  <massage_box :hide="modal_status" :detail_info="modal_info"
    :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
 </div>
</template>


<script>
import {mapActions,mapGetters,mapMutations} from 'vuex'
import erpTable from '../../components/erpTable.vue';

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
        user_id : 1,
      };
    },
    methods:
    {
       ...mapActions(['fetchXr_tool','fetchXr_tool_column']),
       ...mapMutations(['xrTool_delete_row']),
       for_edit(edit_data)
      {
        this.$router.push("/xr_tool_add/" + edit_data.id);
      },
      async checklist (){
        this.loading = true;
           await this.fetchXr_tool_column(this.user_id)
        this.loading = false;
      },

      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ErpCharacteristicsDetails/" + del_data.id, requestOptions);
          const data = await response.json();
          console.log(data)
          if(data.name)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Successfully_removed')
            this.xrTool_delete_row(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

      },

    },
    computed:mapGetters(['allXr_tool']),

    async mounted()
    {
      await this.fetchXr_tool();
      // await this.fetchXr_tool_column(this.user_id)

      this.loading = false;
    }
};
</script>




<style scoped>
</style>
