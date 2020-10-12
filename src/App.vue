<template>
  <div id="app">
    <div id="nav">
      <div>
        {{user ? "Welcome " + user.name : "You are not logged in"}}
      </div>
      <div v-if="user">
        <button class="btn btn-primary" @click.prevent="logout">Logout</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      loadUser: 'user/loadUser',
      logout: 'user/logout'
    })
  },
  created: function() {
    this.loadUser()
    if (!this.user) {
        this.$router.push('login')
    }
  },
  watch: {
    user: function(newUser) {
      if (!newUser) {
        this.$router.push('login')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
