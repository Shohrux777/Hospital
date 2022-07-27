<template>
     
<div>
   <loader v-if="loading"/>
    <form v-on:submit.prevent="submit">
      <div class="addxizmat px-2 ">
        <div class="row">
          <div class="col-12">
            <mdb-input label="Ф.И.О" v-model="name" outline/>
            <small class="invalid-text"  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <mdb-input label="Телефон номер" class="mt-3" v-model="phone" @input="changeInput" placeholder="(--) --- ----" outline/> -->

            <div style="position:relative;">
              <input style="width:100%;  height:38px; border:none; outline:none; padding: 0 12px;" class="mt-0 mb-4 border rounded " 
                @input="changeInput" v-model="phone" placeholder="(--) --- ----" outline/>
              <small style="position: absolute; top:-10px; left:8px; color:#5B5B5B;" class="bg-white px-1">{{$t('phoneNumber')}}</small>
            </div>
            <mdb-input label="Адрес" class="mt-3" v-model="adress" outline/>
          </div>
          <div class="col-12" style="margin-top: -15px;">
              <RegSelect
                label="Район"
                @select="district_func"
                :options="get_district_list.rows"
                :selected="district_name"
                class="m-0 p-0"
                
               />
            </div>
            <div class="col-12">
               <small v-if="$v.district_name.$dirty && district_id == null" class="invalid-text pt-4" >
                  {{$t('select_item')}}
                </small>
            </div>
          
          <div class="text-right container" >
            <mdb-btn color="success px-4 py-2" type="submit" style="margin-top:20px; font-size:10px;">{{$t('add')}}</mdb-btn>
          </div>
        </div>
      </div> 
    </form>
  <Toast ref="message"></Toast>
  
</div>
</template>

<script>
import RegSelect from '../../components/RegSelect.vue'
  import { mdbBtn, mdbInput   } from 'mdbvue';
import { required } from 'vuelidate/lib/validators'
  import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
      mdbBtn,
      mdbInput,RegSelect
    },
     validations: {
      name: {required},
      district_name: {required}
    },
    data(){
      return{
        name: '',
        phone: '',   
        adress: '', 
        district_name: '',
        district_id:null,    
        id: 0,
        loading: false,
      }
    },
    props:{
     options:{
        type: Object,
        default(){
          return {}
        }
      }
  },
  async mounted(){
    this.fetch_district();
    await this.options;
    if(Object.keys(this.options).length != 0){
      this.id = this.options.Id
      this.name = this.options.Name
      var temp = ''
      for(let i=4;i<this.options.PhoneNumber.length; i++){
        temp += this.options.PhoneNumber[i]
      }
      var y = temp.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phone = !y[2] ? y[1] : '(' + y[1] + ') ' + y[2] + (y[3] ? '-' + y[3] : '');
      // this.phone = this.options.PhoneNumber
      this.adress = this.options.Address
    }else{
      this.cls_wnd();
    }
  },
  computed: mapGetters(['get_district_list']),
    methods: {
      ...mapActions(['fetch_contragent', 'fetch_district']),
      changeInput(){
        var x = this.phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      },
      cls_wnd(){
        this.name = '';
        this.phone = '';
        this.id = 0;
        this.adress = '';
      },
      district_func(option){
        console.log(option)
        this.district_id = option.id
        this.district_name = option.name
      },
      async submit(){
          var phoneNumber = '';
          for(let i=0; i<this.phone.length; i++){
            console.log(this.phone[i])
            if(this.phone[i] == '-' || this.phone[i] == '(' || this.phone[i] == ')' || this.phone[i] == ' '){
              console.log('--')
            }else{
              phoneNumber += this.phone[i];
            }
          }
          this.phone = phoneNumber
          if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
           const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "id": this.id,
              "name": this.name,
              "phoneNumber" : '+998' + this.phone,
              "address" : this.adress,
              "districtsId" : this.district_id,
            // "code" : 0
            })
          };
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + '/Contragents', requestOptions)
          const data = await response.json()
          if(data.id){
            this.cls_wnd();
            this.fetch_contragent();
            this.loading = false;
            this.$emit('refresh')
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.$refs.message.success('Added_successfully')
            this.loading = false;
          }
      },
    }
    

}
</script>

<style scoped>

</style>