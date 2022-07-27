<template>
  <div class="bg-white">
   <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <!-- <div class="col-4">
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
              </div> -->
              <div class="col-4">
                <mdb-input type="text" v-model="search" size="sm" :label="$t('search_here')" outline></mdb-input>
              </div>
              <!-- <div class="col-4">
                <mdb-input type="number" v-model="price" size="sm" :label="$t('price')" outline></mdb-input>
                <small class="invalid-text"  v-if="$v.price.$dirty && !$v.price.required" >
                  {{$t('name_invalid_text')}}
                </small>
              </div> -->
            </div>
            <div class="plus">
              <mdb-btn type="submit" color="primary py-2 px-4"  style="font-size:10px;" >
                {{$t('search')}}
              </mdb-btn>
            </div>
          </div>
        </form>
        <div class="TablePatientDocIds p-1 m-0">
          <anyTable
          :datasource="m_contragent"
          @page="page"
          @size="size"
          @pay="pay_debit"
          @showed = "showed"
          :debit="debit"
          />
        </div>
      </div>
    </div>

     <vue-html2pdf ref='listlar'
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1600"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
      >
      <div slot="pdf-content">
        <anyTable
          :datasource="m_contragent"
          @page="page"
          @size="size"
          @pay="pay_debit"
          :debit="debit"
          />
      </div>

    </vue-html2pdf>

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
       <ModalUser  :show="debit_show" headerbackColor="success" closeColor="white" titlecolor="white" 
        :title="$t('debit')" @close="debit_show = false" width="500px">
        <template v-slot:body>
          <debit :option="summa" :summa="summaString" :patientName ="patientName" :patient="patient_id" @close="close_paydebit" />
        </template>
      </ModalUser>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  import anyTable from "../../components/ContragentTable"
import { required } from 'vuelidate/lib/validators'
import debit from "./payedDebit.vue";
import ModalUser from '../../components/modal.vue'

  // import lineSelect from "../../components/lineSelect.vue";
  import districtAdd from "../../components/new_prog_add/district_add"
  import { mdbBtn, mdbInput,  mdbModal, mdbModalHeader,  mdbModalTitle, mdbModalBody,   } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, 
      districtAdd,
      VueHtml2pdf, mdbInput,anyTable, ModalUser, debit
    },
    data(){
      return{
        debit: true,
        debit_show: false,
        patient_id: null,
        summa: 0,
        summaString: '',
        patientName: '',
        search:'',

        show: false,
        snipper: true,
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
        m_contragent :{
          rows: [],
          columns: ['patient_name', 'real_qty', 'summ_dolg', 'created_date_time'],
          col : []
        },
      }
    },
    validations: {
      price: {required},
      contragent_name : {required}
    },
    async mounted(){
      this.refresh();
      if(localStorage.AuthId === 0){
        this.showen_Auth = true
        console.log(localStorage.Auth)
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
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash','get_pagination']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time']),
      ...mapMutations(['district_row_delete', 'update_pagination_first']),
      cls_wnd(){
        this.price =  null;
        this.reason =  '';
        this.contragent_name = '';
        this.contragent_id = null;
      },
      async close_paydebit(){
        this.debit_show = false;
        await this.$router.push('/checkDebit')
        this.$root.$refs.checkDebit.printed()


      },
      page(){
      this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        const res = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/getPagination?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();
        console.log('res_data')
        console.log(res_data)


        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.m_contragent.rows = res_data.items_list;
        this.loading = false;
      },
      pay_debit(option){
        console.log('option')
        console.log(option)
        this.patient_id = option.id;
        this.summa = option.real_qty;
        this.patientName = option.patient_name;
        this.summaString = this.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        this.debit_show = true;
      },
      showed(id){
        this.$router.push('/debitdetiels/' +id)
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
        if(this.search == ''){
          this.refresh();
        }else{
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + '/HospitalPatientDolg/getPaginationByPatientFio?page=0&size=100&patient_name=' + this.search)
            const data = await response.json()
            this.loading = false;
            console.log(data)
            if(data.items_count){
              this.m_contragent.rows = data.items_list;
              this.$refs.message.success('Added_successfully')
            }
            else{
              this.$refs.message.error('not_found_patient')
              this.m_contragent.rows = [];
              // this.modal_info = data.detail + "    (" + data.routine + ")";
              // this.modal_status = true;
              return false;
            } 
          }
          catch{
            this.$refs.message.error('not_found_patient')
              this.m_contragent.rows = [];
          }
          
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
.TablePatientDocIds{
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