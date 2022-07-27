<template>
  <div class="px-3 pt-0">
   <loader v-if="loading"/>
    <div id="print">
      <!-- <div class="title text-center">
        <h4>МРТ ҒИЖДУВОН ДИAГНОСТИКA МAСКAНИ</h4>
        <h6 class="mb-0 pb-1">МРТ текширувига юлланган бемор учун </h6>
        <h4>СЎРОВНОМA</h4>
      </div> -->
      <div class="info mt-2">
        <div class="d-flex mt-3">
          <div>
            <h6 class="m-0 p-0 ">Ф.И.Ш</h6>
          </div>
          <div class="border-bottom w-100 px-3">
            {{get_patient_info.patient_name}}
          </div>
        </div>
        <div class="d-flex mt-3">
          <div class="w-50">
            <div class="d-flex">
              <div>
                <h6 class="m-0 p-0">Туғил.й</h6>
              </div>
              <div class="border-bottom w-75 px-3">
                <a> {{get_patient_info.patient_born}}</a>
              </div>
            </div>
          </div>
          <div class="w-50">
            <div class="d-flex">
              <div>
                <h6 class="m-0 p-0 ">Тел:</h6>
              </div>
              <div class="border-bottom px-3 w-100">
                <a> {{get_patient_info.patient_tel}}</a>

              </div>
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <div class="w-50">
            <div class="d-flex">
              <div>
                <h6 class="m-0 p-0">Врач:</h6>
              </div>
              <div class="border-bottom w-75 px-3">
                <a> {{get_patient_info.contragent_name}}</a>
              </div>
            </div>
          </div>
          <div class="w-50">
            <div class="d-flex">
              <div>
                <h6 class="m-0 p-0 ">Тел:</h6>
              </div>
              <div class="border-bottom px-2 w-100">
                <a> {{get_patient_info.contragent_tel}}</a>

              </div>
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <div>
            <h6 class="m-0 p-0 ">Aдрес</h6>
          </div>
          <div class="border-bottom w-100"></div>
        </div>
        <div class="mt-3 text-center ">
          <h6 class="font-weight-bold">Танангизда қуйидаги мослама, холатлари мавжудми:</h6>
        </div>
      
        <div class="w-100 mt-3">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="kardioSimulator" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label  class="form-check-label" for="defaultCheck1">
                  1. Кардиостимулятор
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="kardioSimulator" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck1">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!kardioSimulator"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck1"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
        <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="eshitishAparatiImplanti" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                <label  class="form-check-label" for="defaultCheck2">
                  2. Ешитиш аппарати(кохлеар) имплантанти
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="eshitishAparatiImplanti" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck2">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!eshitishAparatiImplanti"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck2"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="kozdagiYotMetal" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck11">
                <label  class="form-check-label" for="defaultCheck11">
                  3. Кўздаги ёт метал фрагмент
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="kozdagiYotMetal" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck11">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!kozdagiYotMetal"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck11"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="neyrosimulator" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                <label  class="form-check-label" for="defaultCheck3">
                  4. Нейростимулятор
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="neyrosimulator" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck3">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!neyrosimulator"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck3"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="insulinliPompa" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                <label  class="form-check-label" for="defaultCheck4">
                  5. Инсулинли помпа
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="insulinliPompa" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck4">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!insulinliPompa"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck4"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="qontomirStentlari" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck5">
                <label  class="form-check-label" for="defaultCheck5">
                  6. Қон-томир (аневризмал) клипсилари, стентлар
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="qontomirStentlari" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck5">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!qontomirStentlari"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck5"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="protezlar" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck6">
                <label  class="form-check-label" for="defaultCheck6">
                  7. Протезлар
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="protezlar" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck6">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!protezlar"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck6"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="xomiladorlikUchOyligi" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck7">
                <label  class="form-check-label" for="defaultCheck7">
                  8. Ҳомиладорлик биринчи 3 ойлик
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="xomiladorlikUchOyligi" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck7">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!xomiladorlikUchOyligi"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck7"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
         <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="umurtqaPogonasidaMetalFixsator" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck8">
                <label  class="form-check-label" for="defaultCheck8">
                  9. Умуртқа поғонасидаги метал фиксаторлар
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="umurtqaPogonasidaMetalFixsator" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck8">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!umurtqaPogonasidaMetalFixsator"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck8"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
      
        <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="breketlar" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck9">
                <label  class="form-check-label" for="defaultCheck9">
                  10. Брекетлар
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="breketlar" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck9">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!breketlar"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck9"></label>
                  
                </div>
              </div>
          </div>
        </div>
        <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="tutqonoqOtkazganmisz" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck10">
                <label  class="form-check-label" for="defaultCheck10">
                  11. Тутқаноқ утказганмисиз
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="tutqonoqOtkazganmisz" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck10">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!tutqonoqOtkazganmisz"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck10"></label>
                </div>
              </div>
          </div>
        </div>
      
        <div class="mt-2 text-left ">
          <h6 class="font-weight-bold">Оператив муолажа олганмисз (қачон ва қайси азода)?</h6>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
        </div>
        <div class="mt-3 text-center ">
          <h6 class="font-weight-bold">Қуйидаги муолажаларни қабул қилганмисз:</h6>
        </div>
      
        <div class="w-100 mt-3">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="nurTerapiya" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck15">
                <label  class="form-check-label" for="defaultCheck15">
                  1. Нур терапия
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="nurTerapiya" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck15">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!nurTerapiya"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck15"></label>
                  
                </div>
              </div>
          </div>
        </div>
      
        <div class="w-100 ">
          <div class="d-flex justify-content-between w-100 mt-0">
              <div>
                <input v-model="ximiyaTerapiya" v-show="false" class="form-check-input" type="checkbox" value="" id="defaultCheck16">
                <label  class="form-check-label" for="defaultCheck16">
                  2. Химё терапия
                </label>
              </div>
              <div>
                <div>
                  <label  v-if="ximiyaTerapiya" class="form-check-label border" style="width:60px; height: 24px; position:relative;" for="defaultCheck16">
                    <label class="checking"></label>
                    <label class="checking2"></label>
                  </label>
                </div>
                <div>
                  <label v-if="!ximiyaTerapiya"  class="form-check-label border" style="width:60px; height: 24px;" for="defaultCheck16"></label>
                  
                </div>
              </div>
          </div>
        </div>
        <div class="mt-2 text-left " style="position: relative">
          <textarea rows="2" v-model="jarohatOlganmisz" cols="100" style="position:absolute; top: 17px; left: 0; border:none; outline: none; background: rgba(255,255,255,0)">
          </textarea>
          <h6 class="font-weight-bold">Жароҳат олганмисз (қайси анотомик)?</h6>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
        </div>
        <div class="mt-2 text-left " style="position: relative" >
           <textarea rows="3" v-model="shikoyatlaringz" cols="100" style="position:absolute; top: 17px; left: 0; border:none; outline: none; background: rgba(255,255,255,0)">
          </textarea>
          <h6 class="font-weight-bold m-0 mt-2 p-0">Шикоятларингиз:</h6>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
        </div>
        <div class="mt-2 text-left "  style="position: relative">
          <textarea rows="1" v-model="tekshiriladigonAzolar" cols="100" style="position:absolute; top: 16px; left: 0; border:none; outline: none; background: rgba(255,255,255,0)">
          </textarea>
          <h6 class="font-weight-bold">Текшириладиган азолар()</h6>
          <div class="mt-4" style="border-bottom:1px solid black;"></div>
        </div>
        <h6 class="font-weight-bold border-bottom mt-3">Сумма: <span class="px-5" style="border-bottom: 1px solid black;">{{payedSumma}} <span class="px-2">сум</span></span></h6>
      </div>
      </div>
      <!-- <h4>{{get_patient_info.patient_name}}</h4> -->
      <div class="d-flex justify-content-end">
          <mdb-btn  @click="print" color="success"  p="r4 l4 t2 b2">{{$t('add')}}</mdb-btn>  
      </div>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn} from "mdbvue";

