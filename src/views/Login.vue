<template>

<div class="container flex-center ">
  <div class="w-50">
      <!-- Card -->
      <mdb-card>
        <mdb-card-body>
          <!-- Material form login -->
          <form class="mt-5 mb-5" @submit.prevent="submitHandler">
            <p class="h4 text-center mb-4">Log in</p>
            <div class="mx-3 grey-text ">

                <mdb-input label="User name" icon="user" v-model.trim="username" type="text"/>
              <mdb-input label="Your password" icon="lock" v-model.trim="password" type="password"/>
            </div>
            <div class="text-center" type="submit">
              <mdb-btn type="submit">
                Login
              </mdb-btn>

            </div>
          </form>
          <!-- Material form login -->
        </mdb-card-body>
      </mdb-card>
      <!-- Card -->
  </div>

</div>

</template>

<script>

  import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from 'mdbvue';
  export default {
    name: 'login',
    data: () =>({
      username:'',
      password: ''
    }),
    components: {
      mdbInput,
      mdbBtn,
      mdbCard,
      mdbCardBody
    },
    mounted(){
      localStorage.name = '';
      localStorage.menu = false;
    },
    methods: {
      submitHandler(){

        const formData = {
        username: this.username,
        password: this.password
      }
        console.log(formData)
        localStorage.name = this.username

        this.$router.push('/products')
      }


    }

  }
</script>
