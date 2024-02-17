<template>
  <q-page
    class="column full-height q-pa-sm"
  >
    <div class="col-auto">
      <HeaderComp />
    </div>
    <div
      class="col bg-white full-width full-height relative-position"
      style="overflow: hidden;"
    >
      <div class="absolute column full-height full-width">
        <div class="col-auto bg-primary">
          <TableHead
            :search="store.params.q"
            :per-page="store.params.per_page"
            @fullscreen="style.setComponentFull"
            @set-tanggal="(val)=>store.setDate(val)"
            @set-search="store.setQ"
            @set-row="store.setPerPage"
            @set-periode="store.setPeriodik"
            @refresh="store.getLists"
            @filter="store.setFilters"
          />
        </div>
        <div class="col full-height scroll">
          <ListKunjungan :items="store?.items" />
        </div>
        <div class="col-auto bg-primary">
          <BottomComp
            v-if="store.meta !==null"
            :key="store.meta"
            :meta="store.meta"
            @go-to="store.setPage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import TableHead from './TableHead.vue'
import HeaderComp from './HeaderComp.vue'
import ListKunjungan from './ListKunjungan.vue'
import BottomComp from '../../bpjs/kunjungan/comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListKunjunganBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/lists'
import { onMounted, onUnmounted } from 'vue'
// import { loadingBlock } from 'src/modules/utils'

const style = useStyledStore()
const store = useListKunjunganBpjsStore()

onMounted(() => {
  // loadingBlock('show')
  store.params.kdbayar = 'ALL'
  store.getLists()
})

onUnmounted(() => {
  // store.setTglAwal()
})
</script>