import {mapGetters} from "vuex";
export default {
  components: {
    mdbBtn
  },
  data(){return{
    kardioSimulator: false,
    eshitishAparatiImplanti: false,
    kozdagiYotMetal: false,
    neyrosimulator: false,
    insulinliPompa: false,
    qontomirStentlari: false,
    protezlar: false,
    xomiladorlikUchOyligi: false,
    umurtqaPogonasidaMetalFixsator: false,
    breketlar: false,
    tutqonoqOtkazganmisz: false,
    ximiyaTerapiya: false,
    nurTerapiya: false,
    jarohatOlganmisz: '',
    shikoyatlaringz: '',
    tekshiriladigonAzolar: '',
    summa: 0,
    loading: false,
    payedSumma: 0,

  }},
  computed: {
    ...mapGetters(['get_patient_info'])
  },
  mounted(){
    this.payedSumma = localStorage.Summa;
  },
  methods: {
    async print(){

      const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
               "id": 0,
                "activeStatus": true,
                "dateOfBirthday": "2021-09-12T07:49:19.373Z",
                "phoneNumber": this.get_patient_info.patient_tel,
                "contragentName": this.get_patient_info.contragent_name,
                "contragentPhoneNumber": this.get_patient_info.contragent_tel,
                "address": "",
                "kardioSimulator": this.kardioSimulator,
                "eshitishAparatiImplanti": this.eshitishAparatiImplanti,
                "kozdagiYotMetal": this.kozdagiYotMetal,
                "neyrosimulator": this.neyrosimulator,
                "insulinliPompa": this.insulinliPompa,
                "qontomirStentlari": this.qontomirStentlari,
                "protezlar": this.protezlar,
                "xomiladorlikUchOyligi": this.xomiladorlikUchOyligi,
                "umurtqaPogonasidaMetalFixsator": this.umurtqaPogonasidaMetalFixsator,
                "breketlar": this.breketlar,
                "tutqonoqOtkazganmisz": this.tutqonoqOtkazganmisz,
                "nurTerapiya": this.nurTerapiya,
                "ximiyaTerapiya": this.ximiyaTerapiya,
                "jarohatOlganmisz": this.jarohatOlganmisz,
                "shikoyatlaringz": this.shikoyatlaringz,
                "tekshiriladigonAzolar": this.tekshiriladigonAzolar,
                "summa": this.payedSumma,
                "contragentId": this.get_patient_info.contragent_id,
                "patientsId": this.get_patient_info.patient_id,
                "createdDateTime": "2021-09-12T07:49:19.373Z"
            })
          };
          this.loading = true;
           const response = await fetch(this.$store.state.hostname + "/HospitalMrtSorovNomas", requestOptions);
            const data = await response.json();
            this.loading = false;
            console.log(data)
          if(data.id){
            this.cls_wnd();
            this.$emit('close')
            // this.printCheck()
            // this.fetch_service_type();
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.$refs.message.error('Added_successfully')
          } 
    },
      cls_wnd(){
        this.kardioSimulator =  false;
        this.eshitishAparatiImplanti =  false;
        this.kozdagiYotMetal =  false;
        this.neyrosimulator =  false;
        this.insulinliPompa =  false;
        this.qontomirStentlari =  false;
        this.protezlar =  false;
        this.xomiladorlikUchOyligi =  false;
        this.umurtqaPogonasidaMetalFixsator =  false;
        this.breketlar =  false;
        this.tutqonoqOtkazganmisz =  false;
        this.ximiyaTerapiya =  false;
        this.nurTerapiya =  false;
        this.jarohatOlganmisz =  '';
        this.shikoyatlaringz =  '';
        this.tekshiriladigonAzolar =  '';
        this.summa =  0;
      },
       printCheck () {
          const prtHtml = document.getElementById('print').innerHTML
          let stylesHtml = ''
          for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML
          }
          const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=800,toolbar=0,scrollbars=0,status=0')
          WinPrint.document.write(`<!DOCTYPE html>
              <html>
                <head>
                  ${stylesHtml}
                </head>
                <body>
                  <div >
                    ${prtHtml}
                  </div>
                </body>
              </html>`)
          WinPrint.document.close()
          WinPrint.focus()
          WinPrint.print()
          setTimeout(function () {
            WinPrint.close()
          }, 100)
        },
  }
}
</script>

<style lang="scss">
  .checking{
    position:absolute; 
    top: 2px; 
    border-bottom: 2px solid rgb(21, 13, 255); 
    left:17px; 
    transform:rotate(60deg);
    width: 14px; 
    height:15px; 
  }
  .checking2{
    position:absolute; 
    top: 6px; 
    border-bottom: 2px solid rgb(21, 13, 255); 
    left:22px; 
    transform:rotate(140deg);
    width: 35px; 
    height:15px; 
  }
</style>