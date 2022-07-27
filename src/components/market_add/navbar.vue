<template>
  <div>
    <mdb-navbar style="background-color:#373D46;" class="navbar_SP" dark>
      <!-- <mdb-avatar class="" style="width: 40px; height: 40px; position: relative;" >
        <img style="width: 40px; height: 40px;" src="https://mdbootstrap.com/img/Photos/Avatars/img(30).jpg" class="rounded-circle img-fluid animated bounce "/>
        <i class="fas fa-circle mr-1 text-success " style="position: absolute; bottom: 0; right:-1.5px; font-size: 10px;"></i>
    
      </mdb-avatar>  -->
      <mdb-navbar-brand href="#"  class="ml-3 p-0 m-0">
        
        Заказ товаров
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item hidden href="#" active>Home</mdb-nav-item>
          <mdb-nav-item hidden href="#">Features</mdb-nav-item>
          <mdb-nav-item hidden href="#">Pricing</mdb-nav-item>
          <!-- <mdb-dropdown tag="li" class="nav-item">
                <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
                <mdb-dropdown-menu>
                  <mdb-dropdown-item>Action</mdb-dropdown-item>
                  <mdb-dropdown-item>Another action</mdb-dropdown-item>
                  <mdb-dropdown-item>Something else here</mdb-dropdown-item>
                </mdb-dropdown-menu>
              </mdb-dropdown> -->
        </mdb-navbar-nav>
         <div>
            <mdb-navbar-nav>
            <mdb-nav-item  href="/m_product" active>{{$t('Home')}}</mdb-nav-item>
            <mdb-nav-item  @click="order" active>{{$t('Basket')}}</mdb-nav-item>
            <mdb-nav-item   @click="cancel" active>{{$t('Cancel order')}}</mdb-nav-item>
           </mdb-navbar-nav>
         </div>
      </mdb-navbar-toggler>
    </mdb-navbar>
  <Toast ref="message"></Toast>
  <ModalKorzinka  title="Korzinka" :show="show" @close="show = false" width="920px">
    <template v-slot:body>
      <korzinka @close="show = false" />
    </template>
  </ModalKorzinka>
  </div>
</template>

<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem} from 'mdbvue';
  import {mapMutations} from 'vuex'
  import ModalKorzinka from '../modal'
  import korzinka from '../market_add/korzinka'
  export default {
    name: 'NavbarPage',
    data() {
      return{
        show: false
      }
    },
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      ModalKorzinka, korzinka
    },
    methods: {
      ...mapMutations(['del_all_product']),
      cancel(){
        console.log('cancelled');
        this.del_all_product()
        // this.$refs.message.success('Added_successfully')
      },
      order(){
        this.show = true;
      }
    }
  }
</script>

<style lang="scss">
.navbar_SP{
    z-index: 0;
    // position: sticky;
    // top: 0;
    
  }

</style>