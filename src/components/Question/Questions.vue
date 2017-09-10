<template>
  <v-layout row  wrap>
    <v-flex xs10 offset-xs1 v-for="question in questions" :key="question.id">
      <v-card title>
        <v-card-title primary-title>
          <div v-if=" questions === null ">
            Kept you waiting huh!
          </div>
          <div v-else>
            <span class="grey--text">Author Name</span><br>
            <router-link class="question-title" :to="{ name: 'showquestion', params: { id: question.id }}">
              <h2 class="headline primary--text"> {{ question.title }} </h2>

            <p class="secondary--text"> {{question.body | sliceAndDice }}</p>
            </router-link>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-icon>access_time</v-icon>
          <p flat class="primary--text">
            {{ question.create_at | timeAgo }}
          </p>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mode_comment</v-icon>
          </v-btn>
          <!--<v-btn icon>-->
            <!--<v-icon>share</v-icon>-->
          <!--</v-btn>-->
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app-questions',
    computed: {
      ...mapGetters(['questions'])
    },
    data() {
      return {
        errors: [],
        show: false
      }
    },
    async mounted() {
      await axios.get('http://localhost:3000/api/v1/questions')
        .then(questions => {
          this.$store.dispatch('setQuestions', questions.data)
        })
        .catch(error => {
          this.errors.push(error)
        })

    },
    methods: {},
//    filters:{
//      timeAgo(date){
//        return moment(date).fromNow()
//      },
//      sliceAndDice(string){
//        return string.slice(0, 100) + "..."
//      }
//    }
  }

</script>
<style scoped>

  .question-title{
    text-decoration: none;
  }

</style>
