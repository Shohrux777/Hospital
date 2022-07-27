<template>
  <div class="px-4">
    <div>
      <div class="d-flex flex-wrap ">
        <div class="itemProduct" v-for="(item,index) in product_list_by_group"  :key="index">
          <div >
            <div  class="card rounded mt-4 shopCard" >
              <div class="picture" style="position: relative;">
                <div @click="addproduct(item)">
                  <mdb-icon icon="plus"  class="icon_plus shadow"  />
                </div>
                <img :src="item.product.img" alt="" class="img-fluid">
              </div>
              <div class="title container border-top">
                <p class="mt-2 mb-1 text-dark">{{item.product.name}}</p>
                <p class="mt-2 mb-2 text-right" style="font-size: 13px;">{{item.product.price}} сум/1шт</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from 'mdbvue';
import {mapGetters, mapMutations} from 'vuex'
export default {
   components: {
      mdbIcon
    },
    computed: mapGetters(['product_list_by_group']),
    methods: {
      ...mapMutations(['add_product_order']),
      addproduct(data){
        console.log('dsds')
        this.add_product_order(data);
      }
    }
}
</script>

<style lang="scss">
  .card .picture{
    height: 190px;
    width: 100%;
  }
  .card .picture img{
    height: 190px;
    width: 100%;
  }
  .icon_plus{
    position: absolute;
    bottom: -18px;
    right: 7px;
    color:rgb(255, 255, 255);
    font-size: 13px;
    border-radius: 50%;
    padding:11px 11.5px;
    background-color: rgb(95, 148, 255);
    cursor: pointer;
  }
  .icon_plus:hover{
    background-color: rgb(46, 114, 251);
    box-shadow: 5px 5px 15px rgb(208, 208, 208), -3px -3px 10px rgb(208, 208, 208);

  }
  .shopCard:hover{
    box-shadow: 5px 5px 15px rgb(208, 208, 208), -3px -3px 10px rgb(208, 208, 208);
  
  }.itemProduct{
    max-width: 220px;
    min-width: 210px;
    margin: 10px 15px;
  }

</style>