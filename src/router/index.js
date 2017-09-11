import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/Question/Questions'
import NewQuestion from '@/components/Question/NewQuestion'
import ShowQuestion from '@/components/Question/ShowQuestion'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component: Home
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions
    },
    {
      path: '/questions/new',
      name: 'newquestion',
      component: NewQuestion
    },
    {
      path: '/questions/:id',
      name: 'showquestion',
      component: ShowQuestion
    },

  ],
  mode: 'history'
})
