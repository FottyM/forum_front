<template>
<v-layout row wrap>
  <v-flex xs10 offset-xs1 v-for="question in questions" :key="question.id">
    <v-card title flat>
      <v-card-title primary-title>
        <div v-if=" questions === null ">
          Kept you waiting huh!
        </div>
        <div v-else>
          <span class="grey--text">Author Name</span><br>
          <router-link class="question-title" :to="{ name: 'showquestion', params: { id: question.id }}">
            <h2 class="headline primary--text"> {{ question.title }} </h2>
          </router-link>
          <p> {{ question.body | sliceAndDice }}</p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-icon>access_time</v-icon>
        <p flat class="grey--text">
          {{ question.created_at | timeAgo }}
        </p>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>comment</v-icon>
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
import {
  mapGetters
} from 'vuex'

import API_URL from '../../configs/api'

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
  created() {
    this.getQuestions();
  },
  methods: {
     getQuestions() {
       axios.get(`${API_URL}/questions`)
        .then( res => {
          this.$store.dispatch('setQuestions', res.data)
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
  },
}
</script>
<style scoped>
.question-title {
  text-decoration: none;
}
</style>
