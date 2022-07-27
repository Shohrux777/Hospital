<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <!-- <mdb-input :label="$t('name')" v-model="name" outline/> -->
            <!-- <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
                {{$t('name_invalid_text')}}
              </small> -->
            <RegSelect
              :label="$t('service_group')"
              @select="service_group_func"
              :options="get_service_group_list"
              :selected="serviceGroup_name"
             />
          </div>
          <div class="col-12">
             <small v-if="$v.serviceGroup_name.$dirty && serviceGroup_id == null" class="invalid-text pt-4" >
                {{$t('select_item')}}
              </small>
          </div>

          <div class="custom-control custom-switch pl-5 mt-4 ml-2 mb-3">
              <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
              <label class="custom-control-label " for="customSwitch1">Не возвращай деньги</label>
          </div>

          
          <div class="text-right container border-top"  >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:12px; font-size:10px;">Добавить</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>

   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
</div>
</template>
<script>
  import { mdbBtn,   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
import RegSelect from '../../../components/RegSelect.vue'

  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      RegSelect
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        loading: false,

        name: '',     
        id: 0,
        serviceGroup_name: '',
        serviceGroup_id: null,
        status: false
        
      }
    },
    validations: {
      // name: {required},
      serviceGroup_name : {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['get_service_group_list']),
  async mounted(){
    await this.fetch_province();
    await this.options;
    this.fetch_service_group();
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_province','fetch_service_group_show_doc', 'fetch_service_group']),
      update(){
        console.log('da salom')
        console.log(this.options)
        this.id = this.options.id;
        this.status = this.options.withoutReturnStatus;
        this.serviceGroup_name = this.options.name;  
        this.serviceGroup_id = this.options.service_group_id;  
      },
      service_group_func(option){
        console.log(option)
        this.serviceGroup_id = option.id
        this.serviceGroup_name = option.name
      },
      
      cls_wnd(){
        // this.name = '';
        this.id = 0;
        this.serviceGroup_name = '';
        this.serviceGroup_id = null;
      },
      async submit(){
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
            // "name" : this.name,
            "hospitalServiceTypeGroupId" : this.serviceGroup_id,
            "id" : this.id,
            "withoutReturnStatus": this.status,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/HospitalServiceTypeByGroupPermissions', requestOptions)
        const data = await response.json()
        console.log(data)
        this.loading = false;
        if(data.id){
          this.cls_wnd()
          this.fetch_service_group_show_doc()
          this.$refs.message.success('Added_successfully')
        }
        else{
          this.$refs.msg.error('Error_successfully')

          // this.modal_info = data.detail + "    (" + data.routine + ")";
          // this.modal_status = true;
          return false;
        }
          
        

      },
    }
    

}
</script>

<style scoped>

</style>