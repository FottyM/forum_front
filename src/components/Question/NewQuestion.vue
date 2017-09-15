<template>
  <v-container fluid>
    <div>
      <v-alert :success="success" :info="info" :error="error" dismissible v-model="alert">
        {{ message }}
      </v-alert>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-toolbar class="primary" dark>
            <!--<v-icon class="white&#45;&#45;text">arrow_back</v-icon>-->
            <v-toolbar-title>Compose Question</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="postQuestion" :disabled="isEmpty">
              <v-icon>send</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid class="pa-0 mt-2">
            <v-layout wrap>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-text-field
                  label="Subject"
                  v-model="title"
                  single-line
                  full-width
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-text-field
                  label="Message"
                  v-model="body"
                  counter
                  max="800"
                  full-width
                  multi-line
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import API_URL from '../../configs/api'

  export default {
    name: 'newquestion',
    data(){
      return{
        title: "",
        body:"",
        errors: [],
        dialog: false,
        alert: false,
        success: false,
        info: false,
        error: false,
        message: ''
      }
    },
    computed:{ ...mapGetters(['authToken', 'currentUser']),
      isEmpty(){
        return ( this.title.length <= 3 && this.body.length <= 0 )
      }
    },
    methods:{
      postQuestion(){
        let questionParams = {
          question:{
            title: this.title,
            body: this.body
          }
        }

        if( !this.isEmpty ){
          let id = this.currentUser.id

          let headers = {headers :{'Authorization': this.authToken } }
          axios.post(`${API_URL}/questions`, questionParams, headers )
            .then( res =>{
              this.$store.dispatch('addQuestion', res.data )
              this.$router.push({name:'showquestion', params:{id: res.data.id }})
              this.content = ''
              this.title = ''
              this.alert = true
              this.success =  true
              this.info = false
              this.error = false
              this.message = 'Question posted successfully'

            })
            .catch( error => {
              this.errors.push( error.response.data )
             console.error( error.response.data )
              this.content = ''
              this.title = ''
              this.alert = true
              this.success =  true
              this.info = false
              this.error = false
              this.message = error.response.data
            })
        }

      }
    }
  }

</script>
<style scoped>

</style>
