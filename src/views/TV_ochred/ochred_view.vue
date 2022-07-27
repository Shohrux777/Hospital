<template>
  <div class="ochred_views bg_warning">
    <div class="bg_shadow p-4 ">
      <div class="row ">
        <div class="col-6 mt-4" v-for="(item, i) in getList" :key="i">
          <div class="border shadow rounded bg-white">
            <div class="border-bottom d-flex justify-content-center py-2">
              <h3 class="m-0 text-center" style="font-size: 45px;">{{item.users.FIO}}</h3>
            </div>
            <div class=" d-flex justify-content-center">
              <h1 class="font-weight-bold text-success mb-0 mt-1" style="font-size:65px;">{{item.ochred_list[0].ochred_name_aout_genereted}}</h1>
            </div>
            <div class=" d-flex justify-content-center">
              <h5 style="font-size:34px;" class="text-center">{{item.ochred_list[0].patients.FIO}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Toast ref="message"></Toast>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      getList: [],
    }
  },
async mounted() {
  await this.fetchOchred();
},
created() {
  setInterval(this.fetchOchred, 10000);
},
methods: {
  async fetchOchred(){
    let newdate = new Date().toISOString().slice(0,10);
      console.log(newdate)
      let b_date  = newdate + 'T00:00:35.000Z';
      let e_date  = newdate + 'T23:59:35.000Z';
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/HospitalOchreds/getPaginationByDoctorList?page=0&size=100&begin_date=" + b_date + '&end_date=' + e_date);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          this.getList = data.items_list
          console.log(data, 'jsonini ckeck ochret oldim')
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
  }
},
}
</script>

<style>
.ochred_views{
  background-image: url('../../assets/img-2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.bg_warning{
  overflow: hidden;
  overflow-y: scroll;

  /* background: rgb(151, 251, 161); */
}
.bg_shadow{
  background: rgba(4, 4, 4, 0.726);
  height: 100vh;


}
</style>