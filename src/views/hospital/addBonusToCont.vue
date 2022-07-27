<template>
    <div>
     <form @submit.prevent="submit">
        <div class="row">
          <div class="col-12 mt-4">
              <serviceSelect
                :options="get_service_type.rows" 
                :searchshow="true"
                @select="service_func"
                :selected="service_name"
                :label="$t('service_type')"
                />
                <div class="col-12">
                  <small v-if="$v.service_name.$dirty && service_id == null" style="margin-left: -16px;" class="invalid-text pt-4" >
                      {{$t('select_item')}}
                    </small>
                </div>
            </div>
            <div class="col-12 mt-2">
               <mdb-input :label="$t('bonus_sum')"  type="number"  size="sm" outline v-model="price" />
            </div>
        </div>
        <div class="d-flex justify-content-end pr-2">
          <mdb-btn type="submit"  color="primary" class="m-0 py-2 px-4 mt-3 mb-2" style="font-size: 9px;"  p="r3 l3 t1 b1">{{$t('add')}}</mdb-btn>  
        </div>
     </form>
    <Toast ref="message"></Toast>
    </div>
</template>

<script>
import serviceSelect from "../../components/serviceSelect.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import { mdbInput, mdbBtn } from 'mdbvue';
export default {
components: {
    serviceSelect, mdbInput, mdbBtn
    },
    data(){
      return{
        service_name: '',
        service_id: null,
        price: null,
      }
    },
    validations: {
      service_name: {required},
    },
    computed: mapGetters(['get_service_type']), 
    mounted(){
      this.fetch_service_type()
    },
    methods: {
      ...mapActions(['fetch_service_type', 'fetch_bonus_sum_cont_list']),
      service_func(option){
        console.log(option)
        this.service_name = option.data.name
        this.service_id = option.data.id
        // console.log(this.price)
      },
      cls_wnd(){
        this.service_name = '';
        this.service_id = null;
        this.price = null;
      },
      async submit(){ 
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
            "contragentId" : localStorage.ContragentID,
            "serviceTypeId" : this.service_id,
            "bonusSumm" : this.price,
          // "code" : 0
          })
        };
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + '/ContragentServiceTypeBonusAdditanalies', requestOptions)
        const data = await response.json()
        this.loading = false;
        if(data.id){
          this.cls_wnd()
          this.fetch_bonus_sum_cont_list(localStorage.ContragentID)
          this.$refs.message.success('Added_successfully')
        }
      }
    },
}
</script>

<style lang="scss">

</style>