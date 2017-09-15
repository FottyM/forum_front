<template>
  <div>
    User profile
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import API_URL from '../../configs/api'
  export default {
    name: 'Profile',
    computed:{
      ...mapGetters(['authToken'])
    },
    create(){
      axios.get(`${API_URL}/users`)
    }
  }

</script>
<style scoped>


</style>
