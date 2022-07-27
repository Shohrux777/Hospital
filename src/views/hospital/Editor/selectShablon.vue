<template>
  <div class="select_type bg-white pt-1 pb-3">
    <div class="d-flex justify-content-center my-2">
      <h4 class="font-weight-bold">Select your shablon</h4>
    </div>
    <div class="row px-2 mt-3">
      <div class="col-4 mt-3" >
        <div class="border rounded py-2 pl-2 hoverPointer" @click="newShablon"><h6 class="m-0">New shablon open</h6></div>
      </div>
      <div class="col-4  mt-3" v-for="(item,i) in shablonForDoc" :key="i">
        <div class="border rounded py-2 pl-2 hoverPointer" style="position:relative;" @click="select_shablon(item)"><h6 class="m-0">{{item.shablon_name}}</h6></div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"  @click="deleteShablon(item.id)"
          width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" 
          style="position:absolute; right:19px; top:9px; cursor:pointer;" 
          fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </div>
    </div>
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      modal_info : '',
      modal_status: false,

      shablonForDoc: [],
    }
  },
  async mounted() {
    {
      this.refresh()
    }
  },
  computed:mapGetters(['shablon_content']),
  methods: {
    ...mapMutations(['updateShablon']),
    async refresh(){
      const response = await fetch(this.$store.state.hostname + "/HospitalDoctorShablons/getPaginationByAuthId?page=0&size=400&auth_id=" + localStorage.AuthId);
            const data = await response.json();
            console.log(data);
            this.shablonForDoc = data.items_list;
    },
    newShablon(){
      this.$router.push('/word')
      this.updateShablon({name:'', title: ''})
    },
    
    select_shablon(item){
      console.log(item)

      this.updateShablon({name:item.shablon_content, title: item.shablon_name})
      this.$router.push('/word')
    },
    async deleteShablon(id){
      console.log(id);

          const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/HospitalDoctorShablons/" + id, requestOptions);
          const data = await response.json();

          if(data.id)
          {
            // this.alert_text = localizeFilter('Successfully_removed');
            this.$refs.message.success('Successfully_removed')
            this.refresh()

          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
    },

  },

}
</script>

<style>
.hoverPointer:hover{
  background: rgb(255, 234, 118);
  cursor:pointer;
}
</style>