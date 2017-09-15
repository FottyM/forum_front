<template>
  <div>
    {{currentUser.user }}
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import API_URL from '../../configs/api'
  export default {
    name: 'Profile',
    computed:{
      ...mapGetters(['currentUser'])
    }
  }

</script>
<style scoped>


</style>
