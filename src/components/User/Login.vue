<template>
  <v-container fluid>
    <div>
      <v-alert error dismissible v-model="alert">
        {{ errorMessage }}!
        <p>Please check again your email and password</p>
      </v-alert>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-title dark class="primary">
            <h5 class="white--text">Login</h5>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="userParams">
              <v-text-field
                label="E-mail"
                v-model="userParams.email"
                v-validate="'required|email'"
                :error="{'error': errors.has('email') }"
                 required>
                <span v-show="errors.has('email')" error>{{ errors.first('email') }}</span>
              </v-text-field>
              <v-text-field
                name="password"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="userParams.password"
                min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'" counter required>
              </v-text-field>
              <v-btn @click="clear" :disabled="disabled">Clear</v-btn>
              <v-btn @click="login" class="primary" :disabled="disabled">Login</v-btn>
              <v-progress-circular indeterminate class="primary--text" v-show="loading"></v-progress-circular>
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
    $validates: true,
    name: 'login',
    data(){
      return{
        e1: true,
        userParams:{
          email: '',
          password: '',
        },
        alert: false,
        errorMessage: '',
        loading: false,
        disabled:false
      }
    },
    methods:{
      login(){
        this.errorMessage = ''
        this.alert = false
        this.loading = true
        this.disabled = true

        let userParams = {...this.userParams}

        axios.post(`${API_URL}/authenticate`, userParams)
          .then( res => {
            let authToken = res.data
            this.$store.dispatch('setAuthToken', authToken )
            this.$store.dispatch('setCurrentUser', authToken)
            this.$store.commit('LOG_IN', true )

            setTimeout(()=>{
              this.loading = false
              this.disabled = false
              this.$router.push({name: 'questions'})
            }, 500)

          })
          .catch( error => {
            this.errorMessage = error.response.data.error.user_authentication[0]
            this.alert = true
            this.loading = false
            this.disabled = false
            console.log(this.$validator)
//            console.log( error.response.data )
          })

      },
      clear(){
        this.email = ''
        this.password = ''
        this.errorMessage = ''
        this.alert = false

      }
    }


  }

</script>
<style scoped>

</style>
