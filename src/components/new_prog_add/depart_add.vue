<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class="addxizmat px-2 pb-2">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Название oтдель" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
                {{$t('name_invalid_text')}}
              </small>
            <RegSelect
              label="Компания"
              @select="company_func"
              :options="allKontragents.rows"
              :selected="company_name"
             />
          </div>
          <div class="col-12">
             <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text pt-4" >
                {{$t('select_item')}}
              </small>
          </div>

            
          
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:28px; font-size:10px;">Добавить</mdb-btn>
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
        loading : false,
        modal_info : '',
        modal_status: false,

        name: '',     
        id: 0,
        company_name: '',
        company_id: null,
        
      }
    },
    validations: {
      name: {required},
      company_name : {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  computed: mapGetters(['allKontragents']),
  async mounted(){
    await this.fetchKontragets({ hostname: this.$store.state.hostname});
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetchKontragets','fetchDepartments']),
      update(){
        console.log('da salom')
        console.log(this.options)
        this.id = this.options.id;
        this.name = this.options.name;
        this.company_name = this.options.company_name;  
        this.company_id = this.options.comp_id;  
      },
      company_func(option){
        console.log(option)
        this.company_id = option.id
        this.company_name = option.name
      },
      
      cls_wnd(){
        this.name = '';
        this.id = 0;
        this.company_name = '';
        this.company_id = null;
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
          "name" : this.name,
          "companyId" : this.company_id,
          // "active_status" : this.status,
          "id" : this.id,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Departments', requestOptions)
        const data = await response.json()
        if(data.id){
          this.cls_wnd()
          this.fetchDepartments()
          this.loading = false;
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