<template>

  <div class="d_table">

      <div class="m-2">
        <mdb-row>
            <mdb-col class="col-12 col-sm-12 col-md-4 col-lg-2">
              <multiselect  v-model="value" :options="options"
            :searchable="false"
            style="font-size: 13px; font-family: Ubuntu, sans-serif;"
            :show-labels="false" placeholder="Entries"></multiselect>
            </mdb-col>

            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-4">
              <mdb-input label="Search" type="text" class="active-cyan-2 active-purple-2 mt-0 mb-3"/>
            </mdb-col>

            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
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
            </mdb-col>
          </mdb-row>

      </div>
      <table class="myTable">
                <thead>
                <tr class="header ">
                    <th width="60">№</th>
                    <th v-for="column in datasource.columns" :key="column">{{$t(column)}}</th>
                    <th width="100">{{$t('Action')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,rowIndex) in datasource.rows.slice().reverse()" :key="rowIndex">
                    <td>{{rowIndex+1}}</td>
                    <td v-for="(column,i) in datasource.columns" :key="i">
                        <mdb-badge v-show="row[column] === true" style="padding: 2px 8px;" pill color="success">{{row[column]}}</mdb-badge>
                        <mdb-badge v-show="row[column] === false"  pill color="danger" style="padding: 2px 8px;" >{{row[column]}}</mdb-badge>
                        <div v-show="column == 'colorCode'" :style="{background: row[column]}" style="width: 65px; height:3px; border-radius:10px;" ></div>
                        <span v-show="row[column] !== true && row[column] !== false && column !== 'name' && column !== 'colorCode'">{{row[column]}}</span>
                        <span v-show="column == 'name'" style="font-weight: 450; font-family: 'Ubuntu', sans-serif;">{{row[column]}}</span>
                    </td>
                    <td>
                      <i class="fas fa-pen editIcon mask waves-effect t m-0 pr-2"  v-on:click="editRow" :data-row="rowIndex"></i>
                      <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" v-on:click="deleteRow" :data-row="rowIndex"></i>
                    </td>
                </tr>
                <!-- <tr v-for="(row,rowIndex) in datasource.rows" :key="rowIndex">
                    <td v-for="column in datasource.columns" :key="column">
                    <span class="bg-success span_bg text-white " v-show="row[column] === true">{{row[column]}}</span>
                    <span class="bg-danger span_bg text-white " v-show="row[column] === false">{{row[column]}}</span>
                        <span v-show="row[column] !== true && row[column] !== false">{{row[column]}}</span>
                    </td>
                    <td>
                      <i class="fas fa-pen editIcon mask waves-effect t m-0 pr-2"  v-on:click="editRow" :data-row="rowIndex"></i>
                      <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" v-on:click="deleteRow" :data-row="rowIndex"></i>
                    </td>
                </tr> -->

                </tbody>

      </table>
      <div class=" m-3 mt-4" >
        <div class="d-inline dataTables_info"  role="status" aria-live="polite"> 1 {{$t('to_')}} 10 {{$t('of_')}} 10</div>
        <mdb-pagination class="float-right">
          <mdb-page-item disabled>{{$t('First')}}</mdb-page-item>
          <mdb-page-nav prev disabled></mdb-page-nav>
          <mdb-page-item active>1</mdb-page-item>
          <mdb-page-item>2</mdb-page-item>
          <mdb-page-item>3</mdb-page-item>
          <mdb-page-item>4</mdb-page-item>
          <mdb-page-item>5</mdb-page-item>
          <mdb-page-nav next></mdb-page-nav>
          <mdb-page-item>{{$t('Last')}}</mdb-page-item>
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

    <edit_col
        v-show="showcheck_form"
        :option="datasource"
        @select="checklist"
    />
  </div>
</template>


<script>
import Multiselect from 'vue-multiselect'
 import edit_col from "../components/editColumn.vue";
import { mdbBtn,  mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,
mdbBtnGroup,mdbDropdown, mdbDropdownItem, mdbDropdownMenu,mdbInput,mdbBadge,
mdbPagination, mdbPageItem, mdbPageNav,mdbRow,mdbCol,} from 'mdbvue';

export default {

  components: {
        mdbBtn,Multiselect,mdbBadge,
        mdbIcon,mdbDropdown, mdbDropdownItem, mdbDropdownMenu,
        mdbModal,mdbBtnGroup,mdbRow,mdbCol,mdbInput,
        mdbModalHeader,mdbPagination, mdbPageItem, mdbPageNav,
        mdbModalBody,
        mdbModalFooter,
        edit_col,
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
      value: '',
      options: ['10','25','50','100'],
      promp: false,
      num: null,
      confirm: false,
      showcheck_form : false,
    }
  },
  methods: {
    async checklist (option){

        this.showcheck_form = option;
        this.$emit('update_column');
      },
      clicked_filter()
      {
        this.$emit('clicked_filter');
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
          console.log('target : '  + this.num_target)
          this.$emit('for_edit',this.datasource.rows[this.num_target]);
        },
        deleteRow(ev) {
            this.confirm = true
            console.log('target : '  + this.num_target)
            this.num_target = ev.target.dataset.row
            //appData.updated()
        },
    },
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">

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
