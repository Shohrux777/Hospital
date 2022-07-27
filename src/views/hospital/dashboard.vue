<template>
  <div class="dashboard">
    <div class="header_dash p-4">
      <div class="dashboard_header ">
        <div class="dashboard_icon rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="5 12 3 12 12 3 21 12 19 12" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <rect x="10" y="12" width="4" height="4" />
          </svg>
        </div>
        <div class="dashboard_title" @click="test">
          <h5 class="m-0">Dashboard</h5>
          <small class="ml-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
        </div>
      </div>

      <div class="dashboard_date d-flex align-items-center"> 
      </div>
    </div>





    
    
    <div class="month_info_picker p-4 ">
      <div style="position:relative; ">
        <div class="date_picker_icon rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="4" y="5" width="16" height="16" rx="2" />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="4" y1="11" x2="20" y2="11" />
            <line x1="11" y1="15" x2="12" y2="15" />
            <line x1="12" y1="15" x2="12" y2="18" />
          </svg>
        </div>
        <v-md-date-range-picker id="picker" @change="handleChange" opens="left" :auto-apply="value" ></v-md-date-range-picker>
      </div>
    </div>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:true,
      opens: 'right',
      values: [],

    }
  },
  methods: {
    test(){
      console.log(this.date)
      var picker = document.getElementById('picker')
      console.log(picker)
    },
    handleChange (values) {
      console.log(values)
      this.values = values
      console.log(this.values[0]._d)
    }

    
  },
}
</script>

<style lang="scss">
.dashboard{
  background: #F2F7FB;
  min-height: 100vh;
}
.header_dash{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard_header{
  display: flex;
  align-items: center;

  .dashboard_icon{
    display: flex;
    justify-content: center;
    align-items:center;
    height: 45px;
    width: 45px;
    background: #4099FF;
  }

  .dashboard_title{
    color: #333333;
    margin: 0px 10px;
  }
}
.date_picker_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 312px;
  top: 1.5px;
  z-index: 111 !important;
  width: 30px;
  height: 30px;
  background: orange;
}







.mdrp__activator{
  border-radius: 3px !important;
}
.activator-wrapper label{
  margin-left: 8px;
  font-size: 12px !important;
  display: none;
}

.mdrp-root{
  display: block !important;
}
.text-field__filled{
  // border:none ;
  border:1px solid rgb(221, 221, 221) !important;
  box-shadow: 2px 3px 5px rgb(226, 226, 226);
  border-radius: 5px !important;
  margin-left: 7px;
  background: #ffffff;
  color: rgb(3, 0, 180);
  font-size: 14px !important;
  padding-top:5px !important;
  padding-bottom: 5px !important;
  padding-left: 15px !important;
  display: flex;
  justify-content: center;
  align-items:center;

}
.text-field__filled:focus{
  border: none !important;
  margin-left: 7px;
  outline: none !important;
  &::before{
    width: 0 !important;
  }
  &::after{
    width: 0 !important;
  }
}


</style>