<template>
  <div class="alert py-2 m-0" id="alert" :ref="color" :class="[{'showalert': showAlert} , alertColor]" >
    <div class="p-0 m-0">
      <i class="icon pr-2" :class="alertIcon"></i>
      <p class="p-0 m-0">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      showAlert: this.bool,
      alertColor: 'bg-'+ this.color,
      alertIcon: 'fa fa-' + this.icon
    }
  },
  props: {
    bool: Boolean,
    text: String,
    icon: String
  },
  watch: {
    bool: function(val) {
        //do something when the data changes.
        if (val === true) {
          this.alert_func();
        }
    }
  },
   methods: {
    alert_func (){
      this.showAlert = true;
      setTimeout(() =>{
        this.showAlert = false;
        this.$emit('changeBool', this.showAlert)
      },2000)
    }
  },
  mounted (){
    if(this.color !== 'primary' || this.color !== 'success' || this.color !== 'warning' || this.color !== 'secondary' || this.color !== 'info' || this.color !== 'light' || this.color !== 'dark' || this.color !== 'danger'){
      this.$nextTick(function () {
        this.$refs[this.color].style.background = this.color;
      })
    }
  }
}
</script>

<style scoped>

.alert{
  display: inline-block;
  position: fixed;
  max-width: 500px;
  min-width: 360px;
  font-family: roboto,sans-serif;
  font-weight: 380;
  color: white;
  right: 5px;
  top: 5px;
  z-index: 5555555;
  transform: translate(1000px);
  transition: transform 0.3s ease-in-out;
}
.alert div{
  display: flex;
  align-items: center;
}
.icon{
  font-size: 14px;
}
.showalert{
  transform: translate(0px);
  transition: transform 0.3s ease-in-out;
}
</style>



