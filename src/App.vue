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
    <v-toolbar-side-icon v-on:click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title>
      <v-icon dark left>forum</v-icon>
      Tikvaa-Forum
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in menuItems" :key="item.title">
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
  <v-footer>
    my foot
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
        {icon:'lock_outline', title: 'Log out' },
        {icon:'lock_open', title: 'Log in'},
        {icon:'face', title: 'Register'},
      ]
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
