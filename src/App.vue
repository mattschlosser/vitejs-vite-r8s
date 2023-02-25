<script setup lang="ts">
import { useAuth } from './hooks/useAuth';

const { hasLoggedIn, logout } = useAuth()
</script>
<template>
  <v-app>
    <v-toolbar>
      <v-spacer></v-spacer>

      <v-btn v-if="hasLoggedIn" icon @click="logout">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>