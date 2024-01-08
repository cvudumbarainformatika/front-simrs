<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderComp />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <div
        v-if="!store?.items?.length"
        class="column flex-center full-height full-width absolute"
      >
        <div>Maaf Data Belum ada</div>
      </div>
      <q-scroll-area
        style="height:calc( 100% - 40px)"
      >
        <ListOrganisasi />
      </q-scroll-area>

      <div
        v-if="store.meta"
        class="absolute-bottom bg-primary text-white"
      >
        <!-- <BottomComp
          :meta="store.meta"
          @go-to="store.goToPage"
        /> -->
      </div>
    </q-card>

    <!-- dialogForm -->
    <DialogForm v-model="store.dialogTambah" />
    <DialogSatset v-model="store.dialogSatset" />
  </q-page>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import DialogSatset from './comp/DialogSatset.vue'
import ListOrganisasi from './comp/ListOrganisasi.vue'
import DialogForm from './comp/DialogForm.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
import { useOrganisasiStore } from 'src/stores/satset/organisasi'
import { computed, onMounted } from 'vue'
const style = useStyledStore()

const satset = useSatsetStore()
const store = useOrganisasiStore()

const auth = computed(() => {
  return satset.auth
})

onMounted(() => {
  if (auth.value === null) {
    satset.getAuth()
  }

  store.getData()
})

// onBeforeUnmount(() => {
//   satset.DELETE_TOKEN_SATSET()
// })
</script>
