<template>
  <div class="bg-white">
   <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-4">
                <lineSelect
                  :options="get_contragent_list.rows"
                  :searchshow="true"
                  @select="selectcontragent"
                  :selected="contragent_name"
                  :label="$t('contragent')"
                />
                <div class="col-12">
                  <small v-if="$v.contragent_name.$dirty && contragent_id == null" class="invalid-text pt-4" >
                    {{$t('select_item')}}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <lineSelect
                  :options="get_service_type.rows"
                  :searchshow="true"
                  @select="selectService"
                  :selected="service_name"
                  :label="$t('service_type')"
                />
                <div class="col-12">
                  <small v-if="$v.service_name.$dirty && service_id == null" class="invalid-text pt-4" >
                    {{$t('select_item')}}
                  </small>
                </div>
              </div>
              <!-- <div class="col-4">
                <mdb-input type="text" v-model="reason" size="sm" :label="$t('reason')" outline></mdb-input>
              </div>
              <div class="col-4">
                <mdb-input type="number" v-model="price" size="sm" :label="$t('price')" outline></mdb-input>
                <small class="invalid-text"  v-if="$v.price.$dirty && !$v.price.required" >
                  {{$t('name_invalid_text')}}
                </small>
              </div> -->
            </div>
            <div class="plus">
              <mdb-btn type="submit" color="primary py-2 px-4"  style="font-size:10px;" >
                {{$t('add')}}
              </mdb-btn>
            </div>
          </div>
        </form>
        
      </div>
    </div>

     

    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <districtAdd/>
      </div>
    </div> -->
      <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  // import VueHtml2pdf from 'vue-html2pdf'
import { required } from 'vuelidate/lib/validators'
  import lineSelect from "../../components/lineSelect.vue";
  import districtAdd from "../../components/new_prog_add/district_add"
  import { mdbBtn,  mdbModal, mdbModalHeader,  mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, 
      districtAdd, lineSelect, 
    },
    data(){
      return{
        show: false,
        snipper: true,
        service_name: '',
        service_id: null,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: null,
        Start_time: new Date(),
        End_time: new Date(),
        price: null,
        reason: '',
        loading: false,
        bonus_contragent_list: [],
        showen_Auth: false,
      }
    },
    validations: {
      service_name: {required},
      contragent_name : {required}
    },
    async mounted(){
      await this.get_get_();
      if(localStorage.AuthId === 0){
        this.showen_Auth = true
        console.log(localStorage.Auth)
      } 

      if(this.bonus_contragent_list.length>0){
        this.$router.back();
      }
      // console.log('date')
      // console.log(this.End_time.toISOString())
      // let time2 = this.End_time.toISOString()
      //   let a = {
      //     time1: "2021-09-01T09:15:28.886Z",
      //     time2: null,
      //     contId: 0
      //   }
      //   a.time2 = time2
        // this.fetch_report_by_data_time(a)
        this.fetch_contragent()
        this.fetch_service_type()
    },
    computed: mapGetters(['get_contragent_list','get_service_type', 'get_report_by_data_time', 'get_report_by_time_card_cash']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time', 'fetch_service_type']),
      ...mapMutations(['district_row_delete']),
      cls_wnd(){
        this.service_id =  null;
        this.service_name =  '';
        this.contragent_name = '';
        this.contragent_id = null;
      },
      async get_get_(){ 
        const response = await fetch(this.$store.state.hostname + '/HospitalDefaultSettings')
        const data = await response.json()
        this.bonus_contragent_list = data
        console.log(this.bonus_contragent_list)
      },

      async selectcontragent(option){
        console.log(option)
        this.contragent_id = option.data.id
        this.contragent_name = option.data.name
      },
      async selectService(option){
        console.log(option)
        this.service_id = option.data.id
        this.service_name = option.data.name
      },

      add(){
        this.show =! this.show
        this.editData = {};
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      async deleteRow(index,del_data){
          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/ContragentAdditionalPaymentBefohands/" + del_data.id, requestOptions);
          const data = await response.json();
          this.bonus_contragent_list.splice(parseInt(index), 1);
          if(data)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.error('Successfully_removed')
            // this.m_product_row_delete(index);
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
      },
      async submit(){
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "contragentId" : this.contragent_id,
            "serviceTypeId" : this.service_id,
            "authorizationId" : localStorage.AuthId,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalDefaultSettings', requestOptions)
        const data = await response.json()
        this.loading = false;
        console.log(data)
        if(data.id){
          this.get_get_();
          this.cls_wnd()
          this.$refs.message.success('Added_successfully')
        }
        else{
          this.$refs.msg.error('Error_successfully')
          // this.modal_info = data.detail + "    (" + data.routine + ")";
          // this.modal_status = true;
          return false;
        } 
        
        
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