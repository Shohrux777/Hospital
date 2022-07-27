<template>
  <div>
   <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>

      <mdb-card-title class="font-weight-bold pt-2 ml-5" :action="true"
        >{{ 'TitleSettings' | locolize }}</mdb-card-title>
    </mdb-navbar>
    <!--/.Navbar-->
    <main class="p-4 ">
      <form @submit.prevent="submit">

        <div class="container ">

          <mdb-row >
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-3">
              <p>{{'settingsLanguage' | locolize}}</p>

            </mdb-col>
            <mdb-col class="col-12 col-sm-12 col-md-8 col-lg-5">
              <lineSelect
                        :options="data_lang" :row_index="1"
                        @select="select_lang"
                        :selected="lang.name"
                        label=""
                      />
            </mdb-col>
          </mdb-row>


          <hr class="mt-5"/>
          <mdb-btn type="submit" color="success" m="r3"
            p="r4 l4 t2 b2">
            <mdb-icon  icon="check" class="mr-2"/>{{'save' |locolize}}</mdb-btn>

        </div>

      </form>
    </main>
    <massage_box :hide="modal_status" :detail_info="modal_info"
    m_text="Не удалось изменить!" @to_hide_modal = "modal_status= false"/>
    <alert
      :bool="alert_success"
      @changeBool="alert_success=false"
      color="success"
      icon = "check"
      :text="alert_text"
    ></alert>

    <alert
      :bool="alert_danger"
      @changeBool="alert_danger = false"
      color="danger"
      icon = "exclamation-circle"
      :text="alert_text"
    ></alert>
  </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
import lineSelect from "../../components/lineSelect.vue";
  import {
    mdbNavbar,
    mdbCardTitle,
    mdbIcon,
    mdbRow,
    mdbBtn,
    mdbCol
  } from "mdbvue";

  export default {

    components: {
      mdbNavbar,
      mdbCardTitle,
      mdbIcon,
      mdbBtn,
      mdbRow,lineSelect,
      mdbCol

    },

    data() {
      return{
        alert_text : '',
        alert_success : false,
        alert_danger : false,
        modal_info : '',
        modal_status: false,

        lang : {id : -1,name : ''},
        data_lang : []
      }
    },
     computed: mapGetters(['getUsers']),
    methods:{
      ...mapActions(['fetchUsers']),
      select_lang(option)
      {
        this.lang.id = option.data.id;
        this.lang.name = option.data.name;
      },

     async submit(){
            this.loading = true;
            const requestOptions = {
            method: "Put",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
            "lang_id" : this.lang.id,
            "id" : 1
            })
          };
          const response = await fetch(this.$store.state.hostname + "/users", requestOptions);
          const data = await response.json();
          if(data.res)
          {
            this.alert_text = "Успешно добавлено!";
            this.alert_success = true;
          }
          else{
            this.modal_info = data.detail + "    (" + data.routine + ")";
            this.modal_status = true;
          }
         await this.fetchUsers();
          this.loading = false;
      }
    },
    async mounted(){
      {

        //  table
        const res = await fetch(this.$store.state.hostname + '/lang');
        const res_data = await res.json();
        this.data_lang = res_data;

        this.lang.id = this.getUsers[0].lang_id;
        this.lang.name = this.getUsers[0].lang;
        this.loading = false;
      // end table
      }

  }
  }
</script>


<style scoped>
main {
  background-color: #fff;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}


@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
