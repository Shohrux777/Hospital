<template>
 <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <p class="navbar_brand ml-4">{{$t('menu_product')}}</p>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <router-link to="/product_add/0">
          <mdb-btn color="info" m="r3"
          p="r4 l4 t2 b2"
          :action="true">
          <mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->

  <div class="card shadow pb-5 pr-5 pl-5 pt-3" style="border-radius: 7px;" >
    <loader v-if="loading"/>
    <div v-else>
      <erpTable
        :datasource="productList"
        @for_delete="for_delete"
        @for_edit="for_edit"
        @update_column="update_column"
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
    <Toast ref="message"></Toast>
 </div>
</template>


<script>
import erpTable from "../../components/erpTable"
import {mapActions,mapGetters, mapMutations} from 'vuex'
import {
  mdbNavbar,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbBtn
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
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        
        loading : true,
        m_product :{
          rows: [{
            Games: 'lobby',
            Lobby: 'uzmoovi',
            Lobbysd:'daxshat',
            fsdsfsd: 'dsds'
          },
          {
            Games: 'info',
            Lobby: 'dhghgh',
            Lobbysd:'fsd',
            fsdsfsd: 'dsds'
          },{
            Games: 'test',
            Lobby: 'ddasdasd',
            Lobbysd:'dsdsdsd',
            fsdsfsd: 'dsds'
          }],
          columns: ['Games','Lobby','Lobbysd','fsdsfsd'],
          col : []
        },
        user_id : 1,

      };
    },
    computed:mapGetters(['productList']),
    methods:
    {
      ...mapActions(['fetchproductAll']),
      ...mapMutations(['product_delete_row']),
      async for_delete(del_data,index)
      {
          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ErpProducts/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
           console.log(data) 
            this.$refs.message.error('Successfully_removed')
            this.product_delete_row(index)
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }

      },
      for_edit(edit_data)
      {
        this.$router.push("/product_add/" + edit_data.id);
      },
      async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/product_column/' + this.user_id);
        const data = await res.json();
         this.m_product.col = data;
        // console.log(data);
        this.m_product.columns = data[0].columns.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
      // async update_rows()
      // {
      //      const res = await fetch(this.$store.state.hostname + '/product');
      //      const res_data = await res.json();
      //      this.m_product.rows = res_data;
      // },
    },
    async mounted(){
      // this.$refs.message.error('Success!!! Добавить комната')
      // this.$refs.message.success('Success!!! Добавить комната')
      // console.log(this.changeFlex)
      {// Product table
        await this.fetchproductAll();
        // await this.update_rows();

        this.loading = false;
      // end Product table
      }
    },
};
</script>


<style scoped>
</style>
