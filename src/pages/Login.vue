<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "../hooks/useAuth";

const { hasLoggedIn, login } = useAuth()

const required = (value: string) => {
    return !!value || "Field is required"
}
const loading = ref(false)
const email = ref('');
const password = ref('');
const form = ref(null)
const onSubmit = () => {
    login(email.value, password.value)
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
      </v-form>
    </v-card>
</template>