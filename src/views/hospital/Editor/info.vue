<template>
  <div class="bg-white telegram_page">
    <form @submit.prevent="submit" class="telegram_filter pt-5 pb-5">
      <div class="container card shadow">
        <div >
          <h5 class="pt-3">Extreme Medics сервис</h5>
          <mdb-input type="textarea" :rows="number"  v-model="content"  class="m-0 p-0 mt-2"  size="md" outline />
          <h5 class="mt-4">Extreme Medics контакт</h5>
          <mdb-input type="textarea" :rows="number" v-model="content1"  class="m-0 p-0 mt-2"  size="md" outline />
        </div>
        <div class="container d-flex justify-content-end">
          <mdb-btn color="success py-2 px-4 mt-3 mb-3" style="font-size:10px;" @click="saved">{{$t('save')}}</mdb-btn>
        </div>
      </div>
      <div class="card container mt-5 shadow">
        <div >
          <h5 class="mt-3">Отправить сообщение пациент</h5>
          <mdb-input type="textarea" style="color:#fff;" :rows="number" v-model="patients" placeholder="Сообщение пациенту"  class="m-0 p-0 mt-2 text-white"  size="md" outline />
        </div>
        <div class="container d-flex justify-content-end">
          <mdb-btn color="primary py-2 px-3 mt-3 mb-3" style="font-size:10px;" @click="sendPatient">{{$t('Send')}}</mdb-btn>
        </div>
      </div>
      <div class="container card mt-5">
        <div >
          <h5 class="mt-3">Отправить сообщение сотрудников</h5>
          <mdb-input type="textarea" :rows="number" v-model="users"  class="m-0 p-0 mt-2" placeholder="Сообщение сотруднику" size="md" outline />
        </div>
        <div class="container d-flex justify-content-end">
          <mdb-btn color="primary py-2 px-3 mt-3 mb-3" style="font-size:10px;" @click="sendUser">{{$t('Send')}}</mdb-btn>
        </div>
      </div>
      <div class="container card mt-5 ">
        <div>
          <h5 class="mt-3">Отправить сообщение врач</h5>
          <mdb-input type="textarea" :rows="number" v-model="contragent"  class="m-0 p-0 mt-2" placeholder="Сообщение доктору"   size="md" outline />
        </div>
        <div class="container d-flex justify-content-end">
          <mdb-btn color="primary py-2 px-3 mt-3 mb-3" style="font-size:10px;" @click="sendContragent">{{$t('Send')}}</mdb-btn>
        </div>
      </div>


      <div class="container card mt-5 " style="position:relative;">
        <div>
          <h5 class="mt-3">Добавить изображение и информацию</h5>
          <mdb-input type="input"  v-model="title"  class="m-0 p-0 mt-2 mb-4" placeholder="Название кнопки"  size="md" outline />

          <mdb-input type="textarea" :rows="number" v-model="info"  class="m-0 p-0 mt-2" placeholder="Информация"  size="md" outline />

          <div class="">
            <div class="d-flex flex-wrap my-3">
              <img v-for="(item, i) in base" :key="i" :src="item" width="140"  class="ml-3 my-2 img-fluid" alt="">
            </div>
            <img src="" id="prewImage"  width= "213" height= "249" alt="" class="img-fluid" style="position: absolute;  top:-100%; left:-100%;">
                <input type="file" hidden  id="inputGroupFile01" v-on:change="previewFile" aria-describedby="inputGroupFileAddon01">
                <!-- <label class="custom-file-label"  for="inputGroupFile01">Choose file</label> -->
                <div class="text-center  mt-2 ">
                  <label for="inputGroupFile01" 
                    style="cursor: pointer; font-size:13px;" 
                    class=" py-1 mt-1 px-4 rounded  bg-primary shadow text-white">
                    Download
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-rotate mb-1" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                      <path d="M11.245 15.904a3 3 0 0 0 3.755 -2.904m-2.25 -2.905a3 3 0 0 0 -3.75 2.905" />
                      <path d="M14 13h2v2" />
                      <path d="M10 13h-2v-2" />
                    </svg>
                  </label>
                </div>
              </div>
        </div>
        <div class="container d-flex justify-content-end">
          <mdb-btn color="primary py-2 px-3 mt-3 mb-3" style="font-size:10px;" @click="sendButton">{{$t('save')}}</mdb-btn>
        </div>
      </div>
      
    </form>
    <Toast ref="message"></Toast>

  </div>
