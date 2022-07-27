<template>
  <div>
    <img :src="image" width="100%" height="100%" alt="">
  </div>
</template>

<script>
export default {
 data() {
   return {
     hostname: this.$store.state.hostname1,
     id: this.$route.params.id,
     image: '',
     test: 0,
   }
 },
 async created() {
   if(this.id>0){
     const respon = await fetch(this.$store.state.hostname + '/HospitalPatientAnalizHistory/' + this.id)
      const data = await respon.json()
      console.log('dasdasdasdas')
      console.log(data)
      this.image = data.analiz_base_str;
      const img = new Image();
      img.src = data.analiz_base_str;

      img.onload = () => {
        this.test++;
        console.log('hiy')
        window.print();
        this.$router.back()
      };
      
   }
 },
}
</script>

<style>

</style>