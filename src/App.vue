<template>
<div id="app">
  <component v-if="loading" :is="layout">
    <router-view/>
  </component>
</div>

</template>
<script>
// import {mapActions} from 'vuex'
import LoginLayout from "@/layouts/LoginLayout"
import EmptyLayout from "@/layouts/EmptyLayout"
import MainLayout from "@/layouts/MainLayout"
import RegisLayout from "@/layouts/RegisLayout"
import MarketLayout from "@/layouts/MarketLayout"
import MarketMainLayout from "@/layouts/MarketMainLayout"
import HospitalLayout from "@/layouts/HospitalLayout"
import AnalysisLayout from "@/layouts/AnalysisLayout"

export default
{
  computed:{

     layout(){

        return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  data ()
  {
    return{
      loading : false
    }
  },
  watch:{
    $route (){
        this.$store.state.current_list = {
            current_item_count: 10,
            current_page: 1,
            items_count: localStorage.Items_count,
        }
        this.$store.state.dontShowPagination = false;
        localStorage.numPage = 1;
    }
  } ,

  components:{
    LoginLayout,EmptyLayout,
    MainLayout,RegisLayout,MarketLayout, MarketMainLayout, HospitalLayout, AnalysisLayout
  },
  // methods:{
  //     ...mapActions(['fetchUsers']),

  // },
  async created()
  {
    // await this.fetchUsers();
     this.loading = true;
  }

}
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"); */
@font-face{
  font-family: "Montserrat";
  src: url("./font/Montserrat/Montserrat-Medium.ttf")
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
.navbar_brand{
    display: inline-block;
    margin-bottom: 0;
    font-size: 1.25rem;
    margin-left: 15px;
    color: #2196f3 !important;
    font-weight: bolder;
}

.erp-select .md-form .form-control{
  cursor: pointer;
}

.line-select .form-control{
  cursor: pointer;
}

.erp-select .md-form .mr-5{
  cursor: pointer;
  position: absolute;
}

.invalid-text{
  color: red;
  font-size: 12px;
  position: absolute;
  margin-top:-25px;
}
.applied{
  pointer-events: none;
  background:#fcfcfc;
}

</style>
