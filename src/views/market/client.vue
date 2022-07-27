<template>
  <div>
    <div class="" >
      <div class="bg-white p-2  mb-3 " style="border-radius:5px; position:relative;">
        <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
          <div class="title d-flex align-items-center">
            <h5 class="m-0 ">{{$t('Client table')}}</h5>
          </div>
          <div class="plus">
            <mdb-btn tag="a" @click="add" color="info py-2 px-4"   style="background-color: rgb(85, 172, 238); font-size:10px;">
              <mdb-icon  icon="plus" class="mr-2"></mdb-icon>{{$t('add')}}
            </mdb-btn>
          </div>
        </div>
        <anyTable
          :datasource="get_doctor_list_by_casher"
          @for_edit="for_edit"
          @for_delete="for_delete"
          />
      </div>
    </div>
    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <ClientAdd/>
      </div>
    </div> -->
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Add Client')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <ClientAdd @close="show = false" :options="editData"/>
        </mdb-modal-body>
      </mdb-modal> -->
      <ModalAddReg  :show="show" headerbackColor="success" closeColor="white" titlecolor="white" :title="$t('Choose_users')" @close="show = false" width="700px">
        <template v-slot:body>
          <div style="min-height: 300px;">
            <div class="row">
              <div class="col-4"  v-for="(item,i) in auth_user_list" :key="i" v-show="item.userType==1 || item.userType==3">
                <div style="height: 45px; overflow: hidden; overflow-y: auto"  @click="getDoctor(item)" class="wrap_chip  border rounded d-flex my-2 px-3 text-center justify-content-center">
                  <p class="my-1">{{item.users.fio}} ({{item.userType}}) </p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <mdb-btn  color="danger" @click="show = false"  p="r4 l4 t2 b2" style="font-size:10px;">{{$t('close')}}</mdb-btn>  
            <mdb-btn  color="primary"  p="r4 l4 t2 b2" style="font-size:10px;">{{$t('Send')}}</mdb-btn>  
          </div>
        </template>
      </ModalAddReg>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  // import ClientAdd from "./client_add"
  import ModalAddReg from '../../components/modal'
  import anyTable from "../../components/market_add/clientTable"
  import { mdbBtn,  mdbIcon,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      mdbBtn,
    ModalAddReg,
      mdbIcon,
      anyTable,
      // ClientAdd
    },
    data(){
      return{
        show: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,
        loading: false,
      }
    },
    async mounted(){
      await this.fetch_m_client();
      await this.fetch_auth_list();
    },
    computed: mapGetters(['get_m_client_list', 'auth_user_list', 'get_doctor_list_by_casher']),
    methods: {
      ...mapActions(['fetch_m_client', 'fetch_auth_list', 'fetch_get_doctor_list']),
      ...mapMutations(['m_client_by_row_delete']),

      for_edit(data){
        // this.$router.push('/m_client_add/'+ data.id)
        console.log(data)
      },
      async getDoctor(option){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "registraterAuthId": localStorage.UserIDFor,
            "doctorAuthId": option.id
          })  
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalRegistrationPermissionDoctors", requestOptions);
        const data = await response.json();
        this.fetch_get_doctor_list(localStorage.UserIDFor);

        this.show = false;
        console.log(data)
        this.loading = false;
        
      },
      async for_delete(del_data,index){
          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/HospitalRegistrationPermissionDoctors/" + del_data.id, requestOptions);
          const data = await response.json();

          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            this.m_client_by_row_delete(index);
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
.wrap_chip{
  box-shadow: 2px 2px 15px rgb(225, 225, 225), -1px -1px 5px rgb(224, 224, 224);
  cursor: pointer;
  &:hover{
    // box-shadow: 2px 2px 10px rgb(193, 181, 251), -1px -1px 3px rgb(224, 224, 224);
    // border-bottom: 1px solid green;
    background-color: rgb(113, 222, 252);
  }
}

</style>