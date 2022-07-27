<template>
  <div>
    <div class="rv_lab allWidthLab" id="table"  style="position:relative;">
      <input type="text" style="position:absolute; top: -500px; outline:none;border:none;" ref="print" @keyup.enter="send">
      <div class="img " style="text-align:center;" v-show="false">
        <img id="image" width="100%" height="25%" alt="">
      </div>
      <div class="img " style="text-align:center;" >
        <img src="../../assets/lab1.png" width="100%" alt="">
      </div>
      <loader v-if="loading" />
      <div class="lab_answer upHeight">
        <div class=" " style="display:flex; justify-content:center; flex-direction:column;">
          <div style="width:100%;" >
            <h3 class="headerTitle" style=" text-align:center;font-weight:bold;">The test results about coronavirus (COVID 19) infection  </h3>
            <h3 class="headerTitle1" style=" text-align:center;">REFERENCE</h3>
            <h4 class="headerTitle1" style=" text-align:center;">Коронавирус (COVID 19) инфекциясига текширилган тест натижаси ҳақида </h4>
            <h3 class="headerTitle1" style=" text-align:center;">Маълумотнома № {{id}}</h3>
          </div>
          <table border class="allWidthLabTable" >
            <thead >
              <tr>
                <th class="fs">1</th>
                <th class="fs">Ф.И.О. / Full name</th>
                <th class="fs">{{option.patient_name}}</th>
              </tr>
              <tr>
                <th class="fs">2</th>
                <th class="fs">Туғилган сана / Date birth</th>
                <th class="fs">{{bornDate}}</th>
              </tr>
              <tr>
                <th class="fs">3</th>
                <th class="fs">Паспорт серия рақами / Passport series and number</th>
                <th class="fs">{{passport}}</th>
              </tr>
              <tr>
                <th class="fs">4</th>
                <th class="fs">Телефон рақами / Phone number</th>
                <th class="fs">{{phoneNumber}}</th>
              </tr>
              <tr>
                <th class="fs">5</th>
                <th class="fs">Текширув усули / Research method</th>
                <th class="fs">One Step Test Kit for Novel Coronavirus (2019-nCoV)</th>
              </tr>
              <tr>
                <th class="fs">6</th>
                <th class="fs">Лаборатор таҳлил натижаси / The result of laboratory analysis</th>
                <th class="fs">
                  <p class="m-0">IgG – {{option.result_lgg}}</p>
                  <p class="m-0">IgM – {{option.result_lgm}}</p>
                
                </th>
              </tr>
              <tr>
                <th class="fs">7</th>
                <th class="fs">Текширилган сана / Date tested</th>
                <th class="fs">{{regdate}}</th>
              </tr>
              <tr>
                <th class="fs">8</th>
                <th class="fs">Лаборатория мудири / Head of laboratory</th>
                <th class="fs">{{option.doctor_name}}</th>
              </tr>
            </thead>
          </table>
          
        </div>
        
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div style="width:83%; text-align:right; position:fixed; bottom:10px; right:108px;" v-if="font_size == false">
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

export default {
 async mounted() {
    // this.$refs.print.focus();
  },
   components: {
      mdbBtn, mdbIcon
    },
  data(){
    return{
      option: {},
      id: this.$route.params.id,
      base64: '',
      loading: false,
      date: '',
      bornDate: '',
      regdate: '',
      passport: '',
      phoneNumber: '',
      font_size: true,
    }
  },
  async created(){
    if(this.id>0){
      this.loading =true;
      const response = await fetch(this.$store.state.hostname + '/HospitalCovidQon/' + this.id)
      const data = await response.json();
      this.loading = false;
      console.log(data)
      this.option = data;
      this.date = this.option.created_date_time.slice(0,10)
      this.bornDate = data.patients.bornDate.slice(0,10)
      this.regdate = data.patients.registratedDate.slice(0,10)
      this.phoneNumber = data.patients.phoneNumber
      this.passport = data.patients.passportSerialNumber


      await this.sendPdfTeleg();
    }
  },
  methods: {
    printed(){
      window.print();
    },
    async sendPdfTeleg(){
      console.log('ishladi')


          // await domtoimage
          // .toPng(this.$refs.pdfID)
          // .then(function(dataUrl) {
          //   var img = document.querySelector("#image");
          //   img.src = dataUrl;
          // console.log(dataUrl)

          // const doc = new jsPDF({
          //   orientation: 'p',
          //   unit: 'mm',
          //   format: 'a3',
          //   putOnlyUsedFonts:true
          // });
          // doc.addImage(img, "JPEG", 1, 1);
          // const date = new Date();
          // const filename =
          //   "timechart_" +
          //   date.getFullYear() +
          //   ("0" + (date.getMonth() + 1)).slice(-2) +
          //   ("0" + date.getDate()).slice(-2) +
          //   ("0" + date.getHours()).slice(-2) +
          //   ("0" + date.getMinutes()).slice(-2) +
          //   ("0" + date.getSeconds()).slice(-2) +
          //   ".pdf";
          // doc.save(filename);

          // })
          // .catch(function(error) {
          //   console.error("oops, something went wrong!", error);
          // });

        

        // this.loading = true;
        this.$nextTick(() => {
             // captureId is the page that needs to be downloaded
        html2canvas(document.querySelector('#table')).then(canvas => {
            // console.log(canvas.toDataURL())
            var img = document.querySelector("#image");
            img.src = canvas.toDataURL();
            // this.loading = false;
            this.font_size = false;
            img.onload = () => {
              console.log('dasdasdas')
              this.send()
            };
            

        })
      })

        
     
      // console.log(doc)
    },
    async send(){
      var baseImg = document.querySelector("#image");
      this.base64 = await baseImg.src
      // console.log(this.base64)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
        "analiz_name": "Express COVID-19 Antigen",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": 'covid19_print',
        "creator_doctor_name": localStorage.docName
        })
      };
      this.loading = true;
      const response = await fetch(this.$store.state.hostname + '/HospitalPatientAnalizHistory', requestOptions)
      const data = await response.json()
      console.log(data)
      if(data.id){
        this.$router.back()

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
@import url(../../style/style.css);

th, td{
  padding: 2px 8px;
}
.fs{
  font-size: 29px;
}


.headerTitle{
  font-size:47px;
}
.headerTitle1{
  font-size:45px;
}


</style>