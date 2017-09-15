<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-title dark  class="primary align-center">
            <h1 class="white--text">Logged out </h1>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

  export default {
    name: 'logout',
    data(){
      return {}
    },
    created(){
      this.$store.dispatch('removeCurrentUser', null )
      this.$store.dispatch('removeToken', null )
      this.$router.push({name: 'login'})
    }
  }

</script>
<style scoped>

</style>
