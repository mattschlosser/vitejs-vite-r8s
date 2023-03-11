<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouter } from "vue-router";
import { useAuth } from "../hooks/useAuth";

const { hasLoggedIn, error, loading, login } = useAuth()
const r = useRouter();

watch(hasLoggedIn, (val) => {
  val && r.push('/households')
})

const required = (value: string) => {
    return !!value || "Field is required"
}
const email = ref('');
const password = ref('');
const form = ref(null)
const onSubmit = () => {
    login(email.value, password.value)
}
</script>

<template>
    <v-card :loading="loading" class="cemtered mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-alert v-if="error" color="red">
          {{ error }}
        </v-alert>
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 mt-6"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          type="password"
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
        <div class="mt-3 t-center">
          Not signed up? <router-link to="/register">Register Now</router-link>
        </div>
      </v-form>
    </v-card>
</template>
<style scoped>
.centered {
  text-align: center;
}
</style>