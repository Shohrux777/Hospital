<template>
  <div>
    <navbar/>
    <div class="main w-100">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  // import { ref } from 'vue';
  import navbar from '../components/navbar'


  export default {
    components: {
      navbar
    },
    mounted() {
      this.name = localStorage.Name;
    },
    // setup() {

    //   const collapse1 = ref(false);
    //   const dropdown1 = ref(false);
    //   const dropdown6 = ref(false);

    //   return {
    //     collapse1,
    //     dropdown1,
    //     dropdown6,
    //   }
    // },
    data() {
      return {
        name: '',
      }
    },
    methods: {
    }
  };
</script>

<style lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
}
.main{
  background: #eee;

}
.leftmenu{
  width: 18%;
  padding: 2px 0px;
  background: #fff;
  font-size: 14px;
}
.main{
  width: 82%;
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
.snipper{
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
</style>