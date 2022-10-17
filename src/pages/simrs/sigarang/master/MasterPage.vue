<template>
  <q-page class="q-pa-sm">
    <MenuPage />
    <div v-if="path!=='/master'">
      <q-page>
        <router-view></router-view>
      </q-page>
    </div>
    <div v-else>
      <q-card>
        <app-no-selected-page />
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuPage from './MenuPage.vue'
const route = useRoute()
const path = computed(() => route.path)
let name = routerInstance.currentRoute.value.name
if (name === 'master') {
  name = 'master.gedung'
}
routerInstance.replace({ name })
</script>
