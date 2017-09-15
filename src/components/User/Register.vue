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
              <v-text-field label="Username" v-model="username" required></v-text-field>
              <v-text-field label="E-mail" v-model="email" required></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="password"
                min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'" counter required>

              </v-text-field><v-text-field
              name="input-10-1"
              label="Enter your password confirmation"
              hint="At least 8 characters"
              v-model="password_confirmation"
                min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter required></v-text-field>

              <v-checkbox label="Admin?" v-model="admin" required></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn @click="clear">Clear</v-btn>
              <v-btn @click="register" class="primary">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import axios from 'axios'
  import API_URL from '../../configs/api'

  export default {
    name: 'Register',
    data(){
      return{
        e1: true,
        admin: false,
        username: '',
        password: '',
        password_confirmation: '',
        email: ''

      }
    },
    methods:{
      register(){
        let userParams = {
          user:{
            email: this.email,
            admin: this.admin,
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation
          }
        }

        axios.post(`${API_URL}/users`, userParams)
          .then( res => {
            this.$router.push({ name: 'login'})
          })
          .catch( error => {
            console.error(error.response )
          })

        console.log(userParams);
      },
      clear(){

          this.email = ''
          this.admin = false
          this.username = ''
          this.password = ''
          this.password_confirmation = ''

      }
    }
  }

</script>
<style scoped>

</style>
