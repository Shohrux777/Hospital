<template>
  <div class="sidebar-fixed position-fixed" :class="{'line_active': btnShow}" >
      <div class="sidebar_background m-0 ">
        <a class="logo-wrapper" :class="{'logo-wrapper_flex': btnShow}"
          ><img alt="" class="img-fluid" src="../assets/erp_logo.png"
        /></a>
        <div v-for="(link,index) in links" :key="index"  class=" list-group-flush">
          <router-link
            tag="li"
            :to="link.url"
            :class="{'activetext': link.view}"
            @click.native ="update_down(index)"
            class="list_back pl-4 d-flex align-items-center list-group-item-action pointer"
          >
            <div class="icon_div">
              <mdb-icon :icon="link.icon" class="mr-3 icon_color"/>
            </div>
            <a class="m-0 p-0 pl-2">{{$t(link.title)}}</a>
            <svg :class="{round:link.view}" xmlns="http://www.w3.org/2000/svg" class="icon mr-3 icon-tabler icon-tabler-chevron-right" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="#999" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="9 6 15 12 9 18" />
          </svg>
            <!-- <mdb-icon :icon="link.icon_down"  :class="{round:link.view}"   class="mr-3 icon_color mt-1 back_round float-right"/> -->
          </router-link>

        <!-- dropdown -->
          <div v-show="link.view" >
            <router-link
              v-for="list in link.down_list"
              tag="li"
              :key="list.url"
              :to="list.url"
              active-class = "active"
              class=" drop_down justify-content-flex-start d-flex align-items-center list-group-item-action pointer"
              >
              <div class="icon_div ml-4">
                <mdb-icon :icon="list.icon"  class="mr-3 icon_color"/>
              </div>
              <a class="m-0 p-0 ml-2">{{$t(list.title)}}</a>
            </router-link>
          </div>
        <!-- /dropdown -->
        </div>
      </div>
      <!-- <div class="menu_bar" :class="{'menu_flex': btnShow}" @click="btnClose">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" :stroke="fr_cl" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div> -->
    </div>
      
</template>

<script>
import { mdbIcon } from "mdbvue";

export default {
   components: {
    mdbIcon,
  },
  props: {
    btnShow: {
      type:Boolean,
      default:true
    },
  },
  data() {
      return{
        fr_cl: '#597e8d',
        bool: false,
    links: [
      {
        title: 'menu_product',url:'/products', icon:'user',view: false, icon_down:'angle-right',
        down_list:
        [
          {title: 'menu_tovar', url: '/products' },
          {title:'menu_category', url:'/category'},
          {title: 'menu_xr_tool', url: '/xr_tool'},
          {title: 'menu_department', url: '/department'},
          {title:'menu_xr', url:'/xarakteristika'},
        ]
      },
      {
        title: 'menu_setting', url: '/currency', icon:'tools',view: false, icon_down:'angle-right',
        down_list:
        [
          // {title: 'menu_general', url: '/settings'},
          {title: 'menu_currency', url: '/currency'},
          {title: 'menu_company', url: '/kontragent' },
        ]
      },
      {
        title: 'menu_production', url: '/color', icon:'chart-pie', view: false, icon_down:'angle-right',
        down_list:
        [
          {title: 'menu_color', url: '/color'},
          {title: 'menu_color_density', url: '/guscolor'},
          {title: 'menu_color_group', url: '/groupcolor'},
          {title: 'menu_color_variant_type', url: '/variantTypeColor'},
          {title: 'menu_main_proccess', url: '/main_proccess'},
        ]
      },
      {
        title: 'menu_warehouse', url: '/leftovers', icon:'warehouse', view: false, icon_down:'angle-right',
        down_list:
        [
          {title: 'menu_leftovers', url: '/leftovers', view: false},
          {title: 'menu_purchase', url: '/buy', view: false},
          {title: 'menu_sale', url: '/sale', view: false},
          {title: 'menu_warehouses', url: '/sklad'},
          {title: 'menu_simple_prod', url: '/simple_prod'},
          {title: 'movement', url: '/movement'},
          {title: 'movement_receipt', url: '/movement_receipt'},
        ]
      },
      {
        title: 'menu_order', url: '/order', icon:'chart-pie', view: false, icon_down:'angle-right',
        down_list:
        [
          {title: 'menu_order', url: '/order'},
        ]
      },

      // {title: 'Posts', url: '/post', view: false },
    ],

  }
  },
  methods:{
    btnClose(){
      this.bool = !this.bool;
      this.$emit('clickBtn', this.bool);
    },
    update_down: function (i){
      for(let j=0; j<this.links.length; j++){
        if(j!==i){
          this.links[j].view = false;
        }
      }
      this.links[i].view = !this.links[i].view

    }
  },

}
</script>

<style lang="scss" scoped>
main {
  background-color: #ededee;
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

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  overflow-y: scroll;
  padding: 1rem;
  padding-top: 0;
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
a{
  color: black;
}
.list_back{
  color: black;
  padding: 8px 0;
  position: relative;
  justify-content: space-between;
  a{
    flex: 1;
    color: rgb(80, 80, 80);
    font-family: 'Montserrat', sans-serif;
    // font-weight: 500;
  }
  
  &:hover{
    background: rgba(113, 184, 255, 0.1);
    a{
      color: #1266F1;
    }
    i{
      color: #1266F1;
    }
    svg{
      color: #1266F1;
    }
    transition: background-color 0.2s;
    color: black;
  }
}
.drop_down{
  color: black;
  padding: 5px 0;
  position: relative;
  justify-content: space-between;
  a{
    flex: 1;
    color: rgb(70, 70, 70);
    font-size: 13.4px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
  }
  &:hover{
    background: rgba(113, 184, 255, 0.1);
    a{
      color: #1266F1;
    }
    i{
      color: #1266F1;
    }
    transition: background-color 0.2s;
    color: black;
  }
}
.round{
  transform: rotate(90deg);
  transition: all 0.5s;
}
.back_round{
  transition: all 0.5s;
}
.sidebar_background{
  cursor: pointer;
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
  cursor: pointer;
  background: rgba(113, 184, 255, 0.15);
  a{
    color: #1266F1;
  }
  i{
    color: #1266F1;
  }
}
.activetext{
  cursor: pointer;
  a{
    color: #1266F1;
  }
  i{
    color: #1266F1;
  }
}
.icon_color{
  color: rgb(80, 80, 80);
}
.menu_bar{
  position: fixed;
  left: 230px;
  top: 5px;
  cursor: pointer;
  color:red;
}
.menu_flex{
  left: 15px;
  top: 5px;
}
.line_active{
  width: 60px;
}
.sidebar-fixed .logo-wrapper_flex img{
  width: 58px;
  height: 58px;
  padding: 5px;
  margin: 40px 0 20px 0;
}
//bor_menu
</style>
