<template>
  <div>
    <navbar/>
    <div class="d-flex allContent">
      <div class="leftmenuReg">
        <div class="backgroundColor">
          <div class="" v-for="(link,index) in links" :key="index" @click="funcActive(index)">
            <!-- :class="{'active_linkReg': link.view}" -->
            <router-link
            tag="li" custom v-slot="{ navigate }"
            :to="link.url"
            :class="{'active_linkReg': index == itter}"
            @click ="update_down(index)"
            style="font-size:12.2px;"
            class="text-dark d-flex py-2 menuitemReg"
            >
            <!-- <MDBIcon style="color: red; margin-right: 10px; padding-left: 15px;" icon="camera-retro" />
            Xodimlar -->
            <li @click="navigate" role="link">
              <div class="icon_div" style="width:13%;">
                <mdb-icon style="padding-left: 15px; font-size:15px;" :style="{color: link.color}" class="ico" :icon="link.icon" />
              </div>
              <div style="width:86%; text-align:left">
                <p  style="padding-left: 15px;" class="m-0">{{$t(link.title)}}</p>
              </div>
            </li>
            
            </router-link>
          </div>
        </div>
      </div>
      <div class="mainReg" >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mdbIcon } from 'mdbvue';
  // import { ref } from 'vue';
  import navbar from '../components/navbar'


  export default {
    components: {
      mdbIcon, navbar
    },
    mounted() {
      this.name = localStorage.Name;

      for (let j = 0; j < this.links.length; j++) {
        if(this.links[j].url == this.$route.fullPath){
          this.itter = j;
          return
        }
      }
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
        itter: -1,
        links: [
          // { title: 'Работника', icon: 'user-md', url: '/users', view: true, color: '#20B2AA' },
          { title: 'user', icon: 'user', url: '/m_users', view: true, color: '#ddd' },
          // { title: "Болезни", icon: 'biohazard', url: '/kasallik', view: false, color: '#00FF00' },
          { title: "contragent", icon: 'users', url: '/contragent', view: false, color: '#ddd' },
          { title: "patient", icon: 'diagnoses', url: '/client', view: false, color:'#ddd' },
          { title: "type_service", icon: 'ambulance', url: '/service_type', view: false, color:'#ddd' },
          { title: "Company", icon: 'building', url: '/company', view: false, color:'#ddd' },
          { title: "department", icon: 'clinic-medical', url: '/depart', view: false, color: '#ddd' },
          { title: "rooms", icon: 'hospital-alt', url: '/rooms', view: false, color: '#ddd' },
          { title: 'bronRoom', icon: 'hospital-symbol', url: '/bronRoom', view: false, color: '#ddd' },
          { title: 'priceTypeRoom', icon: 'dollar-sign', url: '/priceTypeRoom', view: false, color: '#ddd' },

          { title: "position", icon: 'clipboard', url: '/position', view: false, color: '#ddd' },
          { title: "drag", icon: 'capsules', url: '/medicine', view: false, color:'#ddd' },
          // { title: "min drag", icon: 'capsules', url: '/medicineMin', view: false, color:'#ddd' },
          { title: "transit", icon: 'file-invoice', url: '/medicineMin', view: false, color: '#ddd' },
          { title: 'agent', icon: 'address-book', url: '/agent', view: false, color: '#ddd' },
          
          { title: "province", icon: 'map-marker-alt', url: '/province', view: false, color: '#ddd' },
          { title: "district", icon: 'globe', url: '/district', view: false, color:'#ddd' },


          { title: "num_service", icon: 'diagnoses', url: '/number_into', view: false, color: '#ddd' },
          { title: "type_patient", icon: 'users', url: '/patient_type', view: false, color:'#ddd' },
          { title: "service_group_show_doc", icon: 'eye-slash', url: '/ServiceGroup_show_doc', view: false, color:'#ddd' },
          // { title: 'bronBeds', icon: 'user', url: '/bronBeds', view: false, color: '#ddd' },
          // { title: 'bronRoomAddBeds', icon: 'user', url: '/bronRoomAddBeds', view: false, color: '#ddd' },
          { title: 'Active service', icon: 'server', url: '/activeServiceRemove', view: false, color: '#ddd' },
          { title: 'otchrit', icon: 'sort-numeric-up', url: '/ochred_view', view: false, color: '#ddd' },

          
          


          // { title: "Диаграмма", icon: 'chart-line', url: '/chart', view: false, color: '#FFA07A'  },
          // { title: "Датчик", icon: 'atom', url: '/sensor', view: false, color: '#800080' },
          // { title: "Цветь", icon: 'palette', url: '/addcolor', view: false, color: '#20B2AA' },
          // { title: "Датчик и Цветь", icon: 'tablet', url: '/scr_add', view: false, color: '#FF7F50' },
          // { title: "Datchik_Add", icon: 'heartbeat', url: '/datchikAdd', view: false, color:'#FFA500' },


          // { title: 'm_product', icon: 'clipboard', url: '/m_product', view: false, color: '#4B0082' },
          // { title: "add_category", icon: 'box', url: '/m_product_group', view: false, color: '#FFA07A' },
          // { title: "product_and category", icon: 'compress-arrows-alt', url: '/m_product_conf', view: false, color: '#40E0D0' },
          // { title: 'limit', icon: 'chart-bar', url: '/limit', view: false, color: '#9370DB' },
          // { title: 'currency', icon: 'hand-holding-usd', url: '/currency', view: false, color: '#40E0D0' },
        ],
      }
    },
    methods: {
      update_down: function (i) {
        for (let j = 0; j < this.links.length; j++) {
          if (j !== i) {
            this.links[j].view = false
          }
        }
        this.links[i].view = !this.links[i].view
      },
      funcActive(i){
        this.itter  = i
      }
    }
  };
</script>

<style lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
}
.mainReg{
  background: #eee;

}
.leftmenuReg{
  width: 15.5%;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  font-size: 14px;

}
.backgroundColor{
  background: #1E293B;
  height: 100%;
  padding: 2px 0px;
}
.mainReg{
  width: 84.5%;
}
.allContent{
  min-height: 100vh;
}
.active_linkReg{
  background: rgba(113, 184, 255, 0.3);
  border-left: 3px solid orange;
  p{
    color: white;
  }
  .ico{
    color: white;
  }
}
.menuitemReg:hover{
  background: rgba(113, 184, 255, 0.2);
  p{
    color: white;
  }
  .ico{
    color: white;
  }
}
.menuitemReg{
  p{
    color: white;
    font-size: 13px;

  }
  .ico{
    color: white;
  }
}
.snipper{
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
</style>