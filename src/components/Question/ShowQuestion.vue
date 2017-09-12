<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <!--Question is here-->
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
          <span class="grey--text"> {{ currentQuestion.created_at | timeAgo }}</span>
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
    <!--End of question-->

    <!--Divider is here -->
    <v-flex xs10 offset-xs1>
      <v-card title class="cyan darken-4 white--text">
        <v-card-title>
          <h5 class="body-3">{{ currentAnswers.length }} comments </h5>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
                          class="input-group--focused"
                          placeholder="comment goes here..."
                          multi-line
                          v-model.prenvet="comment"
                          dark required>

            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions disabled>
          <v-spacer></v-spacer>
          <v-btn   error @click="clearField" :disabled="isEmpty">Cancel</v-btn>
          <v-btn  primary :disabled="isEmpty" @click="postAnswer">Comment</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!--Divider ends here-->


    <!--Answers are here-->
    <v-flex xs10 offset-xs1 v-for=" answer in currentAnswers" :key=" answer.id">
      <v-card flat>
        <v-card-title>
          <span class="grey--text">Author or the comment</span>
        </v-card-title>
        <v-card-text> {{ answer.content }} </v-card-text>
        <v-card-actions>
          <v-icon>access_time</v-icon>
          <p flat class="grey--text">
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
          <v-btn flat @click="deleteAnswer(answer)">
            <v-icon left>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
    </v-flex>
    <!--Ends here-->


  </v-layout>
</v-container>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import axios from 'axios'

export default {
  name: 'showquestion',
  data() {
    return {
      comment: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters(['questions', 'currentQuestion', 'currentAnswers']),
    isEmpty(){
      return this.comment === ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.setCurrentQuestion()
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
     getAnswersForCurrentQuestion() {
       axios.get(`http://localhost:3000/api/v1/questions/${this.currentQuestion.id}/answers/`)
        .then(answers => {
          this.$store.dispatch('setCurrentAnswers', answers.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    postAnswer(){
      let question_id = this.currentQuestion.id
      let answer_params = {
        content: this.comment,
        question_id
      }

      if(!this.isEmpty){
        axios.post(`http://localhost:3000/api/v1/questions/${question_id}/answers/`, answer_params)
          .then(comment => {
            this.$store.dispatch('addCommentToCurrentQuestion', comment.data)
            this.comment = ''
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }else {
        this.errors.push("Can't do that")
      }

    },
    deleteAnswer(answer){
      let question_id = this.currentQuestion.id
      let answer_id = answer.id
      axios.delete(`http://localhost:3000/api/v1/questions/${question_id}/answers/${answer_id}`).then(
        answer =>{
          this.$store.dispatch('removeCommentFromCurrentQuestion', answer.data.id)
        }
      ).catch( error => {
        console.log(error)
      })

  },
    clearField(){
      this.comment = ''
    }
  }
}
</script>
<style scoped>

</style>
