<template>
<v-app light>
  <!--Navigation drawer-->
  <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher overflow>
    <v-list>
      <v-list-tile v-for="item in menuItems" :key=" item.title ">
        <v-list-tile-action>
          <v-icon> {{ item.icon }} </v-icon>
        </v-list-tile-action>
        <v-list-tile-content> {{ item.title }} </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <!--End of navigation drawer -->

  <!--Toolbar starts here-->
  <v-toolbar  dark class="primary">
    <v-toolbar-side-icon v-on:click.stop="drawer = !drawer" class=""></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link class="white--text title-text" to="/">
      <v-icon dark left>forum</v-icon>
        Tikvaa-Forum
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="item in navItems" :key="item.title">
        <v-icon left dark> {{item.icon}} </v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-menu bottom right>
      <v-btn icon slot="activator" dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
  <!--End of toolbar-->

  <!--Main content -->
  <main>
    <v-container>
      <router-view></router-view>
    </v-container>
  </main>
  <!--End of main content-->

  <!--Footer-->
  <v-footer dark class="primary">
    <div class="text-xs-center text--lighten-5 ">
      &copy Fortunat Mutunda
    </div>
  </v-footer>
  <!--End of footer-->

</v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems:[
        {icon:'lock_outline', title: 'Log out', link: '/logout' },
        {icon:'lock_open', title: 'Log in', link: '/login'},
        {icon:'face', title: 'Register', link:'/register'},
      ],
      navItems:[
        {icon:'create', title: 'New Question', link: '/questions/new' },
        {icon:'face', title: 'Profile', link: ''},
      ]
    }
  },
  methods:{

  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
  .title-text{
    text-decoration: none
  }
</style>
