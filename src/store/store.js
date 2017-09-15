import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentUser: null,
    questions: null,
    currentQuestion: null,
    currentAnswers: null,
    authToken: null
  },

  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions
    },
    SET_CURRENT_QUESTION(state, data ) {
      state.currentQuestion = data
    },
    ADD_QUESTION(state, data ){
      state.questions.splice(0,0, data)
    },
    SET_CURRENT_ANSWERS(state, data) {
      state.currentAnswers = data
    },
    ADD_COMMENT_TO_CURRENT_QUESTION(state, data) {
      state.currentAnswers.answers.splice(0, 0, data )
    },
    REMOVE_COMMENT_FROM_CURRENT_QUESTION(state, id) {
      let { currentAnswers } = state
      currentAnswers = currentAnswers.answers.filter( answer => answer.id !== id )
      state.currentAnswers.answers = currentAnswers
    },
    UPDATE_CURRENT_COMMENT(state, data){
      let { currentAnswers } = state
      currentAnswers = currentAnswers.answers.filter( answer => answer.id !== data.id )
      currentAnswers.unshift(data)
      state.currentAnswers.answers = currentAnswers
    },
    SET_AUTH_TOKEN(state, token ){
      state.authToken = token.auth_token;
    },
    SET_CURRENT_USER(state, token){
      state.currentUser = jwtDecode(token.auth_token)
    },
    REMOVE_CURRENT_USER( state, data){
      state.currentUser = data
    },
    REMOVE_TOKEN( state, data ){
      state.authToken = data
    }
  },

  actions: {
    setQuestions({ commit }, questions) {
      commit('SET_QUESTIONS', questions)
    },
    setCurrentQuestion({ commit }, data ) {
      commit('SET_CURRENT_QUESTION', data )
    },
    addQuestion({ commit }, data ){
        commit('ADD_QUESTION', data )
    },
    setCurrentAnswers({ commit }, data ) {
      commit('SET_CURRENT_ANSWERS', data )
    },
    addCommentToCurrentQuestion({ commit }, data) {
      commit('ADD_COMMENT_TO_CURRENT_QUESTION', data )
    },
    removeCommentFromCurrentQuestion({ commit }, id) {
      commit('REMOVE_COMMENT_FROM_CURRENT_QUESTION', id)
    },
    updateCurrentComment({ commit }, data){
      commit('UPDATE_CURRENT_COMMENT', data)
    },
    setAuthToken({ commit }, token){
      commit('SET_AUTH_TOKEN', token )
    },
    setCurrentUser({ commit }, token ){
      commit('SET_CURRENT_USER', token)
    },
    removeCurrentUser({ commit }, data ){
      commit('REMOVE_CURRENT_USER', data )
    },
    removeToken({ commit }, data ){
      commit('REMOVE_TOKEN', data )
    }
  },

  getters: {
    questions: state => state.questions,
    currentQuestion: state => state.currentQuestion,
    currentAnswers: state => state.currentAnswers,
    authToken: state => state.authToken,
    currentUser: state => state.currentUser
  }

});

export default store;
