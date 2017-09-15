<template>
<v-container grid-list-md>
  <div>
    <v-alert :success="success" :info="info" :error="error" dismissible v-model="alert">
      {{ message }}
    </v-alert>
  </div>

  <v-layout row wrap>
    <!--Question is here-->
    <v-flex xs10 offset-xs1>
      <v-card flat>
        <v-card-title>
          <div>
            <h4 title class="primary--text"> {{ currentQuestion.question.title }} </h4>
            <h6 class="grey--text">By: {{ currentQuestion.author }}</h6>
          </div>
        </v-card-title>
        <v-card-text>
          <p> {{ currentQuestion.question.body }} </p>
        </v-card-text>
        <v-card-actions dark>
          <v-icon>access_time</v-icon>
          <span class="grey--text"> {{ currentQuestion.question.created_at | timeAgo }}</span>
          <!--<v-btn flat>-->
          <!--<v-icon left>comment</v-icon>-->
          <!--40-->
          <!--</v-btn>-->
          <v-btn flat>
            <v-icon left class="red--text">favorite</v-icon>
            30
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat :to="{name: 'editquestion', parmas:{id: currentQuestion.question.id }}">
            <v-icon left>edit</v-icon>
            Edit
          </v-btn>
          <v-btn flat @click="deleteCurrentQuestion(currentQuestion.question)">
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
          <h5 class="body-3">{{ currentAnswers.answers.length }} comments </h5>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Please write the comments" class="input-group--focused" autofocus multi-line v-model.prenvet="comment" dark required>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions disabled>
          <v-spacer></v-spacer>
          <v-btn error @click="clearField" :disabled="isEmpty">Cancel</v-btn>
          <v-btn primary :disabled="isEmpty" @click="postAnswer">Comment</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!--Divider ends here-->

    <!--Answers are here-->
    <v-flex xs10 offset-xs1 v-for=" answer in currentAnswers.answers" :key=" answer.id">
      <v-card flat>
        <v-card-title>
          <span class="grey--text">Author or the comment</span>
        </v-card-title>
        <v-card-text> {{ answer.content }} </v-card-text>

        <!--Modal-->
        <v-card-text>
          <v-dialog v-model="dialog" persistent width="50%">
            <v-card>
              <v-card-title>
                <span class="headline"> Edit comment </span>
              </v-card-title>
              <v-card-text>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="commentToEdit" multi-line required> This is batman </v-text-field>
                  </v-flex>
                </v-layout>
                <!--<small>*indicates required field</small>-->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat error @click.native="dialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat primary @click.native="updateAnswer()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-text>
        <!--End Modal-->

        <!-- Buttons -->
        <v-card-actions>
          <v-icon>access_time</v-icon>
          <p flat class="grey--text">
            {{ answer.updated_at | timeAgo }}
          </p>
          <v-btn icon>
            <v-icon class="red--text">favorite</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="captureAnswerContent(answer)">
            <v-icon left>edit</v-icon>
            Edit
          </v-btn>
          <v-btn flat @click="deleteAnswer(answer)" data-confirm="Sure want to do this?">
            <v-icon left>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
        <!-- End Buttons -->
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
import API_URL from '../../configs/api'

export default {
  name: 'showquestion',
  data() {
    return {
      comment: '',
      commentToEdit: '',
      errors: [],
      tempAnswerId: null,
      dialog: false,
      alert: false,
      success: false,
      info: false,
      error: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters(['questions', 'currentQuestion', 'currentAnswers', 'currentUser', 'authToken']),
    isEmpty() {
      return this.comment === ''
    }
  },
  watch: {
    '$route.params.id' (to, from) {
      let qid = to
      this.setCurrentQuestion(qid)
      this.getAnswersForCurrentQuestion(qid)
    }
  },
  created() {
    let qid = this.$route.params.id
    this.setCurrentQuestion(qid)
    this.getAnswersForCurrentQuestion(qid);

  },
  methods: {
    setCurrentQuestion(qid) {
      axios.get(`${API_URL}/questions/${qid}`).then(res => {
        this.$store.dispatch('setCurrentQuestion', res.data)
      }).catch(errer => {
        console.log(errer)
      })

    },
    getAnswersForCurrentQuestion(qid) {
      axios.get(`${API_URL}/questions/${qid}/answers/`)
        .then(res => {
          this.$store.dispatch('setCurrentAnswers', res.data)
        })
        .catch(error => {
          console.error(error.response.data)
        })
    },
     postAnswer(){

      let questionId = this.currentQuestion.question.id
      let userId = this.currentUser.user_id
      let headers  = { headers : { 'Authorization' : this.authToken } }

      let answerParams = {
        content: this.comment,
        question_id: questionId,
        user_id: userId
      }

      if (!this.isEmpty) {
      axios.post(`${API_URL}/questions/${questionId}/answers/`, answerParams, headers )
          .then(res => {
            let data = res.data
            if (typeof data !== 'undefined' ){
              this.$store.dispatch('addCommentToCurrentQuestion', data )
              this.comment = ''
              this.alert = true
              this.success = true
              this.message = 'Comment: ' + answerParams.content + ', added successfully'
            }
          })
          .catch(error => {
            this.errors.push(error.response.data )
            console.log(error.response.data )
          })
      } else {
        this.errors.push("Can't do that")
      }

    },
    captureAnswerContent(answer) {
      this.dialog = true
      this.commentToEdit = answer.content
      this.tempAnswerId = answer.id
    },

    updateAnswer() {
      let questionId = this.currentQuestion.question.id
      let updateContent = this.commentToEdit
      let answerId = this.tempAnswerId
      let userID = this.currentUser.user_id
      let headers  = { headers : { 'Authorization' : this.authToken } }
      this.dialog = false

      axios.put(`${API_URL}/questions/${questionId}/answers/${answerId}`, {content: updateContent, user_id: userID}, headers )
        .then(res => {
          this.$store.dispatch('updateCurrentComment', res.data ) })
          this.alert = true
          this.success = true
          this.info = false
          this.error = false
          this.message = 'Comment updated successfully'
        .catch(error => {
          this.alert = true
          this.error = true
          this.success = false
          this.info = false
          this.message = 'Comment: ' + error.response.data  + ', updated successfully'
          console.log(error.response.data)
        })
    },

    deleteCurrentQuestion(currentQuestion){
      let id = currentQuestion.id
      let headers  = { headers : { 'Authorization' : this.authToken } }

      axios.delete(`${API_URL}/questions/${id}`, headers )
        .then( res =>{
          this.$router.push({ name: 'home'})
        })
        .catch( error => {
          console.log(error.response.data )
        })
    },
    deleteAnswer(answer) {
      let headers  = { headers : { 'Authorization' : this.authToken } }
      let questionId = this.currentQuestion.question.id
      let answerId = answer.id

      axios.delete(`${API_URL}/questions/${questionId}/answers/${answerId}`, headers ).then(
        res => {
          this.$store.dispatch('removeCommentFromCurrentQuestion', res.data.id)
          confirm('Want to delete')
          this.alert = true
          this.error = true
          this.success = false
          this.info = false
          this.message = 'Comment deleted'
        }
      ).catch(error => {
        this.alert = true
        this.error = false
        this.success = false
        this.info = true
        this.message = "couldn't delete, please check if you are loged in or if you're an admin"
        console.log(error.response.data)
      })
    },
    clearField() {
      this.comment = ''
    }
  }
}
</script>
<style scoped>

</style>
