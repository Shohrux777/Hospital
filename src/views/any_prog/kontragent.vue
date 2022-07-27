<template>
  <div>
    <div  class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('doctors')}}</h5>
          </div>
          <div class="plus">
            <mdb-btn tag="a" @click="add" color="info py-2 px-4"   style="background-color: rgb(85, 172, 238); font-size:10px;">
              <mdb-icon  icon="plus" class="mr-2"></mdb-icon>{{$t('add')}}
            </mdb-btn>
          </div>
        </div>
        <loader v-if="loading" />
        <anyTable v-else
          :datasource="m_contragent"
          @for_edit="for_edit"
          @for_delete="for_delete"
          @page="page"
          @size="size"
          />
      </div>
    </div>
    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <kontragentAdd/>
      </div>
    </div> -->
      <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('add_doctor')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <kontragentAdd :options="editData" @refresh="refresh"/>
        </mdb-modal-body>
      </mdb-modal>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>
</template>

<script>
  import kontragentAdd from "../../components/new_prog_add/kontra_add"
  import anyTable from "../../components/ContragentTable"
  import { mdbBtn,  mdbIcon, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {  
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbIcon,
      anyTable,
      kontragentAdd
    },
    data(){
      return{
        show: false,
        loading: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,
        m_contragent :{
          rows: [],
          columns: ['Name', 'PhoneNumber', 'Address', 'ActiveStatus'],
          col : []
        },
      }
    },
    async mounted(){
      // this.fetch_contragent()
      this.loading = true;
      await this.refresh();
      this.loading = false;

    },
    computed: mapGetters(['get_contragent_list', 'get_pagination']),
    methods: {
      ...mapActions(['fetch_contragent']),
      ...mapMutations(['contragent_row_delete', 'update_pagination_first']),

      for_edit(data){
        this.show = true
        console.log(data)
        this.editData = data
      },
      async for_delete(del_data,index){
          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/Contragents/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            this.contragent_row_delete(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
      add(){
        this.show =! this.show
        this.editData = {};
      },

      page(){
        this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/Contragents/getPagination?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();
        console.log('res_data')
        console.log(res_data)


        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.m_contragent.rows = res_data.items_list;
        this.loading = false;
      }

    },
  };
</script>

<style lang="scss">


.add{
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
  top:0;
  width:85%;
}

.addxizmat{
  width: 470px;
  // height: 120px;
  background: #fff;
  position: relative;
  z-index: 5000;
}
.showing{
  display: none;
}

</style>