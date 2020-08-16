<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Setup Template
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      overlay
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/layout/EssentialLink.vue';

const linksData = [
  {
    title: 'Home',
    icon: 'home',
    link: '/#/',
  },
  {
    title: 'Login/Register',
    icon: 'lock',
    link: '/#/auth',
  },
  {
    title: 'Profile',
    icon: 'account_circle',
    link: '/#/profile',
    authNeeded: true,
  },
];

import Vue from 'vue';

export default Vue.extend({
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  methods: {
    checkUserHasAuthForPage():void {
      const currentRoute = `/#${this.$router.currentRoute.path}`;

      for (let i = 0; i < linksData.length; i += 1) {
        const route = linksData[i];

        // eslint-disable-next-line
        if (route.link === currentRoute && route.authNeeded && !this.$store.state.token) {
          this.$router.push({ path: 'auth' })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
  created() {
    this.checkUserHasAuthForPage();
  },
  watch: {
    $route() {
      this.checkUserHasAuthForPage();
    },
  },
});
</script>
