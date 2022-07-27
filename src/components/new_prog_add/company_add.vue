<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Название" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <div class="d-flex">
              <div class="custom-control custom-checkbox px-5 ">
                  <input type="checkbox" v-model="client" @click="clientFunc" class="custom-control-input" id="defaultUnchecked1">
                  <label class="custom-control-label" for="defaultUnchecked1">Клиент</label>
              </div>
              <div class="custom-control custom-checkbox px-5 ">
                  <input type="checkbox" v-model="postav" @click="postavFunc"  class="custom-control-input" id="defaultUnchecked2">
                  <label class="custom-control-label" for="defaultUnchecked2">Поставщик</label>
              </div>
              <div class="custom-control custom-checkbox px-5 ">
                  <input type="checkbox" v-model="filial" @click="filialFunc"  class="custom-control-input" id="defaultUnchecked3">
                  <label class="custom-control-label" for="defaultUnchecked3">Филиал</label>
              </div>
            </div>
            <mdb-input label="Тел.номер" class="mt-3" v-model="phone" outline/>
            <mdb-input label="Адрес" class="mt-3" v-model="address" outline/>

          </div>
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">{{$t('add')}}</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>

  
</div>
</template>

<script>
  import { mdbBtn, mdbInput   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput
    },
     validations: {
      name: {required},
    },
    data(){
      return{
        name: '',   
        id: 0,
        loading: false,
        client: false,
        postav: false,
        filial: false,
        address: '',
        phone: ''
      }
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  async mounted(){
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.id = this.options.id
      this.name = this.options.name
      this.client = this.options.client;
      this.postav = this.options.supplier;
      this.filial = this.options.maincompany;
      this.address = this.options.phoneNumber;
      this.phone = this.options.address;
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetchKontragets']),
      cls_wnd(){
        this.name = '';
        this.id = 0;
        this.client = false;
        this.postav = false;
        this.filial = false;
        this.address = '';
        this.phone = '';
      },
      clientFunc(){
        this.filial = false;
      },
      postavFunc(){
        this.filial = false;
      },
      filialFunc(){
        this.client = false;
        this.postav = false;
      },
      async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
          this.loading = true;
           const response = await fetch(this.$store.state.hostname + '/Companies/addUpdateCompany?Id=' + this.id + '&companyName=' 
           + this.name + '&phoneNumber=' + this.phone + '&address=' + this.address + '&client=' + this.client + '&supplier=' 
          + this.postav + '&maincompany=' + this.filial)
          const data = await response.json()
          console.log(data)
          if(data.id){
            this.cls_wnd();
            await this.fetchKontragets({ hostname: this.$store.state.hostname});
            this.loading = false;
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.$refs.msg.error('Error_successfully')
          }
        

      },
    }
    

}
</script>

<style scoped>

</style>