<script setup lang="ts">
import { useAuth } from './hooks/useAuth';
import { ref, type Ref } from "vue"
import { useDisplay } from 'vuetify/lib/framework.mjs';
const drawer: Ref<boolean | null>  = ref(null)
const { hasLoggedIn, logout } = useAuth();
const { mobile } = useDisplay();
</script>
<template>
  <v-app>
    <v-app-bar
      flat
      color="#ffeecc"
    >
      <VAppBarNavIcon
        v-if="hasLoggedIn"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        Roomm8s
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="hasLoggedIn"
        icon
        @click="logout"
      >
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <VNavigationDrawer
      v-if="hasLoggedIn"
      v-model="drawer"
      expand-on-hover
      :rail="!mobile"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          to="/households"
        >
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