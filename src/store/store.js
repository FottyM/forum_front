import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentUser: null,
    questions: null,
    answers: null,
    currentQuestion: null,
    currentAnswers: null
  },

  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions
    },
    SET_CURRENT_QUESTION(state, id) {
      let questions = state.questions
      let question = questions.filter((question) => {
        return question.id === id
      });
      state.currentQuestion = question.pop()
    },
    SET_CURRENT_ANSWERS(state, data) {
      state.currentAnswers = data
    },
    ADD_COMMENT_TO_CURRENT_QUESTION(state, data) {
      state.currentAnswers.splice(0, 0, data)
    },
    REMOVE_COMMENT_FROM_CURRENT_QUESTION(state, id) {
      let { currentAnswers } = state ;
      currentAnswers = currentAnswers.filter( answer => answer.id !== id )
      state.currentAnswers = currentAnswers
    }
  },

  actions: {
    setQuestions({
      commit
    }, questions) {
      commit('SET_QUESTIONS', questions)
    },
    setCurrentQuestion({
      commit
    }, id) {
      commit('SET_CURRENT_QUESTION', id)
    },
    setCurrentAnswers({
      commit
    }, data) {
      commit('SET_CURRENT_ANSWERS', data)
    },
    addCommentToCurrentQuestion({
      commit
    }, data) {
      commit('ADD_COMMENT_TO_CURRENT_QUESTION', data)
    },
    removeCommentFromCurrentQuestion({
      commit
    }, id) {
      commit('REMOVE_COMMENT_FROM_CURRENT_QUESTION', id)
    }
  },

  getters: {
    questions: state => state.questions,
    currentQuestion: state => state.currentQuestion,
    currentAnswers: state => state.currentAnswers
  }

});

export default store;
