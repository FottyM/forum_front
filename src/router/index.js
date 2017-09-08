import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/Question/Questions'
import NewQuestion from '@/components/Question/NewQuestion'
import EditQuestion from '@/components/Question/EditQuestion'
import ShowQuestion from '@/components/Question/ShowQuestion'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/questions/new',
      name: 'NewQuestion',
      component: NewQuestion
    },
    {
      path: '/questions/:id',
      name: 'EditQuestion',
      component: EditQuestion
    },
    {
      path: '/questions/:id',
      name: 'ShowQuestion',
      component: ShowQuestion
    },

  ],
  mode: 'history'
})
