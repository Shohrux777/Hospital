<template>
  <div>
    <div class="" >
      <div class="bg-white p-2  mb-3 " style="border-radius:5px; position:relative;">
        <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('Drag table')}}</h5>
          </div>
          <div class="plus">
            <mdb-btn tag="a" @click="add" color="primary py-2 px-4"   style="background-color: rgb(85, 172, 238);">
              <mdb-icon  icon="plus" class="mr-2"></mdb-icon>{{$t('add')}}
            </mdb-btn>
          </div>
        </div>
        <anyTable
          :datasource="get_service_medicine_list"
          @for_edit="for_edit"
          @for_delete="for_delete"
          />
      </div>
    </div>
    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <medicineServ/>
      </div>
    </div> -->
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Add Client')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <medicineServ @close="show = false"/>
        </mdb-modal-body>
      </mdb-modal> -->

      <ModalDrag  closeColor="#fff" titlecolor="white" headerbackColor="success" :show="show" :title="$t('Add drag')" @close="show = false" width="510px">
        <template v-slot:body>
          <medicineServ  @close="show = false"/>
        </template>
      </ModalDrag>

    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import medicineServ from "./serviceMedcine"
  import anyTable from "../../components/market_add/clientTable"
  import ModalDrag from '../../components/modal.vue'
  import { mdbBtn,  mdbIcon,    } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      mdbBtn,
      
      mdbIcon,ModalDrag,
      anyTable,
      medicineServ
    },
    data(){
      return{
        show: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,
      }
    },
    async mounted(){
      await this.fetch_m_product();
    },
    computed: mapGetters(['get_service_medicine_list']),
    methods: {
      ...mapActions(['fetch_m_product']),
      ...mapMutations(['service_medicine_list_delete']),

      for_edit(data){
        // this.$router.push('/m_client_add/'+ data.id)
        console.log(data)
      },
      async for_delete(del_data,index){
          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/HospitalServiceRecipes/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            this.service_medicine_list_delete(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
      add(){
        // this.show =! this.show
        // this.editData = {};
        this.show = true;
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