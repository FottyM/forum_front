<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-toolbar class="primary" dark>
            <!--<v-icon class="white&#45;&#45;text">arrow_back</v-icon>-->
            <v-toolbar-title>Edit Question</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--:disabled="isEmpty"-->
            <v-btn flat @click="updateQuestion" >
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
                  max="120"
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
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import API_URL from '../../configs/api'


  export default {
    name: 'EditQuestion',
    data(){
      return{
        title: '',
        body: ''
      }
    },
    created(){
      this.title = this.currentQuestion.question.title
      this.body = this.currentQuestion.question.body
    },
    computed:{
      ...mapGetters(['currentQuestion', 'authToken', 'currentUser'])
    },
    methods:{
      updateQuestion(){
        let qid = this.currentQuestion.question.id
        let body = this.body
        let title = this.title
        let userId = this.currentUser.id
        let questionParams = {
          question:{
            title,
            body
          }
        }
        let headers = {headers :{'Authorization': this.authToken } }

        axios.put(`${API_URL}/questions/${qid}`, questionParams, headers )
          .then( res => {
            this.$router.push({name: 'showquestion', params:{id: res.data.id}})
          })
          .catch( error => {
            console.log( error.response.data )
          })

      }
    }
  }

</script>
<style scoped>

</style>
