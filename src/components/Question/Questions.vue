<template>
<v-layout row wrap>
  <v-flex xs12 md10 offset-md1 v-for="question in questions" :key="question.id">
    <v-card title flat>
      <v-card-title primary-title>
        <div v-if=" questions === [] ">
          Kept you waiting huh!
        </div>
        <div v-else>
          <router-link class="question-title" :to="{ name: 'showquestion', params: { id: question.id }}">
            <h2 class="headline primary--text"> {{ question.title }} </h2>
          </router-link>
          <span class="orange--text"><strong>By: </strong>{{question.author}}</span>
          <p> {{ question.body | sliceAndDice }}</p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-icon>access_time</v-icon>
        <p flat class="grey--text">
          {{ question.created_at | timeAgo }}
        </p>
        <v-spacer></v-spacer>
        <!-- <v-btn icon> -->
          <v-icon left class="red--text">favorite</v-icon>
          {{ 1500 | friendlyNumber}}
        <!-- </v-btn> -->
        <!-- <v-btn icon> -->
          <v-icon left>comment</v-icon>
          {{ question.answers_count | friendlyNumber }}
        <!-- </v-btn> -->
        <!--<v-btn icon>-->
        <!--<v-icon>share</v-icon>-->
        <!--</v-btn>-->
      </v-card-actions>
    </v-card>
    <v-divider></v-divider>
  </v-flex>
  <!--<div class="text-xs-center">-->
    <!--<v-pagination :length="4" v-model="page" circle></v-pagination>-->
  <!--</div>-->
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
      show: false,
      page: 1
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
          this.errors.push(error.responses.data)
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
