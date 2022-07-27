<template>
  

    <div>

      <!-- Card -->
      <div class="card">

        <!-- Card content -->
        <div class="card-body">

          <!-- Title -->
          <h4 class="card-title"><a>Учетные данные</a></h4>
          <!-- Text -->
          <form v-on:submit.prevent="submit">
          <div class="card-body">
            <div class="addbemor px-2 py-3">
              
              <div class="row ">
                <div class="col-8 mb-3">
                  <span style="margin-bottom : -10px">Ф.И.О</span>
                  <mdbInput label="" size=""  disabled/>
                </div> 
              </div>

              <div class="row justify-content-between">
                <div class="col-4">
                  <span   style="margin-bottom : -30px">Л/с, код</span>
                  <mdbInput class="mb-3" size=""  label=""  disabled/>
                  <span    style="margin-bottom : -30px">Статья</span>
                  <mdbInput class="mb-3" size=""  label="" disabled/>
                </div>
                <div class="col-4">
                  <span    style="margin-bottom : -30px">Код</span>
                  <mdbInput size=""  label=" " class="mb-3"  disabled />
                  <span   style="margin-bottom : -30px">Часть</span>
                  <mdbInput size="" class="mb-3" label=""   disabled/>
                </div>
              </div>

              <div class="row justify-content-between mt-5">
                <div class="col-8">
                  <h5>Лимит на 1 месяц</h5>
                </div>  
                <div  class="col-4">
                  <mdbInput size=""  label=""  class="mt-3" disabled/>
                </div>
              </div>

              <div class="row justify-content-between">
                <div class="col-8">
                  <h5>Получено товара за текущий месяц</h5>
                </div>  
                <div  class="col-4">
                  <mdbInput size=""  label=""  class="mt-3" disabled/>
                </div>
              </div>

              <div class="row justify-content-between">
                <div class="col-8">
                  <h5>Остаток лимита на текущий месяц</h5>
                </div>  
                <div class="col-4">
                  <mdbInput size=""  label=""  class="mt-3" disabled/>
                </div>
              </div>

              <div class="row justify-content-between">
                <div class="col-8">
                  <h5>Остаток лимита на текущий месяц</h5>
                </div>  
                <div class="col-4">
                  <mdbInput size=""  label=""  class="mt-3" disabled/>
                </div>
              </div>

              <div class="row justify-content-between mt-5">
                <span style="margin-bottom : -10px">Дата</span>
                <div class="col-4">
                  <mdbInput size=""  label="" class="mt-3" disabled/>
                </div>
                <div class="col-2">
                  <mdbBtn color="success" type="submit" class="mt-4">Далее</mdbBtn>
                </div>
                  
              </div>
            </div> 
          </div>
        </form>
          <!-- Button -->
          <a href="#" class="btn btn-primary">Button</a>

        </div>

      </div>
      <!-- Card -->


        
        
    </div>



    
</template>

<script>
  import { mdbBtn, mdbInput } from 'mdbvue';
  
  export default {
    components: {
      mdbBtn,
      mdbInput,
    },
    data(){
      return{
        show: true,
        snipper: true,
        company_list: ['ExtremeSoft','MDB', 'Building', 'Archieve'],
        xonaId: null,
        datchikId: null,
        colorId: null,
      }
    },
    mounted(){
      
  
    },
    methods:{
      
      async submit(){
        // const respone = await fetch(this.$store.state.hostname + '/DatchikItems/addDatchikItem?roomId=' + this.xonaId + '&colorId='
        //  + this.colorId + '&datchikId=' + this.datchikId)
        // const dat = await respone.json()
        // if(dat.status == 400){
        //   console.log('error')
        // }
        // else{
        //   this.xona = '';
        //   this.xonaId = null;
        //   this.datchik = '';
        //   this.datchikId = null,
        //   this.colorId = null,
        //   this.color = '';
        //   this.refresh();
        // }
      },
      
    },
    
  };
</script>

<style lang="scss">
.tabletsa th{
  margin: 0;
  font-weight: 600;
  color: rgb(78, 76, 76);
  padding:10px 5px 10px 5px;
  font-size: 13px;
}
.tabletsa td{
  margin: 0;
  padding:9px;
  font-size: 13px;
}
.add{
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
  top:0;
  width:85%;
}
.addDatchikXona{
  width: 470px;
  // height: 215px;
  background: #fff;
  position: relative;
  z-index: 5000;
}
.showing{
  display: none;
}
.Icons{
  padding-left: 20px;
   padding-right: 5px; 
   font-size:13px; 
   color: red;
   cursor: pointer;
}
</style>