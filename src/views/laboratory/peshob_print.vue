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
          <h3 style="width:100%; text-align:center; font-weight:bold;" class="mb-5 headerTitle">Общий Анализ мочи</h3>
          <table border class="allWidthLabTable" >
            <thead >
              <tr>
                <th class="fsPeshob" style="width:45%;" ><span class="font-weight-bold">ПАЦИЕНТ:</span>  {{option.patient_name}}</th>
                <th class="fsPeshob"><span class="font-weight-bold">ВРАЧ:</span>  {{option.doctor_name}}</th>
              </tr>
              <tr>
                <th class="fsPeshob" style="width:45%;"><span class="font-weight-bold">ВОЗРАСТ:</span> {{borndate}} </th>
                <th class="fsPeshob"><span class="font-weight-bold">ДАТА:</span> {{date}}</th>
              </tr>
              <tr>
                <th class="fsPeshob" style="width:45%;"><span class="font-weight-bold">ПРИБОР: </span> Mindray UA-66  </th>
                <th class="fsPeshob"></th>
              </tr>
            </thead>
          </table>
          <h1 style="width:100%; text-align:center; font-weight:bold; margin-top:20px;">Физико-химические свойства</h1>
          <table border class="allWidthLabTable" style="margin-top:5px;">
            <thead>
              <tr >
                <th style="width:70px"></th>
                <th  class="fsPeshob font-weight-bold">Показатель </th>
                <th  class="fsPeshob font-weight-bold">Результат</th>
                <th  class="fsPeshob font-weight-bold py-2">Норма</th>
                <th  class="fsPeshob font-weight-bold py-2">Ед.измер</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td class="fsPeshob font-weight-bold"></td>
                <td class="fsPeshob">Количество</td>
                <td class="fsPeshob">{{option.kolichestva}}</td>
                <td class="fsPeshob"></td>
                <td class="fsPeshob">Mл </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold"></td>
                <td class="fsPeshob">Цвет</td>
                <td class="fsPeshob">{{option.svet}}</td>
                <td class="fsPeshob">До солом. Желтого</td>
                <td class="fsPeshob"> </td>
              </tr>

              <tr>
                <td class="fsPeshob font-weight-bold"></td>
                <td class="fsPeshob">Прозрачность</td>
                <td class="fsPeshob">{{option.prozrachnost}}</td>
                <td class="fsPeshob">Прозрачная</td>
                <td class="fsPeshob"> </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">LEU</td>
                <td class="fsPeshob">Лейкоциты</td>
                <td class="fsPeshob">{{option.leykositi}}</td>
                <td class="fsPeshob">До 10</td>
                <td class="fsPeshob">Лей/мкл </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">NIT</td>
                <td class="fsPeshob">Нитриты</td>
                <td class="fsPeshob">{{option.nitriti}}</td>
                <td class="fsPeshob">0,05-0,1</td>
                <td class="fsPeshob">Мг/дл </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">URO</td>
                <td class="fsPeshob">Уробилиноген</td>
                <td class="fsPeshob">{{option.urobilinogen}}</td>
                <td class="fsPeshob">3,5-17</td>
                <td class="fsPeshob"> Ммоль/л</td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">PRO</td>
                <td class="fsPeshob">Белок</td>
                <td class="fsPeshob">{{option.belot}}</td>
                <td class="fsPeshob">7.5-20</td>
                <td class="fsPeshob"> Мг/дл</td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">pH</td>
                <td class="fsPeshob">Кислотность</td>
                <td class="fsPeshob">{{option.kislotnost}}</td>
                <td class="fsPeshob">5-9</td>
                <td class="fsPeshob"> </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">BLO</td>
                <td class="fsPeshob">Кровь</td>
                <td class="fsPeshob">{{option.krov}}</td>
                <td class="fsPeshob">Отрицательно</td>
                <td class="fsPeshob">Эрит/мл </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">SG</td>
                <td class="fsPeshob">Удельный вес</td>
                <td class="fsPeshob">{{option.udalleniy_ves}}</td>
                <td class="fsPeshob">1,000-1,030</td>
                <td class="fsPeshob"> </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">KET</td>
                <td class="fsPeshob">Ацетон</td>
                <td class="fsPeshob">{{option.aseton}}</td>
                <td class="fsPeshob">0,25-0,5</td>
                <td class="fsPeshob"> Ммоль/л</td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">BIL</td>
                <td class="fsPeshob">Билирубин</td>
                <td class="fsPeshob">{{option.bilirubin}}</td>
                <td class="fsPeshob">0,4-0,8</td>
                <td class="fsPeshob"> Мг/дл</td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">GLU</td>
                <td class="fsPeshob">Глюкоза</td>
                <td class="fsPeshob">{{option.glyukoza}}</td>
                <td class="fsPeshob">2,5-5</td>
                <td class="fsPeshob">Ммоль/л </td>
              </tr>
              <tr>
                <td class="fsPeshob font-weight-bold">ASC</td>
                <td class="fsPeshob">Аскорбиновая кислота</td>
                <td class="fsPeshob">{{option.askorbinnaya_kislota}}</td>
                <td class="fsPeshob">0,28- 0,56</td>
                <td class="fsPeshob">Ммоль/л </td>
              </tr>
            </tbody>
          </table>
          <h1 style="width:100%; text-align:center; font-weight:bold; margin-top:15px;">Микроскопия осадка</h1>
          <table border class="allWidthLabTable" style="margin-top:0px;">
            <tbody >
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Эпителий плоский </td>
                <td class="fsPeshob">{{option.epitoliy_ploskiy}}</td>
                <td class="fsPeshob">1-15</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Эпителий почечный</td>
                <td class="fsPeshob">{{option.epitoliy_pochechniy}}</td>
                <td class="fsPeshob">Единичные</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Эпителий промежуточный</td>
                <td class="fsPeshob">{{option.epiteliy_promujechotniy}}</td>
                <td class="fsPeshob">Отрицательно</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Лейкоциты </td>
                <td class="fsPeshob">{{option.leykositi2}}</td>
                <td class="fsPeshob">1-5</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Эритроциты не измененные</td>
                <td class="fsPeshob">{{option.eritoriseti_ne_izminenne}}</td>
                <td class="fsPeshob">0-1</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Эритроциты измененные</td>
                <td class="fsPeshob">{{option.eritoriseti_izminenne}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Цилиндры гиалиновые</td>
                <td class="fsPeshob">{{option.silindri_geolinoviy}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Цилиндры зернистые </td>
                <td class="fsPeshob">{{option.silindri_zernosti}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Цилиндры восковидные </td>
                <td class="fsPeshob">{{option.silindri_voskovidniy}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Слизь </td>
                <td class="fsPeshob">{{option.sliz}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Бактерии </td>
                <td class="fsPeshob">{{option.bakteri}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
              </tr>
              <tr>
                <td class="fsPeshob" style="width:70px"></td>
                <td class="fsPeshob">Соли </td>
                <td class="fsPeshob">{{option.soli}}</td>
                <td class="fsPeshob">Отрицательный</td>
                <td class="fsPeshob">В поле зрения </td>
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
      id: this.$route.params.id,
      base64: '',
      loading: false,
      date: '',
      borndate: '',
      font_size: true,
      
     
    }
  },
  async created(){
    if(this.id>0){
      this.loading =true;
      const response = await fetch(this.$store.state.hostname + '/HospitalPeshob/' + this.id)
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
      // console.log('ishladi')


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
        "analiz_name": "Общий Анализ мочи",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": 'peshob_print',
        "creator_doctor_name": localStorage.docName
        })
      };
      this.loading = true;
      const response = await fetch(this.$store.state.hostname + '/HospitalPatientAnalizHistory', requestOptions)
      const data = await response.json()
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
.fsPeshob{
  font-size: 27.5px;
}


.headerTitle{
  font-size:50px;
}
.headerTitle1{
  font-size:45px;
}

</style>