<template>
  <div class="  rounded">
    <form @submit.prevent="submit">
      <div class="d-flex">
        <div style="width: 50%;">
            <div class="row">
              <div class="col-12">
                <mdb-input class="mt-0 mb-4" v-model="search" @input="search_func" @keyup.enter="search_func" :placeholder="$t('Search patient')" ariaDescribedBy="button-addon2">
                  <mdb-btn color="info" size="md" @click="search_func" group slot="append" id="button-addon2">{{$t('Search')}}</mdb-btn>
                </mdb-input>
                <!-- <small class="invalid-text "  v-if="$v.search.$dirty && !$v.search.required" >
                    {{$t('name_invalid_text')}}
                  </small> -->
                <lineSelect
                    :options="get_contragent_list.rows" 
                    :searchshow="true"
                    @select="contragent_func"
                    :selected="contragent_name"
                    :label="$t('contragent')"
                />
              </div>
              <div class="col-12">
                <small v-if="$v.contragent_name.$dirty && contragent_id == null" class="invalid-text pt-4" >
                    {{$t('select_item')}}
                  </small>
              </div>
              <div class="col-12 mt-2">
                  <RegSelect
                  label="Число услуги"
                  @select="number_into_func"
                  :options="get_number_into.rows"
                  :selected="number_into_name"
                />
              </div>
              <div class="col-12">
                <small v-if="$v.number_into_name.$dirty && number_into_id == null" class="invalid-text pt-4" >
                    {{$t('select_item')}}
                  </small>
              </div>

              <div class="col-12 mt-2">
                  <RegSelect
                  label="Тип пациента"
                  @select="patient_type_func"
                  :options="get_patient_type.rows"
                  :selected="patient_type_name"
                />
              </div>
              <div class="col-12">
                <small v-if="$v.patient_type_name.$dirty && patient_type_id == null" class="invalid-text pt-4" >
                    {{$t('select_item')}}
                  </small>
              </div>
              <div class="col-12">
                <mdb-input :label="$t('reason_patient')" v-model="reason" outline/>
                <small class="invalid-text "  v-if="$v.reason.$dirty && !$v.reason.required" >
                    {{$t('name_invalid_text')}}
                  </small>
              </div>

        </div>
        </div>
        <div class="user_ill py-1 border-bottom  px-3">
          <div  v-for="(item,i) in get_patient_client_list" :key="i" class="item px-3" 
            @click="getBemorId(i,item.id, item.fio)" :class="{ activeUser : active_bemor == i }">
            <div>
              <div class="d-flex">
                <div class=" user_photo">
                  <img src="https://image.flaticon.com/icons/png/512/504/504293.png" style="height: 45px; overflow: none; " class="img-fluid" alt="">
                </div>
                <div class="px-3">
                  <p class="m-0 p-0" >{{item.fio}}</p>
                  <p class="m-0 rang" style="font-size:10px;">{{$t('bemor')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <mdb-input label="Material input" hidden v-model="patient_name" />
        <small class="invalid-text" style="position:absolute; bottom:60px; right:250px;"   v-if="$v.patient_name.$dirty && !$v.patient_name.required" >
          {{$t('select_item')}}
        </small>
      </div>
      <div class="d-flex justify-content-end">
        <mdb-btn class="" color="danger" style="margin-top:23px;" @click="close"    p="r4 l4 t2 b2">{{$t('close')}}</mdb-btn>
        <mdb-btn class="" color="success" style="margin-top:23px;"   type="submit"  p="r4 l4 t2 b2">{{$t('save')}}</mdb-btn>
      </div>
    </form>
    <Toast ref="message"></Toast>
  <AlertError ref="msg"></AlertError>

  </div>
</template>

<script>
import {mdbBtn, mdbInput} from "mdbvue";
import RegSelect from '../../components/RegSelect.vue'
import lineSelect from "../lineSelect.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters,mapMutations} from 'vuex'
export default {
  components: {
    mdbBtn,RegSelect,mdbInput, lineSelect
  },
   validations: {
    patient_name: {required},
    contragent_name: {required},
    number_into_name: {required},
    patient_type_name: {required},
    reason: {required}
  },
  data () {
    return{
      patient_info: {
        reason: '',
        contragent_id: null,
        number_into_id: null,
        patient_type_id: null,
        patient_id: null,
        patient_name: '',
      },
      active_bemor: -1, 
      contragent_name: '',
      contragent_id: null,
      number_into_name: '',
      number_into_id: null,
      patient_type_name: '',
      patient_type_id: null,

      reason: '',
      search: '',
      patient_name: '',
      patient_id: null,
    }
  },
  computed: mapGetters(['get_patient_client_list', 'get_contragent_list', 'get_number_into', 'get_patient_type']),
  methods: {
    ...mapMutations(['choose_patient_client']),
    ...mapActions(['fetch_patient_client', 'fetch_contragent', 'fetch_number_into', 'fetch_patient_type', 'fetch_search_patient']),

    getBemorId(i, id, name){
      this.active_bemor = i;

      this.patient_name = name;
      this.patient_id = id

      this.patient_info.patient_id = id;
      this.patient_info.patient_name = name;
      
    },
    contragent_func(option){
      console.log('contragent')
      console.log(option)
      this.contragent_name = option.data.name;
      this.contragent_id = option.data.id;
      this.patient_info.contragent_id = option.data.id;
    },
    number_into_func(option){
      this.number_into_name = option.name;
      this.number_into_id = option.id;
      this.patient_info.number_into_id = option.id;
    },
    patient_type_func(option){
      this.patient_type_name = option.name;
      this.patient_type_id = option.id;
      this.patient_info.patient_type_id = option.id;
    },

    // <---- searching drop ---->
    search_func(){
      if(this.search == ''){
        // console.log('hiy')
        this.fetch_patient_client();
      }
      else{
        this.fetch_search_patient(this.search);
      }

    },
    // <---- searching drop ---->



    async submit(){
      if(this.$v.$invalid )
        {
          this.$v.$touch();
          // this.$refs.message.warning('please_fill')
          this.$refs.message.warning('please_fill')
          return false;
        }

        this.patient_info.reason = this.reason;
        this.choose_patient_client(this.patient_info)
        const respon = await fetch(this.$store.state.hostname + '/PatientRegistrationInfoes/addPatientRegistrationInfo?ReasonPatient=' + this.reason + 
         '&PatientTypeId=' + this.patient_type_id + '&PatientServiceTypeId=' + this.number_into_id + '&PatientsId=' + this.patient_id)
        const data = await respon.json()
        console.log(data);
         if(data.id){

            this.$refs.message.success('Added_successfully')
            this.$emit('close');

          }
          else{
            this.$refs.msg.error('Error_successfully')
          }
    },
    close(){
      this.$emit('close');
    }

  },
  mounted (){
    this.fetch_patient_client();
    this.fetch_contragent();
    this.fetch_number_into();
    this.fetch_patient_type();
  }
}
</script>

<style lang="scss">
.user_ill{
   overflow: hidden;
  overflow-y: scroll;
  height: 65vh;
  width: 50%;
  // background-color: rgba(32, 32, 32,0.75);
  .item{
      .user_photo{
        background-color: #fff;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          overflow: hidden;
          

        // img{
        //   border-radius: 50%;
        //   overflow: hidden;          
        // }
      }
      width:100%;
      box-shadow: 2px 2px 8px rgb(224, 224, 224), -1px -1px 2px rgb(224, 224, 224);
      height: 62px;
      margin: 5px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #fff;
      transition: all 0.5s ease-in-out;
      .rang{
        color: rgb(66, 167, 255);
        font-weight: bold;
      }
      &:hover{
        cursor: pointer;
        box-shadow: 2px 2px 5px rgb(224, 224, 224);
        background-color: rgb(215, 242, 255);
        transform: translate(6px, 0px);
        transition: all 0.1s ease-in-out;
      }
    }
  
}

.activeUser{
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(224, 224, 224);
  background-color: rgb(179, 230, 255);
  transform: translate(6px, 0px);
  transition: all 0.1s ease-in-out;
}
</style>