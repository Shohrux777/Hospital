<template>
  <div class="bronHospital">
    <div class="leftmenu border-right">
      <div class="w-100" v-for="(link,index) in bron_room_list.rows" :key="index">
        <!-- :class="{'active_link': link.view}" -->
        <div
        :class="{ active_link : active_el == index }" 
        active-class="active_link"
        @click ="update_down(index, link)"
        class="text-dark d-flex pl-2 px-3 menuitem justify-content-between" style="font-size:12.5px; padding: 8px 0; "
        >
        <span>{{link.room_name}}</span>
        <span>2/{{link.room_beds_count}}</span>
        </div>
      </div>
    </div>
    <div class="mainmenu bg-white" style="padding: 15px 70px;">
      <mdb-row>
        <mdb-col v-for="(bed,i) in beds_list" :key="i" md="3" sm="4" class="bedcard">
          <div class="card">
            <div class="card-header bg-warning text-center">
              <h5 class="m-0 pt-1">{{bed.bed.beds_name}}</h5>
            </div>
            <div class="card-body bg-white d-flex justify-content-center align-items-center ">
              <div class="bg-white d-flex align-items-center rounded card-body border px-3 py-2 addPatient" @click="add_patient">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus m-0 p-0" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1266F1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <h6 class="m-0 p-0 ml-2">Admit Patient</h6>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </div>
    <div class="bed_add">
      <div class="add_plus" @click="add_bed_show = true">
        <i class="fas fa-plus text-white"></i>
      </div>
    </div>
    <Modal :show="show" headerbackColor="warning" closeColor="white" titlecolor="white" 
    :title="$t('Inpatient Admission')" @close="show = false" width="600px">
        <template v-slot:body>
          <patientAdd  @close="show = false" />
        </template>
      </Modal>
      <mdb-modal  :show="add_bed_show"  @close="add_bed_show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('bronBeds')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <bronBeds_add :options="editData" :roomId="roomId" @updateRoom="updateRoom"/>
        </mdb-modal-body>
      </mdb-modal>
      <Toast ref="message"></Toast>
      <AlertError ref="msg"></AlertError>

      <massage_box :hide="modal_status" :detail_info="modal_info"
          :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
  </div>
</template>

<script>
  import { mdbRow, mdbCol, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,} from 'mdbvue';
  import patientAdd from "./patient_bed_add.vue";
  import Modal from '../../components/modal.vue'
  import {mapGetters, mapActions} from 'vuex'
  import bronBeds_add from "../../views/bron/bronBeds_add"
  export default {
    components: {
      mdbRow,
      mdbCol,Modal,patientAdd, bronBeds_add,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    },
    data() {
      return {
        modal_info : '',
        modal_status: false,
        loading: false,

        show: false,
        active_el: 0,
        name: '',
        beds_list: [],

        add_bed_show: false,
        editData: {},
        roomId: null,
      }
    },
    async mounted(){
      await this.fetch_bron_room()
      console.log(this.bron_room_list)
      if(this.bron_room_list.rows.length>0){
        this.roomId = this.bron_room_list.rows[0].id
        await this.fetchRoomsBeds(this.bron_room_list.rows[0].id)
        console.log(this.roomId)
      }
        // this.beds_list = []
        // for (let j = 0; j <this.get_rooms_list.rows[0].bedsCount; j++) {
        //   this.beds_list.push(j+1);
        // } 
      
    },
    computed: mapGetters(['bron_room_list']),
    methods: {
      ...mapActions(['fetch_bron_room']),
      async update_down(i, item) {
        this.active_el = i;
        console.log(item);
         this.beds_list = [];
         this.roomId = item.id;
         await this.fetchRoomsBeds(item.id)
        // for (let j = 0; j <item.bedsCount; j++) {
        //   this.beds_list.push(j+1);
        // }
      },
      add_patient(){
        this.show = true;
      },
      async updateRoom(roomId){
        await this.fetchRoomsBeds(roomId)
      },
      async fetchRoomsBeds(id){
        console.log('kirdiku ishlayabdi')
        console.log(id)
        try{
          const response = await fetch(this.$store.state.hostname + '/HospitalBronRoomAddBeds/getPaginationByRoomId?page=0&size=1000&room_id=' + id)
          const data = await response.json()
          this.loading = false;
            console.log('data')
            console.log(data)
            this.beds_list = [];
          if(data.items_list){
            // this.beds_list = data.items_list;
            for(let i=data.items_list.length-1; i>=0; i--){
              this.beds_list.push(data.items_list[i]);
            }
            this.$refs.message.success('Added_successfully')
            this.beds_list.unshift({name: 'hiy'});
            this.beds_list.splice(0,1);
            console.log(this.beds_list)
          }
          else{
            this.$refs.msg.error('Error_successfully')
            return false;
          }
        }
        catch{
            this.$refs.msg.error('Error_successfully')
        }
      }
    },
  }
</script>

<style lang="scss">
.bedcard{
  padding: 15px 15px;
  
}
.bedcard .card{
  height: 250px;
  overflow: hidden;
}
.bronHospital{
  display: flex;
}
.bronHospital .leftmenu{
  width: 20%;
}
.bronHospital .mainmenu{
  width: 80%;
}
.leftmenu{
  width: 100px;
  padding: 2px 0px;
  background: #fff;
}
.allContent{
  min-height: 100vh;
}
.active_link{
  background: #ffc95d;
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}
.menuitem:hover{
  background: #ffed8a;
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}
.addPatient{
  cursor: pointer;
  margin-top: -10px;
}
.bed_add{
  position: fixed;
  bottom: 25px;
  right: 40px;

  .add_plus{
    cursor:pointer;
    padding: 10px 15px;
    border-radius:50%;
    background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
  }
}
</style>