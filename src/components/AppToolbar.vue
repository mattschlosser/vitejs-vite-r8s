<script setup lang="ts">
import { useAuth } from '../hooks/useAuth';

const { hasLoggedIn, logout } = useAuth()
</script>
<template>
    <v-app-bar flat color="#ffeecc">
        <v-toolbar-title >
            Roomm8s
        </v-toolbar-title>
        <!-- <v-toolbar> -->
          <v-spacer></v-spacer>
          <v-btn v-if="hasLoggedIn" icon @click="logout">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        <!-- </v-toolbar> -->
    </v-app-bar>
</template>