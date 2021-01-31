import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        levelOne: ['Person', 'Woman', 'Man', 'Camera', 'TV'],
        levelOneShuffle:[],
        levelTwo: ['Huge', 'Bigly', 'Stupid', 'Loser', 'Moron', 'Great', 'Incredible'],
        levelTwoShuffle:[],
        levelThree: ['Tremendous', 'Billions', 'Classy', 'Winning', 'Zero', 'Weak', 'Tough', 'Dangerous', 'Veterans'],
        levelThreeShuffle:[],
        levelOneResponse: [],
        levelOneScore:0,
        levelTwoResponse: [],
        levelTwoScore:0,
        levelThreeResponse: [],
        levelThreeScore:0,
        currentLevel:1,
        totalScore:0
    },

    mutations: {

        updateLevelOneScore(state, score) {

          state.levelOneScore = score;

        },

        updateLevelOneShuffle(state, seq) {

          state.levelOneShuffle = seq;

        },

        updateLevelTwoScore(state, score) {

          state.levelTwoScore = score;

        },

        updateLevelTwoShuffle(state, seq) {

          state.levelTwoShuffle = seq;

        },

        updateLevelThreeScore(state, score) {

          state.levelThreeScore = score;

        },

        updateLevelThreeShuffle(state, seq) {

          state.levelThreeShuffle = seq;

        },

        updateCurrentLevel(state, currentLevel) {

          state.currentLevel = currentLevel;

        }
    },

    getters: {

    }

});