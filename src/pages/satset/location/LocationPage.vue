<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <div class="q-pa-md">
        <div class="f-12 text-weight-bold">
          Data Lokasi Ruangan
        </div>
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
        <ListPages />
      </q-scroll-area>
    </q-card>

    <!-- dialogPage -->
    <DialogPage v-model="store.dialogOpen" />
  </q-page>
</template>

<script setup>
// import HeaderComp from './comp/HeaderComp.vue'
// import DialogSatset from './comp/DialogSatset.vue'
// import ListOrganisasi from './comp/ListOrganisasi.vue'
// import DialogForm from './comp/DialogForm.vue'
import DialogPage from './comp/DialogPage.vue'
import ListPages from './comp/ListPages.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
import { useLocationSatsetStore } from 'src/stores/satset/location'
// import { useOrganisasiStore } from 'src/stores/satset/organisasi'
import { computed, onMounted } from 'vue'
const style = useStyledStore()

const satset = useSatsetStore()
const store = useLocationSatsetStore()

const auth = computed(() => {
  return satset.auth
})

onMounted(() => {
  if (auth.value === null) {
    satset.getAuth()
  }
})

// onBeforeUnmount(() => {
//   satset.DELETE_TOKEN_SATSET()
// })
</script>
