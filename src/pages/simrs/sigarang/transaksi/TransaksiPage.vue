<template>
  <q-page class="q-pb-sm">
    <div class="fixed top menu-bar">
      <MenuTransaksi />
    </div>
    <div
      v-if="path!=='/transaksi'"
      class="q-pt-lg"
    >
      <q-page class="q-pt-sm q-px-sm halaman">
        <router-view />
      </q-page>
    </div>
    <div v-else>
      <!-- <q-card>
        <app-no-selected-page />
      </q-card> -->
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
console.log('slug', slug)
// if(slug)
let name = routerInstance.currentRoute.value.name
if (name === 'sigarang.transaksi') {
  name = 'sigarang.transaksi.pemesanan'
  slug = 'apem'
}
routerInstance.replace({ name, params: { slug } })

</script>
<style lang="scss" scoped>
.halaman{
  margin-left: 25px;
}
.menu-bar{
  width: calc(100%);
  z-index: 100;
  overflow: hidden;
  // background-color: $grey-1;
}
</style>
