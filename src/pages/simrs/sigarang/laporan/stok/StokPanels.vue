<template>
  <div class="q-pa-sm">
    <q-card>
      <!-- {{ role }} -->
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="stok"
          no-caps
          label="Stoks Sekarang"
        />
        <q-tab
          v-if="role?(role==='root' || role==='depo' || role==='gudang' || role==='gizi'):role"
          name="opname"
          no-caps
          label="Stok Opname"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="stok">
          <StokPage />
        </q-tab-panel>

        <q-tab-panel name="opname">
          <StokOpnamePage />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { computed, ref } from 'vue'
// import StokOpnamePage from './StockOpnamePage.vue'
import StokOpnamePage from './StockOpnamePageOld.vue'
import StokPage from './StokPage.vue'
const tab = ref('stok')
const auth = useAuthStore()
const role = computed(() => {
  return auth.role ? auth.role : false
})
</script>
