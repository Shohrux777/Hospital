<template>
  <div>
  
    <main class="p-4 ">
       <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/kontragent">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('New_company')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
      <companyAdd @submit_success="submit_success"/>
    </main>
      <Toast ref="message"></Toast>


  </div>
</template>


<script>
import companyAdd from "../../components/wnd_for_add/company_add"

  import {
    mdbNavbar,
    mdbCardTitle,
    mdbIcon,

  } from "mdbvue";

  export default {

    components: {
      mdbNavbar,
      mdbCardTitle,
      mdbIcon,companyAdd
    },

    data() {
      return{

      }
    },
    methods:{
      submit_success()
      {
          this.$refs.message.success('Added_successfully')
          this.$router.push("/kontragent");
      }

    },
  }
</script>


<style scoped>
main {
  background-color: #fff;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}


@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
