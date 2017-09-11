<template>
  <!--<v-container grid-list-md>-->
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-card flat>
          <v-card-title>
            <div>
              <h4 title class="primary--text"> {{ currentQuestion.title  }} </h4>
                <v-icon>access_time</v-icon>
                <span class="grey--text"> {{currentQuestion.create_at | timeAgo }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            <p> {{ currentQuestion.body  }} </p>
          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs10 0ffset-xs1>

      </v-flex>

      <v-flex xs10 offset-xs1 v-for=" answer in currentAnswers" :key=" answer.id" >
        <v-card flat>
          <v-card-text> {{ answer.content }}  </v-card-text>
          <v-card-actions>
            <v-icon>access_time</v-icon>
            <p flat class="orange--text">
              {{ answer.create_at | timeAgo }}
            </p>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mode_comment</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  <!--</v-container>-->
</template>
<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'showquestion',
    data(){
      return{

      }
    },
    computed: {
      ...mapGetters(['questions', 'currentQuestion', 'currentAnswers'])
    },
    watch:{
      '$route' (to, from){
      }
    },
    mounted(){
      this.setCurrentQuestion()
      this.getAnswersForCurrentQuestion();
    },
    methods:{
      setCurrentQuestion(){
        let id = this.$route.params.id
        this.$store.dispatch('setCurrentQuestion', id)
      },
      async getAnswersForCurrentQuestion(){
        await axios.get(`http://localhost:3000/api/v1/questions/${this.currentQuestion.id}/answers/`)
          .then( answers => {
            this.$store.dispatch('setCurrentAnswers', answers.data )
          })
          .catch( error => {
            console.error(error)
          })

      }
    }
  }
</script>
<style scoped>

</style>
