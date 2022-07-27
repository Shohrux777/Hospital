<template>
  <div class="checkPrint paymentCheckPrintCheck" style="z-index: 1000;">
    <div  id="printForm"  class="ckeck_main_sell  border" style="width:100%; height: 100%;">
      <div  style="text-align:center; margin: 10px 0; padding: 5px 7px; font-size:12px;">
        <h6 style="font-size:12px;" class="paymentCheckPrintCheck">ООО «G'ULOMJON NEYRO SERVICE» </h6>
      </div>
      <div class="infoHeader" style="width:100%;">
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:10.5px;" class="paymentCheckPrintCheck">Врач</span>
            <span style="font-size: 11px;" class="paymentCheckPrintCheck">{{get_ochred.doc_name}}</span>
          </div>
        </div>
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:10.5px;" class="paymentCheckPrintCheck">Напечатан </span>
            <span style="font-size: 11px;" class="paymentCheckPrintCheck">{{dateTime}}</span>
          </div>
        </div>
      </div>
      <div class="infoHeader" style="width:100%;">
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:10.5px;" class="paymentCheckPrintCheck">Имя пациент </span>
            <span style="font-size: 11px;" class="paymentCheckPrintCheck">{{get_ochred.client_name}}</span>
          </div>
        </div>
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:10.5px;" class="paymentCheckPrintCheck">Дата рождения</span>
            <span style="font-size: 11px;" class="paymentCheckPrintCheck">{{get_ochred.born_date}}</span>
          </div>
        </div>
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:10.5px;" class="paymentCheckPrintCheck">{{$t("phone")}}</span>
            <span style="font-size: 11px;" class="paymentCheckPrintCheck">{{get_ochred.phone_number}}</span>
          </div>
        </div>
      </div>
      <div  style="padding: 7px 0; border-bottom: 0.5px solid #000000;">
       <div  style="display:flex; justify-content: space-between; padding: 0 0px;" v-for="(item, i) in get_ochredService" :key="i">
          <span style="font-size: 10.5px;">{{i+1}}. {{item.name}})</span>
          <span style="font-size: 11px;"> ={{item.price}}</span>
       </div>
     </div>
      

      <div style="margin: 10px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 10.5px;">******************************************</span>
      </div>
      <div style="margin: 0px 10px; display:flex; justify-content:center;">
          <h1 style="font-size: 80px;" class="paymentCheckPrintCheck">{{get_ochred.number}}</h1>
      </div>
      
      <div style="margin: 0px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 10.5px;">******************************************</span>
      </div>
      
      

      

      <div style="margin-top:15px; border:1px solid black;"></div>
     
    </div>
  </div>
</template>

<script>
// import Printjs from "print-js";
import {mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return{
      comp_name: localStorage.CompName,
      kassir : localStorage.docName,
      dateTime: new Date().toLocaleDateString(),
      time: new Date().toDateString,
    }
  },
  mounted(){
    window.print();
    this.$emit('close');
    // this.clear_order();
      // Printjs({
      //   printable: "printForm", //Id to print content 
      //   type: "html",
      //   targetStyles: ['*'],
      //   ignoreElements:['no-print','bc','gb']
      // });
    // window.onload = function() { window.print(); window.close();}
    
  },
  created() {
    this.$root.$refs.check = this;
  },
  computed: mapGetters(['get_ochred', 'get_ochredService']),
  methods: {
   ...mapMutations(['clear_order']),
  }
}
</script>

<style lang="scss" >
@font-face{
  font-family: "Ubuntu";
  src: url("../../font/Ubuntu/Ubuntu-Bold.ttf")
}
.paymentCheckPrintCheck{
  font-family: 'Ubuntu';  
  font-weight: bold;
}
span, h6{
  font-family: 'Ubuntu';  
}

.checkPrint {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .ckeck_main_sell{
    width: 100%;
    height: 100%;

    .infoHeader{
      border-bottom: 1px dashed black;
      padding: 0px 0px 5px 0px; 
    }
    .infoList{
      padding: 10px 0px 15px 0px; 
    }
    .totalInfo{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px 20px 0px; 
    }
  }
}
</style>