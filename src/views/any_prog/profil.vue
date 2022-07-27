<template>
  <div class="container bootstrap snippets bootdey" style="min-height: 100vh;">
    <div class="row">
      <div class="profile-nav col-md-3">
          <div class="panel">
              <div class="user-heading round">
                  <a href="#">
                      <img :src="image" alt="">
                  </a>
                  <h5 class="mt-1">{{info.users.fio}}</h5>
                  <p>deydey@theEmail.com</p>
              </div>

              <div class="bg-white rounded">
                <ul class="nav nav-pills d-inline  nav-stacked">
                    <li  class="py-2 active"><a href="#"> <i class="ml-2 fa fa-user"></i> Profile</a></li>
                    <li class="py-2"><a href="#"> <i class="ml-2 fa fa-calendar"></i> Recent Activity </a></li>
                    <li class="py-2"><a href="#"> <i class="ml-2 fa fa-edit"></i> Edit profile</a></li>
                </ul>
              </div>
          </div>
      </div>
      <div class="profile-info col-md-9">
          <div class="panel header_post shadow rounded mb-3">
              <footer class="panel-footer d-flex justify-content-between">
                  <ul class="nav nav-pills">
                      <li>
                          <a href="#"><i class="fa fa-map-marker p-3" style="font-size: 16px;"></i></a>
                      </li>
                      <li>
                          <a href="#"><i class="fa fa-camera p-3" style="font-size: 16px;"></i></a>
                      </li>
                      <li>
                          <a href="#"><i class=" fa fa-film p-3" style="font-size: 16px;"></i></a>
                      </li>
                      <li>
                          <a href="#"><i class="fa fa-microphone p-3" style="font-size: 16px;"></i></a>
                      </li>
                  </ul>
                  <button class="btn btn-warning pull-right">Post</button>
              </footer>
          </div>
          <div class="panel card ">
              <div class="bio-graph-heading">
                  Bio Graph
              </div>
              <div class="panel-body bio-graph-info px-3 py-2">
                  <div class="row">
                      <div class="bio-row">
                          <p><span>Full Name </span>: {{info.users.fio}}</p>
                      </div>
                      <div class="bio-row">
                          <p><span>Country </span>: Uzbekistan</p>
                      </div>
                      <div class="bio-row">
                          <p><span>Birthday</span>: none</p>
                      </div>
                      <div class="bio-row">
                          <p><span>Occupation </span>: {{info.users.position.name}}</p>
                      </div>
                      <div class="bio-row">
                          <p><span>Email </span>: jsmith@flatlab.com</p>
                      </div>
                      <div class="bio-row">
                          <p><span>Mobile </span>: {{info.users.phoneNumber}}</p>
                      </div>
                  </div>
              </div>
              <div class="d-flex justify-content-end">
                <mdb-btn color="warning" @click="show = !show" class="px-3 py-1 mr-3 mb-3 mt-0">Edit profil</mdb-btn>
              </div>
          </div>


          <div class="panel card mt-4">
              <div class="bio-graph-heading">
                  Login
              </div>
              <div class="panel-body bio-graph-info px-3 pt-3">
                  <div class="row">
                      <div class="bio-row col-12">
                          <p><span>User name </span>: {{info.login}}</p>
                      </div>
                      <div class="bio-row col-12">
                          <p><span>Password </span>: ****************</p>
                      </div>
                      
                  </div>
              </div>
              <div class="d-flex justify-content-end">
                <mdb-btn color="warning"  @click="auth_show = !auth_show" class="px-3 py-1 mr-3 mb-3 mt-0">Edit Login</mdb-btn>
              </div>
          </div>
        
      </div>
    </div>
    <!-- <mdb-modal  :show="show"  @close="show = false" size="md" light>
      <mdb-modal-header>
        <mdb-modal-title style="font-weight:  500;">{{$t('Check')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <checkComponent/>
      </mdb-modal-body>
    </mdb-modal> -->

    <mdb-modal  :show="show"  @close="show = false" size="lg" warning>
      <mdb-modal-header class="m-0 py-3 text-white">
        <mdb-modal-title style="font-weight:  500;">{{$t('Update работника')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <usersAdd  :options="editData" @close="saved"/>
      </mdb-modal-body>
    </mdb-modal>

     <mdb-modal  :show="auth_show"  @close="auth_show = false" size="md" warning>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Add authorization')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <authAdd :options="updateAuth" :hide="hide" :user="user_id" @close="savedAuth"/>
        </mdb-modal-body>
      </mdb-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import usersAdd from "../../components/new_prog_add/users_add"
import authAdd from '../../components/new_prog_add/auth_add.vue'
import {mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,} from "mdbvue";
export default {
   components: {
    mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, usersAdd, authAdd
  },
  data(){
    return{
      hiy: 'dadasd',
      info: {},
      image: '',
      show: false,
      auth_show: false,
      editData: {},
      updateAuth: {},
      user_id: null,
      hide: true
    }
  },
  async mounted(){
    console.log('suci')
    await this.fetch_auth_list()
    await this.fetch_users()
    console.log(localStorage.AuthId)
    console.log(localStorage.docId)
    this.user_id = parseInt(localStorage.docId)
    console.log(this.get_users_list)
    this.info = this.auth_user_list.find(item => item.id == localStorage.AuthId)
    this.image = this.info.users.image
    this.editData = this.get_users_list.rows.find(user => user.id == localStorage.docId)
    this.updateAuth = this.editData.authorization
  },
  computed: mapGetters(['auth_user_list', 'get_users_list']),
  methods:{
    ...mapActions(['fetch_auth_list', 'fetch_users']),
    async saved(){
      this.show = false
      await this.fetch_auth_list()
      await this.fetch_users()
      this.info = this.auth_user_list.find(item => item.id == localStorage.AuthId)
      this.image = this.info.users.image
      this.editData = this.get_users_list.rows.find(user => user.id == localStorage.docId)
    },
    async savedAuth(){
      this.auth_show = false
      await this.fetch_auth_list()
      await this.fetch_users()
      this.info = this.auth_user_list.find(item => item.id == localStorage.AuthId)
      this.image = this.info.users.image
      this.editData = this.get_users_list.rows.find(user => user.id == localStorage.docId)
      this.updateAuth = this.editData.authorization
    }
  }
}
</script>

<style lang="scss">
body {
    color: #797979;
    background: #f1f2f7;
    font-family: 'Open Sans', sans-serif;
    padding: 0px !important;
    margin: 0px !important;
    font-size: 13px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
}

.profile-nav, .profile-info{
    margin-top:30px;   
}

.profile-nav .user-heading {
    background: #fbc02d;
    color: #fff;
    border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    padding: 30px;
    text-align: center;
}

.profile-nav .user-heading.round a  {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    border: 10px solid rgba(255,255,255,0.3);
    display: inline-block;
}

.profile-nav .user-heading a img {
    width: 112px;
    height: 112px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
}

.profile-nav .user-heading h1 {
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 5px;
}

.profile-nav .user-heading p {
    font-size: 12px;
}

.profile-nav ul {
    margin-top: 1px;
    // background: #fff;
}

.profile-nav ul > li {
    border-bottom: 1px solid #ebeae6;
    margin-top: 0;
    line-height: 30px;
}

.profile-nav ul > li:last-child {
    border-bottom: none;
}

.profile-nav ul > li> a  {
    border-radius: 0;
  // display: inline;
    -webkit-border-radius: 0;
    color: #89817f;
    // border-left: 5px solid #fff;
}

.profile-nav ul > li:hover, .profile-nav ul > li:focus, .profile-nav ul li.active{
    background: #f8f7f5 !important;
    border-left: 5px solid #fbc02d;
    color: #89817f !important;
}
.header_post{
  background: #f8f7f5 !important;
}
.profile-nav ul > li:last-child > a:last-child {
    border-radius: 0 0 4px 4px;
    -webkit-border-radius: 0 0 4px 4px;
}

.profile-nav ul > li > a > i{
    font-size: 16px;
    padding-right: 10px;
    color: #bcb3aa;
}

.r-activity {
    margin: 6px 0 0;
    font-size: 12px;
}


.p-text-area, .p-text-area:focus {
    border: none;
    font-weight: 300;
    box-shadow: none;
    color: #c3c3c3;
    font-size: 16px;
}

.profile-info .panel-footer {
    background-color:#f8f7f5 ;
    border-top: 1px solid #e7ebee;
}

.profile-info .panel-footer ul li a {
    color: #7a7a7a;
}

.bio-graph-heading {
    background: #fbc02d;
    color: #fff;
    text-align: center;
    font-style: italic;
    padding: 20px 110px;
    border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    font-size: 16px;
    font-weight: 300;
}

.bio-graph-info {
    color: #89817e;
}

.bio-graph-info h1 {
    font-size: 22px;
    font-weight: 300;
    margin: 0 0 20px;
}

.bio-row {
    width: 50%;
    float: left;
    margin-bottom: 10px;
    padding:0 15px;
}

.bio-row p span {
    width: 100px;
    display: inline-block;
}

.bio-chart, .bio-desk {
    float: left;
}

.bio-chart {
    width: 40%;
}

.bio-desk {
    width: 60%;
}

.bio-desk h4 {
    font-size: 15px;
    font-weight:400;
}

.bio-desk h4.terques {
    color: #4CC5CD;
}

.bio-desk h4.red {
    color: #e26b7f;
}

.bio-desk h4.green {
    color: #97be4b;
}

.bio-desk h4.purple {
    color: #caa3da;
}

.file-pos {
    margin: 6px 0 10px 0;
}

.profile-activity h5 {
    font-weight: 300;
    margin-top: 0;
    color: #c3c3c3;
}

.summary-head {
    background: #ee7272;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #ee7272;
}

.summary-head h4 {
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 5px;
}

.summary-head p {
    color: rgba(255,255,255,0.6);
}

ul.summary-list {
    display: inline-block;
    padding-left:0 ;
    width: 100%;
    margin-bottom: 0;
}

ul.summary-list > li {
    display: inline-block;
    width: 19.5%;
    text-align: center;
}

ul.summary-list > li > a > i {
    display:block;
    font-size: 18px;
    padding-bottom: 5px;
}

ul.summary-list > li > a {
    padding: 10px 0;
    display: inline-block;
    color: #818181;
}

ul.summary-list > li  {
    border-right: 1px solid #eaeaea;
}

ul.summary-list > li:last-child  {
    border-right: none;
}

.activity {
    width: 100%;
    float: left;
    margin-bottom: 10px;
}

.activity.alt {
    width: 100%;
    float: right;
    margin-bottom: 10px;
}

.activity span {
    float: left;
}

.activity.alt span {
    float: right;
}
.activity span, .activity.alt span {
    width: 45px;
    height: 45px;
    line-height: 45px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    background: #eee;
    text-align: center;
    color: #fff;
    font-size: 16px;
}

.activity.terques span {
    background: #8dd7d6;
}

.activity.terques h4 {
    color: #8dd7d6;
}
.activity.purple span {
    background: #b984dc;
}

.activity.purple h4 {
    color: #b984dc;
}
.activity.blue span {
    background: #90b4e6;
}

.activity.blue h4 {
    color: #90b4e6;
}
.activity.green span {
    background: #aec785;
}

.activity.green h4 {
    color: #aec785;
}

.activity h4 {
    margin-top:0 ;
    font-size: 16px;
}

.activity p {
    margin-bottom: 0;
    font-size: 13px;
}

.activity .activity-desk i, .activity.alt .activity-desk i {
    float: left;
    font-size: 18px;
    margin-right: 10px;
    color: #bebebe;
}

.activity .activity-desk {
    margin-left: 70px;
    position: relative;
}

.activity.alt .activity-desk {
    margin-right: 70px;
    position: relative;
}

.activity.alt .activity-desk .panel {
    float: right;
    position: relative;
}

.activity-desk .panel {
    background: #F4F4F4 ;
    display: inline-block;
}


.activity .activity-desk .arrow {
    border-right: 8px solid #F4F4F4 !important;
}
.activity .activity-desk .arrow {
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    display: block;
    height: 0;
    left: -7px;
    position: absolute;
    top: 13px;
    width: 0;
}

.activity-desk .arrow-alt {
    border-left: 8px solid #F4F4F4 !important;
}

.activity-desk .arrow-alt {
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    display: block;
    height: 0;
    right: -7px;
    position: absolute;
    top: 13px;
    width: 0;
}

.activity-desk .album {
    display: inline-block;
    margin-top: 10px;
}

.activity-desk .album a{
    margin-right: 10px;
}

.activity-desk .album a:last-child{
    margin-right: 0px;
}

</style>