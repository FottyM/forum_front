<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-card flat>
          <v-card-title>
            <div>
              <h4 title class="primary--text"> {{ currentQuestion.title }} </h4>
              <p class="grey--text">Author Name</p>
            </div>
          </v-card-title>
          <v-card-text>
            <p> {{ currentQuestion.body }} </p>
          </v-card-text>
          <v-card-actions dark>
            <v-icon>access_time</v-icon>
            <span class="orange--text"> {{ currentQuestion.created_at | timeAgo }}</span>
            <!--<v-btn flat>-->
            <!--<v-icon left>comment</v-icon>-->
            <!--40-->
            <!--</v-btn>-->
            <v-btn flat>
              <v-icon left class="red--text">favorite</v-icon>
              30
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat>
              <v-icon left>edit</v-icon>
              Edit
            </v-btn>
            <v-btn flat>
              <v-icon left>delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <h2>{{ currentAnswers.length }} Answer(s)</h2>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-form v-model="valid">
          <v-text-field
            value="Input Text"
            class="input-group--focused"
            placeholder="comment goes here..."
            multi-line
            v-model.prenvet="comment"
            required></v-text-field>
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn flat error>Cancel</v-btn>
            <v-btn flat primary @click="postAnswer">Submit</v-btn>
          </v-flex>


        </v-form>
      </v-flex>

      <v-flex xs10 offset-xs1 v-for=" answer in currentAnswers" :key=" answer.id">
        <v-card flat>
          <v-card-title>
            <span class="orange--text">Author or the comment</span>
          </v-card-title>
          <v-card-text> {{ answer.content }}  </v-card-text>
          <v-card-actions>
            <v-icon>access_time</v-icon>
            <p flat class="orange--text">
              {{ answer.created_at | timeAgo }}
            </p>

            <v-btn icon>
              <v-icon class="red--text">favorite</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat>
              <v-icon left>edit</v-icon>
              Edit
            </v-btn>
            <v-btn flat>
              <v-icon left>delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    name: 'showquestion',
    data() {
      return {
        comment:''
      }
    },
    computed: {
      ...mapGetters(['questions', 'currentQuestion', 'currentAnswers'])
    },
    watch: {
      '$route'(to, from) {
        this.getAnswersForCurrentQuestion()
      }
    },
    mounted() {
      this.setCurrentQuestion()
      this.getAnswersForCurrentQuestion();
    },
    methods: {
      setCurrentQuestion() {
        let id = this.$route.params.id
        this.$store.dispatch('setCurrentQuestion', id)
      },
      async getAnswersForCurrentQuestion() {
        await axios.get(`http://localhost:3000/api/v1/questions/${this.currentQuestion.id}/answers/`)
          .then(answers => {
            this.$store.dispatch('setCurrentAnswers', answers.data)
          })
          .catch(error => {
            console.error(error)
          })
      },
       postAnswer(){
        let question_id = this.currentQuestion.id
        let params = {
          content: this.comment,
          question_id
        }

         axios.post(`http://localhost:3000/api/v1/questions/${this.currentQuestion.id}/answers/`, params )
          .then( comment => {
            this.$store.dispatch('addCommentToCurrentQuestion', comment.data )
            this.comment = ''
          })
          .catch( error =>{
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>

</style>
