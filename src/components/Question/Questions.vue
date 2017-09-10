<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1 v-for="question in questions" :key="question.id">
      <v-card>
        <v-card-title primary-title>
          <div v-if=" questions === null ">
            Kept you waiting huh!
          </div>
          <div v-else>
            <h2 class="headline"> {{question.title}} </h2>
            <p> {{question.body | sliceAndDice }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="primary--text">
            Push It
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import {mapGetters} from 'vuex'

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
      console.log(this.questions);
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

</style>
