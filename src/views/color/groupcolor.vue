<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <p class="navbar_brand ml-4">{{$t('menu_color_group')}}</p>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <router-link to="/groupcolor_add/0">
          <mdb-btn color="info" m="r3"
          p="r4 l4 t2 b2"
          :action="true">
          <mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card pb-5 pr-5 pl-5 pt-3" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="colorGroupList"
        @for_delete="for_delete"
        @for_edit="for_edit"
        @update_column="update_column"
      />
    </div>
  </div>


  <massage_box :hide="modal_status" :detail_info="modal_info"
    :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

    <Toast ref="message"></Toast>
 </div>
</template>


<script>
import erpTable from "../../components/erpTable"
import {mapGetters,mapActions,mapMutations} from 'vuex'

// import localizeFilter from '../../filters/localize.filter';
import {
  mdbNavbar,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn
} from "mdbvue";

export default {
  name: "gustota",
  components: {
    mdbNavbar,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbIcon,
    mdbBtn,erpTable
  },
   data() {
      return {
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        user_id : 1,

        loading : true,
        m_color :{
          rows: [],
          columns: [],
          col : []
        },
      };
    },
    computed: mapGetters(['colorGroupList']),
    methods :
    {
      ...mapActions(['fetchColorGroup',]),
      ...mapMutations(['color_group_delete_row']),
       async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ErpColorGroups/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Successfully_removed')
            this.color_group_delete_row(index)
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

      },
      for_edit(edit_data)
      {
        this.$router.push("/groupcolor_add/" + edit_data.id);
      },
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/guscolor_column/' + this.user_id);
        const data = await res.json();
         this.m_color.col = data;
        // console.log(data);
        this.m_color.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
      async update_rows()
      {
           const res = await fetch(this.$store.state.hostname + '/guscolor');
           const res_data = await res.json();
           this.m_color.rows = res_data;
      },
    },

    async mounted(){

      {
        this.fetchColorGroup();
        // await this.update_column();
        // await this.update_rows();
        this.loading = false;
      }
    }
};
</script>


<style scoped>
</style>
