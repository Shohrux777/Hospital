<template>
  <div>
    <form @submit.prevent="submit">
        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input v-model="x_name"  size="sm" :label="$t('InputName')" icon="file-signature" group type="text" validate error="wrong" success="right"/>
              <small class="invalid-text pt-2" style="margin-left: 30px;"  v-if="$v.x_name.$dirty && !$v.x_name.required" >
                  {{$t('name_invalid_text')}}
              </small>
            </mdb-col>


          </mdb-row>
          <!-- <mdb-row>
            <mdb-col class="col-12 col-sm-12" v-bind:class="{'col-md-8 col-lg-6':notFull}">
              <mdb-input v-model="fp_name" size="sm" :label="$t('InputNameForPrint')" icon="tag" group type="text" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row> -->


          <!-- Default checked -->
          <hr class="mt-5"/>

          <mdb-btn  @click="submit_continue" color="primary" m="r3"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>

          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon icon="check" class="mr-2"/>{{$t('add')}}</mdb-btn>
        </div>
      </form>

       <massage_box :hide="modal_status" :detail_info="modal_info"
        m_text="Не удалось добавить новый склад!" @to_hide_modal = "modal_status= false"/>
      <Toast ref="message"></Toast>

  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import { required } from 'vuelidate/lib/validators'
  import {
    mdbInput,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";
// import localizeFilter from '../../filters/localize.filter';

  export default {
    components: {
      mdbInput,
      mdbIcon,
      mdbBtn,
      mdbRow,
      mdbCol

    },
    props : {
      notFull : {type:Boolean, default:true}
    },
    data(){
      return{
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,
        id : this.$route.params.id,

        x_name : '',
        status : true
      }
    },
    validations :
    {
      x_name: {required}
    },
    // async created()
    // {
    //   if(this.id > 0)
    //   {
    //       const res = await fetch(this.$store.state.hostname + '/xr/' + this.id);
    //       const data = await res.json();

    //       this.x_name = data.x_name;
    //       this.fp_name = data.x_name2;

    //   }
    // },
    methods : {
      ...mapActions(['fetchPlanning']),
      ...mapMutations(['Clear_selected_plan_list']),
      cls_wnd()
      {
        this.x_name = '';
      },
       save_data :  async function()
      {
        console.log(this.status)
        if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.alert_text = localizeFilter('please_fill');
          this.$refs.message.error('please_fill')
          return false;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : this.x_name,
              "activeStatus" : this.status,
            })
          };
          const response = await fetch(this.$store.state.hostname + "/ErpPlanningTypes", requestOptions);
          const data = await response.json();
          console.log(data);
          if(data.name)
          {
            // this.alert_text = localizeFilter('Added_successfully');
            this.$refs.message.success('Added_successfully')
            this.fetchPlanning()
            this.Clear_selected_plan_list()
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
              // this.$router.push("/planning");
              this.cls_wnd();
          }
      }
    },


  }
</script>


