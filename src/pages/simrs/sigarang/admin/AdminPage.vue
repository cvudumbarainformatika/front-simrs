<template>
  <q-page class="q-pa-sm">
    <MenuPage />
    <div v-if="path!=='/sigarang/admin'">
      <q-page>
        <router-view />
      </q-page>
    </div>
    <!-- <div v-else>
      <q-card>
        <app-no-selected-page />
      </q-card>
    </div> -->
  </q-page>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuPage from './MenuPage.vue'
import { routerInstance } from 'src/boot/router'
const route = useRoute()
const path = computed(() => route.path)
let name = routerInstance.currentRoute.value.name
if (name === 'sigarang.admin') {
  name = 'sigarang.admin.user'
}
routerInstance.replace({ name })
</script>
