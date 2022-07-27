<template>
  <div class="leftmenu ">
    <div class="w-100" v-for="(link,index) in sub_product_main_id" :key="index">
      <!-- :class="{'active_link': link.view}" -->
      <div
      :class="{ active_link : active_el == index }" 
      active-class="active_link"
      @click ="update_down(index, link.id)"
      class="text-dark d-flex pl-2 menuitem " style="font-size:12.5px; padding: 6.5px 0; "
      >
      {{link.name}}
      </div>
    </div>
  </div>
</template>

<script>
  // import { mdbIcon } from 'mdbvue';
  import {mapGetters, mapActions} from 'vuex'
export default {
//  components: {
//     mdbIcon
//   },
  data() {
      return {
        active_el: -1,
        name: '',
      }
    },
    computed: mapGetters(['sub_product_main_id']),
    methods: {
      ...mapActions(['fetch_product_list_sub_id']),
      update_down (i, id) {
        this.active_el = i;

        console.log(id);
        this.fetch_product_list_sub_id(id);
        
      },
    }
}
</script>

<style lang="scss">
.leftmenu{
  width: 100px;
  padding: 2px 0px;
  background: #fff;
}
.allContent{
  min-height: 100vh;
}
.active_link{
  background: rgba(113, 184, 255, 0.3);
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}
.menuitem:hover{
  background: rgba(113, 184, 255, 0.2);
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}

</style>