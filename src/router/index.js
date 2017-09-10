import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/Question/Questions'
import NewQuestion from '@/components/Question/NewQuestion'
// import EditQuestion from '@/components/Question/EditQuestion'
import ShowQuestion from '@/components/Question/ShowQuestion'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
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
