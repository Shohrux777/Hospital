<template>
  <div >
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
          <h1 style="width:100%; text-align:center; font-weight: bold;"  class="mb-5 headerTitle">Биохимический Анализ крови</h1>
          <table border  class="allWidthLabTable" >
            <thead >
              <tr >
                <th class="fs"  style="width:45%;" ><span  style="font-weight:900;">ПАЦИЕНТ:</span>  {{option.patient_name}}</th>
                <th class="fs"><span  style="font-weight:900;">ВРАЧ:</span>  {{option.doctor_name}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:45%;"><span  class="font-weight-bold ">ВОЗРАСТ:</span> {{borndate}} </th>
                <th class="fs"><span  style="font-weight:900;">ДАТА:</span> {{date}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:45%;"><span  style="font-weight:900;">ПРИБОР:</span> Mindray BA-88A </th>
                <th class="fs"> </th>
              </tr>
            </thead>
          </table>
          <table border class="allWidthLabTable" style="margin-top:35px;">
            <thead>
              <tr >
                <th class="font-weight-bold fs">№</th>
                <th class="font-weight-bold fs">ИССЛЕДОВАНИЕ</th>
                <th class="font-weight-bold fs">РЕЗУЛЬТАТ</th>
                <th class="font-weight-bold fs py-2" >НОРМА</th>
              </tr>
            </thead>
            <tbody class="fs">
              
              <tr class="fs" >
                <td class="fs">1</td>
                <td class="fs">АЛТ (АЛТ)</td>
                <td class="fs">{{option.alt}}</td>
                <td class="fs">М: 42 Ед/л
                  Ж: 32 Ед/л
                </td>
              </tr>
              <tr>
                <td class="fs">2</td>
                <td class="fs">АСТ(АСТ)</td>
                <td class="fs">{{option.act}}</td>
                <td class="fs">М: 37 Ед/л
                    Ж: 31 Ед/л
                </td>
              </tr>
              <tr>
                <td class="fs">3</td>
                <td class="fs">Общий билирубин (ТВ)</td>
                <td class="fs">{{option.tb}}</td>
                <td class="fs">18.8 мкмоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">4</td>
                <td class="fs">Прямой билирубин (DВ)</td>
                <td class="fs">{{option.db}}</td>
                <td class="fs">5,13 мкмоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">5</td>
                <td class="fs">Общий белок (TP)</td>
                <td class="fs">{{option.tp}}</td>
                <td class="fs">Взрослые 66-87 г/л
                </td>
              </tr>
              <tr>
                <td class="fs">6</td>
                <td class="fs">Глюкоза (GLU)</td>
                <td class="fs">{{option.glu}}</td>
                <td class="fs">3,5-6.4 ммоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">7</td>
                <td class="fs">Креатинин (KREA)</td>
                <td class="fs">{{option.krea}}</td>
                <td class="fs">   М: 50 лет 74-110 мкмолъ/л
                      >50 лет 72-127 мкмолъ/л
                      Ж : 58-96 мкмолъ/л
                </td>
              </tr>
              <tr>
                <td class="fs">8</td>
                <td class="fs">Мочевина (BUN)</td>
                <td class="fs">{{option.bun}}</td>
                <td class="fs">1.7-8.3 ммоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">9</td>
                <td class="fs">Холестерин (ТС)</td>
                <td class="fs">{{option.tc}}</td>
                <td class="fs">5,2 ммоль/л
                    100%
                </td>
              </tr>
              <tr>
                <td class="fs">10</td>
                <td class="fs">Холестерин липопротеины высокий плотности (HDL-C)</td>
                <td class="fs">{{option.hdl_c}}</td>
                <td class="fs">≥ 1.55 ммоль/л
                    29.8%
                </td>
              </tr>
              <tr>
                <td class="fs">11</td>
                <td class="fs">Холестерин липопротеины низкий плотности (LDL-C)</td>
                <td class="fs">{{option.ldl_c}}</td>
                <td class="fs">  {{integer}}
                </td>
              </tr>
              <tr>
                <td class="fs">12</td>
                <td class="fs">Кальций (Са)</td>
                <td class="fs">{{option.ca}}</td>
                <td class="fs">2.02-2.60 ммоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">13</td>
                <td class="fs">Alpha - AMYLASE</td>
                <td class="fs">{{option.amylase}}</td>
                <td class="fs">30-90 U/L
                </td>
              </tr>
            </tbody>
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
    this.$refs.print.focus();
  },
   components: {
      mdbBtn, mdbIcon
    },
  data(){
    return{
      option: {},
      patient_name: '',
      id: this.$route.params.id,
      base64: '',
      loading: false,
      date: '',
      font_size: true,
      integer: "<2.59 ммоль/л 49.8%",
      borndate: '',

      
     
    }
  },
  async created(){
    if(this.id>0){
      this.loading =true;
      const response = await fetch(this.$store.state.hostname + '/HospitalBioximyaKrov/' + this.id)
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
              console.log(canvas.toDataURL())
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
      console.log(this.base64)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
        "analiz_name": "Биохимический Анализ крови",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": "biox_print",
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
  font-size:50px;
}


</style>