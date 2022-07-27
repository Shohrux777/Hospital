<template>

  <div class="d_table mt-3">

      <div class="m-2">
        <mdb-row>
            <!-- <mdb-col class="col-12 col-sm-12 col-md-4 col-lg-2">
              <multiselect  v-model="value" :options="options"
            :searchable="false"
            style="font-size: 13px; font-family: Ubuntu, sans-serif;"
            :show-labels="false" placeholder="Entries"></multiselect>
            </mdb-col> -->
              <!-- <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-4 mt-2">
                <mdb-input label="Search" type="text" class="active-cyan-2 active-purple-2 mt-0 mb-3"/>
              </mdb-col> -->

            <!-- <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
               <div class="d-inline float-right">

                <div class="d-inline">
                  <mdb-btn slot="reference" class="mr-1" outline="info" @click="clicked_filter"
                    darkWaves tag="a" floating  icon="filter"  size="sm" >{{$t('Filter')}}</mdb-btn>


                    <mdb-btn class="mr-1" outline="info" darkWaves tag="a" floating @click="showcheck_form=true"
                    icon="table"  size="sm">{{$t('editCol_columns')}}</mdb-btn>

                    <mdb-btn-group style="margin-top:-18px">
                      <mdb-dropdown>
                        <mdb-btn class="mr-1" outline="info" darkWaves tag="a" floating
                        icon="file-export"  size="sm" slot="toggle">{{$t('Export')}}</mdb-btn>
                        <mdb-dropdown-menu>
                          <mdb-dropdown-item>{{$t('Export_to_Excel')}}</mdb-dropdown-item>
                          <mdb-dropdown-item>{{$t('Export_to_PDF')}}</mdb-dropdown-item>
                        </mdb-dropdown-menu>
                      </mdb-dropdown>
                    </mdb-btn-group>
                </div>
               </div>
            </mdb-col> -->
          </mdb-row>

      </div>
      <table  class="myTable">
                <thead>
                <tr class="header">
                    <th width="60">№</th>
                    <th v-for="column in datasource.columns" :key="column">{{$t(column)}}</th>
                    <th width="120" class="text-center">{{$t('Info_Auth')}}</th>
                    <th width="100" class="text-center">{{$t('Action')}}</th>
                </tr>
                </thead>
                <tbody>
                  <!-- .slice().reverse() -->
                <tr v-for="(row,rowIndex) in datasource.rows" :key="rowIndex">
                    <td>{{rowIndex+1}}</td>
                    <td v-for="(column,i) in datasource.columns" :key="i">
                        <mdb-badge v-show="row[column] === true" style="padding: 2px 8px;" pill color="success">{{row[column]}}</mdb-badge>
                        <mdb-badge v-show="row[column] === false"  pill color="danger" style="padding: 2px 8px;" >{{row[column]}}</mdb-badge>
                        <div v-show="column == 'colorCode'" :style="{background: row[column]}" style="width: 65px; height:3px; border-radius:10px;" ></div>
                        <span v-show="row[column] !== true && row[column] !== false && column !== 'name' && column !== 'colorCode'">{{row[column]}}</span>
                        <span v-show="column == 'name'" style="font-weight: 450; font-family: 'Ubuntu', sans-serif;">{{row[column]}}</span>
                    </td>
                    <td class="text-center">
                      <mdb-btn class="px-2 py-1 m-0 " @click="info" :disabled="disable" :data-row="rowIndex" style="font-size: 8px;" color="primary">Info</mdb-btn>
                      <mdb-btn class="px-2 py-1 m-0 ml-1" :disabled="disable" @click="auth" :data-row="rowIndex" style="font-size: 8px;" color="danger">Auth</mdb-btn>
                    </td>
                    <td class="text-center">
                      <i class="fas fa-pen editIcon mask waves-effect t m-0 pr-2" :class="{'applied': disable}" v-on:click="editRow" :data-row="rowIndex"></i>
                      <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" :class="{'applied': disable}" v-on:click="deleteRow" :data-row="rowIndex"></i>
                    </td>
                </tr>

                </tbody>

      </table>
      <div class=" m-3 mt-4" v-if="dontShowPagination">
        <div class="d-inline dataTables_info"  role="status" aria-live="polite"> {{get_current_list.current_item_count}} {{$t('to_')}} {{value}} {{$t('of_')}} {{get_current_list.items_count}} </div>
        <mdb-pagination class="float-right">
          <div @click="firstPage">
            <mdb-page-item :disabled="elementPageList==0">{{$t('First')}}</mdb-page-item>
          </div>
          
          <div @click="prevPage" :class="{'applied': elementPageList==0}">
            <mdb-page-nav  prev :disabled="elementPageList==0"></mdb-page-nav>
          </div>
          
          <div v-for="(num,i) in pageList[elementPageList]" :key="i"  @click="paginationClick(num)" >
            <mdb-page-item class="text-white"  :class="{ 'active' : numPag-1 == num }"  >{{num+1}}</mdb-page-item>
          </div>
          <div @click="nextPage" :class="{'applied': elementPageList==pageList.length-1}">
            <mdb-page-nav  next :disabled="elementPageList==pageList.length-1"></mdb-page-nav>
          </div>
          <div @click="lastPage">
            <mdb-page-item :disabled="elementPageList==pageList.length-1">{{$t('Last')}}</mdb-page-item>
          </div>
        </mdb-pagination>  
      </div>

      <!-- <i class="material-icons" v-on:click="addRow">add_circle</i> -->

      <mdb-modal :show="confirm" @close="confirm = false" size="sm" class="text-center" danger>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn outline="danger" @click="promise">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="confirm = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal> 

    <!-- <ModalAuth  :title="$t('Add authorization')" closeColor="#fff" titlecolor="white" headerbackColor="danger"
     :show="auth_show" @close="auth_show = false" width="550px">
        <template v-slot:body>
          <authAdd :options="updateAuth" :user="user_id" @close="auth_show = false"/>
        </template>
      </ModalAuth> -->
      <ModalAuth  :title="$t('Client List')" closeColor="#fff" titlecolor="white" headerbackColor="info"
        :show="client_show" @close="client_show = false" width="800px">
        <template v-slot:body>
          <clientList  @close="client_show = false"/>
        </template>
      </ModalAuth>
      <mdb-modal  :show="auth_show"  @close="auth_show = false" size="md" danger>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Add authorization')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <authAdd :options="updateAuth" :user="user_id" @close="auth_show = false"/>
        </mdb-modal-body>
      </mdb-modal>
    <!-- <edit_col
        v-show="showcheck_form"
        :option="datasource"
        @select="checklist"
    /> -->
  </div>
