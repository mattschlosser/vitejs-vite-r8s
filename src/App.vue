<template>
  <div id="app">
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

<script>
export default {
  name: 'App',
  data() {
    return {
      hasLoggedIn: false,
      radios: [],
    };
  },
  created() {
    this.getRadios();
  },
  methods: {
    async getRadios() {
      this.radios = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/radios`, {
        credentials: 'include',
        method: 'GET',
      }).then((e) => e.json());
    },
    async login(event) {
      console.log(event);
      await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: event.target.elements.email.value,
          password: event.target.elements.password.value,
        }),
      });
      this.hasLoggedIn = true;
      this.getRadios();
    },
  },
};
</script>

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
