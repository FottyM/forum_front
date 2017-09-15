import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/Question/Questions'
import NewQuestion from '@/components/Question/NewQuestion'
import EditQuestion from '@/components/Question/EditQuestion'
import ShowQuestion from '@/components/Question/ShowQuestion'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Logout from '@/components/User/Logout'
import Profile from '@/components/User/Profile'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
      component: NewQuestion,
      // beforeEnter
    },
    {
      path: '/questions/:id',
      name: 'showquestion',
      component: ShowQuestion
    },
    {
      path:'/questions/:id/edit',
      name: 'editquestion',
      component: EditQuestion,
      // beforeEnter: (to, from, next) => this.$state.currentUser.user !== null ? next({ path: '/login' }) : next('/')
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      // beforeEnter
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // beforeEnter
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout

    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      // beforeEnter
    }
  ],
  mode: 'history'
})
