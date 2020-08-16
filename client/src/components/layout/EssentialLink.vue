<template>
  <q-item
    clickable
    tag="a"
    :disabled="authNeeded && !$store.state.token"
    :href="authNeeded && !$store.state.token ? false : link"
    :active="link == currentRoute"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EssentialLink',
  props: {
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    link: { type: String, default: '#' },
    icon: { type: String, default: '' },
    authNeeded: { type: Boolean, default: false },
  },
  data() {
    return {
      currentRoute: `/#${this.$router.currentRoute.path}`,
    };
  },
  watch: {
    $route() {
      this.currentRoute = `/#${this.$router.currentRoute.path}`;
    },
  },
});
</script>
