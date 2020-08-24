<template lang="html">
  <div class="date-form">
    <div class="text-h4 q-mb-md">{{ date }}</div>
    {{ techniques }}
    {{ dayModel.techniques }}
    <q-select
      filled
      v-model="dayModel.techniques"
      multiple
      :options="techniques"
      label="Techniques"
    />
    <q-btn
      color="primary"
      icon="plus"
      @click="addTechnique"
      label="Add technique"
    />

    <q-time
      v-model="dayModel.sleepLength"
      format24h
    />

    <q-btn
      label="Save"
      color="primary"
      @click="saveDay"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

interface dataInterface {
  dayModel: {
    techniques: string[],
    sleepLength: number,
  },
}

interface saveDayResponse {
  data: {
    day: Record<string, unknown>,
  },
}

interface getDayResponse {
  data: {
    day: Record<string, unknown>,
  },
}

interface postError {
  response: {
    status: number,
  }
}

export default Vue.extend({
  name: 'DayForm',
  data() {
    return <dataInterface>{
      dayModel: {
        techniques: [],
        sleepLength: 0,
      },
    };
  },
  props: {
    techniques: Array,
    date: String,
  },
  computed: {
    token(): string {
      return this.$store.state.token; // eslint-disable-line
    },
  },
  created() {
    axios
      .post('http://localhost:3000/api/users/getday', {
        token: String(this.token),
        date: this.date,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: getDayResponse) => {
        const { data } = res;

        console.log('hhh');

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
            this.$router.push({ path: 'auth' })
              .catch((e) => {
                console.log(e);
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
  methods: {
    addTechnique() {
      this.$q.dialog({
        title: 'Add Technique',
        prompt: {
          model: '',
          label: 'Technique',
          type: 'text', // optional
        },
        cancel: true,
        persistent: true,
      }).onOk((data:string) => {
        console.log('>>>> OK, received', data);
        this.techniques.push(data);
      });
    },
    saveDay() {
      console.log(this.token);
      axios
        .post('http://localhost:3000/api/users/saveday', {
          token: String(this.token),
          techniques: this.dayModel.techniques,
          sleepLength: this.dayModel.sleepLength,
          date: this.date,
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res: saveDayResponse) => {
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
              this.$router.push({ path: 'auth' })
                .catch((e) => {
                  console.log(e);
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
  },
});
</script>

<style lang="css" scoped>
</style>
