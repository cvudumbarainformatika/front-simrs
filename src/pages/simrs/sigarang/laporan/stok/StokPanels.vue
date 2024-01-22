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
          v-if="role?(role==='root' || role==='depo' || role==='gudang' || role==='gizi'|| role==='PTK') : role"
          name="kartu"
          no-caps
          label="Kartu Stok"
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

        <q-tab-panel name="kartu">
          <KartuStok
            :role="role"
            :pegawai="pegawai"
          />
        </q-tab-panel>

        <q-tab-panel name="opname">
          <StokOpnamePage />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import StokOpnamePage from './StockOpnamePage.vue'
// import StokOpnamePage from './StockOpnamePageOld.vue'
import StokPage from './StokPage.vue'
import KartuStok from './KartuStok.vue'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
const tab = ref('stok')
const apps = useAplikasiStore()
const role = computed(() => {
  console.log('apps ', apps.user)
  return apps.user.pegawai ? apps.user.pegawai.role.nama : ''
})

const pegawai = computed(() => {
  return apps.user.pegawai ? apps.user.pegawai : {}
})
</script>
