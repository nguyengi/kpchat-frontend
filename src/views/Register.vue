<template>
  <div class="row justify-content-sm-center">
    <div class="col-sm-4">
      <b-form @submit.prevent="onSubmit()">
        <b-form-group
          id="name-group"
          label="Name:"
          label-for="name-input"
          label-cols-sm="2"
        >
          <b-form-input
            class="pt-2"
            id="name-input"
            v-model="name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="2"
          id="password-group"
          label="Password:"
          label-for="password-input"
        >
          <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            required
            class="pt-2"
          ></b-form-input>
        </b-form-group>

        <button class="btn btn-primary">Register</button>
      </b-form>

      <router-link to="login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  components: {
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput
  },
  data() {
    return {
      name: null,
      password: null
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      register: 'user/register'
    }),
    onSubmit() {
      this.register({name: this.name, password: this.password})
    }
  },
  created: function() {
    if (this.user) {
      this.$router.push('/')
    }
  }
}
</script>
