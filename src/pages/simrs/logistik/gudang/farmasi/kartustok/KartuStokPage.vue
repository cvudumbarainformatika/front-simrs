<template>
  <q-page
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs relative-position'"
  >
    <!-- <div class="header">
      <HeaderComp />
    </div> -->
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll hide-scroll"
      ref="refCardStok"
    >
      <!-- <q-scroll-area style="height:calc( 100% - 40px)">
        <ListObat />
        <div style="margin-bottom: 100px;" />
      </q-scroll-area> -->
      <TableObat />
      <!-- <div
        v-if="store.meta"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="store.meta"
          @go-to="store.goToPage"
        />
      </div> -->
    </q-card>

    <KartuStokRinci
      v-model="store.dialogRinci"
      :item="store.item"
      :params="store.params"
      :key="store.item"
    />
  </q-page>
</template>

<script setup>
// import HeaderComp from './comp/HeaderComp.vue'
// import ListObat from './comp/ListObat.vue'
import TableObat from './comp/TableObat.vue'
// import BottomComp from './comp/BottomCompPage.vue'
import KartuStokRinci from './comp/KartuStokRinci.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useKartuStokFarmasiStore } from '../../../../../../stores/simrs/farmasi/katustok'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref, watch } from 'vue'

const style = useStyledStore()
const store = useKartuStokFarmasiStore()
const app = useAplikasiStore()

const refCardStok = ref(null)

onMounted(() => {
  store.getInitialData()
  // .then(() => {
  //   store.getData()
  // })

  console.log('refCardStok', refCardStok.value)
})

// watchEffect(() => {
//   console.log('app', app?.user?.kdruangansim)
// })

watch(() => app?.user?.kdruangansim, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    store.getInitialData()
      .then(() => {
        store.getData()
      })
  }
}, { deep: true })
watch(() => store?.params.bulan, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    store.getData()
  }
}, { deep: true })
watch(() => store?.params.tahun, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    store.getData()
  }
}, { deep: true })

</script>
