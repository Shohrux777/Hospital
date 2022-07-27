<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/category">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('add_category')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 5px;">
      <category_add @submit_success="categorySubmit_success"/>
    </main>

  </div>
</template>


<script>
import category_add from "../../components/wnd_for_add/category_add"


  import {
     mdbNavbar, mdbCardTitle,  mdbIcon,
  } from "mdbvue";


  export default {

    components: {
       mdbNavbar,
       mdbCardTitle,category_add,
       mdbIcon,

    },
    data(){
      return{

      }
    },
    methods : {
      categorySubmit_success()
      {
        this.$router.push("/category");
      }
    }

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
