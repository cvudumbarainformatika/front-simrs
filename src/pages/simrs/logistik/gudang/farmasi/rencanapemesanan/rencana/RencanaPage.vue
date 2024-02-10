<template>
  <!-- <q-scroll-area
    :style="`height: ${!style.componentfull? h-95:h+40}px; max-width: 100%;`"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
  > -->
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1 ;"
    >
      <HeaderComp
        :search="table.params.q"
        :per-page="table.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-search="table.setQ"
        @set-row="table.setPerPage"
        @set-periode="table.setPeriodik"
        @refresh="table.getLists"
        @filter="table.setFilters"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:30px"
    >
      <headerForm style="margin-top: 52px;" />
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
  <!-- </q-scroll-area> -->
</template>
<script setup>

import { defineAsyncComponent, onUnmounted } from 'vue'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { useTabelObatDirencanakaStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObatRencana'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()

// const h = ref(0)
const table = useTabelObatDirencanakaStore()
const store = useRencanaPemesananObatStore()

const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const headerForm = defineAsyncComponent(() => import('./comp/HeaderForm.vue'))
const listForm = defineAsyncComponent(() => import('./comp/ListForm.vue'))
// const thumbStyle = ref({
//   right: '0px',
//   borderRadius: '5px',
//   backgroundColor: '#027be3',
//   width: '2px',
//   opacity: 0.75
// })
// const barStyle = ref({
//   right: '0px',
//   borderRadius: '9px',
//   backgroundColor: '#027be3',
//   width: '5px',
//   opacity: 0.2
// })

table.getInitialData()
store.getInitialData()
onUnmounted(() => {
  store.resetForm()
})
</script>
<style lang="scss" scoped>
.box {
  white-space: normal !important;
    inline-size: 200px;
    overflow-wrap: break-word;
}
</style>
