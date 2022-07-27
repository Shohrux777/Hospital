<template>
  <div>
     <form @submit.prevent="submit">
        <div class="container ">
          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-12 col-lg-12">
              <mdb-input v-model="x_name"  size="sm" :label="$t('ServiceGroupName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text pt-2" style="margin-left: 30px;"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                {{$t('name_invalid_text')}}
              </small>
            </mdb-col>
            <mdb-col class="col-12 col-sm-12 col-md-6 col-lg-6 mt-2">
              <mdb-input  v-if="showfor_print" v-model="fp_name" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row>
          
          <hr class="mt-5"/>
          <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size:10px;"
            p="r4 l4 t2 b2"> {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn type="submit" color="success" m="r3" style="font-size:10px;"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('save')}}</mdb-btn>
        </div>
      </form>

      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>


<script>

import {mapActions, mapMutations, mapGetters} from "vuex";
import { required } from 'vuelidate/lib/validators'
  import {
     mdbInput, mdbIcon, mdbRow, mdbBtn,
      mdbCol
  } from "mdbvue";


  export default {
    name: "category_add",
    components: {

      mdbInput,
      mdbIcon,
      mdbRow,
      mdbBtn,
      mdbCol,
    },
    validations: {
      x_name: {
        required
      },
      //comp_name : {required}
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,

        x_name : '',
          showfor_print : false,
      }
    },
    methods : {
      ...mapActions(['fetch_service_group']),
      ...mapMutations(['onSelect_selected_xr_list']),
      cls_wnd()
      {
        this.x_name = ''
        this.fp_name = ''
      },
       async submit_continue()
      {
        if(await this.save_data())
        {
          this.cls_wnd();
        }
      },
       save_data :  async function()
      {
         if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.error('please_fill')
          return false;
        }

        const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
              "name" : this.x_name,
            })
          };

          const response = await fetch(this.$store.state.hostname + "/HospitalServiceTypeGroups", requestOptions);
          const data = await response.json();
          if(data.name)
          {
            this.$refs.message.success('Added_successfully')
            this.fetch_service_group();
            this.$emit('close');
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

            this.$emit('submit_success');
          }
      }
    },
    mounted(){
      // this.fetch_poduct_type();
      // this.fetchMeasure();
    },
    computed:mapGetters(['all_poduct_type','allXrList','selected_xr_list']),

  }
</script>