</template>

<script>
// import Multiselect from 'vue-multiselect'
// import edit_col from "../components/editColumn";
import ModalAuth from './modal'
import authAdd from './new_prog_add/auth_add.vue'
import clientList from '../views/market/client'
import { mdbBtn,  mdbIcon, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,mdbBadge,
mdbPagination, mdbPageItem, mdbPageNav,mdbRow,} from 'mdbvue';
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {

  components: {
        mdbBtn,mdbBadge,
        mdbIcon, 
        mdbModal,mdbRow,
        mdbModalHeader,mdbPagination, mdbPageItem, mdbPageNav,
        mdbModalBody,
        mdbModalFooter,ModalAuth, authAdd, clientList, mdbModalTitle
        // edit_col,
      },
  props:{
     datasource:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  data() {
    return{
       value: localStorage.size_value,
      realSoni: 10,
      numPag: localStorage.numPage,
      pageNum: localStorage.pageNum,
      pageList: [],
      elementPageList:0,

      options: ['5','10','25','50','100'],

      auth_show: false,
      client_show: false,
      user_id: null,
      promp: false,
      num: null,
      confirm: false,
      showcheck_form: false,
      editData: {},
      updateAuth: {},
      disable: true,
    }
  },
  watch:{
    'value': function(){
      localStorage.size_value = this.value;
      localStorage.numPage = 1;
      this.numPag = 1;
      this.update_pagination({size:this.value, page: this.numPag -1});
      this.pageNum = Math.ceil(this.get_current_list.items_count/(localStorage.size_value));
      this.pageList = []
      var box = []
      box.push(0);
      this.elementPageList = 0;
      for(let i=1; i<this.pageNum; i++){
        if(i%5!=0){
          console.log('dasdasd hiy')
          box.push(i)
        }
        else{
          this.pageList.push(box);
          box = []
          box.push(i)
          
        }
      }
      this.pageList.push(box);
      box = []
      console.log('this.pageList')
      console.log(this.pageList)
      console.log(this.pageNum)

      // localStorage.pageNum = this.pageNum;
      this.emit();

    },
    'get_current_list.items_count': function(){
      this.pageNum = Math.ceil(this.get_current_list.items_count/(localStorage.size_value))
      // localStorage.pageNum = this.pageNum
      this.pageList = []
      var box = []
      box.push(0);
      this.elementPageList = 0;
      for(let i=1; i<this.pageNum; i++){
        if(i%5!=0){
          console.log('dasdasd hiy')
          box.push(i)
        }
        else{
          this.pageList.push(box);
          box = []
          box.push(i)
          
        }
      }
      this.pageList.push(box);
      box = []
      this.emit();
    }
  },
  mounted (){
    this.update_pagination({size:localStorage.size_value, page: this.numPag -1})

    this.pageNum = Math.ceil(this.get_current_list.items_count/(localStorage.size_value))
    this.pageList = []
      var box = []
      box.push(0);
      this.elementPageList = 0;
      for(let i=1; i<this.pageNum; i++){
        if(i%5!=0){
          console.log('dasdasd hiy')
          box.push(i)
        }
        else{
          this.pageList.push(box);
          box = []
          box.push(i)
          
        }
      }
      this.pageList.push(box);
      box = []
    // this.disable = localStorage.Type
    console.log(localStorage.Type)
    if(localStorage.Type == 0){
      this.disable = false;
    }
    else{
      this.disable = true;
    }
  },
  computed: mapGetters(['get_pagination', 'get_current_list', 'dontShowPagination']),

  methods: {
    ...mapMutations([ 'update_pagination']),
    ...mapActions(['fetch_get_doctor_list']),
    async checklist (option){

        this.showcheck_form = option;
        this.$emit('update_column');
      },
      clicked_filter()
      {
        this.$emit('clicked_filter');
      },
      async info(ev){
        this.client_show = true
        console.log(this.datasource.rows[ev.target.dataset.row].id)
        console.log(this.datasource.rows[ev.target.dataset.row])
        localStorage.UserIDFor = this.datasource.rows[ev.target.dataset.row].authorization.id;
        this.fetch_get_doctor_list(this.datasource.rows[ev.target.dataset.row].authorization.id)
        console.log('info')
      },
      auth(ev){
        this.auth_show = true;
        this.user_id = this.datasource.rows[ev.target.dataset.row].id;
        this.updateAuth = this.datasource.rows[ev.target.dataset.row].authorization;
        // console.log(this.updateAuth)
        // console.log('auth')
      },

        onChange(ev) {
            //console.dir(ev.target.dataset)
            let col = ev.target.dataset.column
            let row = ev.target.dataset.row
            this.datasource.rows[parseInt(row)][col] = ev.target.value
        },
        promise () {
          // this.del = true
          this.confirm = false
          this.$emit('for_delete',this.datasource.rows[this.num_target],this.num_target);

          //this.datasource.rows.splice( parseInt(this.num_target), 1)
        },

        editRow(ev)
        {
          this.num_target = ev.target.dataset.row;
          this.$emit('for_edit',this.datasource.rows[this.num_target]);
        },
        deleteRow(ev) {
            this.confirm = true

            this.num_target = ev.target.dataset.row
            console.log(this.num_target)
            //appData.updated()
        },


      emit(){
        this.$emit('size');
      },
      paginationClick(i){
        this.numPag = i+1;
        localStorage.numPage = this.numPag;

        this.update_pagination({size:this.value, page: i})
        this.$emit('page');
      },
      prevPage(){
          console.log('prev')
          this.elementPageList --;
          this.numPag = this.pageList[this.elementPageList][0]+1;
          localStorage.numPage = this.numPag;

          this.update_pagination({size:this.value, page: this.numPag})
          this.$emit('page');

        },
        nextPage(){
          console.log('next')
          this.elementPageList ++;
          this.numPag = this.pageList[this.elementPageList][0]+1;
          localStorage.numPage = this.numPag;

          this.update_pagination({size:this.value, page: this.numPag})
          this.$emit('page');
        },
        lastPage(){
           this.elementPageList = this.pageList.length-1;
           this.numPag = this.pageList[this.elementPageList][0]+1;
            localStorage.numPage = this.numPag;

            this.update_pagination({size:this.value, page: this.numPag})
            this.$emit('page');
        },
        firstPage(){
           this.elementPageList = 0;
           this.numPag = this.pageList[this.elementPageList][0]+1;
          localStorage.numPage = this.numPag;

          this.update_pagination({size:this.value, page: this.numPag})
          this.$emit('page');
        }
    },
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.applied{
  pointer-events: none;
  background:#fcfcfc;
}
.d_table{
  position: relative;
}

.myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12.5px;
}
.myTable td{
  text-overflow: ellipsis; 
  overflow: hidden; 
  white-space: nowrap;
  font-size:13.4px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 12px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}

.editIcon{
  color:#01b348;
  font-size: 13px;

}
.editIcon:hover{
color: #000;
}

.delIcon:hover{
color: #000;
}
.delIcon{color: rgb(251, 70, 70);
  font-size: 13px;

}
.delete{
  
  position: fixed;
  display: flex;
  justify-content: center;
  top:0;
  animation: logo 0.2s linear;
  z-index:111111;
  left:0;
  width:100%;
  height:100vh;
  background:rgba(0, 0, 0, 0.5);
  .delete_form{
    background: white;
    border-radius: 5px;
    // box-shadow: 0 0 3px rgb(121, 121, 121);
    max-height: 135px;
    width: 420px;
    transform: translate(0, 20px);
    animation: anime 0.2s linear;
    p{
      padding: 0px 35px;
    }
    .delete_btn{
      text-align: right;
      button{
        border-radius: 5px;
        padding: 3px 20px;
      }
    }
  }
}
@keyframes anime
{
  0%{
    transform: translate(0, -130px);
    opacity: 0;
  }
  100%{
    transform: translate(0, 20px);
    opacity: 1;
  }
}
@keyframes logo
{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
// true and false background
.span_bg{
  border-radius: 3px;
  font-family: roboto, sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 1px 5px;
  box-shadow: 1px 2px 7px rgb(191, 191, 191);
}
.multiselect__tag {
    min-height: calc(1.5em + .75rem + 2px);
    display: block;
    padding: 0 40px 0 8px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 12px;
}


</style>
