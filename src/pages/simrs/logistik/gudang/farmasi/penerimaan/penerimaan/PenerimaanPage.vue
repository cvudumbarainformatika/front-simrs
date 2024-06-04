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
        <q-item class="bg-dark text-white">
          <q-item-section>
            <div class="row">
              <div class="col-auto text-weight-bold q-mr-md">
                No
              </div>
              <div class="col-auto text-weight-bold">
                Nomor Pemesanan
              </div>
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bold">
              PBF
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bold">
              Tanggal Pemesanan
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bold">
              Gudang Pemesan
            </div>
          </q-item-section>
        </q-item>
        <q-item
          v-for="(item,i) in store.filteredPemesanans"
          :key="i"
          v-ripple
          clickable
          @click="store.pemesananSelected(item)"
        >
          <q-item-section>
            <div class="row">
              <div class="col-auto q-mr-md">
                {{ i+1 }}
              </div>
              <div class="col-auto ">
                {{ item?.nopemesanan }}
              </div>
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-primary">
              {{ item?.pihakketiga?.nama }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-cyan">
              {{ dateFullFormat(item?.tgl_pemesanan) }}
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
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { defineAsyncComponent, watch } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const style = useStyledStore()
const store = usePenerimaanFarmasiStore()
const HeaderComp = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const DialogPenerimaan = defineAsyncComponent(() => import('./DialogPenerimaan.vue'))

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
