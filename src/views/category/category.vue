<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <p class="navbar_brand ml-4">{{$t('category')}}</p>
      <mdb-navbar-toggler>

        <mdb-navbar-nav right>
          <router-link to="/category_add/0">
            <mdb-btn color="info" m="r3" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>

      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3 shadow" style="border-radius: 7px;" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="categoryGetList"
        @for_delete="for_delete"
        @for_edit="for_edit"
        @update_column="checklist"
      />
    </div>
  </div>


  <massage_box :hide="modal_status" :detail_info="modal_info"
    :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
    <!-- <alert
      :bool="alert_success"
      @changeBool="alert_success=false"
      color="success"
      icon = "check"
      :text="alert_text"
    ></alert>

    <alert
      :bool="alert_danger"
      @changeBool="alert_danger = false"
      color="danger"
      icon = "exclamation-circle"
      :text="alert_text"
    ></alert> -->
 </div>
</template>


<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import erpTable from "../../components/erpTable"

import {
  mdbNavbar,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn,

} from "mdbvue";
// import locolizeFilter from '../../filters/localize.filter'

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
    computed: mapGetters(['categoryGetList']),
    methods:
    {
      ...mapActions(['fetchCategoryAll','fetchCategory_column']),
      ...mapMutations(['category_delete_row']),
      async checklist (){
        this.loading = true;
           await this.fetchCategory_column(this.user_id)
        this.loading = false;
      },
      for_edit(edit_data)
      {
        this.$router.push("/category_add/" + edit_data.id);
      },

      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/category/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data.res)
          {
            // this.alert_text = locolizeFilter('Successfully_removed');
            this.alert_success = true;
            this.category_delete_row(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
    },
     async mounted (){
        await this.fetchCategoryAll();
        // await this.fetchCategory_column(this.user_id);
        this.loading = false;
     },

};
</script>


<style scoped>
</style>
