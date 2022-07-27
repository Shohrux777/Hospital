<template>
  <div class="add_patient px-4">
    <form v-on:submit.prevent="submit">
      <div>
        <lineSelectSearch
              class="mt-1"
              :options="get_patient_list_last"
              :searchshow="true"
              @select="selectPatient"
              :selected="patient_name"
              :label="$t('patient list')"
          />
            <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
          </small>
      </div>
      <!-- <div class="mt-3">
        <lineSelect
              class="mt-1"
              :options="get_unpay_patient_list" 
              :searchshow="true"
              @select="selectPatient"
              :selected="patient_name"
              :label="$t('Provider')"
          />
            <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
          </small>
      </div> -->


      <div class="d-flex timePicer mt-4">     
        <label  class="timeLabel">Srart time</label>
        <date-picker class="timepiker " id="fordo" style="margin-top: 10px; width: 100%;" v-model="Start_time" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
      </div>
      <div class="d-flex timePicer mt-2">
        <label class="timeLabel">End time</label>
        <date-picker class="timepiker " id="fordo" style="margin-top: 10px; width: 100%;" v-model="End_time" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>
      </div>
      <div class=" mt-3">
        <div class="w-25 timePicer">
          <label class="dayLabel">Days</label>
          <mdb-input v-model="days" class="m-0 p-0 mt-2 "  size="md" outline type="number" />
        </div>
      </div>

      <div class="mt-4">
        <hpSelect
              class="mt-1"
              :options="get_unpay_patient_list" 
              :searchshow="true"
              @select="selectPatient"
              :selected="patient_name"
              :label="$t('General')"
          />
            <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
          </small>
      </div>
      <div class="row mt-2">
        <div class="col-7">
          <hpSelect
              class="mt-1"
              :options="get_unpay_patient_list" 
              :searchshow="true"
              @select="selectPatient"
              :selected="patient_name"
              :label="$t('Room')"
          />
            <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
          </small>
        </div>
        <div class="col-5">
          <hpSelect
              class="mt-1"
              :options="get_unpay_patient_list" 
              :searchshow="true"
              @select="selectPatient"
              :selected="patient_name"
              :label="$t('Bed')"
          />
            <small v-if="$v.patient_name.$dirty && patient_id == null" class="invalid-text pt-4" >
              {{$t('select_item')}}
          </small>
        </div>
      </div>

            
      <div class="text-right border-top mt-4">
          <mdb-btn   color="danger" @click="close" class="ml-2 mt-2"  p="r4 l4 t2 b2">{{$t('close')}}</mdb-btn>  
          <mdb-btn   color="success" type="submit" class="ml-1 mt-2"  p="r4 l4 t2 b2">{{$t('save')}}</mdb-btn>  
      </div>
    </form>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import lineSelectSearch from "../../components/lineSelectSearch.vue";
import hpSelect from "../../components/lineSelect.vue";
import 'vue2-datepicker/index.css';
import {mdbBtn, mdbInput} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
     mdbBtn, DatePicker,mdbInput, lineSelectSearch, hpSelect
  },
  data(){
    return{
      patient_name: '',
      patient_id: null,
      Start_time: new Date(),
      End_time: new Date(),
      days: 0,
    }
  },
  validations: {
      patient_name: { required },
    },
  computed: mapGetters(['get_patient_list_last']),
  methods: {
    ...mapActions(['fetch_patient_list_last']),
    selectPatient(option){
      this.patient_name = option.data.fio;
      this.patient_id = option.data.id;
    },
    submit(){
      if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
    },
    close(){
      this.$emit('close');
    }
  },
  async mounted(){
      await this.fetch_patient_list_last();
  },
}
</script>

<style lang="scss">
.timePicer{
  position: relative;
  .timeLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 1px 3px;
    z-index: 1;
    left: 6px;
    top: -1px;
  }
  .dayLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 0px 3px;
    z-index: 1;
    left: 6px;
    top: -8px;
  }
}
</style>