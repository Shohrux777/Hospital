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
      <div class="lab_answer upHeightAll"  >
        <div class=" " style="display:flex; justify-content:center; flex-direction:column;">
          <h3 style="width:100%; text-align:center; font-weight:bold; " class="mb-5 headerTitle">Кондаги гормонлар</h3>
          <table border class="allWidthLabTable"  >
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
                <th class="fs" style="width:45%;"><span class="font-weight-bold">ПРИБОР:</span> Mindray BA-88A </th>
                <th class="fs"> </th>
              </tr>
            </thead>
          </table>
          <table border class="allWidthLabTable" style="margin-top:35px;">
            <thead>
              <tr>
                <th class="fs font-weight-bold py-2" >№</th>
                <th class="fs font-weight-bold py-2" >ИССЛЕДОВАНИЕ</th>
                <th class="fs font-weight-bold py-2" >РЕЗУЛЬТАТ</th>
                <th class="fs font-weight-bold py-2" >НОРМА</th>
              </tr>
            </thead>
            <tbody >
              
              <tr>
                <td class="fs">1</td>
                <td class="fs">Тиретроп гормон /ТТГ/</td>
                <td class="fs">{{option.ttg}}</td>
                <td class="fs">0,4-4,0 mlU/l
                </td>
              </tr>
              <tr>
                <td class="fs">2</td>
                <td class="fs">ДЕАС (Дегидроепиандростерон)</td>
                <td class="fs">{{option.deac}}</td>
                <td class="fs">Женшины
                    18-30 лет :  0.29 – 7.81 мкг/мл
                </td>
              </tr>
              <tr>
                <td class="fs">3</td>
                <td class="fs">Трийодтиронин общий /Т3 </td>
                <td class="fs">{{option.obshiy_t3}}</td>
                <td class="fs">
                </td>
              </tr>
              <tr>
                <td class="fs">4</td>
                <td class="fs">Трийодтиронин свободный /Т3/</td>
                <td class="fs">{{option.svabodniy_t3}}</td>
                <td class="fs">
                </td>
              </tr>
              <tr>
                <td class="fs">5</td>
                <td class="fs">Тироксин /Т4/ </td>
                <td class="fs">{{option.t_4}}</td>
                <td class="fs">4,7-12,4 mkg/dl
                </td>
              </tr>
              <tr>
                <td class="fs">6</td>
                <td class="fs">Тироксин /Т4 свободного/</td>
                <td class="fs">{{option.t_4_svabodno}}</td>
                <td class="fs">10 – 25 пмол/л
                </td>
              </tr>
              <tr>
                <td class="fs">7</td>
                <td class="fs">Тестостерон</td>
                <td class="fs">{{option.testosteron}}</td>
                <td class="fs">Мужчины  9.0 -38 нмоль/л
                    Женщины  0 - 4.6 нмоль/л
                </td>
              </tr>
              <tr>
                <td class="fs">8</td>
                <td class="fs">Эстрадиол </td>
                <td class="fs">{{option.estradiol}}</td>
                <td class="fs"><p class="fs m-0">Мужчины  0.029-0.3 нмоль/л</p>
                    <p class="fs m-0">Женщины:фолликулярная0.05-0.7нмоль/л</p>
                    <p class="fs m-0">лютеиновая 0.1-1.1 нмоль/л </p>
                    <p class="fs m-0">овуляция 0.34-1.8 нмоль/л</p>
                    <p class="fs m-0">менопауза 0.0-0.23 нмоль/л</p>
                </td>
              </tr>
              <tr>
                <td class="fs">9</td>
                <td class="fs">Пролактин</td>
                <td class="fs">{{option.prolaktin}}</td>
                <td class="fs">   Мужчины:  60-560 МЕ/л
                      Женщины: фолликулярная 60-600 МЕ/л
                      лютеиновая 120-900 МЕ/л
                      менопауза 40-550 МЕ/л
                </td>
              </tr>
              <tr>
                <td class="fs">10</td>
                <td class="fs">ФСГ</td>
                <td class="fs">{{option.fcg}}</td>
                <td class="fs">Мужчины:  0,8-25 МЕ/л
                    Женщины : фолликулярная 3,0-12 МЕ/л
                    лютеиновая 2,0-12 МЕ/л
                    овуляция 6,0-25 МЕ/л
                    менопауза 10,0-150 МЕ/л
                </td>
              </tr>
              <tr>
                <td class="fs">11</td>
                <td class="fs">ЛГ</td>
                <td class="fs">{{option.lg}}</td>
                <td class="fs">Мужчины:  1,5-9,0 МЕд/л
                    Женщины : фолликулярная 2,0-9,5 МЕд/л
                    лютеиновая 0,5-17 МЕд/л
                    овуляция 10,0-45 МЕд/л
                    менопауза 5,0-57 МЕд/л
                </td>
              </tr>
              <tr>
                <td class="fs">12</td>
                <td class="fs">Прогестерон </td>
                <td class="fs">{{option.progesteron}}</td>
                <td class="fs">Мужчины:  0 – 4.0 нмоль/л   12-17 лет: 0.3-4.3   Женщины : 12-17 лет: 0.3-41  нмоль/л    
                    Менопауза:  0 – 2.3 нмоль/л     
                    фолликулярная 0.6-4.6 нмоль/л    
                    лютеиновая 7.5-80 нмоль/л    
                    овуляция  11-80 нмоль/л
                </td>
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
      const response = await fetch(this.$store.state.hostname + '/HospitalQondagiGarmonlar/' + this.id)
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
              // this.send()
            };
            // this.loading = false;

        })
      })

        
     
      // console.log(doc)
    },
    async send(){
      var baseImg = document.querySelector("#image");
      this.base64 =await baseImg.src
      // console.log(this.base64)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
        "analiz_name": "Кондаги гормонлар",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": 'garmonlarQon_print',
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
  font-size: 28px;
}


.headerTitle{
  font-size:50px;
}
.headerTitle1{
  font-size:45px;
}





</style>