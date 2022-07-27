<template>
     
<div>
    <form v-on:submit.prevent="submit" >
      <div class="addxizmat px-2 pb-2">
        <div class="row">
          <div class="col-12">
            <RegSelect
              label="Лекарство"
              @select="province_func"
              :options="get_m_product_list.rows"
              :selected="province_name"
             />
          </div>
          <div class="col-12">
             <small v-if="$v.province_name.$dirty && province_id == null" class="invalid-text pt-4" >
                {{$t('select_item')}}
              </small>
          </div>
          <div class="col-12">
            <mdb-input :label="$t('qty')" v-model="qty" outline/>
            <small class="invalid-text"  v-if="$v.qty.$dirty && !$v.qty.required" >
                {{$t('name_invalid_text')}}
              </small>
          </div>

            
          
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:28px;">Добавить</mdb-btn>
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
  import { mdbBtn, mdbInput   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
import RegSelect from '../../components/RegSelect.vue'

  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput,RegSelect
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,

        qty: '',     
        id: 0,
        province_name: '',
        province_id: null,
        
      }
    },
    validations: {
      qty: {required},
      province_name : {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },

  computed: mapGetters(['get_province_list', 'get_m_product_list', 'get_service_medicine',]),
  async mounted(){
    await this.fetch_province();
    this.fetch_m_product();
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_province','fetch_district', 'fetch_m_product', 'fetch_service_medicine_list']),
      update(){
        console.log('da salom')
        console.log(this.options)
        this.id = this.options.id;
        this.qty = this.options.qty;
        this.province_name = this.options.province_name;  
        this.province_id = this.options.comp_id;  
      },
      province_func(option){
        console.log(option)
        this.province_id = option.id
        this.province_name = option.name
      },
      
      cls_wnd(){
        this.qty = '';
        this.id = 0;
        this.province_name = '';
        this.province_id = null;
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
          "serviceTypeId": this.get_service_medicine,
          "qty" : this.qty,
          "marketProductId" : this.province_id,
          "id" : this.id,
          // "code" : 0
          })
        };
        const response = await fetch(this.$store.state.hostname + '/HospitalServiceRecipes', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd()
          this.fetch_service_medicine_list(this.get_service_medicine)
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