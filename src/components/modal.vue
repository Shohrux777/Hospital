<template>
  <div  class=" text-dark" style="z-index:11;">
   <!-- <mdb-btn class="" color="success" m="b4" @click="show = !show"  type="submit"  p="r4 l4 t2 b2">show modal</mdb-btn> -->
   <transition name="fade" style="z-index: 10000;" appear>
     <div class="modal-overlay"  @click="close" v-if="show">
     </div>
   </transition>
   <transition name="slide"  appear>
     <div class="card modal_FP" style="z-index: 10000;" :style="{'width': width}" v-show="show">
       <div class="card-header d-flex justify-content-between" :class="'bg-' + headerbackColor">
         <h5 class="m-0" :style="{'color': titlecolor}">{{title}}</h5>
         <svg @click="close" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%; cursor:pointer;" class="icon icon-tabler icon-tabler-x bg-danger p-1" width="21" height="21" viewBox="0 0 24 24" stroke-width="2.7" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      
       </div>
       <div class="card-body">
          <slot name="body">
          </slot>
          <!-- <div>
            <mdb-btn class="" color="success" m="b4" @click="show = !show"  type="submit"  p="r4 l4 t2 b2">Close</mdb-btn>
          </div> -->
       </div>
     </div>
    </transition>
  </div>
</template>

<script>
// import {mdbBtn} from "mdbvue";
export default {
  data(){
    return{
      clos: this.show,
    }
  },
  props:{
    show:{
        type:Boolean,
        default:false
      },
    width:{
      type: String,
      default: ''
    },
    closeColor:{
      type: String,
      default: '#ff2825'
    },
    titlecolor:{
      type: String,
      default: 'black'
    },
    headerbackColor:{
      type: String,
      default: 'white'
    },
    title:{
      type: String,
      default: ''
    }
  },
  methods:{
    close(){
      this.$emit('close');
    }
  }
  // components: {
  //   mdbBtn
  // }
}
</script>

<style lang="scss">
  .modal_RP{
    z-index: 111111;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .modal-overlay{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(2, 2, 2,0.5);
  }
  .fade-enter-active, 
  .fade-leave-active{
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to{
    opacity: 0;
  }
  .modal_FP{
    position: fixed;
    // width: 60%;
    top:50%;
    left:50%;
    transform: translate(-50%,-51%);
    z-index: 110;
  }
  .modal_FP .card-body{
    max-height: 680px;
    overflow: hidden;
    overflow-y: auto;
  }
   .slide-enter-active{
     transition: transform 0.6s, opacity 0.6s;
   } 
  .slide-leave-active{

    transition: transform 1s, opacity 1s;
    
  }
  .slide-enter,
  .slide-leave-to{
    transform:translateY(-220%) translateX(-50%) ;
    opacity: 0;

  }
</style>