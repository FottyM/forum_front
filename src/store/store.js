import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    currentUser: null,
    questions: null,
    answers: null
  },

  mutations: {
    SET_QUESTIONS(state, questions ) {
      state.questions = questions
    }
  },

  actions: {
    setQuestions({commit}, questions) {
      commit('SET_QUESTIONS', questions )
    },
  },

  getters: {
    questions: state => state.questions,
  }

});

export default store;
