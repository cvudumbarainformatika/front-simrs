<template>
  <div
    style="z-index: 10;"
  >
    <HeaderComp
      :search="store.params.q"
      :per-page="store.params.per_page"
      @fullscreen="style.setComponentFull"
      @set-search="store.setQ"
      @set-row="store.setPerPage"
      @refresh="store.getLists"
    />
    <div v-if="store.filteredPemesanans.length && !store.loading">
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="(item,i) in store.filteredPemesanans"
          :key="i"
          v-ripple
          clickable
          @click="store.pemesananSelected(item)"
        >
          <q-item-section>
            <div>
              {{ item?.nopenerimaan }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-primary">
              {{ item?.pihakketiga?.nama }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-cyan">
              {{ dateFullFormat(item?.tglpenerimaan) }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-italic">
              {{ item?.gudang?.nama }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    <!-- {{ store.filteredPemesanans }} -->
    </div>
    <div v-if="store.loading">
      <app-loading />
    </div>
    <div v-if="!store.filteredPemesanans.length && !store.loading">
      <app-no-selected-page
        color="primary"
        icon="icon-mat-receipt_long"
        text="Tidak ada data"
      />
    </div>
    <app-fullscreen-blue
      v-model="store.isOpen"
      @close="store.setClose"
    >
      <template #default>
        <DialogPenerimaan />
      </template>
    </app-fullscreen-blue>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { defineAsyncComponent, watch } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePemfakturanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/pemfakturan'

const style = useStyledStore()
const store = usePemfakturanFarmasiStore()
const HeaderComp = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const DialogPenerimaan = defineAsyncComponent(() => import('./DialogFaktur.vue'))

const apps = useAplikasiStore()
store.setParam('gudang', apps?.user?.kdruangansim)

store.getInitialData()

watch(() => apps?.user?.kdruangansim, (kod) => {
  const gud = store.gudangs.find(a => a.value === kod)
  if (gud) {
    store.setParam('gudang', gud?.value)
    store.ambilPemesanan()
  }
  // console.log('kode', gud)
})
</script>
