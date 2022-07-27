<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 py-2">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Название должности" v-model="name" outline/>
            <mdb-input label="Код" class="mt-3" v-model="code" outline/>
          </div>
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">Добавить</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  
</div>
</template>

<script>
  import { mdbBtn, mdbInput   } from 'mdbvue';
  import {mapActions} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput
    },
    data(){
      return{
        name: '',
        code: '',        
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
      this.code = this.options.code
    }else{
      this.id = 0
      this.name = ''
      this.code =''
    }
  },
    methods: {
      ...mapActions(['fetch_position']),

      async submit(){
        if(this.name !== '' && this.code !== ''){
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + '/Positions/addPosition?Id=' + this.id + '&Name=' + this.name + '&Code=' + this.code)
          const data = await response.json()
          this.loading = false;
          console.log(data)
          if(data){
            this.name = '';
            this.code = '';
            this.id = 0;
            this.fetch_position();
            this.$refs.message.success('Added_successfully')
          }
          
        }
        else{
          this.$refs.message.warning('please_fill')
        }
        

      },
    }
    

}
</script>

<style scoped>

</style>