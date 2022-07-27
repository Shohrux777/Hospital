<template>
  <div>
    <div class="rv_lab allWidthLab" id="table" style="position:relative;">
      <input type="text" style="position:absolute; top: -500px; outline:none;border:none;" ref="print" @keyup.enter="send">
      <div class="img " style="text-align:center;" v-show="false">
        <img id="image" width="100%" height="25%" alt="">
      </div>
      <div class="img " style="text-align:center;" >
        <img src="../../assets/lab1.png" width="100%" alt="">
      </div>
      <loader v-if="loading" />
      <div class="lab_answer upHeight"  >
        <div class=" " style="display:flex; justify-content:center; flex-direction:column;">
          <h3 style="width:100%; text-align:center; font-weight:bold; font-size: 50px; " class="mb-5">КОАГУЛОГРАММА</h3>
          <table border class="allWidthLabTable" >
            <thead >
              <tr>
                <th class="fs" style="width:50%;" ><span class="font-weight-bold">ПАЦИЕНТ:</span>  {{option.patient_name}}</th>
                <th class="fs"><span class="font-weight-bold">ВРАЧ:</span>  {{option.doctor_name}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:50%;"><span class="font-weight-bold">ВОЗРАСТ:</span> {{borndate}} </th>
                <th class="fs"><span class="font-weight-bold">ДАТА:</span> {{date}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:50%;"><span class="font-weight-bold">ПРИБОР:</span> Human Clot Junior (Human)</th>
                <th class="fs"> </th>
              </tr>
            </thead>
          </table>
          <table border class="allWidthLabTable" style="margin-top:35px;">
            <thead>
              <tr >
                <th class="fs font-weight-bold">ПАРАМЕТРЫ</th>
                <th class="fs font-weight-bold">РЕЗУЛЬТАТ</th>
                <th class="fs font-weight-bold py-2">НОРМАЛЬНЫЙ ДИАПАЗОН</th>
              </tr>
            </thead>
            <tbody :class="{'fs': font_size}">
              <tr>
                <td class="fs">Протромбиновый индекс (PT)</td>
                <td class="fs">{{option.index_pt}}</td>
                <td class="fs">70-120% </td>
              </tr>
              <tr>
                <td class="fs">Протромбиновое время (PT)</td>
                <td class="fs">{{option.vremya_pt}}</td>
                <td class="fs">13-18 сек</td>
              </tr>
              <tr>
                <td class="fs">МНО (ISI)</td>
                <td class="fs">{{option.isi}}</td>
                <td class="fs">0,8-1,2</td>
              </tr>
              <tr>
                <td class="fs">Фибриноген (FIB)</td>
                <td class="fs">{{option.fib}}</td>
                <td class="fs">2.0-4.0 г/л</td>
              </tr>
              <tr>
                <td class="fs">АЧТВ</td>
                <td class="fs">{{option.achtb}}</td>
                <td class="fs">25-36 сек</td>
              </tr>
              <tr>
                <td class="fs">Тромбиновое время (TT)</td>
                <td class="fs">{{option.tt}}</td>
                <td class="fs">8-14 сек</td>
              </tr>
              <tr>
                <td class="fs">Д-Димер</td>
                <td class="fs">{{option.diametr}}</td>
                <td class="fs">0-500 ng/ml</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div style="width:83%; text-align:right; position:fixed; bottom:10px; right:108px;" v-if="font_size == false">
        <mdb-btn color="success px-4 py-1" style="font-size:15px;" v-if="false" type="submit" @click="printed"><mdb-icon icon="print" /></mdb-btn>
        <mdb-btn color="primary px-4 py-1" style="font-size:15px;" v-if="false" type="submit" @click="send"><mdb-icon color="white"  fab icon="telegram-plane" /></mdb-btn>
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
    this.$refs.print.focus();
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
      font_size: true,
      borndate: '',
      
     
    }
  },
  async created(){
    if(this.id>0){
      this.loading =true;
      const response = await fetch(this.$store.state.hostname + '/HospitalKoagulogramma/' + this.id)
      const data = await response.json();
      this.loading = false;
      console.log(data)
      this.option = data;
      this.borndate = data.patients.bornDate.slice(0,4);
      this.date = this.option.created_date_time.slice(0,10)

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
            this.font_size = false;
            // this.loading = false;
            img.onload = () => {
              // console.log('dasdasdas')
              // this.send()
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
        "analiz_name": "КОАГУЛОГРАММА",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": 'kolagramma_print',
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
  font-size: 30px;
}


.headerTitle{
  font-size:47px;
}
.headerTitle1{
  font-size:45px;
}


</style>