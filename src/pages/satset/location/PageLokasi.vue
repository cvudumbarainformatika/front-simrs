<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header flex items-center justify-between q-px-md" style="height: 50px;">
      <div class="">
        <div class="f-14 text-weight-bold">
          Data Lokasi Ruangan Berdasarkan Departement
        </div>
      </div>

      <div>
        <!-- <app-input-simrs v-model="org.search" label="Cari" /> -->
        <q-input dense outlined placeholder="Cari Departement" v-model="org.search" standout="bg-yellow-3" style="min-width:200px;" />
      </div>
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area
        style="height:calc( 100% - 1px)"
        class="q-pa-lg"
      >
        <!-- INI LIST UNTUK ORGANISASI / DEPARTEMEN -->
        <ListDepartement :items="org.items" />
      </q-scroll-area>
    </q-card>

    <!-- dialogPage -->
    <RuanganPage v-model="org.dialogRuangan" :item="org.item" />
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
// import { useLocationSatsetStore } from 'src/stores/satset/location'
import { useOrganisasiStore } from 'src/stores/satset/organisasi'
import { computed, defineAsyncComponent, onMounted } from 'vue'

const ListDepartement = defineAsyncComponent(() => import('./compLokasi/ListDepartement.vue'))
const RuanganPage = defineAsyncComponent(() => import('./compLokasi/RuanganPage.vue'))

const style = useStyledStore()

const satset = useSatsetStore()
// const store = useLocationSatsetStore()
const org = useOrganisasiStore()

const auth = computed(() => {
  return satset.auth
})

onMounted(() => {
  if (auth.value === null) {
    satset.getAuth()
  }
  org.getData()
})

// onBeforeUnmount(() => {
//   satset.DELETE_TOKEN_SATSET()
// })
</script>
