<template>
<v-app light>
  <!--Navigation drawer-->
  <v-navigation-drawer absolute persistent :mini-variant.sync="mini" light v-model="drawer" overflow>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <template v-if="currentUser">
              {{currentUser.username | initiales }}
            </template>
            <template v-else>
              FM
            </template>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <template v-if="currentUser">
                {{ currentUser.username }}
              </template>
              <template v-else>
                Please Login
              </template>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link" >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title> {{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <!--End of navigation drawer -->


  <!--Toolbar starts here-->
  <v-toolbar dark class="primary">
    <v-toolbar-side-icon v-on:click.stop="drawer = !drawer" class=""></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link class="white--text title-text" to="/">
        <v-icon dark left>forum</v-icon>
        Tikvaa-Forum
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-icon left dark> {{item.icon}} </v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
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
  import axios from 'axios'
  import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      mini: false,
      drawer: false,
      menuItems: [{
          icon: 'lock_outline',
          title: 'Log out',
          link: '/logout'
        },
        {
          icon: 'lock_open',
          title: 'Log in',
          link: '/login'
        },
        {
          icon: 'face',
          title: 'Register',
          link: '/register'
        },
        {
          icon: 'create',
          title: 'New Question',
          link: '/questions/new'
        },
        {
          icon: 'face',
          title: 'Profile',
          link: '/profile'
        },
      ]
    }
  },
  computed:{
    ...mapGetters(['currentUser'])
  },
  filters:{
    initiales(username){
      return username[0].toLocaleUpperCase()
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
  .title-text{
    text-decoration: none
  }
</style>
