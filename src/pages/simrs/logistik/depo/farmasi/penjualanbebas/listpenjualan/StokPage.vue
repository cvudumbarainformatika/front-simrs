<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1 ;"
    >
      <HeaderComp
        :search="table.params.q"
        :per-page="table.params.per_page"
        ada-tanggal
        @fullscreen="style.setComponentFull"
        @set-search="table.setSearch"
        @set-row="table.setPerPage"
        @set-periode="table.setPeriode"
        @terapkan="table.getDataTable"
        @refresh="table.getDataTable"
        @filter="table.setFilters"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <listForm />
    </div>
    <div class="fixed-bottom">
      <BottomComp
        v-if="table.meta !==null"
        :key="table.meta"
        :meta="table.meta"
        @go-to="table.setPage"
      />
    </div>
  </div>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { defineAsyncComponent, onMounted, watch } from 'vue'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListKunjunganPenjualanLangsungStore } from 'src/stores/simrs/farmasi/penjualanbebas/list'

const style = useStyledStore()

const table = useListKunjunganPenjualanLangsungStore()
const apps = useAplikasiStore()

const BottomComp = defineAsyncComponent(() => import('./comp/CompBottom.vue'))
const HeaderComp = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const listForm = defineAsyncComponent(() => import('./comp/CompList.vue'))

onMounted(() => {
  if (apps?.user?.kdruangansim !== '') {
    table.setParam('kdruang', apps?.user?.kdruangansim)
  }

  table.getDataTable()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  table.setParam('kdruang', obj)
  table.setParam('page', 1)
  table.getDataTable()
})

</script>
