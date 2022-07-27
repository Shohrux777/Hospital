<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input :label="$t('name')" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
          </div>
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px">{{$t('add')}}</mdb-btn>
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
    }else{
      this.cls_wnd();
    }
  },
    methods: {
      ...mapActions(['fetch_province']),
      cls_wnd(){
        this.name = '';
        this.id = 0;
      },
      async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
          this.loading = true;
           const response = await fetch(this.$store.state.hostname + '/Provinces/addViloyat?Id=' + this.id + '&Name=' + this.name)
          const data = await response.json()
          // console.log(data)
          this.loading = false;
          if(data.id){
            this.cls_wnd();
            this.fetch_province();
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