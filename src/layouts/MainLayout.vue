<template>
  <div class="flexible-content" :class="{'activeFlex': show}">

    <!-- Sidebar -->
     <div>
        <sidebar  :btnShow="show" @clickBtn="changeShow"/>
     </div>
      <!-- :key="locale" -->
    <!-- /Sidebar  -->
     <main >
      <div class="mt-5 p-4 pt-5 " style="min-height: 94vh;">
        <router-view></router-view>
      </div>
    </main>

  </div>
</template>

<script>
import sidebar from '../components/sidebar'

export default {
  name: "MainLayout",
  components: {
    sidebar,
  },
  data(){
    return{
      show: false,
    }
  },
  methods: {
    changeShow(boll){
      this.show = boll
    }
  }
  // computed :
  // {
  //   locale()
  //   {
  //     return this.$store.getters.getUsers[0].lang;
  //   }
  // },
};
</script>


<style lang="scss" scoped>
main {
  background-color: #F8F8F8;
  font-family: 'Montserrat', sans-serif;
}
/* for scroll */
  /* width */
::-webkit-scrollbar {
  width: 5px;

}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* ! for scroll */
.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}



.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
  cursor: pointer;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;

}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }

}
.list_back{
  color: black;
  padding: 8px 0;
  position: relative;
  justify-content: space-between;
  p{
    flex: 1;
  }
  &:hover{
    background: rgba(113, 184, 255, 0.1);
    p{
      color: #1266F1;
    }
    i{
      color: #1266F1;
    }
    transition: background-color 0.2s;
    color: black;
  }
}
.drop_down{
  width: 100%;
  cursor: pointer;

  color:black;
  padding: 4px;
  padding-left: 15px;
  font-size: 14px;

  &:hover{
    background: rgba(113, 184, 255, 0.1);
    color:black;
    p{
      color: #1266F1;
    }
    i{
      color: #1266F1;
    }
  }
}
.round{
  transform: rotate(180deg);
  transition: all 0.5s;
}
.back_round{
  transition: all 0.5s;
}
.sidebar_background{
  background:#fff;
  position: absolute;
  width: 265px;
  top:0;
  left:0.2px;
}
.icon_div{
  width: 10%;
}
.active{
  background: rgba(113, 184, 255, 0.15);
  p{
    color: #1266F1;
  }
  i{
    color: #1266F1;
  }
}
.activeFlex{
  transition: padding-left 0.3s;
  padding-left: 60px;
}
//bor_menu
</style>
