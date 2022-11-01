<template>
  <q-page class="q-pb-sm">
    <div class="fixed top menu-bar">
      <MenuPage />
    </div>
    <div
      v-if="path!=='/sigarang/admin'"
      class="q-pt-lg"
    >
      <q-page class="q-pt-sm halaman">
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
<style lang="scss" scoped>
.menu-bar{
  width: calc(100%);
  z-index: 100;
  overflow: hidden;
  // background-color: $grey-1;
}
</style>
