<template>
 <div>
   <!--Navbar-->
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('Invoice table')}}</h5>
          </div>
          <div class="plus">
            <router-link to="/invoice_add/0">
              <mdb-btn tag="a" color="info py-2 px-4"   style="background-color: rgb(85, 172, 238);">
                <mdb-icon  icon="plus" class="mr-2"></mdb-icon>{{$t('add')}}
              </mdb-btn>
            </router-link>
          </div>
        </div>
        <loader class="mt-2" v-if="loading"/>
        <div v-else>
          <anyTable
            :datasource="get_invoice_list"
            @for_edit="for_edit"
            @for_delete="for_delete"
            />
        </div>
      </div>
    </div>
    <!--/.Navbar-->

    <Toast ref="message"></Toast>



 </div>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../../components/anyTable"


import {
  mdbIcon,
  mdbBtn,

} from "mdbvue";

export default {
  components: {
    anyTable,mdbIcon,
    mdbBtn,

  },
   data() {
      return {
        loading : true,
        user_id : 1,
      };
    },
    computed: mapGetters(['get_invoice_list']),
    methods:
    {
      ...mapActions(['fetch_m_invoice']),
      ...mapMutations(['invoice_delete_row']),
      for_edit(edit_data)
      {
        this.$router.push("/invoice_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/MarketInvoices/" + del_data.id, requestOptions);
          const data = await response.json();
          console.log(data)
          if(data.id)
          {
            // this.alert_text = locolizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            this.invoice_delete_row(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
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
          await this.fetch_m_invoice();
          this.loading = false;
    }
};
</script>


<style scoped>
</style>
