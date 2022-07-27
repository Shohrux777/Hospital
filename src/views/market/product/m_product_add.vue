<template>
  <div>
   <!--Navbar-->
    
    <!--/.Navbar-->
    <main class="p-4 m-4 shadow" style="border-radius: 7px;">
      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6">
              <mdb-input v-model="x_name"  size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                {{$t('name_invalid_text')}}
              </small>

              <mdb-input v-model="price" class="mt-5" size="sm" type="number"  :label="$t('price')" icon="dollar-sign" group validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.price.$dirty && !$v.price.required" >
                {{$t('name_invalid_text')}}
              </small>

              <mdb-input hidden  v-model="fp_name" class="mt-5" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>

              <mdb-input v-model="code" size="sm" class="mt-5" :label="$t('code')" icon="" group type="text" validate error="wrong" success="right"/>
              <small  class="invalid-text pt-2"  v-if="$v.code.$dirty && !$v.code.required" >
                {{$t('name_invalid_text')}}
              </small>

              <erpSelect
                :options = "m_measure_list"  @btn_add="ed_izmAddBtn = true"
                @select="onS_edizm"
                :selected="ed_izm_data_name"
                :label="$t('ed_izm1')"
                class="mt-5"
              />
              <small v-if="$v.ed_izm_data_name.$dirty && ed_izm_data_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>

              <mdb-input v-model="mf_name" size="sm" class="mt-5" :label="$t('manifacturerName')" icon="" group type="text" validate error="wrong" success="right"/>
              <mdb-input v-model="specs"  size="sm" class="mt-5" :label="$t('specs')" icon="" group type="textarea"  validate error="wrong" success="right"/>
            </mdb-col>
            <mdb-col class="col-12 col-sm-8 col-md-8 col-lg-6 p-4 mt-4">
              <div class="d-flex justify-content-center align-items-center"> 
                <div v-if="PicShow" class="user_img_test border shadow d-flex justify-content-center align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo-off mr-1" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <line x1="15" y1="8" x2="15.01" y2="8" />
                    <path d="M19.121 19.122a3 3 0 0 1 -2.121 .878h-10a3 3 0 0 1 -3 -3v-10c0 -.833 .34 -1.587 .888 -2.131m3.112 -.869h9a3 3 0 0 1 3 3v9" />
                    <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l5 5" />
                    <path d="M16.32 12.34c.577 -.059 1.162 .162 1.68 .66l2 2" />
                  </svg>
                  <h5 class="m-0 text-danger">{{$t('no_picture')}}</h5>
                  <!-- <img src="" id="prewImage" class="img-fluid img-thumbnail img-responsive shadow" alt=""> -->
                </div> 
                <div class="user_img " >
                  <img :src="image"  id="prewImage" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                </div>
              </div>
              <mdb-input hidden v-model="image"  id="inputFileToLoad" v-on:change="previewFile" type="file"  class="shadow text-right ml-2"  />
                <div class="text-center  mt-3 ">
                  <label for="inputFileToLoad" style="cursor: pointer;" class="py-1 px-4 bg-primary shadow text-white">
                    {{$t('Upload')}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-rotate" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                      <path d="M11.245 15.904a3 3 0 0 0 3.755 -2.904m-2.25 -2.905a3 3 0 0 0 -3.75 2.905" />
                      <path d="M14 13h2v2" />
                      <path d="M10 13h-2v-2" />
                    </svg>
                  </label>
                </div>
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
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="success" m="r3"
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
import erpSelect from "../../../components/erpSelect";
import m_izm_add from "../../../components/market_add/m_izm_add"
import { required } from 'vuelidate/lib/validators'
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
      erpSelect,
      m_izm_add
    },
    validations: {
      x_name: { required },
      price: { required },
      ed_izm_data_name : {required},
      code:{ required}
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        x_name : '',
        id: this.$route.params.id,
        price:  null,
        image: '',
        mf_name: '',
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
          const res = await fetch(this.$store.state.hostname + '/MarketProducts/' + this.id);
          const data = await res.json();
          console.log(data);
          this.x_name = data.name;
          this.fp_name = data.nameForPrint
          // this.barecode = null
          this.image = data.image;
          this.mf_name = data.manifacturerName;
          this.code = data.code;
          this.price = data.price;
          this.specs = data.specs;
          this.status = true
          this.ed_izm_data_id = data.marketUnitMeasurmentId,
          this.ed_izm_data_name = ' '
          this.note = data.note
          if(this.image){
            this.PicShow = false;
          }
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
        this.name = ''
        this.fp_name = ''
        this.barecode = null
        this.image = '';
        this.mf_name = '';
        this.code = '';
        this.price = null;
        this.specs ='';
        this.status = true
        this.ed_izm_data_id = null
        this.ed_izm_data_name = ''
        this.note = ''
        this.id = 0;
      },
      previewFile() {
        var filesSelected = document.getElementById("inputFileToLoad").files;
            this.PicShow = true;
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            // var newImage = document.createElement('img');
            var img = document.getElementById('prewImage');
            img.src = srcData;
          }
          this.PicShow = false;
          fileReader.readAsDataURL(fileToLoad);
        }
      },
     
      
      save_data :  async function()
      {
        var img = document.getElementById('prewImage');
          this.base64 = img.src;
          console.log(this.base64);
        

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
            "name" : this.x_name,
            "nameForPrint" : this.fp_name,
            "status" : this.status,
            "code" : this.code,
            "specs" : this.specs,
            "manifacturerName" : this.mf_name,
            "image" : this.base64,
            "marketUnitMeasurmentId" : this.ed_izm_data_id,
            "note": this.note,
            "price": this.price
            // "note" : this.note,
            // "selected_xr_id" : this.datasource.map(({xr_tool_id}) => xr_tool_id),
            // "pl_type_id" : this.selectedPTList.map(({id}) => id),

          })
        };
        const response = await fetch(this.$store.state.hostname + "/MarketProducts", requestOptions);
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
           this.$router.push("/m_product");
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
      
      await this.fetch_m_Measure();
    },
    // computed : mapGetters(['category_list','ed_izm_list','XrToolJson',
    //   'productionType_list','planning_type_list','selectedPTList']),

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
