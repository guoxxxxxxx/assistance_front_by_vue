<template>
  <div id="bx1">

  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 2
      }
    }
  }
</script>

<style scoped>
#bx1 {
  margin-top: 40px;
  width: 100%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgb(128, 128, 128);
}
</style>