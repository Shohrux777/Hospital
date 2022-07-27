<template>
  <div>
    <navbar/>
    <div class="d-flex allContent">
      <div class="leftmenu border-right">
        <div class="" v-for="(link,index) in links" :key="index" @click="funcActive(index)">
          <!-- :class="{'active_link': link.view}" -->
          <router-link
          tag="li" custom v-slot="{ navigate }"
          :to="link.url" 
          :class="{'active_link': index == itter}"
          
          class="text-dark d-flex py-2 menuitem border-bottom"
          >
          <!-- <MDBIcon style="color: red; margin-right: 10px; padding-left: 15px;" icon="camera-retro" />
          Xodimlar -->
          <li @click="navigate" role="link">
             <div style="width:100%; text-align:left">
              <p  style="padding-left: 15px; font-size:12.5px;" class="m-0">{{$t(link.title)}}</p>
            </div>
          </li>
         
          </router-link>
        </div>
      </div>
      <div class="mainAnaliz px-1 py-1">
        <router-view></router-view>
      </div>
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
          { title: 'BioximyaKrov', icon: 'user', url: '/biox', view: true, color: '#191970' },
          { title: "CovidExpress", icon: 'clinic-medical', url: '/covidExpress', view: false, color: '#FF7F50' },
          { title: "CovidQon", icon: 'hospital-alt', url: '/covidQon', view: false, color: '#4B0082' },
          { title: "ExpressGepatitBC", icon: 'biohazard', url: '/ExpressBC', view: false, color: '#00FF00' },
          { title: "GepatitBC", icon: 'diagnoses', url: '/gepatitBC', view: false, color:'#FFA500' },
          { title: "Koagulogramma", icon: 'atom', url: '/koagulogramma', view: false, color: '#800080' },
          { title: "Mazok", icon: 'ambulance', url: '/mazok', view: false, color:'#4682B4' },
          { title: "Nechiporenko", icon: 'ambulance', url: '/nechiporenko', view: false, color:'#4682B4' },
          { title: "Onkomarker", icon: 'ambulance', url: '/onkomarker', view: false, color:'#4682B4' },
          { title: "Peshob", icon: 'ambulance', url: '/peshob', view: false, color:'#4682B4' },
          { title: "GarmonlarQon", icon: 'ambulance', url: '/garmonlarQon', view: false, color:'#4682B4' },
          { title: "Remaproba", icon: 'ambulance', url: '/remaproba', view: false, color:'#4682B4' },
          { title: "Rv", icon: 'ambulance', url: '/rv', view: false, color:'#4682B4' },
          { title: "Torch", icon: 'ambulance', url: '/torch', view: false, color:'#4682B4' },
          { title: "Umumiy_qon", icon: 'ambulance', url: '/um_qon', view: false, color:'#4682B4' },
          { title: "spirmagromma", icon: 'ambulance', url: '/spirma', view: false, color:'#4682B4' },
          { title: "Vsk", icon: 'ambulance', url: '/vsk', view: false, color:'#4682B4' },
          { title: "Umumiy_qon2", icon: 'ambulance', url: '/umum_qon2', view: false, color:'#4682B4' },
          { title: "opuxoloviya", icon: 'ambulance', url: '/opuxoloviya', view: false, color:'#4682B4' },
          { title: "bioximechisky", icon: 'ambulance', url: '/bioximechisky', view: false, color:'#4682B4' },

          
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
.mainAnaliz{
    background:#ddd ;


}
.leftmenu{
  width: 18%;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2px 0px;
  background: #fff;
  font-size: 14px;
}
.mainAnaliz{
  width: 82%;
}
.allContent{
  min-height: 100vh;
}
.active_link{
  border-left: 3px solid rgb(25, 0, 255);
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