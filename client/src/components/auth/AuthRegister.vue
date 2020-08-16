<template lang="html">
  <div class="auth-register">
    <q-form
      @submit="register"
    >
      <q-input
        type="text"
        v-model="username"
        label="Username"
      />
      <q-input
        type="password"
        v-model="password"
        label="Password"
      />
      <q-btn
        id="submit-btn"
        type="submit"
        label="Register"
        color="primary"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

interface postError {
  response: {
    status: number,
  }
}

interface postResponse {
  data: {
    token: string,
  },
}

export default Vue.extend({
  name: 'AuthRegister',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    register() {
      axios
        .post('http://localhost:3000/api/auth/register', {
          username: String(this.username),
          password: String(this.password),
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res: postResponse) => {
          const { data } = res;
          console.log(data);


          this.$store.commit('setToken', data.token);
          this.$store.commit('setUsername', this.username);
          this.$router.push({ path: 'profile' })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err: postError) => {
          const { response } = err;

          if (response) {
            if (response.status === 403) {
              this.$q.notify({
                color: 'red',
                icon: 'warning',
                message: 'Username taken!',
              });
            } else if (response.status === 500) {
              this.$q.notify({
                color: 'red',
                icon: 'warning',
                message: 'Server error!',
              });
            }
          } else {
            this.$q.notify({
              color: 'red',
              icon: 'warning',
              message: 'Cannot connect to server!',
            });
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
#submit-btn {
  width: 100%;
  margin-top: 2vh;
}
</style>
