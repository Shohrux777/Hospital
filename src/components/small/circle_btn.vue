<template>
  <div class="cyrcle_btn mt-0 mb-0 ml-5 z-depth-1-half "  v-on:click="addRow"  v-mdb-waves="{ duration : 'long' , fixed : true}" >
      <i class="fas fa-plus white-text d-flex justify-content-center " style=" padding-top:11px"></i>
  </div>
</template>

<script>
import {
  mdbWaves,

} from "mdbvue";

export default {
  directives: {
      mdbWaves
    },

    methods : {
      addRow()
      {
        this.$emit('on_click');
      }
    }
}
</script>

<style scoped>
.cyrcle_btn{
 height: 39px;
 width: 40px;
 /* padding: 10px; */
 border-radius: 20px;
 cursor: pointer;
 background: rgb(51, 160, 248);

}
</style>
