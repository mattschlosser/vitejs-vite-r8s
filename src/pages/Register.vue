<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouter } from "vue-router";
import { useAuth } from "../hooks/useAuth";

const { hasLoggedIn, register } = useAuth()
const router = useRouter();

watch(hasLoggedIn, val => val && router.push("/"))

const required = (value: string) => {
    return !!value || "Field is required"
}
const loading = ref(false)
const email = ref('');
const password = ref('');
const password2 = ref('');
const form = ref(null)
const onSubmit = () => {
    register(email.value, password.value)
}
</script>

<template>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          class="mb-2"
          type="password"
          autocomplete="new-password"
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <v-text-field
          v-model="password2"
          :readonly="loading"
          :rules="[required]"
          clearable
          type="password"
          autocomplete="new-password"
          label="Renter your Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form || password !== password2"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Register
        </v-btn>
        <div class="mt-3 t-center">
          Already registered? <router-link to="/login">Log In</router-link>
        </div>
      </v-form>
    </v-card>
</template>