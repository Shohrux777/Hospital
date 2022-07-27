<template>
  <div class="bg-white">
    <checkOtchert v-if="show_otchert" @close="show_otchert = false"/>
    <div class="p-4" v-else>
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
               <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date" size="sm" disabled v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date" size="sm" disabled  v-model="End_time" outline/>
                </div>
              </div>
              
            </div>
            <div class="plus">
              <mdb-btn @click="$router.back()" color="primary py-2 px-4" style="font-size:10px;">
                <mdb-icon style="font-size:10.5px;" icon="arrow-circle-left" class="m-0 p-0 mr-1" />
                Назад
              </mdb-btn>
            </div>
          </div>
        </form>
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th  width="40" class="text-left">№</th>
                <th width="200">{{$t('patient_name')}}</th>
                <th >{{$t('bornDate')}}</th>
                <th>{{$t('contragent_name')}}</th>
                <th>{{$t('otchrit')}}</th>
                <th>{{$t('status')}}</th>
                <th >{{$t('regisdate')}}</th>
                <th  width="70">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <small style="font-size: 12.5px;">{{rowIndex+1}}</small> </td>
                <td> <small style="font-size: 12.5px;">{{row.patients.FIO}}</small> </td>
                <td> <small style="font-size: 12.5px;">{{row.patients.BornDate.slice(0,10)}}</small> </td>
                <td> <small style="font-size: 12.5px;">{{row.users.FIO}}</small> </td>
                <td> <small style="font-size: 12.5px;">{{row.ochred_name_aout_genereted}}</small> </td>
                <td> 
                  
                  <mdb-badge v-if="row.accepted_status" style="padding: 2px 8px;" pill color="success">{{$t("проверил")}}</mdb-badge>
                  <mdb-badge v-else style="padding: 2px 8px;" pill color="danger">{{$t('непроверенный')}}</mdb-badge>
                </td>
                <td> <small style="font-size: 12.5px;">{{row.reg_date_ochred.slice(0,10)}}</small> -- <small >{{row.reg_date_ochred.slice(11,16)}}</small> </td>


                <td  class="text-center">
                    <i class="fas fa-print  mask waves-effect m-0 pl-2 text-primary" v-on:click="checkOchred(row)" :data-row="rowIndex"></i>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>

     
   
      <mdb-modal :show="show" @close="show = false" size="sm" class="text-center" danger>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn outline="danger" >{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="show = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import checkOtchert from './checkOtchert'

  import { mdbBtn, mdbBadge, mdbInput, mdbIcon,  mdbModal, mdbModalHeader,   mdbModalBody,mdbModalFooter   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbIcon, mdbModalBody, mdbModalFooter,
       mdbInput,checkOtchert, mdbBadge
      
    },
    data(){
      return{
        user_id: this.$route.params.id,
        show_otchert: false,

        show: false,
        admin:false,
        snipper: true,
        loading:false,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: 0,
        Start_time: null,
        End_time: null,
        group_name: '',
        group_id: null,
        get_payment_list: [],
        index: null,
        service_id: null,
       
      }
    },
    async mounted(){
        let time1 = new Date();
        this.Start_time = time1.toISOString().slice(0,10); 
        this.End_time = time1.toISOString().slice(0,10);
    },
    async created(){
      if(this.user_id){
        let newdate = new Date().toISOString().slice(0,10);
        console.log(newdate)
        let b_date  = newdate + 'T00:00:35.000Z';
        let e_date  = newdate + 'T23:59:35.000Z';
        console.log(b_date)
        console.log(e_date)
        console.log(this.user_id)
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/getPaginationByDoktorIdAndDates?page=0&size=1000&user_id=" + this.user_id + '&b_date=' + b_date + '&e_date='+ e_date);
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            const data = await response.json();
            console.log(data ,  'sadasd data open')

            this.get_payment_list = data.items_list;
            
            // this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            const data = await response.text();
            this.modal_info = data;
            this.modal_status = true;
            return false;
          }
        }
        catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
        }
      }
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash', 'get_service_group_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time', 'fetch_service_group']),
      ...mapMutations(['district_row_delete', 'ochred_add_check']),

      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      checkOchred(data){
        console.log(data)
        let import_data = {
          doc_name : data.users.FIO,
          client_name: data.patients.FIO,
          born_date: data.patients.BornDate.slice(0,10),
          phone_number: data.patients.PhoneNumber,
          number: data.ochred_name_aout_genereted

        }
        this.ochred_add_check(import_data)

        this.show_otchert = true;
      },
      
      
      
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
.timePicer{
  position: relative;
  margin-top: -10px;
  .timeLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 1px 3px;
    z-index: 1;
    left: 6px;
    top: -1px;
  }
  .dayLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 0px 3px;
    z-index: 1;
    left: 6px;
    top: -8px;
  }
}
.TablePatientDocId{
    // height: 400px;
    // overflow: hidden;
    // overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>