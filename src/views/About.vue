<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Toast ref="message"></Toast>
  </div>
</template>
<script>
export default {
  mounted(){
    this.$refs.message.error('Success!!! Добавить комната')
    this.$refs.message.success('Success!!! Добавить комната')
    this.$refs.message.info('Success!!! Добавить комната')
    this.$refs.message.warning('Success!!! Добавить комната')
    this.$refs.message.dark('Success!!! Добавить комната')
  }
}
</script>

