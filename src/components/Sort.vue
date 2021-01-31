<template>
  <div class="container">
    <section id="sort" class="screen sort">
      <div class="sortInstructions">
        <p>Now drag and drop the<br>words in the right order</p>
      </div>
      <div class="sortContainer" ref="sortContainer" v-bind:style="{ height: height + 'px' }">
        
        <div class="list-item"  :class="`order-${index+1}`" ref="listItems" v-for="(word, index) in randomized" :key="`word-${index}`">
          <div class="item-content" ref="listContent">
            <div class="order" :class="`order-${index+1}`" ref="order" > </div>
            <div class="word">{{ word }}</div>
            <div class="dots">
              <div class="dotsInner"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="btn doneBtn">
        <img :src="require(`@/assets/img/doneBtn.png`)"  @click="checkResults()"/>
      </div>
    </section>
  </div>
</template>

<script>
//import { TimelineMax } from "gsap";
//import { Linear } from "gsap";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
gsap.config({
  nullTargetWarn: false
});
export { gsap, Draggable };
export default {
  name: 'Sort',
  data() {
    return {
      currentLevel:0,
      wordSequence: [],
      base:[],
      randomized:[],
      listItems:[],
      sortables:[],
      total:0, 
      rowSize: 60,
      currentArray:[],
      index: 0,
      height:"auto"
    }
  },
  mounted() {

    document.getElementById('app').className = '';
    document.getElementById('app').className = 'sortBG';

    this.currentLevel = this.$store.state.currentLevel;

    if(this.currentLevel == 1){
      //this.wordSequence = this.$store.state.levelOne;
      this.wordSequence = this.$store.state.levelOneShuffle;
    }

    if(this.currentLevel == 2){
      //this.wordSequence = this.$store.state.levelTwo;
      this.wordSequence = this.$store.state.levelTwoShuffle;
    }

    if(this.currentLevel == 3){
      //this.wordSequence = this.$store.state.levelThree; 
      this.wordSequence = this.$store.state.levelThreeShuffle;
    }

    if(this.wordSequence.length  < 1){
      this.$router.push({ path: 'sequence' });
    }

    this.$nextTick(() => {
      this.genRandom();
    });

  },
  methods: {


    genRandom() {
      //console.log("genRandom");
      this.base = [...this.wordSequence].slice()
      this.randomized = [...this.wordSequence].sort(() => Math.random() - 0.5)
      if (this.randomized.join("") !== this.base.join("")){
          this.renderItems();
       } else {
         //recursion to account if the randomization returns the original array
         this.genRandom()
       }

    },

    renderItems(){
      this.$nextTick(() => {
        this.listItems = Array.from(this.$refs.listItems); // Array of elements
        this.sortables = this.listItems.map(this.Sortable); // Array of sortables
        this.total = this.sortables.length;
        this.height = this.listItems.length*60;
        let sortContainer = this.$refs.sortContainer;
        gsap.to(sortContainer, 0.5, { autoAlpha: 1 });

      });
    },

    Sortable(element, index){
      var _this = this;
      let content = _this.$refs.itemContent;
      let order   = _this.$refs.order;
      
      let animation = gsap.to(content, 0.3, {
        boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
        force3D: true,
        scale: 1.1,
        paused: true
      });
      
      let dragger = new Draggable(element, {        
        onDragStart: downAction,
        onRelease: upAction,
        onDrag: dragAction,
        cursor: "inherit",    
        type: "y"
      });
      
      // Public properties and methods
      var sortable = {
        dragger:  dragger,
        element:  element,
        index:    index,
        setIndex: setIndex
      };
      
      gsap.set(element, { y: index * _this.rowSize });
        
      function setIndex(index) {
        //console.log(element)
        sortable.index = index;    
        order.innerText = index + 1;
        
        // Don't layout if you're dragging
        if (!dragger.isDragging) layout();
      }
      
      function downAction() {
        animation.play();
        this.update();
      }
      
      function dragAction() {
        
        // Calculate the current index based on element's position
        var index = _this.clamp(Math.round(this.y / _this.rowSize), 0, _this.total - 1);
        
        if (index !== sortable.index) {
          _this.changeIndex(sortable, index);
        }
      }
      
      function upAction() {
        animation.reverse();
        layout();
        //_this.compare();
      }
      
      function layout() {    
        gsap.to(element, 0.3, { y: sortable.index * _this.rowSize });  
      }
      
      return sortable;

    },

    clamp(value, a, b) {
      return value < a ? a : (value > b ? b : value);
    },

    changeIndex(item, to) {
      
      this.arrayMove(this.sortables, item.index, to);
      
      let sortContainer = this.$refs.sortContainer;
      if (to === this.total - 1) {
        sortContainer.appendChild(item.element);    
      } else {    
        var i = item.index > to ? to : to + 1;
        sortContainer.insertBefore(item.element, sortContainer.children[i]);
      }

      //let orderItem = this.$refs.order;

      this.sortables.forEach((sortable, index)=>{
        sortable.setIndex(index);
      });



    },

    compare() {

      var a = [];
      this.sortables.forEach((item)=>{
        console.log(item.element.innerText);
        a.push(item.element.innerText);
      });
      var b = [...this.wordSequence];
      console.log(a);
      console.log(b);

    },

    arrayMove(array, from, to) {

      array.splice(to, 0, array.splice(from, 1)[0]);

    },

    checkResults  (){
      
      var a = [];
      var b = [];

      this.sortables.forEach((item)=>{
        let w = item.element.innerText.trim();
        a.push(w);
      });
      
      [...this.wordSequence].forEach((item)=>{
        let w2 = item.trim();
        b.push(w2);
      });
      //alert(a);
      //alert(b);

      var score = 0;
      for(var i = 0; i < b.length; ++i){
          if(a[i] == b[i]){
            score++;
            //alert(score)
          }
      }
      //alert(score+"/"+this.total);

      if(this.currentLevel == 1){
        this.$store.commit('updateLevelOneScore', score);
      }

      if(this.currentLevel == 2){
        this.$store.commit('updateLevelTwoScore', score);
      }

      if(this.currentLevel == 3){
        this.$store.commit('updateLevelThreeScore', score);
      }
      

      this.$router.push({ path: 'score' });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
