<template>
  <div >
    <mdb-card-title class="text-center "><strong> {{title_name}}</strong></mdb-card-title>
      <div class="test_shadow erplist" >
        <mdb-list-group>
            <a class=" pl-4 pt-2 pb-2"
              v-for="list in list_data" :key="list.id" @click="onSelectList(list)"
              >{{list.name}}</a>
        </mdb-list-group>
      </div>
  </div>
</template>

<script>
import {mdbCardTitle, mdbListGroup} from 'mdbvue'
export default {
name:'erp-list',
components:{mdbCardTitle, mdbListGroup},
props:{
  title_name :{
    type:String,
    default:''
  },
  list_data: {
    type:Array,
    default(){
          return []
        }
  }
},

methods:{
  onSelectList(list){
    this.$emit('select',list);
  }
}
}
</script>

<style scoped>
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

.erplist{
  overflow-y: scroll;
  min-height:350px;
  max-height:350px;
}
a:hover{
  background: rgb(236, 236, 236);

}
a{
   border-bottom: 1px solid #dbdbdb;
}
.test_shadow{
  box-shadow: 1px 1px 5px rgb(200,200,200);
  border-radius: 5px;
}
</style>
