<template>
  <q-page class="profile">
    <div class="q-pa-md">
      <q-date
        v-model="date"
        :events="events"
        event-color="primary"
      />
    </div>

    <q-tab-panels
      v-model="date"
      animated
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="2019/02/01">
        <div class="text-h4 q-mb-md">2019/02/01</div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </q-tab-panel>

      <q-tab-panel name="2019/02/05">
        <div class="text-h4 q-mb-md">2019/02/05</div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </q-tab-panel>

      <q-tab-panel name="2019/02/06">
        <div class="text-h4 q-mb-md">2019/02/06</div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </q-tab-panel>
    </q-tab-panels>
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
    signup: Date,
  },
}

export default Vue.extend({
  name: 'Profile',
  data() {
    return {
      splitterModel: 50,
      date: '2019/02/01',
      events: ['2019/02/01', '2019/02/05', '2019/02/06'],
    };
  },
  computed: {
    token(): string {
      return this.$store.state.token; // eslint-disable-line
    },
  },
  created() {
    axios
      .post('http://localhost:3000/api/users/getsignup', {
        token: String(this.token),
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: postResponse) => {
        const { data } = res;

        console.log(data);
      })
      .catch((err: postError) => {
        const { response } = err;

        if (response) {
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
          } else {
            this.$q.notify({
              color: 'red',
              icon: 'warning',
              message: 'Unknown error!',
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
