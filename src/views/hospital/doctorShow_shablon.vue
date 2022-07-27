<template>
  <div class="d-flex justify-content-center py-1">
    <img :src="image" width="60%" height="100%" alt="">
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
     const respon = await fetch(this.$store.state.hostname + '/PatientRecipeByDoctors/' + this.id)
      const data = await respon.json()
      console.log('dasdasdasdas')
      console.log(data)
      this.image = data.patinetRecipeStr;
      const img = new Image();
      img.src = data.patinetRecipeStr;

      img.onload = () => {
        this.test++;
        console.log('hiy')
       
      };
      
   }
 },
}
</script>

<style>

</style>