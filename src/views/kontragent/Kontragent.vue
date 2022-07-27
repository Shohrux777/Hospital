<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <p class="navbar_brand">{{$t('List_of_company')}}</p>
      <mdb-navbar-toggler>

        <mdb-navbar-nav right>
          <router-link to="/kontragent_add/0">
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
        :datasource="allKontragents"
        @for_delete="for_delete"
        @for_edit="for_edit"
        @update_column="checklist"
      />
    </div>
  </div>


    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

      <Toast ref="message"></Toast>

 </div>
</template>


<script>
import {mapGetters,mapActions, mapMutations} from 'vuex'
import erpTable from "../../components/erpTable"
import {
  mdbNavbar,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn
} from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

export default {
  name: "xarakteristika",
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
        modal_info : '',
        modal_status: false,

        loading : true,
        user_id : 1,

      };
    },
    computed: mapGetters(['allKontragents']),
    methods:
    {
      ...mapActions(['fetchKontragets']),
      ...mapMutations(['kontragent_row_delete']),

      async checklist (){
        this.loading = true;
          await this.fetchKontragent_column(this.user_id);
        this.loading = false;
      },

       for_edit(edit_data)
      {
        this.$router.push("/kontragent_add/" + edit_data.id);
      },

       async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/Companies/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Successfully_removed')
            this.kontragent_row_delete(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

      },
    },
     async mounted (){
        await this.fetchKontragets({ hostname: this.$store.state.hostname});
        //  await this.fetchKontragent_column(this.user_id);
        this.loading = false;
     },
};
</script>


<style>
</style>
