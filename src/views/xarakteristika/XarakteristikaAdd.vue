<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white border-bottom " style="box-shadow: 1px 0.5px 5px rgb(230,230,230)" light position="top" scrolling>
      <router-link to="/xarakteristika">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/>
        </a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Add_characteristic')}}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 shadow" style="border-radius: 6px;">
      <xrAdd />
    </main>

  </div>
</template>



<script>
import xrAdd from "../../components/wnd_for_add/xr_add"
  import {
    mdbNavbar,
    mdbCardTitle,mdbIcon,
  } from "mdbvue";

  export default {
    components: {
      mdbNavbar,xrAdd,
      mdbCardTitle,mdbIcon
    },
    data(){
      return{

      }
    },

    methods : {
       submit_success()
      {
          this.$router.push("/xarakteristika");
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
