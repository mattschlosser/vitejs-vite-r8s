<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import Login from './pages/Login.vue';
import { useAuth } from "./hooks/useAuth";

const { hasLoggedIn, logout } = useAuth()

watch(hasLoggedIn, (val) => {
  val && getRadios()
});

const radios: Ref<{id: string}[]> = ref([]);

const getRadios = async () => {
  radios.value = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/radios`, {
    credentials: 'include',
    method: 'GET',
  }).then((e) => e.json());
};

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
        <Login v-if="!hasLoggedIn" />
        <div v-else>
          You are now logged in
          <li v-for="radio in radios" :key="radio.id">
            {{ radio.id }}
          </li>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>