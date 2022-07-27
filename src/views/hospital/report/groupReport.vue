<template>
  <div class="bg-white">

    <loader v-if="loading"/>
    <div class="p-4">
      <div class="bg-white p-4 mb-5 pt-4 shadow" style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit" class="border-bottom">
          <div style="height: 60px;" class="d-flex justify-content-between  align-items-center  ">
            <div class="title w-75 row align-items-center">
               <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 25px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -8px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date"  v-model="End_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <RegSelect
                label="Регион"
                @select="district_func"
                :options ="get_district_list.rows" 
                :selected="district_name"
                class="mb-3"
               />
              </div>
            </div>
            <div class="plus">
              <mdb-btn @click="print" color="info py-2 px-4" style="font-size:10px;"  >
                {{$t('print')}}
              </mdb-btn>
              <mdb-btn type="submit" color="primary py-2 px-4" style="font-size:10px;"  >
                {{$t('apply')}}
              </mdb-btn>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <multiselect v-model="value" class="p-0 mb-2" tag-placeholder="Add this as new tag" placeholder="Выберите сервисную группу" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            </div>
          </div>
        </form>
        
        <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('district')}}</th>
                <th>{{$t('service_group')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('qty')}}</th>
                <th >{{$t('paymentInCash')}}</th>
                <th >{{$t('paymentInCard')}}</th>
                <th >{{$t('summ')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.vrachnomi}}</span> </td>
                <td> <span >{{row.tumannomi}}</span> </td>
                <td> <span >{{row.groupnomi}}</span> </td>
                <td> <span >{{row.vaqti.slice(0,10)}}</span> </td>
                <td> <span >{{row.soni}}</span> </td>
                <td> <span :class="{'text-danger': row.naqt == 0, 'text-success': row.naqt != 0}">{{row.naqt}}</span> </td>
                <td> <span :class="{'text-danger': row.plastik == 0, 'text-success': row.plastik != 0}">{{row.plastik}}</span> </td>
                <td> <span >{{row.vrachxizmati}}</span> </td>
                
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary"></span></td>
                <td> <span class="text-danger"></span> </td>
                <td> <span class="text-danger"></span> </td>
                <td> <span class="text-danger">{{card}}</span> </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
       <div class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th width="60">№</th>
                <th >{{$t('contragent_name')}}</th>
                <th >{{$t('district')}}</th>
                <th>{{$t('service_group')}}</th>
                <th >{{$t('date')}}</th>
                <th >{{$t('qty')}}</th>
                <th >{{$t('paymentInCash')}}</th>
                <th >{{$t('paymentInCard')}}</th>
                <th >{{$t('summ')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in get_payment_list" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.vrachnomi}}</span> </td>
                <td> <span >{{row.tumannomi}}</span> </td>
                <td> <span >{{row.groupnomi}}</span> </td>
                <td> <span >{{row.vaqti.slice(0,10)}}</span> </td>
                <td> <span >{{row.soni}}</span> </td>
                <td> <span :class="{'text-danger': row.naqt == 0, 'text-success': row.naqt != 0}">{{row.naqt}}</span> </td>
                <td> <span :class="{'text-danger': row.plastik == 0, 'text-success': row.plastik != 0}">{{row.plastik}}</span> </td>
                <td> <span >{{row.vrachxizmati}}</span> </td>
                
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span class="text-primary"></span></td>
                <td> <span class="text-danger"></span> </td>
                <td> <span class="text-danger"></span> </td>
                <td> <span class="text-danger">{{card}}</span> </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </vue-html2pdf>

    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <districtAdd/>
      </div>
    </div> -->
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal> -->
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
  import VueHtml2pdf from 'vue-html2pdf'
  // import DatePicker from 'vue2-datepicker';
  import RegSelect from '../../../components/RegSelect.vue'
  import { mdbBtn, mdbInput,    } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import 'vue2-datepicker/index.css';
  export default {
    components: {
      mdbBtn,
       mdbInput,
      VueHtml2pdf,  Multiselect, RegSelect
    },
    data(){
      return{
        show: false,
        admin:false,
        snipper: true,
        loading:false,
        editData: {},
        modal_info : '',
        modal_status: false,
        contragent_name: '',
        contragent_id: 0,
        district_name: '',
        district_id: 0,
        Start_time: null,
        End_time: null,
        group_name: '',
        group_id: null,
        get_payment_list: [],
        index: null,
        service_id: null,
        day: '',
        qty: 0,
        summ: 0,
        card: 0,
        cash: 0,
        value: [],
        options: [],
      }
    },
    async mounted(){
      if(localStorage.Type == 0){
        this.admin = true;
      }
      {  
        await this.fetch_service_group()
        this.options = [];
        for(let i = 0; i < this.get_service_group_list.length; i++) {
          let a = {
            name: '',
            code: null,
          }
          a.name = this.get_service_group_list[i].name
          a.code = this.get_service_group_list[i].id
          this.options.push(a)
        }
      }
      this.fetch_district()
      // {
      //   let time1 = new Date();
      //   this.Start_time = time1.toISOString().slice(0,10); 
      //   this.End_time = time1.toISOString().slice(0,10);
      //   let a = this.Start_time + 'T00:00:35.000Z' ;
      //   let b = this.End_time + 'T23:59:59.000Z';
      //   let c = {
      //     time1: '',
      //     time2: '',
      //     contId: 0
      //   }
      //   c.time1 = a;
      //   c.time2 = b;
      //   this.loading = true;
      //   await this.fetch_report_by_data_time(c)
      //   this.get_payment_list = this.get_report_by_data_time.rows
      //   this.qty = this.get_report_by_time_card_cash.qty
      //   this.summ = this.get_report_by_time_card_cash.summ;
      //   this.card = this.get_report_by_time_card_cash.card
      //   this.cash = this.get_report_by_time_card_cash.cash
      //   this.loading = false;
      // }

       
    },
    computed: mapGetters(['get_contragent_list', 'get_report_by_data_time', 'get_report_by_time_card_cash','get_district_list', 'get_service_group_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_report_by_data_time', 'fetch_service_group','fetch_district']),
      ...mapMutations(['district_row_delete']),

      add(){
        this.show =! this.show
        this.editData = {};
      },
      district_func(option){
        this.district_name = option.name;
        this.district_id = option.id;
        console.log(option)
      },
      addTag (newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
      },
      print(){
        this.$refs.listlar.generatePdf()
      },
      async submit(){
        console.log(this.value);
        var list = [];
        this.value.forEach((item)=>{
          list.push(item.name)
        })
        console.log(list)
        var time1 = this.Start_time + 'T00:00:59.237Z';
        var time2 = this.End_time + 'T23:59:59.000Z';
        this.get_payment_list = [];
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "groupNames" : list,
            "districtId" : this.district_id,
            "beginDate" : time1,
            "endDate" : time2,
          // "code" : 0
          })
        };
        console.log(requestOptions)

        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Payments/getRealServiceCountCondition', requestOptions)
        const data = await response.json()
        this.get_payment_list = data;
        console.log(data)
        this.loading = false;
        if(data.id){
          this.$refs.message.success('Added_successfully')
        }
        else{
          // this.$refs.msg.error('Error_successfully')
        }
        
        
      },

    },
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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