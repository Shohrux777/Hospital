<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit" >
      <div class=" px-2 pb-2">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Login" v-model="login" outline/>
            <small class="invalid-text"  v-if="$v.login.$dirty && !$v.login.required" >
                {{$t('name_invalid_text')}}
              </small>
            <mdb-input label="Parol" class="mt-3"  v-model="password" outline/>
             <small class="invalid-text"  v-if="$v.password.$dirty && !$v.password.required" >
                {{$t('name_invalid_text')}}
              </small>
            <RegSelect
            class="mt-3"
              :label="$t('Company')"
              @select="company_func"
              :options="allKontragents.rows"
              :selected="company_name"
             />
          </div>
          <!-- <div class="col-12">
             <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text pt-4" >
                {{$t('select_item')}}
              </small>
          </div> -->
          <div class="col-12" :class="{'applied': hide}">
            <RegSelect
            class="mt-4 mb-2"
              :label="$t('user_type')"
              @select="user_type_func"
              :options="user_type_list"
              :selected="userType_name"
             />
          </div>

            
          
          
          <div class="text-right container" >
            <mdb-btn color="danger px-4 py-2" @click="cancel" style="margin-top:20px; font-size:10px;">{{$t('cancel')}}</mdb-btn>
            <mdb-btn color="primary px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">{{$t('add')}}</mdb-btn>
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
 import md5 from 'js-md5'

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
        loading: false,
        login: '',
        password: '',  
        md: '',      
        id: 0,
        qty: '',
        userId: this.user,
        company_name: '',
        company_id: null,
        companyAuth: {},
        userTypeAuth: {},
        userType_name: '',
        userType_id: 0,
        user_type_list: [{
          name: 'Админ',
          id: 0
        },
        {
          name: 'Доктор',
          id: 1
        },
        {
          name: 'Регистратура',
          id: 5
        },
        {
          name: 'Кассир',
          id: 2
        },
        {
          name: 'Лаборатория',
          id: 3
        },
        {
          name: 'Хисобчи',
          id: 4
        },
        
        ]
        
      }
    },
    validations: {
      login: {required},
      password: {required},
      company_name : {required}
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      },
      user:{
        type: Number,
        dafault: null,
      },
      hide:{
        type: Boolean,
        default: false,
      }
  },
  computed: mapGetters(['allKontragents']),
  async mounted(){
    await this.fetchKontragets({ hostname: this.$store.state.hostname});
    await this.options;
    console.log(this.options)
    if(this.options != null){
      this.update();
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetchKontragets', 'fetch_users']),
      // handleHashing (data) {
      //   console.log(data);
      //   this.password = data
      //   this.md = md5(data)
      //   console.log(this.md)
      // },
      update(){
        console.log('editchada')
        console.log(this.options)
        this.id = this.options.id;
        this.login = this.options.login;
        this.password = '';
        this.userTypeAuth = this.user_type_list.find(item => item.id == this.options.userType)
        this.companyAuth = this.allKontragents.rows.find(comp => comp.id == this.options.companyId)
        this.company_name = this.companyAuth.name;  
        this.company_id = this.companyAuth.id;  
        this.userType_id = this.userTypeAuth.id;
        this.userType_name = this.userTypeAuth.name;
        this.userId = this.options.usersId
      },
      company_func(option){
        console.log(option)
        this.company_id = option.id
        this.company_name = option.name
      },

      user_type_func(option){
        console.log(option)
        this.userType_id = option.id
        this.userType_name = option.name
      },
      
      cls_wnd(){
        this.login = '';
        this.password = '';
        this.id = 0;
        this.company_name = '';
        this.company_id = null;
        this.userType_name = '';
        this.userType_id = null;
      },
      cancel(){
        this.$emit('close');
      },
      async submit(){
        this.md = await md5(this.password)
          if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Authorization/addAuth?Id=' + this.id + '&Login=' + 
          this.login + '&Password=' + this.md + '&companyId=' + this.company_id + '&UsersId=' +  this.userId + '&UserType=' + this.userType_id)
          const data = await response.json()
          console.log(data)
        if(data.id){
          this.cls_wnd()
          this.loading = false;
          this.$refs.message.success('Added_successfully')
           await fetch(this.$store.state.hostname + '/Authorization')
          this.fetch_users();
          this.$emit('close');
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
.applied{
  pointer-events: none;
  background:#fcfcfc;
}
</style>