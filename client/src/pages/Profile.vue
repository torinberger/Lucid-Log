<template>
  <q-page class="profile">
    <q-card class="profile-container">
      <h4 class="text-center">Profile</h4>
      <q-item>
        <q-item-section
          avatar
        >
          <q-icon name="account_circle" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ username }}</q-item-label>
          <q-item-label caption>
            <q-icon name="lock" /> {{ password }}
          </q-item-label>
          <q-item-label caption>
            {{ token }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
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
    username: string,
    password: string,
  },
}

export default Vue.extend({
  name: 'Profile',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    token(): string {
      return this.$store.state.token; // eslint-disable-line
    },
  },
  created() {
    axios
      .post('http://localhost:3000/api/example/get', {
        token: String(this.token),
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: postResponse) => {
        const { data } = res;

        this.username = data.username;
        this.password = data.password;
      })
      .catch((err: postError) => {
        const { response } = err;

        if (response) {
          console.log(response.status);

          if (response.status === 403) {
            this.$q.notify({
              color: 'red',
              icon: 'warning',
              message: 'Authentication Invalid!',
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
});
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-container {
  height: auto;
  width: 600px;
  padding: 5vh;
}
</style>
