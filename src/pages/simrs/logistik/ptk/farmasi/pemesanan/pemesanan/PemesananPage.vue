<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1 ;"
    >
      <CompHeader
        :search="table.params.q"
        :cari="table.params.obat"
        :per-page="table.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-search="table.cariRencana"
        @cari-obat="table.setCari"
        @set-row="table.setPerPage"
        @set-periode="table.setPeriodik"
        @refresh="table.getObatMauBeli"
        @filter="table.setFilters"
      />
    </div>

    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:52px"
    >
      <CompList />
    </div>

    <div class="fixed-bottom">
      <CompBottom
        v-if="table.meta !==null"
        :key="table.meta"
        :meta="table.meta"
        @go-to="table.setPage"
      />
    </div>
    <app-fullscreen-blue
      v-model="store.isOpen"
      @close="store.setClose"
    >
      <template #default>
        <CompDialog />
      </template>
    </app-fullscreen-blue>
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'
import { defineAsyncComponent } from 'vue'

const style = useStyledStore()
// eslint-disable-next-line no-unused-vars
const store = usePemesananObatStore()
const table = useTabelPemesananObatStore()

const CompBottom = defineAsyncComponent(() => import('./comp/CompBottom.vue'))
const CompHeader = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const CompList = defineAsyncComponent(() => import('./comp/CompList.vue'))
const CompDialog = defineAsyncComponent(() => import('./comp/CompDialog.vue'))

table.getInitialData()
store.getInitialData()
</script>
