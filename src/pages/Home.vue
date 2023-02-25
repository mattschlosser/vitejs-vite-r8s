<script setup lang="ts">

import { ref, watch, type Ref } from 'vue';
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'vue-router';

const { hasLoggedIn } = useAuth()

const r = useRouter()

const radios: Ref<{id: string}[]> = ref([]);

const getRadios = async () => {
  radios.value = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/radios`, {
    credentials: 'include',
    method: 'GET',
  }).then((e) => e.json());
};

watch(hasLoggedIn, (val) => {
    console.log("val is", val);
  if (val === null) return;
  val  && getRadios() || r.push("/login")
}, { immediate: true });


</script>
<template>
    <div>
        <li v-for="radio in radios" :key="radio.id">
        {{ radio.id }}
        </li>
    </div>
</template>