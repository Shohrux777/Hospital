<template>
    <div class="full_input">
      <div class="input_div mt-3 d-flex align-items-center" @click="open_input" :class="{'vaeble': change, 'backJump': back}" >
        <input type="text" hidden  id="inputIdname" v-model="getData" :ref="getData"
        @click="open_input">
        <span style="margin-left: 10px;">{{getData}}</span>
        <label for="text" @click="change = true">{{label}}</label>
        <div class="icon_trash">
          <i v-show="getData" class="fa fa-trash text-danger" @click="trash()"></i>
          <i  class="fa fa-caret-down mx-2 mt-2" @click="open_input"></i>
        </div>
      </div>
      <div class="name_list" v-show="closedown">
        <p
          v-for="(option,index) in options"
          :key="index"
          @click="select_name(option)"
          >{{option}}</p>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      change: false,
      getData: this.selected,
      back: false,
      closedown: false,
      num: 0
    }
  },

  props: {
    options:
      {
        type: Array,
        default () {
          return []
        }
      },
    label: String,
    selected: String,
  },
  methods: {
    // select function from dropdown list
    select_name (name) {
      this.getData = name
      this.$emit('select', name)
      this.change = true
      this.closedown = false
      this.back = true
    },
    // this is click trash, clear function
    trash () {
      this.getData = ''
      this.back = false
      this.$emit('select', this.getData)
      this.open_input()
      this.$nextTick(function () {
        this.$refs[this.getData].focus()
      })
    },
    // this is click input
    open_input () {
      this.num = 0
      document.addEventListener('click', this.add_fun)
      this.$nextTick(function () {
        this.$refs[this.getData].setAttribute('placeholder', 'Search...')
      })
      this.change = true
      this.back = false
      this.closedown = true
    },
    // this is blur function, if another place click, dropdown list close
    add_fun (e) {
      if (this.num !== 0) {
        if (e.target.closest('.name_list')) return // bu function inputdi bosgandan keyin ikkinchi bosishimiz dropdown list bulmasa inputni yopadi
        // yani boshqa bir joyni bosib yuborsaiz yopiladi input
        if (this.getData === '') {
          this.change = false
        }
        this.back = true
        this.closedown = false
        document.removeEventListener('click', this.add_fun)
        this.$nextTick(function () {
          this.$refs[this.getData].setAttribute('placeholder', '')
        })
      }
      this.num++
    }
  },
  // this is searching function
  // computed: {
  //   filteredList: function () {
  //     if (this.getData) {
  //       return this.options.filter((item) => {
  //         return this.getData.toLowerCase().split(' ').every(v => item.toLowerCase().includes(v))
  //       })
  //     } else {
  //       return this.options
  //     }
  //   }
  // }
}
</script>

<style  scoped lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
.input_div{
  font-family: roboto sans-serif;
  position: relative;
  width: 100%;
  height: 35px;
  transition: transform 0.2s ease-in-out;
  border: none;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}

.input_div input{
  background:rgba(255, 255, 255, 0);
  width:85%;
  font-family: Montserrat sans-serif;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
  height:95%;
  position:absolute;
  left:0;
  bottom:0;
  border:none;
  outline:none;
  margin-left: 5px;
  font-size: 17px;
  font-weight:500;
  color:rgb(64, 64, 64);
}

.input_div label{
  position: absolute;
  top: 5px;
  left: 10px;
  cursor:auto;
  z-index:1;
  transition: transform 0.2s ease-in-out;
  background:transparent;
  color:#757575;
}

.vaeble{
  border: 2px solid #4285F4;
  border-radius: 5px;
  label{
    transform: translate(-2px,-17px);
    background:white;
    transition: transform 0.2s ease-in-out;
    z-index:2;
    padding: 0 3px;
    font-size:12px;
    font-weight:450;
    color: #4285F4;
  }

}
.backJump{
  border: 1px solid #BDBDBD;
  label{
    color:#757575;
  }
}

.icon_trash{
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 5px;

  i{
    margin-top: 0.5em;
    cursor:pointer;
    font-size: 13px;
  }
  i:nth-child(2){
    font-size: 14.5px;
    padding-top: 1.5px;
  }

}
.full_input{
  position: relative;
}
.name_list{
  position: absolute;
  top:35px;
  left:0;
  width:100%;
  z-index: 5;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 2px rgb(189, 189, 189);
  border-radius: 2px;
  max-height:150px;
  overflow-y: scroll;

  p{
    margin:0;
    padding: 5px 10px;
    &:hover{
      background: rgba(24, 159, 255, 0.1);
    }
  }

}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
