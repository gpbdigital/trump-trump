<template>
  <div class="container">
    <section id="sequence" class="screen sequence">
      <div class="levelContainer">
        <span class="levelID">Level {{ this.currentLevel }}</span>
      </div>
      <div class="progressBar">

        <div class="outer" v-for="(word, index) in wordSequence" :key="`word-${index}`"  v-bind:style="{ width: width + '%' }">
          <div class="inner" ref="inners" ></div>
        </div>


      </div>
      <div class="wordContainer" ref="wordContainer">

        <div class="wordID" ref="words" v-for="(word, index) in wordSequence" :key="`word-${index}`">{{ word }}</div>
        
      </div>
    </section>
    </div>
</template>

<script>
import { TimelineMax } from "gsap";
import { Linear } from "gsap";
export default {
  name: 'Sequence',
  data() {
    return {
      currentLevel:0,
      wordSequence: [],
      index: 0,
      width:"auto"
    }
  },

  mounted() {

    document.getElementById('app').className = '';
    document.getElementById('app').className = 'sequenceBG';

    this.currentLevel = this.$store.state.currentLevel;

    if(this.currentLevel == 1){
      this.wordSequence = this.$store.state.levelOne;
      this.wordSequence = this.wordSequence.sort(() => Math.random() - 0.5);
      this.$store.commit('updateLevelOneShuffle', this.wordSequence);
    }

    if(this.currentLevel == 2){
      this.wordSequence = this.$store.state.levelTwo;
      this.wordSequence = this.wordSequence.sort(() => Math.random() - 0.5);
      this.$store.commit('updateLevelTwoShuffle', this.wordSequence);
    }

    if(this.currentLevel == 3){
      this.wordSequence = this.$store.state.levelThree;
      this.wordSequence = this.wordSequence.sort(() => Math.random() - 0.5);
      this.$store.commit('updateLevelThreeShuffle', this.wordSequence)
    }

    this.$nextTick(() => {

      this.width = 100 / this.wordSequence.length;

      this.startSequence();
    });

  },
  methods: {
    startSequence() {
      console.log("startSequence");

      let words = this.$refs.words;
      let tl1 = new TimelineMax({onComplete: this.sequenceComplete});

      [...words].forEach(w => {

        tl1.to(w, 0.15, {opacity:1, autoAlpha:1, ease:Linear.easeNone})
           .to(w, 0.15, {opacity:0, autoAlpha:0, ease:Linear.easeNone}, "+=1.0");

      })

      let inners = this.$refs.inners;
      let tl2 = new TimelineMax();
      let time = tl1.duration() / this.wordSequence.length;
      

      [...inners].forEach(i => {

        tl2.to(i, time, {width:"100%", ease:Linear.easeNone})

      })

    },
    sequenceComplete(){
      console.log("goToSort");
      this.$router.push({ path: 'sort' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
