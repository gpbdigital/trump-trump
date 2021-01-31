<template>
  <div class="container">
    <section id="score" class="score">
      <div class="level">  
        <h1>Level {{ this.currentLevel }}</h1>
      </div>
      <div class="user-score">  
        <p>Your Score</p>
        <div class="score-box">
          <div class="number">{{ this.score }}</div>
          <div class="outof">out of {{ this.outof }}</div>
        </div>
      </div>
      <div class="copy">
        <h2>{{ this.copyRandom }}</h2>
      </div>
      <div class="douche">  
        <img :src="require(`@/assets/img/douche2.png`)" />
      </div>
      <div class="nextcopy">
        <p>{{ this.nextCopy }}</p>
      </div>
      <div v-if="gameon" class="btn">
        <div v-if="win" class="btn">
          <img :src="require(`@/assets/img/nextlevel.png`)" @click="nextLevel()"/>
        </div>
        <div v-else class="btn">
          <img :src="require(`@/assets/img/tryagainBtn.png`)" @click="tryAgain()"/>
        </div>
      </div>

      <ShareNetwork
          network="twitter"
          url="https://trumptrump.ie/"
          :title=this.tweet
        >
        <div class="btn tweetBtn">
            <img :src="require(`@/assets/img/tweetBtn.png`)" />
          </div>
      </ShareNetwork>
      
    </section>
  </div>
</template>

<script>

export default {
  name: 'Score',
  data() {
    return {
      currentLevel:0,
      score:0,
      outof:0,
      win:false,
      gameon:true,
      copyArray:[
              "You will go down as the WORST FBI Director in history, by far!",
              "A proven and long-term ratings and beyond DISASTER",
              "I’ve heard really bad things. Not smart!",
              "Worked hard but the deck was stacked against you!",
              "Doing a tremendous job under tough circumstances.",
              "A hard worker who will never give up! We are all very proud of you!",
              "Your rating blows away the ratings of @CNN – not even close.",
              "One of the truly great intellects.",
              "Not smart, but genius… And a very stable genius at that!",
              "I have instructed my long-time doctor to issue, within two weeks, a full IQ report – it will show perfection."
            ],
      copyRandom:"",
      nextCopy:"",
      tweet: "I took on Trump and scored "+this.score+" out of "+this.outof+" on level "+this.currentLevel+". A lot of people are playing it!"
    }
  },
  mounted() {


    document.getElementById('app').className = '';
    document.getElementById('app').className = 'loseBG';
    
    this.currentLevel = this.$store.state.currentLevel;

    this.nextCopy = "You didn’t make it to Level "+parseInt(this.currentLevel+1)+", very sad!";

    if(this.currentLevel == 1){
      this.score = this.$store.state.levelOneScore;
      this.outof = this.$store.state.levelOne.length;

      if(this.score <= 1){
        this.copyRandom = "You went down fast and hard, crying all the way.";
      }
      if(this.score == 2){
        this.copyRandom = "Just about the most inaccurate. Phony!";
      }
      if(this.score == 3){
        this.copyRandom = "You should go back to work.";
      }
      if(this.score == 4){
        this.copyRandom = "You don’t quit. You don’t give up. And I respect that.";
      }
      if(this.score == 5){
        this.copyRandom = "Great, great talent. Young, handsome and going places.";
      }
    }

    if(this.currentLevel == 2){
      this.score = this.$store.state.levelTwoScore;
      this.outof = this.$store.state.levelTwo.length;

      if(this.score <= 1){
        this.copyRandom = "I’ve heard really bad things. Not smart!";
      }
      if(this.score == 2){
        this.copyRandom = "A proven and long-term ratings DISASTER.";
      }
      if(this.score == 3){
        this.copyRandom = "Stop wasting time and energy on nonsense.";
      }
      if(this.score == 4){
        this.copyRandom = "Worked hard but the deck was stacked against you!";
      }
      if(this.score == 5){
        this.copyRandom = "So big, so strong, so powerful!";
      }
      if(this.score == 6){
        this.copyRandom = "A wonderful success and carried out beautifully.";
      }
      if(this.score == 7){
        this.copyRandom = "Your rating blows away the ratings of CNN – not even close.";
      }

    }

    if(this.currentLevel == 3){
      this.score = this.$store.state.levelThreeScore;
      this.outof = this.$store.state.levelThree.length;
      this.gameon = false;

      if(this.score <= 1){
        this.copyRandom = "You will go down as the WORST FBI Director in history, by far!";
      }
      if(this.score == 2){
        this.copyRandom = "The USA is wise to your game of dishonesty and deception!";
      }
      if(this.score == 3){
        this.copyRandom = "You must be a VERY well-connected Democrat working in The Swamp.";
      }
      if(this.score == 4){
        this.copyRandom = "In the end, had no game!";
      }
      if(this.score == 5){
        this.copyRandom = "Did a tremendous job under tough circumstances.";
      }
      if(this.score == 6){
        this.copyRandom = "A hard worker who will never give up! We are all very proud of you!";
      }
      if(this.score == 7){
        this.copyRandom = "One of the truly great intellects.";
      }
      if(this.score == 8){
        this.copyRandom = "Not smart, but genius… And a very stable genius at that!";
      }
      if(this.score == 9){
        this.copyRandom = "I have instructed my long-time doctor to issue a full IQ report – it will show perfection.";
      }

    }

    if(this.score == this.outof){
      document.getElementById('app').className = '';
      document.getElementById('app').className = 'winBG';
      this.win = true;
      this.nextCopy = "Too easy?  Let’s add some more words."
    }

    if(this.currentLevel == 3 && this.score == this.outof){
      this.gameon=false;
      this.score = this.$store.state.levelThreeScore;
      this.outof = this.$store.state.levelThree.length;
      this.nextCopy = "Fun’s over. I’ve a Cabinet opening with your name on it!";
      if(this.score <= 1){
        this.copyRandom = "You will go down as the WORST FBI Director in history, by far!";
      }
      if(this.score == 2){
        this.copyRandom = "The USA is wise to your game of dishonesty and deception!";
      }
      if(this.score == 3){
        this.copyRandom = "You must be a VERY well-connected Democrat working in The Swamp.";
      }
      if(this.score == 4){
        this.copyRandom = "In the end, had no game!";
      }
      if(this.score == 5){
        this.copyRandom = "Did a tremendous job under tough circumstances.";
      }
      if(this.score == 6){
        this.copyRandom = "A hard worker who will never give up! We are all very proud of you!";
      }
      if(this.score == 7){
        this.copyRandom = "One of the truly great intellects.";
      }
      if(this.score == 8){
        this.copyRandom = "Not smart, but genius… And a very stable genius at that!";
      }
      if(this.score == 9){
        this.copyRandom = "I have instructed my long-time doctor to issue a full IQ report – it will show perfection.";
      }
    }

    this.tweet = "I took on Trump and scored "+this.score+" out of "+this.outof+" on level "+this.currentLevel+". A lot of people are playing it!";

    this.$gtag.event('Level '+this.currentLevel, {
        'event_category': 'Scores',
        'event_label': this.score
      })

  },
  methods: {
    tryAgain() {
      
      console.log("tryAgain");
      this.$router.push({ path: 'sequence' });

    },
    nextLevel() {
      
      console.log("nextLevel");
      if(this.currentLevel == 3){
        console.log("Game Over");
        return false;
      }
      else{
        this.$store.commit('updateCurrentLevel', parseInt(this.currentLevel+1));
        this.$router.push({ path: 'sequence' });
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
