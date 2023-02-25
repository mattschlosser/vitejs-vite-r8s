<script setup lang="ts">
import AppToolbar from './components/AppToolbar.vue';
</script>
<template>
  <v-app>
    <AppToolbar />
    <VNavigationDrawer expand-on-hover rail>
      <v-list>
        <v-list-item prepend-icon="mdi-home" to="/households">
          Households
        </v-list-item>
      </v-list>
    </VNavigationDrawer>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>