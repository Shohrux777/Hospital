<template>
  <div class="MainOrder ">
    <mdb-container fluid>
      <mdb-row class="px-1 pb-4">
        <mdb-col sm="4" md="3" lg="2" class="itemPro "  v-for="(item,i) in main_group_list" :key="i">
          <div @click="addproduct(item)">
            <div  class="card rounded mt-4 shopCard shadow" >
              <div class="picture" style="position: relative;">
                <mdb-view class="zoom overlay z-depth-1" :src="item.pictureStr" alt="zoom">
                  <mdb-mask flex-center :text="item.name" />
                </mdb-view>
              </div>
              <div class="title  border-top" >
                <p  class="mt-2 mb-1 ml-2 text-dark">{{item.name}}</p>
                <div class="row">
                   <div class="col-12 ">
                    <p class=" text-right m-0 mr-2 text-info pb-1" style="font-size: 13px;">{{item.price}} 6 ведов</p>
                  </div>
                </div>
                
                                
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
  import { mdbContainer, mdbRow, mdbCol, mdbView, mdbMask} from 'mdbvue';
  import {mapGetters,mapActions, mapMutations} from 'vuex'
export default {
  components: {
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbView, mdbMask 
    },
  data(){
    return{
      list: [],
    }
  },
  mounted(){
    this.fetch_main_group();
    console.log(this.get_m_product_list)
  },
  methods: {
      ...mapActions(['fetch_main_group']),
      ...mapMutations(['add_product_order']),
      addproduct(data){
        console.log(data)
        this.$router.push('/sub_categories/' + data.id)    
      }
  },
  computed: mapGetters(['main_group_list'])

}
</script>

<style lang="scss">
  .MainOrder{
    min-height: 100vh;
    // overflow: hidden;
    // overflow-y: auto;
    background-color: #D8DBE6;
  }
  .card .picture{
    height: 160px;
  }
   .card .picture img{
    height: 160px;
    
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  }
  .itemPro{
    padding: 4px 13px;
}
   @media only screen and (max-width: 1295px) {
    .card .picture, .card .picture img{
      height: 145px;
    }
  }
  @media only screen and (max-width: 1280px) {
    .card .picture, .card .picture img{
      height: 142px;
    }
  }
  @media only screen and (max-width: 1230px) {
    .card .picture, .card .picture img{
      height: 140px;
    }
    .itemPro{
    padding: 3px 11px;
  }
  }
  @media only screen and (max-width: 1130px) {
    .card .picture, .card .picture img{
      height: 130px;
    }
  }
   @media only screen and (max-width: 992.5px) {
    .card .picture, .card .picture img{
      height: 160px;
    }
  }
  @media only screen and (max-width: 880.5px) {
    .card .picture, .card .picture img{
      height: 150px;
    }
    .itemPro{
    padding: 2px 8px;
  }
  }
  @media only screen and (max-width: 780.5px) {
    .card .picture, .card .picture img{
      height: 140px;
    }
    .itemPro{
    padding: 2px 8px;
  }
  }
  @media only screen and (max-width: 767.5px) {
    .card .picture, .card .picture img{
      height: 160px;
    }
     .itemPro{
    padding: 2px 10px;
  }
  }
  @media only screen and (max-width: 680.5px) {
    .card .picture, .card .picture img{
      height: 150px;
    }
  }
   @media only screen and (max-width: 615.5px) {
    .card .picture, .card .picture img{
      height: 140px;
    }
  }
  @media only screen and (max-width: 575.5px) {
    .card .picture, .card .picture img{
      height: 300px;
    }
     .itemPro{
    padding: 2px 20px;
  }
  }
  @media only screen and (max-width: 460.5px) {
    .card .picture, .card .picture img{
      height: 280px;
    }
  }
  @media only screen and (max-width: 430.5px) {
    .card .picture, .card .picture img{
      height: 270px;
    }
    .itemPro{
    padding: 2px 16px;
  }
  }
  @media only screen and (max-width: 389.5px) {
    .card .picture, .card .picture img{
      height: 250px;
    }
  }
  @media only screen and (max-width: 355.5px) {
    .card .picture, .card .picture img{
      height: 225px;
    }
    .itemPro{
    padding: 2px 13px;
  }
  }
  @media only screen and (max-width: 320.5px) {
    .card .picture, .card .picture img{
      height: 200px;
    }
  }
  .shopCard:hover{
    box-shadow: 5px 5px 15px rgb(208, 208, 208), -3px -3px 10px rgb(208, 208, 208);
  }

</style>