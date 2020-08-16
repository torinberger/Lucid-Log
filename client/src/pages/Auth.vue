<template>
  <q-page class="auth">
    <q-card class="auth-container">
      <q-tabs
        v-model="mode"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="mode" animated>
        <q-tab-panel name="login">
          <auth-login />
        </q-tab-panel>

        <q-tab-panel name="register">
          <auth-register />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthLogin from '../components/auth/AuthLogin.vue';
import AuthRegister from '../components/auth/AuthRegister.vue';

export default Vue.extend({
  name: 'Auth',
  components: {
    AuthLogin,
    AuthRegister,
  },
  data() {
    return {
      mode: 'login',
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  height: auto;
  width: 400px;
  margin: 5vh;
}
</style>
