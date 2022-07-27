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
      <div class="lab_answer upHeightAllspirma"  >
        <div class=" " style="display:flex; justify-content:center; flex-direction:column;">
          <h1 style="width:100%; text-align:center; font-weight: bold;"  class="mb-5 headerTitle">Спермаграмма</h1>
          <table border  class="allWidthLabTable" >
            <thead>
              <tr >
                <th class="fs"  style="width:45%;" ><span  style="font-weight:900;">ПАЦИЕНТ:</span>  {{option.creator_doctor_name}}</th>
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
              <tr>
                <th class="font-weight-bold fs">№</th>
                <th class="font-weight-bold fs">ИССЛЕДОВАНИЕ</th>
                <th class="font-weight-bold fs">РЕЗУЛЬТАТ</th>
                <th class="font-weight-bold fs py-2" >НОРМА</th>
              </tr>
            </thead>
            <tbody class="fs">
              
              <tr class="fs" >
                <td class="fs">1</td>
                <td class="fs">Обьём</td>
                <td class="fs">{{option.name_1}}</td>
                <td class="fs">1.5-4 мл
                </td>
              </tr>
              <tr>
                <td class="fs">2</td>
                <td class="fs">Цвет</td>
                <td class="fs">{{option.name_2}}</td>
                <td class="fs">Молочно-белый
                </td>
              </tr>
              <tr>
                <td class="fs">3</td>
                <td class="fs">Запах</td>
                <td class="fs">{{option.name_3}}</td>
                <td class="fs">специфический
                </td>
              </tr>
              <tr>
                <td class="fs">4</td>
                <td class="fs">Мутность</td>
                <td class="fs">{{option.name_4}}</td>
                <td class="fs">мутная
                </td>
              </tr>
              <tr>
                <td class="fs">5</td>
                <td class="fs">Консистенция</td>
                <td class="fs">{{option.name_5}}</td>
                <td class="fs">тягучая
                </td>
              </tr>
              <tr>
                <td class="fs">6</td>
                <td class="fs">Вязкость</td>
                <td class="fs">{{option.name_6}}</td>
                <td class="fs">0,5-1 см
                </td>
              </tr>
              <tr>
                <td class="fs">7</td>
                <td class="fs">Время разжижения</td>
                <td class="fs">{{option.name_7}}</td>
                <td class="fs"> 20-30мин
                </td>
              </tr>
              <tr>
                <td class="fs">8</td>
                <td class="fs">Рh</td>
                <td class="fs">{{option.name_8}}</td>
                <td class="fs">7,2 и выше
                </td>
              </tr>
              <tr>
                <td class="fs">9</td>
                <td class="fs">Кол-во в мл</td>
                <td class="fs">{{option.name_9}}</td>
                <td class="fs">более 18 млн
                </td>
              </tr>
              <tr>
                <td class="fs">10</td>
                <td class="fs">Кол-во Живых спер-в</td>
                <td class="fs">{{option.name_10}}</td>
                <td class="fs">50(55-63)%
                </td>
              </tr>
              <tr>
                <td class="fs">11</td>
                <td class="fs">Активно-подвижные(А)</td>
                <td class="fs">{{option.name_11}}</td>
                <td class="fs">  25-(28-38)%
                </td>
              </tr>
              <tr>
                <td class="fs">12</td>
                <td class="fs">Подвижные(Б)</td>
                <td class="fs">{{option.name_12}}</td>
                <td class="fs">35-(38-40)%
                </td>
              </tr>
              <tr>
                <td class="fs">13</td>
                <td class="fs">Непрогрессивно-подвижные(С)</td>
                <td class="fs">{{option.name_13}}</td>
                <td class="fs">10-15 %
                </td>
              </tr>
              <tr>
                <td class="fs">14</td>
                <td class="fs">Неподвижные(Д)</td>
                <td class="fs">{{option.name_14}}</td>
                <td class="fs">до 18-20 %
                </td>
              </tr>
              <tr>
                <td class="fs">15</td>
                <td class="fs">Нормальные</td>
                <td class="fs">{{option.name_15}}</td>
                <td class="fs">81% и более
                </td>
              </tr>
              <tr>
                <td class="fs">16</td>
                <td class="fs">Измененные</td>
                <td class="fs">{{option.name_16}}</td>
                <td class="fs">до 19%
                </td>
              </tr>
              <tr>
                <td class="fs">17</td>
                <td class="fs">Головки</td>
                <td class="fs">{{option.name_17}}</td>
                <td class="fs">до 15%
                </td>
              </tr>
              <tr>
                <td class="fs">18</td>
                <td class="fs">Тела</td>
                <td class="fs">{{option.name_18}}</td>
                <td class="fs">3-5%
                </td>
              </tr>
              <tr>
                <td class="fs">19</td>
                <td class="fs">Хвоста</td>
                <td class="fs">{{option.name_19}}</td>
                <td class="fs">3-5%
                </td>
              </tr>
              <tr>
                <td class="fs">20</td>
                <td class="fs">Клетки сперматогенеза</td>
                <td class="fs">{{option.name_20}}</td>
                <td class="fs">до 2,5 %
                </td>
              </tr>
              <tr>
                <td class="fs">21</td>
                <td class="fs">Лейкоциты</td>
                <td class="fs">{{option.name_21}}</td>
                <td class="fs">1-4
                </td>
              </tr>
              <tr>
                <td class="fs">22</td>
                <td class="fs">Эритроциты</td>
                <td class="fs">{{option.name_22}}</td>
                <td class="fs">0-1
                </td>
              </tr>
              <tr>
                <td class="fs">23</td>
                <td class="fs">Агглютинация</td>
                <td class="fs">{{option.name_23}}</td>
                <td class="fs">нет
                </td>
              </tr>
              <tr>
                <td class="fs">24</td>
                <td class="fs">Лецитиновые зерна</td>
                <td class="fs">{{option.name_24}}</td>
                <td class="fs">+++
                </td>
              </tr>
              <tr>
                <td class="fs">25</td>
                <td class="fs">Макрофаги</td>
                <td class="fs">{{option.name_25}}</td>
                <td class="fs">АBS
                </td>
              </tr>
              <tr>
                <td class="fs">26</td>
                <td class="fs">Эпителиальные клетка</td>
                <td class="fs">{{option.name_26}}</td>
                <td class="fs">1-2
                </td>
              </tr>
              <tr>
                <td class="fs">27</td>
                <td class="fs">Эпителиальные клетка</td>
                <td class="fs">{{option.name_27}}</td>
                <td class="fs">1-2
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
      const response = await fetch(this.$store.state.hostname + '/HospitalAnalizSperma/' + this.id)
      const data = await response.json();
      this.loading = false;
      console.log(data)
      this.option = data;
      this.borndate = data.patients.bornDate.slice(0,4);
      this.date = this.option.created_date_time.slice(0,10)
      this.patient_name = 
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
        "analiz_name": "Спермаграмма",
        "analiz_base_str": this.base64,
        "id": 0,
        "patientsId": this.option.patientsId,
        "sended_status":  true,
        "doctor_name": "spirma_print",
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