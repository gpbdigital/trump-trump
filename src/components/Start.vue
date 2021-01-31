<template>
  <div class="container">
    <section id="start" class="screen start">
      <div class="logo">
        <img :src="require(`@/assets/img/trumptrump.png`)" />
      </div>
      <div class="douche">  
        <img :src="require(`@/assets/img/douche.png`)" />
      </div>
      <div class="copy">
        <h2>Sleepy Joe won’t beat me, will you?</h2>
        <p>We’re gonna show you some words. Beautiful words. Remember the order, okay? Then re-sort the list. Don’t do too horribly!</p>
      </div>
      <div class="btn startBtn">
        <img :src="require(`@/assets/img/startBtn.png`)" @click="goToSequence()"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Start',
  mounted(){
    document.getElementById('app').className = '';
    document.getElementById('app').className = 'startBG';
  },
  methods: {
    goToSequence() {
      this.$router.push({ path: 'sequence' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
