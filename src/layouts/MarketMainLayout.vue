<template>
  <div class="main_page_market">
    <Navbar/>
    <div>
      <router-view></router-view>
    </div>    
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/market_add/navbar.vue'
import Footer from '../components/market_add/footer.vue'
export default {
  components:{
    Navbar, Footer
  }
}
</script>

<style>

</style>