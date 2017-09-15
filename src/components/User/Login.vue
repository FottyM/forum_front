<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-title dark class="primary">
            <h5 class="white--text">Register</h5>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="E-mail" v-model="email" required></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="password"
                min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'" counter required>
              </v-text-field>
              <v-btn @click="clear">Clear</v-btn>
              <v-btn @click="login" class="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import API_URL from '../../configs/api'
  import axios from 'axios'

  export default {
    name: 'login',
    data(){
      return{
        e1: true,
        email: '',
        password: ''
      }
    },
    methods:{
      login(){
        let userParams = {
          email:    this.email,
          password: this.password
        }
        let header = {
          headers:{
            'Authorization': ''
          }
        }
        axios.post(`${API_URL}/authenticate`, userParams)
          .then( res => {
            let authToken = res.data
            this.$store.dispatch('setAuthToken', authToken )
            this.$store.dispatch('setCurrentUser', authToken)
            this.$router.push({name: 'profile'})
          })
          .catch( error => {
            console.log( error.response )
          })

      },
      clear(){
        this.email = ''
        this.password = ''
      }
    }


  }

</script>
<style scoped>

</style>
