<template>
  <q-page class="q-pa-sm">
    <MenuTransaksi />
    <div v-if="path!=='/transaksi'">
      <q-page>
        <router-view />
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
import MenuTransaksi from './MenuTransaksi.vue'
const route = useRoute()
const path = computed(() => route.path)
let slug = routerInstance.currentRoute.value.params.slug
let name = routerInstance.currentRoute.value.name
if (name === 'transaksi') {
  name = 'transaksi.pemesanan'
  slug = 'apem'
}
routerInstance.replace({ name, params: { slug } })

</script>
