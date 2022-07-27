<template>
  <div>
   <!--Navbar-->
    
    <!--/.Navbar-->
    <main class="p-4 m-4 shadow" style="border-radius: 7px;">
      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <mdb-input v-model="x_name"  size="sm" :label="$t('fullName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                {{$t('name_invalid_text')}}
              </small>

              <mdb-input v-model="phone" class="mt-5" size="sm" type="text"  :label="$t('phone')" icon="phone" group validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.phone.$dirty && !$v.phone.required" >
                {{$t('name_invalid_text')}}
              </small>

               <div class="d-flex timePicer mt-5">   
                  <label  class="timeLabel">{{$t('bornDate')}}</label>
                  <date-picker class="timepiker " id="fordo" style="margin-top: 10px; width: 100%;" v-model="bornDate" format="DD-MM-YYYY"  type="date"></date-picker>
                </div>

              <mdb-input hidden  v-model="fp_name" class="mt-5" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>

              <mdb-input v-model="code" size="sm" class="mt-5" :label="$t('code')" icon="" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.code.$dirty && !$v.code.required" >
                {{$t('name_invalid_text')}}
              </small>

              <mdb-input v-model="specialCode" size="sm" class="mt-5" :label="$t('specialCode')" icon="" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.specialCode.$dirty && !$v.specialCode.required" >
                {{$t('name_invalid_text')}}
              </small>

              <mdb-input v-model="companyName" size="sm" class="mt-5" :label="$t('companyName')" icon="" group type="text" validate error="wrong" success="right"/>

             
            </mdb-col>

          </mdb-row>
          
          <mdb-row v-if="showfor_print">
              <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
                <mdb-input v-model="note" type="textarea"  :label="$t('Descriptions')" icon="pencil-alt" />
              </mdb-col>
              
              
          </mdb-row>
          

           <mdb-row>
            <mdb-col col="4" class="col-8 col-sm-6 col-md-6 col-lg-4">
              <mdb-input v-if="showfor_print"  v-model="barecode" size="sm" :label="$t('barcode')" icon="barcode" group type="number" validate error="wrong" success="right"/>
            </mdb-col>
            <mdb-col col="2">
              <!-- Default checked -->
              <!-- <div class="custom-control custom-switch pt-4 pl-5">
                <input v-model="status" type="checkbox" class="custom-control-input" id="customSwitch1" >
                <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
              </div> -->
            </mdb-col>
          </mdb-row>



          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size:10px"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="success" m="r3" style="font-size:10px"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
        </div>
      </form>
    </main>


    <!-- Central Info Modal -->

    <mdb-modal  :show="ed_izmAddBtn"  @close="ed_izmAddBtn = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('AddIzm')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <m_izm_add/>
      </mdb-modal-body>
    </mdb-modal>
    

    <div>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
    </div>
      <Toast ref="message"></Toast>
    

  </div>
</template>



<script>
import m_izm_add from "../../../components/market_add/m_izm_add"
import { required } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {mapActions,mapGetters, mapMutations} from 'vuex'


  import {
    mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol,

  } from "mdbvue";

  export default {
    x_name: "Product_add",
    components: {
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbInput,
      mdbIcon,
      mdbRow,
      mdbBtn,
      mdbCol, 
      m_izm_add, DatePicker
    },
    validations: {
      x_name: { required },
      phone: { required },
      code:{ required},
      specialCode: { required}
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        x_name : '',
        id: this.$route.params.id,
        phone:  '',
        image: '',
        companyName: '',
        fp_name : '',
        code: '',
        specs:'',
        barecode : null,
        status : true,
        ed_izm_data_id : null,
        ed_izm_data_name : '',
        note : '',
        ed_izmAddBtn: false,
        showfor_print : false,
        PicShow: true,
        base64: '',
        bornDate: null,
        specialCode: "",
        // kg : '',
        // brutto :'',
        // litr : '',
        // metr : '',
        // soni : '',
      }
    },
    async created(){
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/MarketAgents/' + this.id);
          const data = await res.json();
          console.log(data);
          this.x_name = data.fullName;
          this.companyName = data.companyName;
          this.code = data.code;
          this.phone = data.phoneNumber;
      }
    },
    methods : {
      ...mapActions(['fetch_m_Measure']),
      ...mapMutations(['onSelect_pTList','onSelect_selected_pTList','Clear_selected_plan_list']),

      onS_edizm(data){
        this.ed_izm_data_name = data.name;
        this.ed_izm_data_id = data.id;
      },

      async submit_continue()
      
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
      async cls_wnd()
      {
        this.x_name = ''
        this.companyName = '';
        this.code = '';
        this.phone = '';
        this.id = 0;
        this.bornDate = null;
      },
     
      
      save_data :  async function()
      {
        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "id": this.id,
            "fullName" : this.x_name,
            "code" : this.code,
            "companyName" : this.companyName,
            "phoneNumber": this.phone,
            "image": '',
            "specialCode": this.specialCode,
            "bornDateTime": this.bornDate.toISOString(),
            // "note" : this.note,
            // "selected_xr_id" : this.datasource.map(({xr_tool_id}) => xr_tool_id),
            // "pl_type_id" : this.selectedPTList.map(({id}) => id),

          })
        };
        const response = await fetch(this.$store.state.hostname + "/MarketAgents", requestOptions);
        const data = await response.json();
        console.log(data)
        if(data.id)
        {
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = data.detail + "    (" + data.routine + ")";
          this.modal_status = true;
          return false;
        }
        

         
      },

       async submit(){

        if(await this.save_data())
        {
           this.$router.push("/agent");
        }
      },

       getBase64Image(img){
              // Create an empty canvas element
              console.log(img)
              var canvas = document.createElement("canvas");
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;

              // Copy the image contents to the canvas
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              this.base64 = canvas.toDataURL("image/png");
              // console.log(dataURL);
              return this.base64.replace(/^data:image\/(png|jpg);base64,/, "");
        },


    },
    computed:mapGetters(['m_measure_list']),

    async mounted(){
      //  console.log(localStorage.name)
      var uuid = require('uuid');
      this.code = uuid.v1();
      await this.fetch_m_Measure();
    },
    // computed : mapGetters(['category_list','ed_izm_list','XrToolJson',
    //   'productionType_list','planning_type_list','selectedPTList']),

  }
</script>


<style lang="scss" scoped>
main {
  background-color: #fff;
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

.myTable th, .myTable td {
  text-align: left;
  padding: 5px;

}
.user_img{
  /* position: absolute; */
  /* height: 500px; */
  border: none;
}
.user_img img{
  max-width: 100%;
  max-height: 350px;
}
.user_img_test{
  min-height: 350px;
  width: 100%;
  border: none;
}
</style>
