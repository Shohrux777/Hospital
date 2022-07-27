<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/sklad">
        <a class="ml-2 mr-2 p-3" :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('New_warehouse')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 6px;">
      <form @submit.prevent="submit">
        <div class="container">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6 mt-0">
              <mdb-input v-model.trim="d_name" size="sm" :label="$t('InputName')" icon="file-signature"/>
              <small class="invalid-text"  v-if="$v.d_name.$dirty && !$v.d_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <erpSelect
                  :options="allDepartments.rows" :btnshow="true"
                  @select="selectDeptL"
                  @btn_add="shown = true"
                  :selected="dept_name"
                  :label="$t('department')"
                />
                <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text" >
                  {{$t('select_item')}}
                </small>

            </mdb-col>

          </mdb-row>


          <!-- Default checked -->
          <div class="custom-control custom-switch pt-4 pl-5">
              <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
          </div>

          <hr class="mt-5"/>
           <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2"> {{$t('Add_and_continue')}}
          </mdb-btn>

          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('add')}}
          </mdb-btn>

        </div>
      </form>

    </main>




    <mdb-modal :show="shown"  @close="shown = false" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('New_department')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
            <dept_add :notFull="false" @submit_success="deptSubmit_success"/>
      </mdb-modal-body>
    </mdb-modal>


  <div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>


  </div>
</template>

<script>
import dept_add from "../../components/wnd_for_add/dept_add"
import {mapActions,mapGetters} from "vuex"
import { required } from 'vuelidate/lib/validators'
import erpSelect from "../../components/erpSelect"

  import {
    mdbNavbar,
    mdbCardTitle,
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbCol
  } from "mdbvue";
// import localizeFilter from '../../filters/localize.filter'

  export default {
    components: {
      mdbNavbar,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbCardTitle,
      mdbInput,
      mdbIcon,
      mdbBtn,dept_add,
      mdbRow,erpSelect,
      mdbCol,
    },
    data()
    {
      return{
        modal_info : '',
        modal_status: false,
        shown: false,

        id : this.$route.params.id,

        status : true,
        d_name : '',

        dept_name : ' ',
        dept_id: null,
        call_department : false,
      }
    },
    validations: {
      d_name: {
        required
      },
      dept_name : {required}
    },

     methods: {
       ...mapActions(['fetchDepartments']),
       selectDeptL(data){
         this.dept_name = data.name;
         this.dept_id = data.id;
         console.log(data)
       },
        deptSubmit_success()
        {
           this.shown = false
          this.fetchDepartments()
        },

      cls_wnd()
      {
        this.dept_name = '';
        this.dept_id = null;
        this.d_name = '';
      },
      save_data : async function()
      {

        if(this.$v.$invalid || this.dept_id == null)
        {
          this.$v.$touch();
          // this.alert_text = localizeFilter('please_fill');
          this.$refs.message.warning('please_fill')
          return false;
        }

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "name" : this.d_name,
            "departmentId" : this.dept_id,
            "activeStatus" : this.status,
            "id" : this.id,
            })
          };
          // console.log(requestOptions.body);
          const response = await fetch(this.$store.state.hostname + "/ErpWarehouses", requestOptions);
          const data = await response.json();
          //this.addDept(data);
          if(data.id)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }

      },
      async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
      async submit()
      {
        if(await this.save_data())
        {
            this.$store.state.alert = true;

            this.$router.push("/sklad");
        }
      }
    },
    mounted(){
      this.fetchDepartments();
    },
   async created()
    {
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/ErpWarehouses/' + this.id);
          const data = await res.json();
          console.log('shohrux')
          console.log(data)
          this.d_name = data.name;
          this.dept_name = data.department;
          this.dept_id = data.departmentId;
      }
    },
    computed : mapGetters(['allDepartments']),

  }
</script>


<style scoped>
main {
  background-color: #fff;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

/* for select */
input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}


</style>
