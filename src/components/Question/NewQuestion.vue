<template>
  <v-container fluid>
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
  import axios from 'axios'
  import API_URL from '../../configs/api'

  export default {
    name: 'newquestion',
    data(){
      return{
        title: "",
        body:""
      }
    },
    computed:{
      isEmpty(){
        return ( this.title.length <= 0 && this.body.length <= 0 )
      }
    },updated(){
      console.log(this.isEmpty)
    },
    methods:{
      postQuestion(){
        let questionParams = {
          title: this.title,
          body: this.body
        }
        if( !this.isEmpty ){
          axios.post(`${API_URL}/questions`, questionParams )
            .then( res =>{
              this.$store.dispatch('addQuestion', res.data )
              this.$router.push({name:'showquestion', params:{id: res.data.id }})
              this.content = ''
              this.title = ''
            })
            .catch( error => {
              console.log(error)
            })
        }

      }
    }
  }

</script>
<style scoped>

</style>
