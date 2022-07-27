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
      <div class="lab_answer upHeightAll">
        <div class=" " style="display:flex; justify-content:center; flex-direction:column;">
          <h3 style="width:100%; text-align:center; font-weight:bold; " class="mb-5 headerTitle">Общий Анализ крови</h3>
          <table border class="allWidthLabTable" >
            <thead >
              <tr>
                <th class="fs" style="width:45%;" ><span class="font-weight-bold">ПАЦИЕНТ:</span>  {{option.patient_name}}</th>
                <th class="fs"><span class="font-weight-bold">ВРАЧ:</span>  {{option.doctor_name}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:45%;"><span class="font-weight-bold">ВОЗРАСТ:</span> {{borndate}} </th>
                <th class="fs"><span class="font-weight-bold">ДАТА:</span> {{date}}</th>
              </tr>
              <tr>
                <th class="fs" style="width:45%;"><span class="font-weight-bold">ПРИБОР:</span> MindrayBC-5300</th>
                <th class="fs"> </th>
              </tr>
            </thead>
          </table>
          <table border class="allWidthLabTable" style="margin-top:35px;">
            <thead>
              <tr >
                <th class="fs font-weight-bold">ИССЛЕДОВАНИЕ</th>
                <th class="fs font-weight-bold">РЕЗУЛЬТАТ</th>
                <th class="fs font-weight-bold py-2">НОРМА</th>
                <th style="width:200px" class="fs font-weight-bold py-2 ">Ед. Изм</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="fs text-danger">Лейкоциты(WBC)  </td>
                <td class="fs">{{option.leykositi}}</td>
                <td class="fs">  4.00 до 10.0 </td>
                <td class="fs"> млрд/литр </td>
              </tr>
               <tr>
                <td class="fs">Лимфоциты(LYMPH)</td>
                <td class="fs">{{option.neytrofili}}</td>
                <td class="fs">  0,8 до 4,0 </td>
                <td class="fs"> млрд/литр </td>

              </tr>

               <tr>
                <td class="fs">Моноциты(MID)</td>
                <td class="fs">{{option.limfotsi}}</td>
                <td class="fs">0,1 до 1,5</td>
                <td class="fs"> млрд/литр </td>
              </tr>
               <tr>
                <td class="fs">Гранулоциты(GRAN)</td>
                <td class="fs">{{option.monofisitsi}}</td>
                <td class="fs"> 2,0 до 7,0 </td>
                <td class="fs"> млрд/литр </td>

              </tr>
               <tr>
                <td class="fs">Лимфоциты(LYMPH)%</td>
                <td class="fs">{{option.eozinofili}}</td>
                <td class="fs"> 20.00-40.00 </td>
                <td class="fs"> % </td>

              </tr>
               <tr>
                <td class="fs">Моноциты(MID)%</td>
                <td class="fs">{{option.bazofili}}</td>
                <td class="fs">        3-15 </td>
                <td class="fs"> % </td>

              </tr>
               <tr>
                <td class="fs">Гранулоциты(GRAN)%</td>
                <td class="fs">{{option.neytrofili_2}}</td>
                <td class="fs"> от 50% до 70% </td>
                <td class="fs"> % </td>

              </tr>
               <tr>
                <td class="fs">Эритроциты(RBC)</td>
                <td class="fs">{{option.limfotsi_2}}</td>
                <td class="fs">М: 4.0-5.0 Ж: 3.9 - 4.7</td>
                <td class="fs"> 10*12/L </td>

              </tr>
               <tr>
                <td class="fs">Гемоглобен(HGB)</td>
                <td class="fs">{{option.monofisitsi_2}}</td>
                <td class="fs"> М: 120-150 Ж: 110-140</td>
                <td class="fs"> г/л </td>

              </tr>
               <tr>
                <td class="fs">Гематокрит(HCТ)</td>
                <td class="fs">{{option.eozinofili_2}}</td>
                <td class="fs"> 35-43 </td>
                <td class="fs"> % </td>

              </tr>
               <tr>
                <td class="fs">Средний обьем эритроцитов(MCV)</td>
                <td class="fs">{{option.bazofili_2}}</td>
                <td class="fs">80-100 </td>
                <td class="fs"> ф/л </td>

              </tr>
               <tr>
                <td class="fs ">Среднее содержание Гемоглобина в эритроците(MCH)</td>
                <td class="fs">{{option.eritrositi}}</td>
                <td class="fs"> 23-31 </td>
                <td class="fs"> л/г </td>

              </tr>
               <tr>
                <td class="fs ">Средняя концентрация Гемоглобина в эритроците(MCHC)</td>
                <td class="fs">{{option.gemoglabin}}</td>
                <td class="fs"> 310-360</td>
                <td class="fs"> g/L </td>

              </tr>
              <tr>
                <td class="fs">Индекс распределение эритроцитов(RDW-CV)</td>
                <td class="fs">{{option.gemotokrit}}</td>
                <td class="fs">11.5-15.0</td>
                <td class="fs"> % </td>

              </tr>
              <tr>
                <td class="fs">Индекс распределение эритроцитов(RDW-SD)</td>
                <td class="fs">{{option.sr_obyom_er}}</td>
                <td class="fs">35.0-56.0</td>
                <td class="fs"> fL </td>

              </tr>
              <tr>
                <td class="fs">Тромбоциты(PLT)</td>
                <td class="fs">{{option.sr_sod_gem_er}}</td>
                <td class="fs"> 150-400</td>
                <td class="fs"> млрд/литр </td>

              </tr>
              <tr>
                <td class="fs">Средний обьем тромбоцитов(MPV)</td>
                <td class="fs">{{option.sr_kons_gem_er}}</td>
                <td class="fs">7.4-10.4</td>
                <td class="fs"> fL </td>

              </tr>
              <tr>
                <td class="fs">Индекс распределения (PDW)</td>
                <td class="fs">{{option.shir_ras_er_gem}}</td>
                <td class="fs">от 10 до 20</td>
                <td class="fs">  </td>

              </tr>
              <tr>
                <td class="fs">Тромбокрит(PCT)</td>
                <td class="fs">{{option.shir_ras_er_po_obyom}}</td>
                <td class="fs">0.15-0.40</td>
                <td class="fs"> % </td>
              </tr>
              <tr>
                <td class="fs text-danger">СОЭ (ESR)</td>
                <td class="fs">{{option.trobositi}}</td>
                <td class="fs">М:2-10; Ж:3-15</td>
                <td class="fs">мм/час </td>
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
      time_qon: '',
      font_size: true,
      borndate: '',

      
     
    }
  },
  async created(){
    if(this.id>0){
      this.loading =true;
      const response = await fetch(this.$store.state.hostname + '/HospitalUmQonTaxlili/' + this.id)
      const data = await response.json();
      this.loading = false;
      console.log(data)
      this.option = data;
      this.borndate = data.patients.bornDate.slice(0,4);
      this.time_qon = data.qon_ivish_begin_date_time.slice(0,10) + ' =>  ' + data.qon_ivish_end_date_time.slice(0,10)
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
            img.onload = () => {
              // console.log('dasdasdas')
              // this.send();

            };
            // this.loading = false;

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
        "analiz_name": "Общий Анализ крови",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": 'umum_qon_print2',
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
  padding: 0px 4px;
}
.fs{
  font-size: 28.5px;
}

.headerTitle{
  font-size:50px;
}
.headerTitle1{
  font-size:45px;
}
</style>