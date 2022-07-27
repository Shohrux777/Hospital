<template>
<div>
  <mdb-input size="sm" label="Названия" icon="file-signature"
    group type="text" validate error="wrong" success="right"
  />
  <div class="card m-2 p-2 text-center" v-for="post in allPosts" :key="post.id">
    <h2>{{post.title}}</h2>
    <p>{{post.body}}</p>
  </div>

</div>
</template>


<script>
import {mapGetters,mapActions,} from 'vuex'
import {mdbInput} from 'mdbvue'
export default {

  name: 'post',
  data(){
    return{
    forAction : {
      hostname : this.$store.state.hostname1,
      limit : 4
    }
    }
  },
  components:{
    mdbInput
  },

  computed: mapGetters(['allPosts']),
  methods: mapActions(['fetchPosts']),

  // toggleCompleted(todo) {
  //       this.$store.dispatch('toggleCompleted', todo);
  //   },
  async mounted (){
    //this.$store.dispatch('fetchPosts')
    this.fetchPosts(this.forAction);
  }
}
</script>
