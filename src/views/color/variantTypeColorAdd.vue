<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/variantTypeColor">
        <a class="ml-2 mr-2 p-3" :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Add_color_variant_type')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 6px;">

      <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col col="6">
              <mdb-input v-model="g_name" size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text pt-2" style="margin-left:30px;"  v-if="$v.g_name.$dirty && !$v.g_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>

          </mdb-row>
          <mdb-row >
            <mdb-col col="6">
              <mdb-input v-model="code" size="sm" :label="$t('color_code')" icon="color" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text pt-2" style="margin-left: 30px;"  v-if="$v.code.$dirty && !$v.code.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>

          </mdb-row>
          <mdb-row >
            <mdb-col col="6">
              <mdb-input v-model="gCode" size="sm" :label="$t('gCode')" icon="color" group type="text" validate error="wrong" success="right"/>
            </mdb-col>

          </mdb-row>

          <!-- Default checked -->
          <div class="custom-control custom-switch pt-4 pl-5">
              <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">{{$t('status')}}</label>
          </div>

          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn color="success" m="r3" type="submit"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('add')}}</mdb-btn>
        </div>
      </form>
    </main>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>

      <Toast ref="message"></Toast>

  </div>
</template>



<script>
// import localizeFilter from '../../filters/localize.filter';
import { required } from 'vuelidate/lib/validators'
  import {
    mdbNavbar,
    mdbCardTitle,
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";

  export default {

    components: {
      mdbNavbar,
      mdbCardTitle,
      mdbInput,
      mdbIcon,
      mdbBtn,
      mdbRow,
      mdbCol,
    },
    validations: {
      g_name: {
        required
      },
      code: {
        required
      },


    },

    data(){
      return {
        // alert_text : '',
        // alert_success : false,
        // alert_danger : false,
        modal_info : '',
        modal_status: false,

        id : this.$route.params.id,
        g_name: '',
        status : true,
        code: '',
        gCode: '',
      }
    },
    async created()
    {
      if(this.id > 0)
      {
          const res = await fetch(this.$store.state.hostname + '/ErpColorVariantTypes/' + this.id);
          const data = await res.json();

          this.g_name = data.name;
          this.code = data.code;
          this.gCode = data.gCode;
          this.status = data.activeStatus
      }
    },
    methods: {
      async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/variantTypeColor_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
      cls_wnd()
      {
        this.g_name = ''
        this.code = ''
        this.gCode = ''
        this.status = true

      },
      save_data :  async function()
      {
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
            "name" : this.g_name,
            "code": this.code,
            "gCode": this.gCode,
            "activeStatus" : this.status,
            "id" : this.id,
            })
          };

          const response = await fetch(this.$store.state.hostname + "/ErpColorVariantTypes", requestOptions);
          const data = await response.json();
          // console.log(data)
          if(data)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            // this.alert_success = true;
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
            return false;
          }
      },
     async submit()
      {
        if(await this.save_data())
        {
          this.$router.push("/variantTypeColor");
        }

      }
    },

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

input[type="color"] {
	opacity: 0;
	display: block;
	width: 24px;
	height: 24px;
	border: none;
}
#color-picker-wrapper {
	float: left;
}
</style>
