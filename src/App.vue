<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useAuth } from "./hooks/useAuth";

const { hasLoggedIn, login, logout } = useAuth()

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
  <div id="app">
    <button v-if="hasLoggedIn" @click="logout">Logout</button>
    <form
      v-if="!hasLoggedIn"
      method="post"
      action="http://localhost:3333/login"
      @submit.prevent="login"
    >
      <input type="email" name="email" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button>Submit</button>
    </form>
    <div v-else>
      You are now logged in
      <li v-for="radio in radios" :key="radio.id">
        {{ radio.id }}
      </li>
    </div>
  </div>
</template>

<style>
input {
  padding: 0.6em;
  display: block;
  margin: 1em;
  width: 100%;
}
button {
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
