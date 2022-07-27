<template>
  <div>
    <navbar/>
    <div class="d-flex allContent  ">
      <div class="leftmenu  border">
        <div  v-for="(link,index) in main_group_list" :key="index" style="position:relative">
          <!-- :class="{'active_link': link.view}" -->
          <div
          :class="{ active_link : active_el == index }" 
          @click ="update_down(index,link.id)"
          class="text-dark d-flex py-2 menuitem"
          >
            <!-- <MDBIcon style=  "color: red; margin-right: 10px; padding-left: 15px;" icon="camera-retro" />
            Xodimlar -->
            <div class="icon_div" style="width:15%;">
              <i style="padding-left: 15px;"  :class="link.pictureStr" />
              <!-- <i class="fas fa-carrot"></i> -->
            </div>
            <div style="width:85%; text-align:left">
              <p  style="padding-left: 7px; font-size: 13.5px;" class="m-0">{{$t(link.name)}}</p>
            </div>
            <mdb-icon icon="angle-right"  style="position: absolute; font-size: 13px; color: #1266F1; top:12px; right:10px;"/>
          </div>
          <div v-if="active_el == index">
            <div class="w-100" v-for="(link,item) in sub_product_main_id" :key="item">
              <!-- :class="{'active_link': link.view}" -->
              <div
              :class="{ active_link_small : active_small == item }" 
              @click ="update_small_down(item, link.id)"
              class="text-dark d-flex pl-4 menuitem " style="font-size:12.5px; padding: 6.5px 0; "
              >
              <span>{{link.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainMarket w-100">
          <div style="width: 100%;">
            <router-view></router-view>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mdbIcon } from 'mdbvue';
  // import { ref } from 'vue';
  import navbar from '../components/m_sidebar'
  import {mapActions, mapGetters} from 'vuex'


  export default {
    components: {
      mdbIcon, navbar
    },
    // mounted() {
    //   this.name = localStorage.Name;
    // },
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
        active_el: -1,
        active_small: -1,
        links: [
          { title: 'Овощи и фрукты', icon: 'apple-alt', url: '/users', view: true, color: '#C71585' },
          { title: "Вода/Напитки", icon: 'wine-bottle', url: '/depart', view: false, color: '#FF7F50' },
          { title: "Яйца / Молоко", icon: 'fish', url: '/rooms', view: false, color: '#4B0082' },
          // { title: "Болезни", icon: 'biohazard', url: '/kasallik', view: false, color: '#00FF00' },
          { title: "Чай/Кофе", icon: 'coffee', url: '/client', view: false, color:'#FFA500' },
          { title: "Хлеб и хлебо-булочные", icon: 'bread-slice', url: '/contragent', view: false, color: '#800080' },
          // { title: "Тип сервиса", icon: 'ambulance', url: '/xizmat', view: false, color:'#4682B4' },
          { title: "Торты и сладости", icon: 'egg', url: '/position', view: false, color: '#FFA07A' },
          { title: "Консервированная", icon: 'drum', url: '/province', view: false, color: '#40E0D0' },
          { title: "Хозяйственные товары", icon: 'globe', url: '/district', view: false, color:'#191970' },
          { title: "Гигиена", icon: 'building', url: '/company', view: false, color:'#4B0082' },
          // { title: "Число услуги", icon: 'diagnoses', url: '/service_type', view: false, color: '#C71585' },
          // { title: "Тип пациента", icon: 'users', url: '/type_of_patient', view: false, color:'#9370DB' },
          { title: "Для детей", icon: 'chart-line', url: '/chart', view: false, color: '#FFA07A'  },
          { title: "Хозяйственные товары", icon: 'carrot', url: '/sensor', view: false, color: '#800080' },
          // { title: "Color", icon: 'palette', url: '/addcolor', view: false, color: '#20B2AA' },
          // { title: "SCR add", icon: 'palette', url: '/scr_add', view: false, color: '#FF7F50' },
          // { title: "Datchik_Add", icon: 'heartbeat', url: '/datchikAdd', view: false, color:'#FFA500' },
          // { title: "Arxiv", icon: 'democrat', url: '/otchotArxiv', view: false, color: '#00FF00' },
        ],
      }
    },
    computed: mapGetters(['main_group_list','sub_product_main_id']),
    methods: {
      ...mapActions(['fetch_main_group', 'fetch_main_group_id', 'fetch_product_list_sub_id']),
      update_down: function (i, id) {
        this.active_el = i;
        console.log(id);
        this.fetch_main_group_id(id);
        this.active_small = -1;
      },
      update_small_down (i, id) {
        this.active_small = i;

        console.log(id);
        this.fetch_product_list_sub_id(id);
        
      },
    },
    mounted (){
      this.fetch_main_group()
    }
  };
</script>

<style lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
}
.mainMarket{
  background: #fff;

}
.leftmenu{
  width: 18%;
  padding: 2px 0px;
  background: #fff;
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
.active_link_small{
  background: rgba(113, 184, 255, 0.3);
  span{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}
.menuitem:hover{
  cursor: pointer;
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