</template>

<script>
import {mdbInput, mdbBtn} from 'mdbvue'
export default {
  components: { mdbInput, mdbBtn},
  
  data(){
    return{
      loading: false,


      content: '',
      content1: '',
      number:8,
      patients: '',
      users: '',
      contragent: '',
      title: '',
      info: '',
      base64: '',
      base: [],
      updateId: 0,
    }
  },
  async mounted () {
     const response = await fetch(this.$store.state.hostname + "/HospitalFullInfoes");
      const data = await response.json();
      console.log(data);
      if(data.length != 0){
        this.content = data[0].hospitalServiceInfo ;
        this.content1 = data[0].hospitalContacInfoStr;
      }
      
  },

  methods: {
    // img add //
    previewFile(){
      console.log('dsd')
      const preview = document.getElementById('prewImage');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
      // convert image file to base64 string
        // this.picture =  reader.result;
        // console.log(this.picture);
        preview.src = reader.result;
        
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
      var img = document.getElementById('prewImage');
      img.onload = () => {
         this.base64 = img.src;
        this.base.push(this.base64)
        console.log(this.base64)
      };
        // console.log(img.src)
     
    },







    async saved(){
      if(this.content.length > 0 || this.content1.length > 0){
        const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
              "hospitalContacInfoStr" : this.content1,
              "hospitalServiceInfo" : this.content,              
            })
          };

          const response = await fetch(this.$store.state.hostname + "/HospitalFullInfoes", requestOptions);
          const data = await response.json();
          console.log(data);
          if(data.id)
          {
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.$refs.message.error('error')
            return false;
          }

      }
        
    },
    async sendPatient(){
      try{
         const response = await fetch(this.$store.state.hostname + "/Payments/sendMessageToAllPatients?message_str=" + this.patients);
          const data = await response.json()
          console.log(data)
          this.$refs.message.success('Added_successfully')
          this.patients = '';
      }
      catch{
        this.$refs.message.error('error')
      }
    },
    async sendUser(){
      try{
        const response = await fetch(this.$store.state.hostname + "/Payments/sendMessageToAllUsers?message_str=" + this.users);
        const data = await response.json()
        console.log(data)
        this.$refs.message.success('Added_successfully')
         this.users = '';
      }
      catch{
        this.$refs.message.error('error')
      }
    },
    async sendContragent(){
      try{
        const response = await fetch(this.$store.state.hostname + "/Payments/sendMessageToAllContragents?message_str=" + this.contragent);
        const data = await response.json()
        console.log(data)
        this.$refs.message.success('Added_successfully')
        this.contragent = '';
      }
      catch{
        this.$refs.message.error('error')
      }
    },
    async sendButton(){
      try{
        const requestOptions = {
            method: "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
              "id": this.updateId,
              "image_base_64_list" : this.base,
              // "images_url_list_after_saving_list": this.base,
              "title_name": this.title,
              "info": this.info,
            })
          };
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/HospitalTelegramInformationBulider", requestOptions);
          const data = await response.json();
          this.loading = false;
          console.log(data)
          if(data.id)
          {
            this.base = [],
            this.title = '',
            this.info='',
            this.$refs.message.success('Added_successfully')
            return true;
          }
          else{
            this.$refs.message.error('error')
            return false;
          }
      }
      catch{
        this.$refs.message.error('error')
      }
    }
  }
}
</script>

<style>
.telegram_page{
  background-image: url(../../../assets/telegram.jpg);
  background-attachment: fixed;
  background-size: cover;
}

.telegram_filter{
  background: rgba(0, 0, 0,0.7);
}
h5{
  color: #fff;
}
.card{
  background: rgba(2, 2, 2, 0.4);
}
.md-textarea{
  color:#fff !important;
}
.md-textarea:focus{
  color:#fff !important;
}
.form-control{
  color: #fff;
}
.form-control-md{
  color: #fff;
}
</style>'