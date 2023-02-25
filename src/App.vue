<script setup lang="ts">
import { useAuth } from './hooks/useAuth';
import { ref, type Ref } from "vue"
const drawer: Ref<boolean | null>  = ref(null)
const { hasLoggedIn, logout } = useAuth()
</script>
<template>
  <v-app>
    <v-app-bar flat color="#ffeecc">
        <VAppBarNavIcon @click.stop="drawer = !drawer" />
        <v-toolbar-title >
            Roomm8s
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="hasLoggedIn" icon @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
    </v-app-bar>
    <VNavigationDrawer v-model="drawer" expand-on-hover rail>
      <v-list>
        <v-list-item prepend-icon="mdi-home" to="/households">
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