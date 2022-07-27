<template>
  <div class="MainOrder ">
      <loader class="pt-4" v-if="loading"/>
      <div v-if="!loading" >
        <div style="height:100vh; margin-top: -70px;" class="d-flex align-items-center justify-content-center"
          v-if="product_get_sub_id.marketProductGroupList == 0 && product_get_sub_id.marketProductGroupDetailList == 0">
          <p>Hech nima yuq</p>
        </div>
      </div>
    <mdb-container v-if="!loading" fluid>
      <mdb-row class="px-1">
        <mdb-col sm="4" md="3" lg="2" class="itemPro "  v-for="(data,i) in product_get_sub_id.marketProductGroupList" :key="i">
          <div @click="SelectCategory(data)">
            <div  class="card rounded mt-4 shopCard shadow" >
              <div class="picture" style="position: relative;">
                <mdb-view class="zoom overlay z-depth-1" :src="data.pictureStr" alt="zoom">
                  <mdb-mask overlay="black-strong" flex-center :text="data.name" />
                </mdb-view>
              </div>
              <div class="title  border-top" >
                <p  class="mt-2 mb-1  ml-2 text-dark">{{data.name}}</p>
                <div class="row">
                   <div class="col-12 ">
                    <p class=" text-right m-0 mr-2 text-info pb-1" style="font-size: 13px;">{{data.price}} 6 ведов</p>
                  </div>
                </div>             
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container v-if="!loading" fluid>
      <mdb-row class="px-1 pb-4">
        <mdb-col sm="4" md="3" lg="2" class="itemPro " v-for="(item,i) in product_get_sub_id.marketProductGroupDetailList" :key="i">
          <div >
            <div  class="card rounded mt-4 shopCard shadow" >
              <div class="picture" style="position: relative;">
                <mdb-view class="zoom overlay z-depth-1" :src="item.product.image" alt="zoom">
                  <mdb-mask overlay="black-strong" flex-center :text="item.product.name" />
                  <!-- overlay="black-strong"
                  pattern="5" -->
                </mdb-view>
              </div>
              <div class="title  border-top" >
                <p  class="mt-2 mb-1 ml-2 text-dark">{{item.product.name}}</p>
                <div class="row">
                  <div class="col-4 ">
                    <div @click="addproduct(item.product)">
                      <mdb-btn class="m-0 ml-2 py-1 px-4 mb-2" color="success"><mdb-icon icon="plus" class="m-0 p-0"/></mdb-btn>
                    </div>
                  </div>
                   <div class="col-8 ">
                    <p class=" text-right m-0 mr-2 " style="font-size: 13px;">{{item.product.price}} сум/1шт</p>
                  </div>
                </div>     
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <!-- <a @click="$router.go(-1)">back</a> -->
  </div>
</template>

<script>
  import { mdbContainer, mdbRow, mdbCol,mdbIcon, mdbBtn, mdbView, mdbMask} from 'mdbvue';
  import {mapGetters,mapActions, mapMutations} from 'vuex'
export default {
  components: {
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbBtn,mdbIcon, mdbView, mdbMask 
    },
  data(){
    return{
      list: [],
      id: this.$route.params.id,
      loading : true,

    }
  },
  async mounted(){
    // this.fetch_m_product();
    await this.fetch_sub_group_id_get_product(this.id);
    this.loading = false;
  },
  watch: { async $route(to, from) {
    if(to !== from){
      this.loading = true,
      this.id = this.$route.params.id;
      await this.fetch_sub_group_id_get_product(this.id);
      this.loading = false;
    }
  }},
  methods: {
      ...mapActions(['fetch_sub_group_id_get_product']),
      ...mapMutations(['add_product_order']),
      addproduct(data){
        console.log(data)
        this.add_product_order(data);
      },
      async SelectCategory(data){
        this.id = data.id
        this.$router.push({name: 'main_order', params: {id: data.id}, query: {product:data.name}})
        this.loading = true;
        await this.fetch_sub_group_id_get_product(data.id);
        this.loading = false;

      }
  },
  computed: mapGetters(['product_get_sub_id'])

}
</script>

<style lang="scss">
  .MainOrder{
    min-height: 100vh;
    // overflow: hidden;
    // overflow-y: auto;
    background-color: #D8DBE6;
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
    .card .picture img{
      height: 145px;
    }
  }
  @media only screen and (max-width: 1280px) {
    .card .picture img{
      height: 142px;
    }
  }
  @media only screen and (max-width: 1230px) {
    .card .picture img{
      height: 140px;
    }
    .itemPro{
    padding: 3px 11px;
  }
  }
  @media only screen and (max-width: 1130px) {
    .card .picture img{
      height: 130px;
    }
  }
   @media only screen and (max-width: 992.5px) {
    .card .picture img{
      height: 160px;
    }
  }
  @media only screen and (max-width: 880.5px) {
    .card .picture img{
      height: 150px;
    }
    .itemPro{
    padding: 2px 8px;
  }
  }
  @media only screen and (max-width: 780.5px) {
    .card .picture img{
      height: 140px;
    }
    .itemPro{
    padding: 2px 8px;
  }
  }
  @media only screen and (max-width: 767.5px) {
    .card .picture img{
      height: 160px;
    }
     .itemPro{
    padding: 2px 10px;
  }
  }
  @media only screen and (max-width: 680.5px) {
    .card .picture img{
      height: 150px;
    }
  }
   @media only screen and (max-width: 615.5px) {
    .card .picture img{
      height: 140px;
    }
  }
  @media only screen and (max-width: 575.5px) {
    .card .picture img{
      height: 300px;
    }
     .itemPro{
    padding: 2px 20px;
  }
  }
  @media only screen and (max-width: 460.5px) {
    .card .picture img{
      height: 280px;
    }
  }
  @media only screen and (max-width: 430.5px) {
    .card .picture img{
      height: 270px;
    }
    .itemPro{
    padding: 2px 16px;
  }
  }
  @media only screen and (max-width: 389.5px) {
    .card .picture img{
      height: 250px;
    }
  }
  @media only screen and (max-width: 355.5px) {
    .card .picture img{
      height: 225px;
    }
    .itemPro{
    padding: 2px 13px;
  }
  }
  @media only screen and (max-width: 320.5px) {
    .card .picture img{
      height: 200px;
    }
  }
  .shopCard:hover{
    box-shadow: 5px 5px 15px rgb(208, 208, 208), -3px -3px 10px rgb(208, 208, 208);
  }

</style>