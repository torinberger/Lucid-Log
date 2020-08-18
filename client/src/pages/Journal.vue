<template>
  <q-page class="profile">
    <q-date
      v-model="date"
      :events="events"
      :options="datePickerLimits"
      event-color="primary"
    />

    <q-tab-panels
      v-model="date"
    >
      <q-tab-panel :name="date">
        <div class="text-h4 q-mb-md">{{ date }}</div>
        <q-select
          filled
          v-model="dateModel.techniques"
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

interface getsignupResponse {
  data: {
    signup: Date,
  },
}

interface gettechniquespResponse {
  data: {
    techniques: string[],
  },
}

interface dataInterface {
  startDate: string,
  endDate: string,
  techniques: string[],
  dateModel: {
    techniques: string[],
  },
  date: string,
  events: string[],
}

export default Vue.extend({
  name: 'Profile',
  data() {
    return <dataInterface>{
      startDate: '',
      endDate: '',
      techniques: [],
      dateModel: {
        techniques: [],
      },
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
      .then((res: getsignupResponse) => {
        const { data } = res;

        this.startDate = this.formatDate(new Date(data.signup));
        this.date = this.formatDate(new Date());
        this.endDate = this.formatDate(new Date());
        console.log(this.startDate, this.date, this.endDate);
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

    axios
      .post('http://localhost:3000/api/users/gettechniques', {
        token: String(this.token),
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: gettechniquespResponse) => {
        const { data } = res;
        console.log(data);

        this.techniques = data.techniques; // eslint-disable-line
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
    formatDate(date:Date) {
      const d = new Date(date);
      let month = String(d.getMonth() + 1);
      let day = String(d.getDate());
      const year = d.getFullYear();

      if (month.length < 2) {
        month = `0${month}`;
      } if (day.length < 2) {
        day = `0${day}`;
      }

      return [year, month, day].join('/');
    },
    datePickerLimits(date:string) {
      return date >= this.startDate && date <= this.endDate;
    },
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
      });
    },
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
