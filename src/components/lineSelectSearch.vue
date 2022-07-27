<template>
  <div class="line-select">

     <input type="text" class="form-control form-control-sm" :placeholder="label"
     @click="select_input"
    :value="selected"/>

    <mdb-icon class="top-btn not-pointer" icon="caret-down" />
    <div class="card options"  v-bind:class="{ 'fixed-column': !areOptionsVisible }" v-if="areOptionsVisible">
      <div class="container">
        <mdb-input v-if="searchshow == true" size="sm" :placeholder="$t('search_here')" m="b0 t3"
        group type="text" @input="searching"
        v-model="search" :ref="search" class="down_list"
        />
      </div>
         
          

      <p v-for="option in list" :key="option.id"
          @click="selectOption(option)"
      >
        {{option.name}}
      </p>

    </div>
  </div>
</template>

<script>
import { mdbInput,mdbIcon } from 'mdbvue';

export default {
  name: 'line-select',
  components:{mdbInput,mdbIcon },
  props: {
      options:{
        type: Array,
        default(){
          return []
        }
      },
      searchshow : {
        type : Boolean,
        default : false
      },
      selected:{
        type: String,
        default: ''
      },
      row_index:{
        type:Number,
        default:-1
      },
      label:{
        type:String,
        default:''
      },
      url:{
        type:String,
        default:''
      },
    },
  data(){
    return{
      search:'',
      areOptionsVisible: false,
       munp: true,
      num: 0,
      list: []
    }
  },
  methods: {
    addTag(){
      let x = {
        row : this.row_index,
        name :  this.search
      }
      this.$emit('addTag', x);
      
      // this.$nextTick(function () {
      //   this.$refs[this.selected].focus();
      //   this.search = '';
      // })
      // console.log('addtag');

    },
    
    selectOption(option)
    {
      let x = {
        row : this.row_index,
        data : option
      }
      this.$emit('select',x);
      this.areOptionsVisible = false;
    },
    select_input(){
      this.num = 0
      this.list = this.option;
      this.areOptionsVisible = !this.areOptionsVisible;
      if(this.searchshow){
        this.$nextTick(function () {
        this.$refs[this.search].focus();
        this.search = '';
        })
      }
      document.addEventListener("click", this.add_fun);
    },
    add_fun (e){
        if(this.num!=0){
          if(e.target.closest(".down_list")) return
          this.areOptionsVisible = false;
          document.removeEventListener("click", this.add_fun)
        }
        this.num++
    },
    async searching(){
      try{
        if(this.url != '' && this.search != ''){
          const res = await fetch(this.$store.state.hostname + this.url + this.search);
          const data = await res.json();
          console.log('uforr')
          console.log(data)
          this.list = data;
          this.dropshow = true;
        }
        else{
          this.list = this.option
        }
      }
      catch{
        console.log('error')
      }
    },

  },
   computed:{
            filteredList: function(){
                if(this.search)
                {
                  return this.options.filter((item)=>{
                    return this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                  })
                }else
                {
                  return this.options;
                }
              }

    }



}
</script>


<style >

/* for scroll */
  /* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* ! for scroll */


.line-select{
  position: relative;
  width: 100%;
  cursor: pointer;
}


  .options{
    position: absolute  !important;
    z-index: 4000 !important;
    width:100%;
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: scroll;
    margin-top: -32px;
  }

  .options p{
    padding: 10px 5px 0 10px;
    margin: 0;
  }

  .options p:hover{
    background: #e7e7e7;
  }

  .top-btn{
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .not-pointer
  {
      pointer-events: none;
  }
.addtag{
    position: relative;
    background: rgb(128, 255, 128);
  }
  .removetag{
    position: relative;
    background: rgb(255, 110, 110);
  }
  .addBox p:hover{
    background: rgb(66, 224, 66);
  }
  .removeBox p:hover{
    background: rgb(247, 25, 25);
  }
  .addtagLabel{
    position: absolute;
    top: 8px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    right: 5px;
  }

</style>
