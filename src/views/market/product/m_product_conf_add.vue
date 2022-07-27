<template>
  <div>
   <!--Navbar-->
    
    <!--/.Navbar-->
    <main class="p-4 m-4 shadow" style="border-radius: 7px;">
      <form @submit.prevent="submit">
        <div class="container ">

           <mdb-row>
            <mdb-col class="col-12 col-sm-6 col-md-6 col-lg-6">
              <erpSelect
                :options ="get_m_product_list.rows"  btnshow="false"
                @select="products"
                :selected="product_name"
                :label="$t('choose_product')"
              />
              <small v-if="$v.product_name.$dirty && product_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            </mdb-col>
            <!-- <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6 ">
                <mdb-input v-model="image" v-on:change="previewFile" type="file"  class="shadow text-right ml-2"  />
              </mdb-col> -->
          </mdb-row>
          
           <mdb-row>
            <mdb-col class="col-12 col-sm-6 col-md-6 col-lg-6">
              <erpSelect
                :options="sub_product_group_list"    btnshow="false"
                @select="group_product"
                :selected="group_product_name"
                :label="$t('main_group')"
              />
              <small v-if="$v.group_product_name.$dirty && group_product_id == null" class="invalid-text pt-2" >
                  {{$t('select_item')}}
              </small>
            </mdb-col>
            <!-- <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-6 ">
                <mdb-input v-model="image" v-on:change="previewFile" type="file"  class="shadow text-right ml-2"  />
              </mdb-col> -->
          </mdb-row>
          <!-- <div class="user_img">
            <img src="" id="prewImage" class="img-fluid img-thumbnail img-responsive shadow" alt="">
          </div>  -->

           <mdb-row>
            <mdb-col col="4" class="col-8 col-sm-6 col-md-6 col-lg-4">
              <mdb-input v-if="showfor_print"  v-model="barecode" size="sm" :label="$t('barcode')" icon="barcode" group type="number" validate error="wrong" success="right"/>
            </mdb-col>
            <mdb-col col="2">
              <!-- Default checked -->
              <!-- <div class="custom-control custom-switch pt-4 pl-5">
                <input v-model="mainProduct" type="checkbox" class="custom-control-input" id="customSwitch1" >
                <label class="custom-control-label " for="customSwitch1">{{$t('mainGroup')}}</label>
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
      group_product_name: { required },
      product_name: { required },
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,

        id: this.$route.params.id,
     
        mainProduct : false,
        product_id : null,
        product_name : '',
        group_product_name: '',
        group_product_id: null,
        ed_izmAddBtn: false,
        showfor_print : false,
      }
    },
    // async created(){
    //   if(this.id > 0)
    //   {
    //       const res = await fetch(this.$store.state.hostname + '/MarketProducts/' + this.id);
    //       const data = await res.json();
    //       console.log(data);
    //       this.x_name = data.name;
    //       this.fp_name = data.nameForPrint
    //       // this.barecode = null
    //       this.image = data.image;
    //       this.mf_name = data.manifacturerName;
    //       this.code = data.code;
    //       this.price = data.price;
    //       this.specs =data.specs;
    //       this.status = true
    //       this.main_product_id = data.marketUnitMeasurmentId,
    //       this.main_product_name = ' '
    //       this.note = data.note
    //   }
    // },
    methods : {
      ...mapActions(['fetch_m_product', 'fetch_m_group']),
      ...mapMutations(['onSelect_pTList','onSelect_selected_pTList','Clear_selected_plan_list']),

        // previewFile(){
        //   const preview = document.getElementById('prewImage');
        //   const file = document.querySelector('input[type=file]').files[0];
        //   const reader = new FileReader();
        //   reader.addEventListener("load", function () {
        //   // convert image file to base64 string
        //     this.image =  reader.result;
        //     // console.log(this.picture);
        //     preview.src = reader.result;
            
        //   }, true);
        //   if (file) {
        //     reader.readAsDataURL(file);
        //   }
        // },

      products(data){
         console.log(data.id)
        this.product_name = data.name;
        this.product_id = data.id;
      },
       group_product(data){
         console.log(data.id)
        this.group_product_name = data.name;
        this.group_product_id = data.id;
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
        this.product_id = null
        this.product_name = ''
        this.group_product_id = null
        this.group_product_name = ''
        this.id = 0;
      },
      save_data :  async function()
      {
      console.log(this.main_product_id)

        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "id": this.id,
              "marketProductId" : this.product_id,
              "marketProductGroupId" : this.group_product_id,
            })
          };
          const response = await fetch(this.$store.state.hostname + "/MarketProductGroupDetails", requestOptions);
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
           this.$router.push("/m_product_conf");
        }
      }
    },
    computed:mapGetters(['get_m_product_list', 'sub_product_group_list']),

    async mounted(){
      //  console.log(localStorage.name)
      console.log(this.id)
      await this.fetch_m_group();
      await this.fetch_m_product();
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
  position: absolute;
  top: 150px;
  right: 4.4%;
  width: 35%;
  height: 400px;
  border: none;
}
.user_img img{
  max-width: 100%;
  max-height: 400px;
}
</style>
