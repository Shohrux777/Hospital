<template>
  <div>
    <div class="rv_lab" id="table">
      <input type="text" style="position:absolute; top: -500px; outline:none;border:none;" ref="print" @keyup.enter="send">
      <div class="img " style="text-align:center;" v-show="false">
        <img id="image" width="100%" height="100%" alt="">
      </div>
      <div class="img " style="text-align:center;">
        <img src="../../../assets/lab1.png" id="iypm" width="100%" height="100%" alt="">
      </div>
      <div class="lab_answer d-flex justify-content-center" :class="{'upHeight': font_size, 'topHeight': !font_size }">
        <div v-html="sablonSavepatient.content"></div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div style="width:83%; text-align:right; position:fixed; bottom:10px; right:108px;" v-if="false">
        <mdb-btn color="success px-4 py-1" style="font-size:15px;" type="submit" @click="printed"><mdb-icon icon="print" /></mdb-btn>
        <mdb-btn color="primary px-4 py-1" style="font-size:15px;" v-if="option.sended_status==false" type="submit" @click="send"><mdb-icon color="white"  fab icon="telegram-plane" /></mdb-btn>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
// import domtoimage from "dom-to-image";
import { mdbBtn, mdbIcon} from 'mdbvue';
import {mapGetters} from 'vuex'

export default {
 async mounted() {
    this.$refs.print.focus();
    // var base_img = document.querySelector("#iypm");
    // base_img.onload = () => {
    //   console.log('dasdasdas')
    // };
    this.sendPdfTeleg()
  },
   components: {
      mdbBtn, mdbIcon
    },
  data(){
    return{
      option: {},
      patient_name: 'Hakim hamid ogli',
      base64: '',
      patientId: this.$route.params.id,
      loading: false,
      date: '',
      font_size: true,
      test: 0
      
     
    }
  },
  computed: mapGetters(['sablonSavepatient', 'patientIdforDoctor']),
  // async created(){
  //   if(this.id>0){
  //     this.loading =true;
  //     const response = await fetch(this.$store.state.hostname + '/HospitalVSK/' + this.id)
  //     const data = await response.json();
  //     this.loading = false;
  //     console.log(data)
  //     this.option = data;
  //     this.date = this.option.created_date_time.slice(0,10)

  //     await this.sendPdfTeleg();
  //     this.font_size = false
  //   }
  // },
  methods: {
    printed(){
      window.print();
    },
    async sendPdfTeleg(){
      console.log('dsadasdasdasqweqweqwe')

        // this.loading = true;
        this.$nextTick(() => {
             // captureId is the page that needs to be downloaded
        html2canvas(document.querySelector('#table')).then(canvas => {
            console.log(canvas.toDataURL())
            var img = document.querySelector("#image");
            img.src = canvas.toDataURL();
            this.font_size = false;
            img.onload = () => {
              this.test++;
              console.log('dasdasdas')
              this.send()

            };
            if(this.test == 1){
              console.log('dasdasdas')
            }
            // this.loading = false;


        })
      })

        
     
      // console.log(doc)
    },
    async send(){
      var baseImg = document.querySelector("#image");
      this.base64 = baseImg.src
      console.log(this.base64)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
        "patientRecipeTitle": this.sablonSavepatient.title,
        "patinetRecipeStr": this.base64,
        "doctorId": localStorage.AuthId,
        "patientsId": this.patientIdforDoctor,
        })
      };
      this.loading = true;
      const response = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors', requestOptions)
      const data = await response.json()
      console.log('dasdasdas')
      console.log(data)
      if(data.id){
        this.loading = false;
        this.$router.push('/blankaPrint/'+ data.id)  

      }
      else{
        // this.$refs.msg.error('Error_successfully')
        this.loading = false;
        // this.modal_info = data.detail + "    (" + data.routine + ")";
        // this.modal_status = true;
        return false;
      }
    }

  },
}
</script>

<style >
th, td{
  padding: 2px 8px;
}
.fs{
  font-size: 24px;
}
.upHeight{
  position:absolute; 
  top:55%; 
  left:100px; 
  right:100px; 
  padding: 10px 0px;
}
.topHeight{
  position:absolute; 
  top:270px; 
  left:100px; 
  right:100px; 
  padding: 10px 0px; 
}
</style>