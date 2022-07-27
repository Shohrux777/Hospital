<template>
  <div class="returnMoney">
   <loader v-if="loading"/>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-12">
          <lineSelect
            :options="get_users_list.rows"
            :searchshow="true"
            @select="selectUser"
            :selected="user_name"
            :label="$t('user')"
          />
        </div>
        <div class="col-12">
          <small v-if="$v.user_name.$dirty && user_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
            </small>
        </div>
        <div class="col-12">
          <mdb-input type="number" v-model="price" size="sm" :label="$t('price')" outline></mdb-input>
          <small class="invalid-text"  v-if="$v.price.$dirty && !$v.price.required" >
            {{$t('name_invalid_text')}}
          </small>
        </div>
        <div class="col-12" >
          <mdb-input type="text" style="margin-top:0px;" v-model="reason" size="sm" :label="$t('reason')" outline></mdb-input>
          <small class="invalid-text"  v-if="$v.reason.$dirty && !$v.reason.required" >
            {{$t('name_invalid_text')}}
          </small>
        </div>
        
        <div class="col-12 text-right">
          <mdb-btn type="submit" color="success py-2 px-4" style="font-size:10px;">
            {{$t('add')}}
          </mdb-btn>
        </div>
      </div>
    </form>
    <Toast ref="message"></Toast>

  </div>
</template>

<script>
  import lineSelect from "../../components/hospital/UserlineSelect.vue";
  import { mdbBtn, mdbInput  } from 'mdbvue';
  import {mapActions, mapGetters} from 'vuex'
  import { required } from 'vuelidate/lib/validators'
export default {
components:{
  lineSelect, mdbInput,mdbBtn
  },
  data(){
    return{
      price: null,
      reason: '',
      user_name: '',
      user_id: null,
      loading: false,
    }
  },
  computed: mapGetters(['get_users_list']),
  validations: {
    price: {required},
    reason: {required},
    user_name : {required}
  },
  mounted(){
    this.fetch_users()
  },
  methods:{
    ...mapActions(['fetch_users']),
        selectUser(option){
        console.log(option)
        this.user_name = option.data.fio
        this.user_id = option.data.id
      },
      cls_wnd(){
        this.price =  null;
        this.reason =  '';
        this.user_name = '';
        this.user_id = null;
      },
      async submit(){
        console.log('dasdas')
        if(this.$v.$invalid )
            {
              this.$v.$touch();
              this.$refs.message.warning('please_fill')
              return false;
            }
            // var time1 = new Date()
            const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "reason" : this.reason,
                "price" : this.price,
                "usersId" : this.user_id,
                // "createdDateTime": time1.toISOString(),
                "authorizationId": localStorage.AuthId,
                // "noteStr": "",
              // "code" : 0
              })
            };
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + '/ReturnMoneys', requestOptions)
            const data = await response.json()
            this.loading = false;
            console.log(data)
            if(data.id){
              this.cls_wnd()
              this.$refs.message.success('Added_successfully')
            }
            else{
              this.$refs.msg.error('Error_successfully')
              return false;
            } 

      }
  }
}
</script>

<style>

</style>