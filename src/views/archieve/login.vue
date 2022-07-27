<template>
  <div class="login">
    <div style="height:100vh; width:100%;" class="d-flex justify-content-center align-items-center backLogin">
      <div>
        <loader v-if="loading"/>
        <div class="text-center">
          <h2 class="">ACCOUNT LOGIN</h2>
        </div>
        <div class="mt-4 d-flex justify-content-center"> 
            <span class="m-0 p-0 text-danger">{{this.error}}</span>
        </div>
        <form v-on:submit.prevent="submit">
          <div class="form  mt-1 mb-5">
            <div class="username border-bottom d-flex justify-content-center align-items-center px-2">
              <div class="d-flex ">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="27" height="27" viewBox="0 0 24 24" stroke-width="1.0" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <input type="text" v-model="login" placeholder="User name">
              <small class="invalid-text" style="margin-top: 115px; margin-left: -125px;"  v-if="$v.login.$dirty && !$v.login.required" >
              {{$t('name_invalid_text')}}
            </small>
            </div>
            <div class="password border-bottom d-flex justify-content-center align-items-center px-2">
              <div class="d-flex ">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="27" height="27" viewBox="0 0 24 24" stroke-width="1.0" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <input type="password" v-model="pass"  @input="handleHashing($event.target.value)" placeholder="Password">
              <small class="invalid-text" style="margin-top: 115px; margin-left: -125px;"   v-if="$v.pass.$dirty && !$v.pass.required" >
                {{$t('name_invalid_text')}}
              </small>
            </div>
            <div class="sub_login d-flex justify-content-center  align-items-center">
               <mdb-btn  color="primary" type="submit" p="r5 l5 t2 b2">{{$t('login')}}</mdb-btn>  
            </div>
          </div>
        </form>
      </div>
    </div>
  <Toast ref="message"></Toast>
  </div>  
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {mdbBtn} from "mdbvue";
import {mapActions, mapGetters} from "vuex"
 import md5 from 'js-md5'
export default {
  components: {
    mdbBtn
  },
  validations: {
    login: {required},
    pass: {required},
  },
  data (){
      return{ 
        list: [],
        pass: '',
        login: '',
        md: '',
        error: '',
        loading: false,
      }
    },
  async mounted(){  
    localStorage.cont_name = '';
    localStorage.cont_id = null;
    await this.fetch_auth_list();
    localStorage.Shablon = ['']
    localStorage.ShablonName = '',
    localStorage.AuthId = null;
    localStorage.Login = ""
    localStorage.docName = ""
    localStorage.Type = null;
    localStorage.docId = null;
    localStorage.size_value = 15
    localStorage.numPage = 1
    localStorage.pageNum = 1
    localStorage.Items_count = 10
    console.log(this.auth_user_list)
    if(this.auth_user_list.length == 0){
      localStorage.Login = "hello"
      localStorage.AuthId = 1;
      localStorage.Type = 0;
      this.$router.push('/m_users')
    }
    // console.log(localStorage.AuthId)
  },
  computed: mapGetters(['auth_user_list']),
  methods: {
    ...mapActions(['fetch_auth_list']),
    handleHashing (data) {
        this.pass = data
        this.md = md5(data)
        // console.log(this.md)
      },
    async submit(){
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
          this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/Authorization/checkuser?password=' + this.md + '&login=' + this.login)
        const data = await response.json()
        this.loading = false;
        console.log(data)
        if(data.id != 0){
          localStorage.Login = data.login
          localStorage.AuthId = data.id
          localStorage.docId = data.users.id
          localStorage.docName = data.users.fio
          localStorage.Type = data.userType
          localStorage.Image = data.users.image
          if(data.userType == 1 || data.userType == 3){
            this.$router.push('/doctor')
          }
          else if(data.userType == 2){
            this.$router.push('/cashbox')
          }
          else{
            this.$router.push('/m_users')
          }
          if(data.userType == 0){
            this.$store.state.info_product = true;
          }
        }
        else{
            this.$refs.message.error('Error_login')
            this.error = "Ошибка парол или логин"
        }
    }
  }
}
</script>

<style lang="scss">
.login {
  background-image: url('../../assets/bg-06.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  .backLogin{
    background-color: rgba(0, 0, 0,0.7);
    h2{
      color:#fff;
      font-family: 'Ubuntu', sans-serif;
      font-weight: 500;
      font-size: 28px;
    }
    .form {
      height: 300px;
      width:390px;
      background-color: #fff;
      border-radius: 15px;
      .username, .password{
        height: 100px;

        input{
          height: 35px;
          font-family: 'Roboto', sans-serif;
          margin-left:15px;
          width: 300px;
          font-size: 18px;
          color: rgb(0, 0, 0);
          outline:none;
          border:none;
        }
      }
      .sub_login{
        height: 100px;
       
      }
    }
  }
}
</style>